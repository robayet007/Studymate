import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  done: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
const Task = mongoose.model("Task", taskSchema);

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "studymate-api" }));
app.get("/api/tasks", async (_req, res) => {
  try { res.json(await Task.find().sort({ createdAt: -1 })); }
  catch (error) { res.status(500).json({ message: error.message }); }
});
app.post("/api/tasks", async (req, res) => {
  try { const task = await Task.create(req.body); res.status(201).json(task); }
  catch (error) { res.status(400).json({ message: error.message }); }
});
app.patch("/api/tasks/:id", async (req, res) => {
  try { const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); res.json(task); }
  catch (error) { res.status(400).json({ message: error.message }); }
});
app.delete("/api/tasks/:id", async (req, res) => {
  try { await Task.findByIdAndDelete(req.params.id); res.status(204).end(); }
  catch (error) { res.status(400).json({ message: error.message }); }
});

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    if (process.env.MONGO_URI) await mongoose.connect(process.env.MONGO_URI);
    else console.warn("MONGO_URI is missing; database connection was skipped.");
    app.listen(port, () => console.log(`StudyMate API running on port ${port}`));
  } catch (error) { console.error(error); process.exit(1); }
};
start();
