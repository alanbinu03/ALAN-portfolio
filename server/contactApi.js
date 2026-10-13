import nodemailer from "nodemailer";
import { loadEnv } from "vite";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function send(res, status, message) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message }));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 20_000) {
        reject(Object.assign(new Error("too big"), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"));
      } catch {
        reject(Object.assign(new Error("bad json"), { status: 400 }));
      }
    });
    req.on("error", reject);
  });
}

function fieldsFrom(body) {
  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim();
  const subject = String(body?.subject || "")
    .trim()
    .replace(/[\r\n]+/g, " ");
  const message = String(body?.message || "").trim();
  if (!name || name.length > 120) return { error: "Name is required." };
  if (!EMAIL.test(email) || email.length > 200) return { error: "Enter a valid email." };
  if (!subject || subject.length > 200) return { error: "Subject is required." };
  if (message.length < 12 || message.length > 5000) {
    return { error: "Message should be at least 12 characters." };
  }
  return { name, email, subject, message };
}

async function deliver(env, fields) {
  const host = env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(env.SMTP_PORT || 587);
  const user = String(env.SMTP_USER || "").trim();
  const pass = String(env.SMTP_PASS || "").trim();
  const to = String(env.SMTP_TO || user || "alanbinu0305@gmail.com").trim();

  if (!user || !pass) {
    return {
      status: 503,
      message: "Email is not configured yet. Add SMTP_USER and SMTP_PASS in .env, then restart the dev server.",
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: user,
    to,
    replyTo: fields.email,
    subject: fields.subject,
    text: `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`,
  });

  return { status: 200, message: "Message sent." };
}

function attach(server) {
  server.middlewares.use("/api/contact", async (req, res) => {
    if (req.method !== "POST") {
      send(res, 405, "Use POST.");
      return;
    }

    try {
      const body = await readJson(req);
      const fields = fieldsFrom(body);
      if (fields.error) {
        send(res, 400, fields.error);
        return;
      }
      const env = loadEnv(server.config.mode, process.cwd(), "");
      const result = await deliver(env, fields);
      send(res, result.status, result.message);
    } catch (error) {
      const status = error.status || 500;
      if (status === 500) {
        console.error("Contact SMTP failed:", error.code || "send failed");
      }
      send(
        res,
        status,
        status === 400 ? "The form could not be read." : "The message could not be sent. Try the email link.",
      );
    }
  });
}

export function contactApi() {
  return {
    name: "contact-smtp",
    configureServer: attach,
    configurePreviewServer: attach,
  };
}
