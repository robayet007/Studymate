import express from "express";
import { generateStudyAdvice } from "./ai.js";

const router = express.Router();

router.post("/advice", async (req, res) => {
  try {
    const { prompt, context } = req.body ?? {};
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ message: "prompt is required" });
    }

    const answer = await generateStudyAdvice({ prompt, context });
    return res.json({ answer });
  } catch (error) {
    return res.status(500).json({ message: error.message || "AI request failed" });
  }
});

export default router;
