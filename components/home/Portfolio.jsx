import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "@/components/ui/Link";
import Container from "@/components/ui/Container";
import Contact from "@/components/sections/Contact";
import BlurText from "@/components/react-bits/BlurText";
import FadeContent from "@/components/react-bits/FadeContent";
import ShinyText from "@/components/react-bits/ShinyText";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import GlareHover from "@/components/react-bits/GlareHover";
import Magnet from "@/components/react-bits/Magnet";
import GradientText from "@/components/react-bits/GradientText";
import DecryptedText from "@/components/react-bits/DecryptedText";
import ScrollReveal from "@/components/react-bits/ScrollReveal";
import RotatingText from "@/components/react-bits/RotatingText";
import ScrollVelocity from "@/components/react-bits/ScrollVelocity";
import CountUp from "@/components/react-bits/CountUp";
import TrueFocus from "@/components/react-bits/TrueFocus";
import AnimatedContent from "@/components/react-bits/AnimatedContent";
import ClickSpark from "@/components/react-bits/ClickSpark";
import ScrollFloat from "@/components/react-bits/ScrollFloat";
import LogoLoop from "@/components/react-bits/LogoLoop";
import PixelCard from "@/components/react-bits/PixelCard";
import BorderGlow from "@/components/react-bits/BorderGlow";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { isPlaceholder } from "@/lib/utils";

function NativePhoto() {
  const [size, setSize] = useState(null);
  const [dragging, setDragging] = useState(false);
  const photoRef = useRef(null);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      const dpr = window.devicePixelRatio || 1;
      setSize({
        width: Math.round(image.naturalWidth / dpr),
        height: Math.round(image.naturalHeight / dpr),
      });
    };
    image.src = profile.image;
  }, []);

  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;

    let cx = 0;
    let cy = 0;
    let frame = 0;
    let pointer = null;

    const paint = () => {
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    };

    const springBack = () => {
      const stiffness = 420;
      const damping = 32;
      let vx = 0;
      let vy = 0;
      let last = performance.now();
      const step = (now) => {
        const dt = Math.min((now - last) / 1000, 0.032);
        last = now;
        vx += (-stiffness * cx - damping * vx) * dt;
        vy += (-stiffness * cy - damping * vy) * dt;
        cx += vx * dt;
        cy += vy * dt;
        if (Math.hypot(cx, cy) < 0.5 && Math.hypot(vx, vy) < 12) {
          cx = 0;
          cy = 0;
          vx = 0;
          vy = 0;
          el.style.transform = "translate3d(0px, 0px, 0)";
          setDragging(false);
          return;
        }
        paint();
        frame = requestAnimationFrame(step);
      };
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(step);
    };

    const move = (event) => {
      if (!pointer || event.pointerId !== pointer.id) return;
      cx = event.clientX - pointer.dx;
      cy = event.clientY - pointer.dy;
      paint();
    };

    const up = (event) => {
      if (!pointer || event.pointerId !== pointer.id) return;
      pointer = null;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      springBack();
    };

    const down = (event) => {
      if (event.button !== 0) return;
      cancelAnimationFrame(frame);
      pointer = { id: event.pointerId, dx: event.clientX - cx, dy: event.clientY - cy };
      setDragging(true);
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      window.addEventListener("pointercancel", up);
    };

    el.addEventListener("pointerdown", down);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [size]);

  if (!size) return <div className="h-40 w-28 shrink-0 bg-white/5" aria-hidden="true" />;

  return (
    <div
      className="relative mx-auto w-full max-w-full shrink-0 lg:mx-0 lg:w-auto"
      style={{
        width: size.width,
        maxWidth: "100%",
        aspectRatio: `${size.width} / ${size.height}`,
      }}
    >
      <div
        ref={photoRef}
        className={`absolute inset-0 cursor-grab touch-none select-none active:cursor-grabbing ${dragging ? "z-40" : "z-10"}`}
      >
        <GlareHover
          width="100%"
          height="100%"
          background="#ffffff"
          borderRadius="0px"
          borderColor="rgba(255,255,255,0.12)"
          glareColor="#ffffff"
          glareOpacity={0.28}
          glareSize={180}
        >
          <img
            src={profile.image}
            alt={profile.imageAlt}
            width={size.width}
            height={size.height}
            decoding="sync"
            draggable="false"
            className="h-full w-full"
          />
        </GlareHover>
      </div>
    </div>
  );
}

function Label({ children }) {
  return <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">{children}</p>;
}

