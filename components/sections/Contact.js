import { useState } from "react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SocialLink from "@/components/ui/SocialLink";
import { profile } from "@/data/profile";
import { mailtoHref, isPlaceholder } from "@/lib/utils";
import { submitContact } from "@/lib/contact";
import TextType from "@/components/react-bits/TextType";
import StarBorder from "@/components/react-bits/StarBorder";
import BorderGlow from "@/components/react-bits/BorderGlow";

const initial = { name: "", email: "", subject: "", message: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email.";
  }
  if (!values.subject.trim()) errors.subject = "Subject is required.";
  if (!values.message.trim() || values.message.trim().length < 12) {
    errors.message = "Message should be at least 12 characters.";
  }
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [info, setInfo] = useState("");

  const mail = mailtoHref(profile.email);
  const github = isPlaceholder(profile.github) ? null : profile.github;
  const linkedin = isPlaceholder(profile.linkedin) ? null : profile.linkedin;

  const onChange = (event) => {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("loading");
    setInfo("");
    try {
      const payload = await submitContact(values);
      if (payload.delivered) {
        setStatus("success");
        setInfo("Message sent.");
        setValues(initial);
        return;
      }
      if (payload.mailto) {
        setStatus("success");
        setInfo(payload.message || "Your email app was opened with this message.");
        setValues(initial);
        window.location.href = payload.mailto;
        return;
      }
      setStatus("error");
      setInfo(
        payload.message ||
          "Contact delivery is not configured yet. Use email or LinkedIn in the meantime.",
      );
    } catch {
      setStatus("error");
      setInfo("Network error. Try email or LinkedIn instead.");
    }
  };

  return (
    <Section id="contact">
      <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="min-w-0">
          <SectionHeading eyebrow="Contact" title="Contact." />
          <TextType
            as="p"
            text={["For vision, robotics, agents, or MLOps."]}
            typingSpeed={36}
            loop={false}
            showCursor={false}
            startOnVisible
            className="mt-4 text-base leading-relaxed text-muted"
          />
          <div className="mt-8 space-y-3 text-sm text-muted">
            <p>
              Email:{" "}
              {mail ? (
                <a className="text-text underline-offset-4 hover:underline" href={mail}>
                  {profile.email}
                </a>
              ) : (
                <span className="text-dim">TODO: add email in data/profile.js</span>
              )}
            </p>
            <div className="flex gap-2 pt-2">
              <SocialLink type="email" href={mail} label="Email" />
              <SocialLink type="linkedin" href={linkedin} label="LinkedIn" />
              <SocialLink type="github" href={github} label="GitHub" />
            </div>
          </div>
        </div>
        <BorderGlow
          className="min-w-0 p-5 sm:p-6"
          backgroundColor="#10131a"
          borderRadius={16}
          glowColor="174 62 68"
          colors={["#7adbe0", "#8ec5ff"]}
          edgeSensitivity={16}
        >
        <form onSubmit={onSubmit} noValidate>
          {[
            { name: "name", label: "Name", type: "text", autoComplete: "name" },
            { name: "email", label: "Email", type: "email", autoComplete: "email" },
            { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
          ].map((field) => (
            <label key={field.name} className="mb-4 block">
              <span className="font-mono text-[11px] tracking-[0.14em] text-dim uppercase">
                {field.label}
              </span>
              <input
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                value={values[field.name]}
                onChange={onChange}
                aria-invalid={Boolean(errors[field.name])}
                className="mt-2 min-h-12 w-full rounded-[10px] border border-border bg-bg px-3 py-3 text-base text-text outline-none focus:border-accent/50"
              />
              {errors[field.name] ? (
                <span className="mt-1 block text-xs text-danger">{errors[field.name]}</span>
              ) : null}
            </label>
          ))}
          <label className="mb-4 block">
            <span className="font-mono text-[11px] tracking-[0.14em] text-dim uppercase">
              Message
            </span>
            <textarea
              name="message"
              rows={6}
              value={values.message}
              onChange={onChange}
              aria-invalid={Boolean(errors.message)}
              className="mt-2 w-full resize-y rounded-[10px] border border-border bg-bg px-3 py-3 text-base text-text outline-none focus:border-accent/50"
            />
            {errors.message ? (
              <span className="mt-1 block text-xs text-danger">{errors.message}</span>
            ) : null}
          </label>
          <StarBorder
            type="submit"
            disabled={status === "loading"}
            color="#7adbe0"
            radius={10}
            thickness={1}
            className="!px-4 !py-2.5 text-sm"
          >
            {status === "loading" ? "Sending…" : "Send message"}
          </StarBorder>
          {info ? (
            <p
              className={`mt-4 text-sm ${status === "success" ? "text-success" : "text-muted"}`}
              role="status"
            >
              {info}
            </p>
          ) : null}
        </form>
        </BorderGlow>
      </div>
    </Section>
  );
}
