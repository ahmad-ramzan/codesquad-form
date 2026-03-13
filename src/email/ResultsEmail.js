export function renderResultsEmail({
  name,
  answers = {},
  result = {},
  selectedPortfolios = [],
  selectedGoalsLabels = [],
}) {
  const safeName = name || "there";
  const {
    industry = "Not specified",
    ai_level = "Not specified",
    budget = "Not specified",
    timeline = "Not specified",
  } = answers;

  const goalsText =
    selectedGoalsLabels && selectedGoalsLabels.length
      ? selectedGoalsLabels.join(", ")
      : "No specific goals selected";

  const portfolioHtml =
    Array.isArray(selectedPortfolios) && selectedPortfolios.length > 0
      ? `
        <h3 style="margin-top:25px;margin-bottom:10px;color:#111;">Example projects in your industry</h3>
        <div style="color:#444;font-size:15px;line-height:1.7;margin-bottom:10px;">
          Here are a few real-world projects similar to your business:
        </div>
        ${selectedPortfolios
          .map((p) => {
            const emoji = p.emoji || "";
            const title = p.title || "";
            const tagline = p.tagline || "";
            const link = p.link || "#";
            return `
            <div style="margin-bottom:18px;">
              <div style="font-size:16px;margin-bottom:4px;">${emoji} <strong>${title}</strong></div>
              <div style="color:#444;font-size:14px;line-height:1.5;margin-bottom:6px;">${tagline}</div>
              <a href="${link}" style="color:#4F46E5;font-size:13px;text-decoration:none;font-weight:bold;">View whole case study →</a>
            </div>`;
          })
          .join("")}
      `
      : "";

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Your AI Readiness Results</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;width:100%;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:30px;">
            <tr>
              <td>
                <h2 style="color:#222;margin-top:0;">
                  Hi ${safeName}, your AI Readiness Assessment is complete 🚀
                </h2>

                <p style="color:#444;font-size:15px;line-height:1.6;margin:0 0 12px 0;">
                  Thank you for completing the assessment. Based on your answers, here is a quick summary of your AI readiness and where you should focus next.
                </p>

                <h3 style="margin-top:25px;margin-bottom:8px;color:#111;">Your Business Profile</h3>
                <p style="color:#444;font-size:15px;line-height:1.6;margin:0 0 12px 0;">
                  <strong>Industry:</strong> ${industry}<br/>
                  <strong>AI Experience:</strong> ${ai_level}<br/>
                  <strong>Budget:</strong> ${budget}<br/>
                  <strong>Timeline:</strong> ${timeline}
                </p>

                <h3 style="margin-top:25px;margin-bottom:8px;color:#111;">What You Want AI to Solve</h3>
                <p style="color:#444;font-size:15px;line-height:1.6;margin:0 0 12px 0;">
                  ${goalsText}
                </p>

                <p style="color:#444;font-size:15px;line-height:1.6;margin:0 0 12px 0;">
                  In a short consultation, you can expect:
                </p>
                <ul style="color:#444;font-size:15px;line-height:1.7;padding-left:20px;margin-top:6px;margin-bottom:12px;">
                  <li>A custom AI strategy for your business</li>
                  <li>Recommended AI tools &amp; automation opportunities</li>
                  <li>A simple, step-by-step implementation roadmap</li>
                </ul>

                ${portfolioHtml}

                <p style="color:#444;font-size:15px;line-height:1.6;margin:0 0 12px 0;">
                  This session is designed to give you <strong>clear, actionable insights</strong> so you can confidently move forward with AI in your business.
                </p>

                <div style="text-align:center;margin:30px 0;">
                  <a
                    href="https://calendly.com/code_squad/30min"
                    style="background:#4F46E5;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;font-size:16px;font-weight:bold;display:inline-block;"
                  >
                    book a 10 min free audit
                  </a>
                </div>

                <p style="color:#777;font-size:14px;">
                  If you have any questions before booking, simply reply to this email.
                </p>

                <p style="color:#777;font-size:14px;margin-top:30px;">
                  Best regards,<br/>
                  <strong>Shahzaib Hamid</strong><br/>
                  AI &amp; Automation Consulting
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return html;
}

