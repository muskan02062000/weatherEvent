
const express = require("express");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");
const fetchWeather = require("../utils/weatherService");
const router = express.Router();
 
// Create event
router.post("/", authMiddleware, async (req, res) => {
    const { title, description, date, time, location } = req.body;
    try {
        const weather = await fetchWeather(location, date);
        const event = new Event({ userId: req.user.userId, title, description, date, time, location, weather });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: "Error creating event", error });
    }
});
 
// Get all events
router.get("/", authMiddleware, async (req, res) => {
    const events = await Event.find({ userId: req.user.userId });
    res.json(events);
});
 
// Get event by ID
router.get("/:id", authMiddleware, async (req, res) => {
const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
});
 
// Update event
router.put("/:id", authMiddleware, async (req, res) => {
    const { title, description, date, time, location } = req.body;
    let weather = null;
 
    if (date || location) {
        weather = await fetchWeather(location, date);
    }
 
    const updatedEvent = await Event.findByIdAndUpdate(
req.params.id,
        { title, description, date, time, location, weather },
        { new: true }
    );
    res.json(updatedEvent);
});
 
// Delete event
router.delete("/:id", authMiddleware, async (req, res) => {
await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
});
 
module.exports = router;
