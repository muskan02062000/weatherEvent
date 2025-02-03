const mongoose = require("mongoose");
 
const EventSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    weather: { type: Object }  // Store fetched weather data
});
 
module.exports = mongoose.model("Event", EventSchema);