const GREETINGS = [
  { lang: "en", dir: "ltr", text: "Hi, I'm Alan." },
  { lang: "mr", dir: "ltr", text: "नमस्कार, मी अ‍ॅलन आहे." },
  { lang: "hi", dir: "ltr", text: "नमस्ते, मैं एलन हूँ." },
  { lang: "ml", dir: "ltr", text: "നമസ്കാരം, ഞാൻ അലൻ ആണ്." },
  { lang: "pt", dir: "ltr", text: "Oi, eu sou o Alan." },
  { lang: "es", dir: "ltr", text: "Hola, soy Alan." },
  { lang: "fr", dir: "ltr", text: "Salut, je suis Alan." },
  { lang: "ar", dir: "rtl", text: "مرحباً، أنا آلان." },
  { lang: "ja", dir: "ltr", text: "こんにちは、アランです。" },
  { lang: "de", dir: "ltr", text: "Hallo, ich bin Alan." },
];

function Greeting() {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let fade;
    const timer = window.setInterval(() => {
      setShown(false);
      fade = window.setTimeout(() => {
        setIndex((current) => (current + 1) % GREETINGS.length);
        setShown(true);
      }, 220);
    }, 3000);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(fade);
    };
  }, []);

  const greeting = GREETINGS[index];
  const line =
    "w-full max-w-full text-left text-[clamp(1.7rem,4.5vw,2.25rem)] leading-snug tracking-tight break-words text-white sm:text-4xl";

  return (
    <div className="mt-3 grid w-full min-w-0">
      {GREETINGS.map((item) => (
        <p key={item.lang} aria-hidden="true" className={`invisible col-start-1 row-start-1 ${line}`}>
          {item.text}
        </p>
      ))}
      <h2
        lang={greeting.lang}
        dir={greeting.dir}
        className={`col-start-1 row-start-1 transition-opacity duration-200 ${line} ${shown ? "opacity-100" : "opacity-0"}`}
      >
        {greeting.text}
      </h2>
    </div>
  );
}

function ResultValue({ result }) {
  const match = result.match(/[\d.]+/);
  if (!match) return result;
  const value = Number(match[0]);
  const prefix = result.slice(0, match.index);
  const suffix = result.slice(match.index + match[0].length);
  const decimals = (match[0].split(".")[1] || "").length;

  return (
    <span>
      {prefix}
      <CountUp to={value} decimals={decimals} duration={1.6} />
      {suffix}
    </span>
  );
}

