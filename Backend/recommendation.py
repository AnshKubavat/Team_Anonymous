from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from bson.errors import InvalidId
from collections import Counter
from collections import defaultdict
from dotenv import load_dotenv
import os
from googletrans import Translator
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np



# Load environment variables from .env file
load_dotenv()

# Access environment variables
api_key = os.getenv('MONGO_URI')

app = Flask(__name__)
CORS(app)

MONGO_URI = api_key
client = MongoClient(MONGO_URI, ssl=True)

db = client["NearByGo"]  # Your main database
users_collection = db["users"]  # Collection storing user info
business_collection = db["businesses"]  # Collection storing business data


def most_searched_category(categories):
    if not categories:
        return None

    category_counts = Counter(categories)
    max_count = max(category_counts.values())

    most_frequent_categories = [
        cat for cat, count in category_counts.items() if count == max_count
    ]
    if len(most_frequent_categories) == 1:
        return most_frequent_categories[0]

    most_recent_category = max(
        most_frequent_categories, key=lambda cat: categories.index(cat)
    )
    return most_recent_category


@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.json
    user_id = data.get("user_id")
    print(user_id)

    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)})
    except InvalidId:
        return jsonify({"error": "Invalid user ID format"}), 400

    if not user:
        return jsonify({"error": "User not found"}), 404
    all_businesses = list(business_collection.find({}))  # Fetch all fields

    all_businesses = list(business_collection.find(
        {}, {"_id": 1, "categoryOfBusiness": 1}))

    categories = user.get("history", [])

    if not categories:
        return jsonify({"message": "No search history found"}), 200

    most_category = most_searched_category(categories)
    
    matching_business_ids = [
        str(business["_id"]) for business in all_businesses if business.get("categoryOfBusiness").lower() == most_category.lower()
    ]
    rate_list = list(db["reviews"].find({}, {'business': 1, 'rating': 1}))
    

    matching_business_ids = [ObjectId(id) for id in matching_business_ids]

    filtered_ratings = [
        rate for rate in rate_list if rate["business"] in matching_business_ids
    ]

    if (len(filtered_ratings) == 0):
        businesses = list(business_collection.find(
            {"_id": {"$in": matching_business_ids}}))

        for business in businesses:
            business["_id"] = str(business["_id"])
            if "reviews" in business and isinstance(business["reviews"], list):
                business["reviews"] = [str(review_id)
                                       for review_id in business["reviews"]]

            for key, value in business.items():
                if isinstance(value, ObjectId):
                    business[key] = str(value)

        return jsonify(businesses)
    else:
        business_ratings = defaultdict(lambda: {"total": 0, "count": 0})

        for rate in filtered_ratings:
            business_id = str(rate["business"])
            business_ratings[business_id]["total"] += rate["rating"]
            business_ratings[business_id]["count"] += 1

        average_ratings = {business_id: round(
            data["total"] / data["count"], 2) if data["count"] > 0 else 0 for business_id, data in business_ratings.items()}

        sorted_average_ratings = sorted(
            average_ratings.items(), key=lambda x: x[1], reverse=True
        )

        sorted_business_ids = [ObjectId(business_id)
                               for business_id, _ in sorted_average_ratings]

        sorted_businesses = list(business_collection.find(
            {"_id": {"$in": sorted_business_ids}}))

        for business in sorted_businesses:
            business["_id"] = str(business["_id"])
            if "reviews" in business and isinstance(business["reviews"], list):
                business["reviews"] = [str(review_id)
                                       for review_id in business["reviews"]]

            for key, value in business.items():
                if isinstance(value, ObjectId):
                    business[key] = str(value)

        sorted_businesses = sorted(
            sorted_businesses, key=lambda b: sorted_business_ids.index(ObjectId(b["_id"])))

        return jsonify(sorted_businesses)


faq_data = {
    "What is the purpose of this platform?": "Our platform helps newcomers and tourists find local businesses like restaurants, tailors, cobblers, and rickshaw services in a unified digital space.",
    "How does the platform work?": "Users can search for businesses, check service details, compare prices, and request rickshaw rides through an interactive web-based platform.",
    "Do I need an account to use the platform?": "No, you can browse services without an account, but signing up allows you to leave reviews, save businesses, and request rickshaw rides.",
    "What makes this platform different from Google Maps or other business directories?": "We focus on hyperlocal businesses that may not be listed elsewhere and integrate rickshaw ride requests, making it easier for new residents to find services.",
    "Can business owners list their services on this platform?": "Yes, business owners can create accounts, list their services, and manage their business information through our platform.",
    "How accurate are the business listings and prices?": "Business owners update their listings regularly, and users can report incorrect information.",
    "Can I search for specific services like laundry or a blacksmith?": "Absolutely! The platform allows you to search for specific service categories and view available options near you.",
    "How does the platform recommend businesses to users?": "We use AI-based recommendations based on your search history and top-rated businesses in your preferred category.",
    "Is there a way to rate or review any services?": "Yes, users can rate and review businesses based on their experiences to help others make informed decisions.",
    "Is my personal information safe?": "Yes! We use secure encryption and privacy measures to protect user data.",
    "How can I contact support?": "You can contact support through our Contact Us page."
}

questions = list(faq_data.keys())
answers = list(faq_data.values())

vectorizer = TfidfVectorizer()
question_vectors = vectorizer.fit_transform(questions)


@app.route("/get_answer", methods=["POST"])
def ask_question():
    def get_answer():
        data = request.json
        user_query = data.get("question", "").strip()

        if not user_query:
            return jsonify({"error": "Please provide a question"}), 400

        user_vector = vectorizer.transform([user_query])

        similarities = cosine_similarity(user_vector, question_vectors).flatten()

        best_match_idx = np.argmax(similarities)

        if similarities[best_match_idx] < 0.2:  # If similarity is too low, return fallback
            return jsonify({"answer": "I'm sorry, I couldn't find a relevant answer. Please check our FAQ section."})

    # Return the best matching answer
        return jsonify({"answer": answers[best_match_idx]})


if __name__ == "__main__":
    app.run(port=3001, debug=True)
