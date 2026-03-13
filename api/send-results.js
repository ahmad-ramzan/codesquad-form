import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import { renderResultsEmail } from "../src/email/ResultsEmail.js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, name, answers, result, selectedGoals, selectedPortfolios } =
    req.body || {};

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    return res
      .status(500)
      .json({ error: "Email environment variables not configured" });
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

  console.log("VERCEL EMAIL payload:", {
    to: email,
    name,
    hasAnswers: Boolean(answers),
    hasResult: Boolean(result),
    selectedGoalsCount: Array.isArray(selectedGoals) ? selectedGoals.length : 0,
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
    console.error("Failed to send email (Vercel):", err);
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

      const { error: dbError } = await supabase
        .from("ai_leads")
        .insert(payload);
      if (dbError) {
        console.error("Failed to store lead in Supabase (Vercel):", dbError);
      }
    } catch (e) {
      console.error("Unexpected Supabase error (Vercel):", e);
    }
  } else {
    console.warn("Supabase not configured – skipping lead storage (Vercel)");
  }

  if (emailSendError) {
    return res.status(502).json({ ok: false, error: emailSendError });
  }

  return res.status(200).json({ ok: true });
}

