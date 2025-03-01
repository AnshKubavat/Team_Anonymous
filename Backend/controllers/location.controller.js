import axios from "axios"
export const getDistance = async (req, res) => {
    const { userLatitude, userLongitude, businessLocations } = req.body;
    console.log(req.body);


    if (!userLatitude || !userLongitude || businessLocations.length === 0) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    const destinations = businessLocations
        .map(b => `${b.latitude},${b.longitude}`)
        .join("|");

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLatitude},${userLongitude}&destinations=${destinations}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status !== "OK") {
            return res.status(500).json({ message: "Google API error", success: false });
        }

        const distances = response.data.rows[0].elements.map((element, index) => ({
            id: businessLocations[index].id,
            distance: element.status === "OK" ? element.distance.text : "N/A"
        }));

        res.json(distances);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching distances", error });
    }

}