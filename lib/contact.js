export async function submitContact({ name, email, subject, message }) {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      return {
        delivered: false,
        message: payload.message || "The message could not be sent. Try the email link.",
      };
    }
    return { delivered: true, message: payload.message || "Message sent." };
  } catch {
    return {
      delivered: false,
      message: "The message could not be sent. Try the email link.",
    };
  }
}
