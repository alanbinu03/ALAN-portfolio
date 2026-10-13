import { useState } from "react";
import { profile } from "@/data/profile";
import { submitContact } from "@/lib/contact";

const field =
  "w-full border border-white/15 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/40";

export default function ContactPanel() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [info, setInfo] = useState("");
  const [status, setStatus] = useState("idle");

  const onChange = (event) => {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!values.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.message.trim().length < 12) {
      setStatus("error");
      setInfo("Add your name, a valid email, and a message of at least 12 characters.");
      return;
    }
    setStatus("loading");
    const payload = await submitContact({
      name: values.name.trim(),
      email: values.email.trim(),
      subject: "Portfolio message",
      message: values.message.trim(),
    });
    if (payload.mailto) {
      setStatus("success");
      setInfo("Draft opened in your email app.");
      setValues({ name: "", email: "", message: "" });
      window.location.href = payload.mailto;
      return;
    }
    setStatus(payload.delivered ? "success" : "error");
    setInfo(payload.message);
    if (payload.delivered) setValues({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="px-6 py-8 pb-16 sm:px-8">
      <div className="mx-auto w-full max-w-4xl border-t border-white/10 pt-8">
        <h2 className="text-lg text-white">Contact</h2>
        <p className="mt-1 text-sm text-white/55">
          <a className="hover:text-white" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </p>
        <form onSubmit={onSubmit} className="mt-4 grid max-w-xl gap-2" noValidate>
          <div className="grid gap-2 sm:grid-cols-2">
            <input className={field} name="name" placeholder="Name" aria-label="Name" value={values.name} onChange={onChange} />
            <input className={field} name="email" type="email" placeholder="Email" aria-label="Email" value={values.email} onChange={onChange} />
          </div>
          <textarea className={`${field} min-h-28 resize-y`} name="message" placeholder="Message" aria-label="Message" value={values.message} onChange={onChange} />
          <div className="flex items-center gap-4">
            <button type="submit" disabled={status === "loading"} className="border border-white/20 px-3 py-1.5 text-sm text-white hover:border-white/50 disabled:opacity-60">
              {status === "loading" ? "Sending…" : "Send"}
            </button>
            {info ? <p className="text-sm text-white/55">{info}</p> : null}
          </div>
        </form>
      </div>
    </section>
  );
}
