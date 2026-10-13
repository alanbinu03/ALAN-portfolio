function deliveryUrl(value) {
  const webhook = String(value || "").trim();
  if (!webhook) return null;
  try {
    const url = new URL(webhook);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

function inboxAddress(value) {
  const email = String(value || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

function draftMailto({ to, name, email, subject, message }) {
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function submitContact({ name, email, subject, message }) {
  const configured = String(import.meta.env.VITE_CONTACT_WEBHOOK_URL || "").trim();
  const inbox = inboxAddress(configured);

  if (inbox) {
    return {
      delivered: false,
      mailto: draftMailto({ to: inbox, name, email, subject, message }),
      message: "Your email app will open with this message.",
    };
  }

  const webhook = deliveryUrl(configured);
  if (!webhook) {
    return {
      delivered: false,
      message:
        "The form is working, but email delivery is not configured. Use the email or LinkedIn links, or set VITE_CONTACT_WEBHOOK_URL to an https endpoint.",
    };
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });
    if (!response.ok) {
      return {
        delivered: false,
        message: "The delivery service rejected the message. Use the email link instead.",
      };
    }
    return { delivered: true, message: "Message sent." };
  } catch {
    return {
      delivered: false,
      message: "Delivery failed. Try again later or use the email link.",
    };
  }
}
