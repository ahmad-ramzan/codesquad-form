import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { renderResultsEmail } from "./src/email/ResultsEmail.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.post("/send-results", async (req, res) => {
  const { email, name, answers, result, selectedGoals, selectedPortfolios } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    return res.status(500).json({ error: "Email environment variables not configured" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  const html = renderResultsEmail({
    name,
    answers,
    result,
    selectedPortfolios: Array.isArray(selectedPortfolios)
      ? selectedPortfolios
      : [],
    selectedGoalsLabels: Array.isArray(selectedGoals) ? selectedGoals : [],
  });

  console.log("EMAIL DEBUG payload:", {
    to: email,
    name,
    hasAnswers: Boolean(answers),
    hasResult: Boolean(result),
    selectedGoalsCount: Array.isArray(selectedGoals) ? selectedGoals.length : 0,
    htmlLength: typeof html === "string" ? html.length : 0,
  });

  let emailSendError = null;

  try {
    await transporter.sendMail({
      from: gmailUser,
      to: email,
      subject: "Your AI Readiness Results",
      html,
    });
  } catch (err) {
    console.error("Failed to send email:", err);
    emailSendError = "Failed to send email";
  }

  // Store lead in Supabase if configured
  if (supabase) {
    try {
      const payload = {
        email,
        name,
        industry: answers?.industry || null,
        ai_level: answers?.ai_level || null,
        ai_tools_used: answers?.ai_tools_used || null,
        goals: answers?.goals || [],
        selected_goals_labels: selectedGoals || [],
        biggest_challenge: answers?.biggest_challenge || null,
        budget: answers?.budget || null,
        timeline: answers?.timeline || null,
        score: typeof result?.score === "number" ? result.score : null,
        tier: result?.tier || null,
        primary_category: result?.primaryCategory || null,
        raw_answers: answers || {},
        created_at: new Date().toISOString(),
      };

      const { error: dbError } = await supabase.from("ai_leads").insert(payload);
      if (dbError) {
        console.error("Failed to store lead in Supabase:", dbError);
      }
    } catch (e) {
      console.error("Unexpected Supabase error:", e);
    }
  } else {
    console.warn("Supabase not configured – skipping lead storage");
  }

  if (emailSendError) {
    return res.status(502).json({ ok: false, error: emailSendError });
  }

  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Email server listening on http://localhost:${PORT}`);
});