export default function Portfolio() {
  const role = experience[0];
  const github = isPlaceholder(profile.github) ? null : profile.github;
  const linkedin = isPlaceholder(profile.linkedin) ? null : profile.linkedin;

  const toolLogos = skillGroups.flatMap((group) =>
    group.items.map((item) => ({
      title: item,
      node: <span className="font-mono text-xs tracking-wide text-white/60">{item}</span>,
    })),
  );

  return (
    <ClickSpark sparkColor="#7adbe0" sparkCount={6} sparkRadius={18} sparkSize={6} duration={420}>
      <section className="pt-8 pb-4 sm:pt-14">
        <Container>
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 max-w-2xl">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase">
                <ShinyText
                  text="Junior Engineer — Artificial Intelligence"
                  color="#7adbe0"
                  shineColor="#ffffff"
                  trigger="view"
                  speed={1.6}
                  shineWidth={28}
                />
              </p>
              <BlurText
                as="h1"
                text={profile.name}
                animateBy="words"
                delay={90}
                direction="bottom"
                animationFrom={{ filter: "blur(8px)", opacity: 0, y: 18 }}
                animationTo={[{ filter: "blur(0px)", opacity: 1, y: 0 }]}
                className="mt-4 text-[clamp(2.35rem,8vw,6.4rem)] leading-[0.88] font-bold tracking-[-0.05em] text-white"
              />
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
                <span className="mb-1 block min-h-[1.4em] text-white">
                  <RotatingText
                    texts={["Real-time vision", "Robot systems", "Agent workflows", "MLOps pipelines"]}
                    splitBy="words"
                    rotationInterval={2400}
                    mainClassName="inline-flex text-lg font-medium text-white"
                  />
                </span>
                taken from a prototype through to deployment.
              </p>
              <Magnet magnetStrength={8} padding={40} wrapperClassName="mt-6 w-fit">
                <p className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-text">
                  <a className="hover:text-accent" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                  {github ? (
                    <a className="hover:text-accent" href={github} target="_blank" rel="noreferrer noopener">
                      GitHub
                    </a>
                  ) : null}
                  {linkedin ? (
                    <a className="hover:text-accent" href={linkedin} target="_blank" rel="noreferrer noopener">
                      LinkedIn
                    </a>
                  ) : null}
                </p>
              </Magnet>
            </div>
            <NativePhoto />
          </div>
        </Container>
      </section>

      <section className="py-10" aria-label="Focus">
        <Container>
          <div className="[&_span]:!text-[clamp(1.55rem,6vw,2.75rem)] [&_span]:!leading-none">
            <TrueFocus
              sentence="Vision Robotics Agents MLOps"
              borderColor="#7adbe0"
              glowColor="rgba(122, 219, 224, 0.55)"
              blurAmount={4}
              animationDuration={0.45}
              pauseBetweenAnimations={1.1}
            />
          </div>
        </Container>
      </section>

      <section id="about" className="py-16 sm:py-20">
        <Container>
          <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(260px,500px)] xl:items-center xl:gap-14">
            <div className="min-w-0">
              <Label>About</Label>
              <Greeting />
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
                <p>
                Hi, I'm Alan, a Junior AI Engineer working in computer vision, robotics, generative AI, and MLOps. Yes I know,Demos get the applause, but I'm the one who stays to make the system work on a sleepy Monday, with bad lighting, shaky Wi-Fi, and real users.
                </p>
                <p>
                I finished my B.Tech in CSE at MIT-WPU in 2025, powered mostly by late-night debugging and canteen samosas. These days I teach cameras to count, robots to look before they leap, and AI agents to read the documents before they get creative.
                </p>
                <p>
                Then I keep an eye on the models, because they never send a memo when they get worse. Usually I'm the one who spots it, with three dashboards open and my chai going cold.
                </p>
                <p>
                If you're building something that has to work outside the demo, let's talk. I'll bring the curiosity, you bring the problem, and the chai's on me.
                </p>
              </div>
            </div>
            <img
              src="/images/about-scene.jpg"
              alt="An engineer working at a messy desk, with a softboard of todos and a glass of chai."
              width="1024"
              height="576"
              decoding="async"
              className="mx-auto h-auto w-full max-w-[500px] rounded-[18px] object-contain"
            />
          </div>
          <div className="mt-10 grid items-stretch gap-4 md:grid-cols-2">
            {[
              {
                title: "Real-time computer vision",
                text: "I develop detection, tracking, counting, face recognition, liveness, and visual inspection. Live video is a very honest critic.",
              },
              {
                title: "Robotics and VLA",
                text: "I design humanoid and vision-language-action systems: multi-camera capture, manipulation, state and action recording, NVIDIA GR00T, ROS2, and teleoperation from a browser. I prefer the browser. The robot does not take it personally.",
              },
              {
                title: "Generative AI and agents",
                text: "I develop retrieval-augmented generation and agent workflows for search, orchestration, and automation. A good answer was already written down. My job is to find that one.",
              },
              {
                title: "ML and MLOps",
                text: "I build training, evaluation, tracking, versioning, deployment, monitoring, and retraining. Drift arrives as a small, confident mistake. I go looking for it.",
              },
            ].map((item, index) => (
              <FadeContent key={item.title} className="h-full" delay={index * 40} duration={600} blur>
                <div className="h-full rounded-[16px] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                  <h3 className="text-lg tracking-tight text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </FadeContent>
            ))}
          </div>
        </Container>
      </section>

      <section id="work" className="py-16 sm:py-20">
        <Container>
          <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <Label>Work</Label>
              <h2 className="mt-3">
                <GradientText
                  colors={["#7adbe0", "#f3f5f8", "#8ec5ff"]}
                  animationSpeed={6}
                  className="text-3xl tracking-tight sm:text-4xl"
                >
                  Selected systems
                </GradientText>
              </h2>
            </div>
            <ScrollReveal
              enableBlur
              baseOpacity={0.2}
              baseRotation={0}
              containerClassName="!my-0 hidden max-w-xs lg:block"
              textClassName="!text-sm !leading-relaxed !font-normal text-dim"
            >
              Vision, robotics, agents, and the pipelines that train and watch them.
            </ScrollReveal>
          </div>
          <ol>
            {projects.map((project, index) => (
              <li key={project.slug} className="border-b border-white/10">
                <FadeContent delay={index * 40} duration={600} blur>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group grid min-w-0 gap-2 py-7 lg:grid-cols-[2.75rem_minmax(7rem,10rem)_minmax(0,1fr)_auto] lg:items-start lg:gap-6"
                >
                  <DecryptedText
                    text={String(index + 1).padStart(2, "0")}
                    animateOn="view"
                    sequential
                    className="font-mono text-xs text-white/70"
                    encryptedClassName="font-mono text-xs text-white/30"
                    parentClassName="font-mono text-xs"
                  />
                  <span className="text-sm text-white/45">{project.category}</span>
                  <span className="min-w-0">
                    <span className="block text-xl tracking-tight text-white transition-colors group-hover:text-accent sm:text-2xl">
                      {project.name}
                    </span>
                    <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-muted">
                      {project.shortDescription}
                    </span>
                    <span className="mt-3 block text-xs break-words text-dim">{project.stack.join(" · ")}</span>
                  </span>
                  <ArrowUpRight
                    className="mt-1 size-4 text-white/30 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </Link>
                </FadeContent>
              </li>
            ))}
          </ol>
        </Container>
        <Container>
          <div className="mt-10 overflow-hidden">
            <ScrollVelocity
              texts={["Computer vision · Robotics · Agents · MLOps · "]}
              velocity={28}
              numCopies={6}
              className="py-3"
              scrollerClassName="!text-sm !font-medium !leading-normal tracking-[0.14em] text-white/45 uppercase"
            />
          </div>
        </Container>
      </section>

      <section id="practice" className="py-16 sm:py-20">
        <Container>
          <Label>Practice</Label>
          <ScrollFloat
            containerClassName="!my-0 mt-3"
            textClassName="!block !w-full !text-3xl !leading-tight !font-medium !whitespace-normal tracking-tight text-white sm:!text-4xl"
            scrollStart="top 90%"
            scrollEnd="center 60%"
          >
            How the work is built
          </ScrollFloat>
          <div className="mt-8">
            <LogoLoop
              logos={toolLogos}
              speed={42}
              gap={28}
              logoHeight={14}
              fadeOut
              fadeOutColor="#05060a"
              pauseOnHover
              ariaLabel="Tools used in the work"
            />
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group) => (
              <PixelCard
                key={group.id}
                variant="blue"
                gap={12}
                speed={18}
                colors="#071416,#12383c,#7adbe0"
                className="!aspect-auto !h-auto !w-full !rounded-[16px] !border-white/10"
              >
                <SpotlightCard
                  className="!h-full !w-full !rounded-[16px] !p-5"
                  spotlightColor="#7adbe0"
                  intensity={0.22}
                  spotlightSize={180}
                  softness={0.8}
                >
                  <h3 className="text-sm text-white">{group.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{group.items.join(", ")}</p>
                </SpotlightCard>
              </PixelCard>
            ))}
          </div>
        </Container>
      </section>

      <section id="record" className="py-16 sm:py-20">
        <Container>
          <FadeContent duration={700} blur>
          <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(14rem,0.72fr)] lg:gap-14">
            <BorderGlow
              className="min-w-0 p-5 sm:p-6"
              backgroundColor="#05060a"
              borderRadius={16}
              glowColor="174 62 68"
              colors={["#7adbe0", "#8ec5ff", "#f3f5f8"]}
              edgeSensitivity={18}
            >
              <Label>Experience</Label>
              <h2 className="mt-3 text-balance text-xl tracking-tight text-white sm:text-2xl">{role.role}</h2>
              <p className="mt-2 text-sm text-muted">
                {role.company} · {role.location} · {role.period}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{role.description}</p>
              <ul className="mt-6 space-y-5 text-sm leading-relaxed text-muted">
                {role.responsibilities.map((item, index) => (
                  <li key={item.title}>
                    <AnimatedContent distance={18} duration={0.55} delay={index * 0.04}>
                      <span className="text-white">{item.title}: </span>
                      {item.text}
                    </AnimatedContent>
                  </li>
                ))}
              </ul>
              {role.note ? <p className="mt-6 text-sm leading-relaxed text-muted">{role.note}</p> : null}
            </BorderGlow>
            <div className="min-w-0">
              <Label>Education</Label>
              <ul className="mt-3 divide-y divide-white/10">
                {education.map((item, index) => (
                  <li key={item.id} className="py-4">
                    <AnimatedContent distance={16} duration={0.5} delay={index * 0.06}>
                      <p className="text-sm text-white">{item.credential || item.institution}</p>
                      <p className="mt-1 text-sm text-dim">
                        {item.credential ? `${item.institution} · ` : ""}
                        {item.period}
                        {item.result ? (
                          <>
                            {" · "}
                            <ResultValue result={item.result} />
                          </>
                        ) : null}
                      </p>
                    </AnimatedContent>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </FadeContent>
        </Container>
      </section>

      <Contact />
    </ClickSpark>
  );
}
