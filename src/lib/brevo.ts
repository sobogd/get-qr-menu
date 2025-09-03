/**
 * Brevo helper using the @getbrevo/brevo generated client.
 *
 * Usage: call sendEmail({ to, subject, htmlContent, textContent, sender })
 *
 * Note: requires BREVO_API_KEY in environment.
 */

import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
  SendSmtpEmail,
} from "@getbrevo/brevo";

type SendEmailParams = {
  to: { email: string; name?: string }[];
  sender?: { name?: string; email?: string };
  subject: string;
  htmlContent?: string;
  textContent?: string;
};

const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
  // don't throw at import time to avoid client-side issues; functions will throw when used server-side
}

/**
 * Initialize transactional API client and set API key.
 * Idempotent — creates a new instance per call (cheap).
 */
function getTransactionalApi() {
  const api = new TransactionalEmailsApi();
  // set API key for header 'api-key'
  api.setApiKey(TransactionalEmailsApiApiKeys.apiKey, BREVO_API_KEY ?? "");
  return api;
}

/**
 * Send an email using @getbrevo/brevo client.
 */
export async function sendEmail(params: SendEmailParams) {
  if (!BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY is not set in environment variables");
  }

  const api = getTransactionalApi();

  const sendSmtpEmail: SendSmtpEmail = {
    sender: params.sender ?? {
      name: "Get QR Menu",
      email: "sobogd@gmail.com",
    },
    to: params.to,
    subject: params.subject,
    htmlContent: params.htmlContent,
    textContent: params.textContent,
  };

  try {
    const res = await api.sendTransacEmail(sendSmtpEmail);
    return res;
  } catch (err: unknown) {
    let message: string;
    if (err instanceof Error) {
      message = err.message;
    } else if (typeof err === "object") {
      try {
        message = JSON.stringify(err);
      } catch {
        message = String(err);
      }
    } else {
      message = String(err);
    }
    throw new Error(`Brevo send failed: ${message}`);
  }
}
