from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from bson.errors import InvalidId
from collections import Counter
from collections import defaultdict
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv('MONGO_URI')

app = Flask(__name__)
CORS(app)

MONGO_URI = api_key
client = MongoClient(MONGO_URI, ssl=True)


@app.route('/recommendation', methods=['GET'])
def recommendation():
    return jsonify(data)

if __name__ == '__main__':
    app.run(port=3001,debug=True)