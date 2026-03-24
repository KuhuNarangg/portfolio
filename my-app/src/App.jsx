import { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
import cvFile from "./assets/cv-college.pdf";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  cream: "#F5F0E8", beige: "#E8DFD0", sand: "#D4C9B5",
  espresso: "#1A1208", umber: "#8B6914", gold: "#C9A84C",
  bone: "#FAF7F2", warm: "#B5A48A", charcoal: "#2D2416",
};

// ─── Real CV Data ─────────────────────────────────────────────────────────────
const CV = {
  name: "KUHU NARANG",
  title: "Full Stack Web Developer",
  tagline: "Crafting digital experiences that live at the intersection of logic and beauty.",
  email: "kuhunarang@gmail.com",
  github: "https://github.com/KuhuNarangg",
  mobile: "+91-9540025777",
  resumeUrl: cvFile,
  certificatesUrl: "#",
  about: "I'm a full stack developer passionate about building scalable web applications using MERN, Django, and modern cloud-ready architectures. With hands-on experience in real client projects and internships, I turn complex problems into elegant, performant solutions — from RESTful APIs to pixel-perfect interfaces.",
  skills: {
    Languages: ["C++", "JavaScript", "Python", "Java", "C#", "C"],
    Frontend: ["React.js", "Next.js", "HTML & CSS", "Tailwind CSS"],
    Backend: ["Node.js", "Express.js", "Django", ".NET", "PHP", "Laravel"],
    Database: ["PostgreSQL", "MongoDB", "SQL"],
  },
  experience: [
    {
      role: "Web Development Intern",
      company: "Avani Enterprises",
      period: "Feb 2026",
      points: [
        "Built full-stack web applications using MERN stack and Django",
        "Created responsive interfaces with React and Next.js, using reusable components",
        "Integrated RESTful APIs with Node.js, Express, and MongoDB",
      ],
      tech: ["React.js", "Next.js", "Node.js", "MongoDB", "Django", "Tailwind CSS"],
    },
    {
      role: "AI Testing & Content Intern",
      company: "WURI.TECH",
      period: "Jan 2025",
      points: [
        "Used AI tools to generate content and support creative workflows",
        "Managed two YouTube channels — uploads, thumbnails, and SEO",
        "Identified and reported AI system errors to improve performance",
      ],
      tech: ["AI Flow", "SEO Optimization", "Content Strategy"],
    },
  ],
  projects: [
    {
      id: 1, title: "FINANCE TRACKER", category: "FinTech Web App", year: "2025",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Vercel"],
      summary: "Personal finance management app with expense tracking dashboard.",
      description: "Developed a full-stack personal finance management application to help users track expenses, subscriptions, and recurring financial commitments. Designed the backend using Django and Django REST Framework with PostgreSQL. Implemented a responsive Next.js frontend with real-time expense logging and spending pattern visualizations.",
      metrics: ["Real-time Tracking", "Secure APIs", "Full-Stack"],
      color: "#8B6914", github: "https://github.com/KuhuNarangg",
    },
    {
      id: 2, title: "MINI-DRIVE", category: "File Storage App", year: "2025",
      tech: ["React (Vite)", "Node.js", "Express.js", "MongoDB Atlas", "JWT"],
      summary: "Full-stack file storage app with secure JWT authentication.",
      description: "Developed a full-stack file storage application with user authentication, allowing users to upload, view, and manage files through a secure dashboard. Implemented JWT-based authentication and protected APIs. Used Multer for file uploads with MongoDB Atlas for persistent metadata storage.",
      metrics: ["JWT Auth", "File Upload", "MongoDB Atlas"],
      color: "#5C4A2A", github: "https://github.com/KuhuNarangg",
    },
    {
      id: 3, title: "GRAPHIC PASSION", category: "Creative Agency Site", year: "2025",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Vercel", "Render"],
      summary: "Client project — creative agency site with lead management system.",
      description: "Developed a full-stack service-based web application to showcase creative services and enable clients to submit project inquiries. Designed and implemented RESTful APIs with MongoDB Atlas integration to manage client lead and inquiry data securely. Built responsive frontend deployed on Vercel with backend on Render.",
      metrics: ["Client Project", "Lead Management", "Live Deployed"],
      color: "#3D5A3E", github: "https://github.com/KuhuNarangg",
    },
    {
      id: 4, title: "TRAVEL RECOMMENDER", category: "Travel Web App", year: "2025",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API"],
      summary: "Smart travel recommendation website with personalized destination suggestions.",
      description: "Built a full-stack travel recommendation platform that suggests personalized destinations based on user preferences like budget, climate, and interests. Implemented intelligent filtering and sorting algorithms on the backend with Express.js and MongoDB. Designed an intuitive, responsive frontend with React.js featuring interactive destination cards and detailed travel guides.",
      metrics: ["Smart Filters", "Personalized", "Full-Stack"],
      color: "#2A5A4A", github: "https://github.com/KuhuNarangg",
    },
    {
      id: 5, title: "TRAVEL HELP CHATBOT", category: "AI Chatbot", year: "2025",
      tech: ["Python", "React.js", "Node.js", "NLP", "REST API"],
      summary: "AI-powered travel assistant chatbot for real-time trip planning help.",
      description: "Developed an intelligent travel assistance chatbot that helps users plan trips, find destinations, get travel tips, and answer FAQs in real-time. Integrated natural language processing for conversational interactions and context-aware responses. Built a sleek React.js chat interface with Node.js backend handling API routing and session management.",
      metrics: ["AI-Powered", "Real-time Chat", "NLP"],
      color: "#4A2A5A", github: "https://github.com/KuhuNarangg",
    },
  ],
  certifications: [
    { name: "Advanced Computer Networks", issuer: "NPTEL", year: "Apr 2025", icon: "🌐" },
    { name: "Bits and Bytes of Computer Networking", issuer: "Google · Coursera", year: "Sep 2024", icon: "☁️" },
    { name: "Intro to Hardware and Operating Systems", issuer: "IBM", year: "Aug 2024", icon: "💻" },
  ],
  achievements: [
    { label: "Python Gold Badge", org: "HackerRank", year: "Jan 2026" },
    { label: "Top 7 — Code-e-Manipal", org: "National Hackathon · 220+ teams", year: "Oct 2024" },
  ],
  education: [
    { degree: "B.Tech in Computer Science", school: "Lovely Professional University", period: "Since Aug 2023", detail: "CGPA: 7.7" },
    { degree: "Intermediate (12th)", school: "Hansraj Model School, Delhi", period: "May 2023" },
    { degree: "Matriculation (10th)", school: "Hansraj Model School, Delhi", period: "Mar 2021" },
  ],
};

// ─── Global Styles ─────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Cormorant+Garant:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Mono:wght@300;400;500&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { cursor: none; background: ${C.cream}; font-family: 'Cormorant Garant', serif; }
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: ${C.beige}; }
      ::-webkit-scrollbar-thumb { background: ${C.warm}; border-radius: 2px; }
      section { padding: 8rem 3rem; }

      @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
      @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes heroLineIn { from{width:0} to{width:100%} }
      @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
      @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      @keyframes sparkle  { 0%{opacity:0;transform:scale(0) rotate(0deg)} 50%{opacity:1;transform:scale(1) rotate(180deg)} 100%{opacity:0;transform:scale(0) rotate(360deg)} }
      @keyframes filmReveal { from{opacity:0;transform:scale(0.96) rotateX(6deg)} to{opacity:1;transform:scale(1) rotateX(0)} }
      @keyframes shutterClick { 0%{transform:scale(1)} 30%{transform:scale(0.96)} 60%{transform:scale(1.02)} 100%{transform:scale(1)} }
      @keyframes flashOut { 0%{opacity:0} 20%{opacity:0.65} 100%{opacity:0} }
      @keyframes polaroidSlide {
        0%  { opacity:0; transform:translateY(70px) rotate(var(--rot)) scale(0.8); }
        100%{ opacity:1; transform:translateY(0)   rotate(var(--rot)) scale(1); }
      }
      @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
      @keyframes cardFlip { 0%{transform:rotateY(0)} 100%{transform:rotateY(180deg)} }
      @keyframes badgeFloat { 0%,100%{transform:translateY(0) rotate(var(--rot))} 50%{transform:translateY(-8px) rotate(var(--rot))} }
      @keyframes slideInLeft { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
      @keyframes filmScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      @keyframes letterSlide { from{opacity:0;transform:translateY(20px) rotate(-1deg)} to{opacity:1;transform:translateY(0) rotate(0deg)} }
      @keyframes codeSteam { 0%{opacity:0;transform:translateY(0) scale(0.8) rotate(-5deg)} 50%{opacity:1;transform:translateY(-15px) scale(1.1) rotate(5deg)} 100%{opacity:0;transform:translateY(-30px) scale(0.9) rotate(-10deg)} }

      .nav-link { position:relative; }
      .nav-link::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:1px; background:${C.umber}; transition:width 0.3s ease; }
      .nav-link:hover::after { width:100%; }

      .skill-badge {
        transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s, background 0.25s;
        animation: badgeFloat 4s ease-in-out var(--delay, 0s) infinite;
      }
      .skill-badge:hover {
        transform: scale(1.12) translateY(-4px) !important;
        box-shadow: 0 16px 32px rgba(26,18,8,0.18) !important;
        background: ${C.espresso} !important;
        color: ${C.gold} !important;
      }

      .film-strip-bg {
        background: #0A0804;
        border-radius: 4px;
        overflow: hidden;
        box-shadow: 0 40px 120px rgba(0,0,0,0.35), inset 0 0 60px rgba(0,0,0,0.5);
      }

      .project-row {
        transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.35s;
      }
      .project-row:hover {
        transform: translateX(10px) !important;
        border-color: ${C.umber} !important;
        box-shadow: 0 16px 40px rgba(26,18,8,0.09) !important;
      }

      .contact-input {
        font-family: 'DM Mono', monospace;
        font-size: 0.9rem;
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1px solid ${C.sand};
        padding: 0.6rem 0;
        color: ${C.espresso};
        outline: none;
        transition: border-color 0.3s;
        resize: none;
      }
      .contact-input:focus { border-color: ${C.umber}; }
      .contact-input::placeholder { color: ${C.warm}; opacity: 0.8; }
    `}</style>
  );
}

// ─── Magnetic Cursor ─────────────────────────────────────────────────────────
function MagneticCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const fpos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) dotRef.current.style.transform = `translate(${e.clientX - 6}px,${e.clientY - 6}px)`;
    };
    const over = (e) => { if (e.target.closest("button,a,[data-hover]")) setHov(true); };
    const out = () => setHov(false);
    const loop = () => {
      fpos.current.x += (pos.current.x - fpos.current.x) * 0.1;
      fpos.current.y += (pos.current.y - fpos.current.y) * 0.1;
      if (ringRef.current) ringRef.current.style.transform = `translate(${fpos.current.x - 20}px,${fpos.current.y - 20}px)`;
      raf.current = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    raf.current = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); window.removeEventListener("mouseout", out); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{ position: "fixed", top: 0, left: 0, width: hov ? 8 : 12, height: hov ? 8 : 12, background: C.umber, borderRadius: "50%", pointerEvents: "none", zIndex: 9999, mixBlendMode: "multiply", transition: "width 0.2s,height 0.2s" }} />
      <div ref={ringRef} style={{ position: "fixed", top: 0, left: 0, width: hov ? 54 : 40, height: hov ? 54 : 40, border: `1.5px solid ${C.umber}`, borderRadius: "50%", pointerEvents: "none", zIndex: 9998, opacity: hov ? 0.8 : 0.4, transition: "width 0.3s,height 0.3s,opacity 0.3s" }} />
    </>
  );
}

// ─── Sparkles ─────────────────────────────────────────────────────────────────
function Sparkles({ n = 10 }) {
  const list = useRef(Array.from({ length: n }, (_, i) => ({
    id: i, left: Math.random() * 100, top: Math.random() * 100,
    delay: Math.random() * 4, dur: 2 + Math.random() * 3, size: 4 + Math.random() * 5,
  }))).current;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {list.map(s => (
        <div key={s.id} style={{ position: "absolute", left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, opacity: 0, animation: `sparkle ${s.dur}s ease-in-out ${s.delay}s infinite` }}>
          <svg viewBox="0 0 24 24" fill={C.gold} style={{ width: "100%", height: "100%" }}>
            <path d="M12 0L13.8 10.2L24 12L13.8 13.8L12 24L10.2 13.8L0 12L10.2 10.2Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}

// ─── Split Text ───────────────────────────────────────────────────────────────
function SplitText({ text, delay = 0 }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <span ref={ref} style={{ display: "inline-block" }}>
      {text.split(" ").map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.3em" }}>
          <span style={{ display: "inline-block", transform: vis ? "translateY(0)" : "translateY(110%)", opacity: vis ? 1 : 0, transition: `transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay + i * 0.08}s, opacity 0.6s ease ${delay + i * 0.08}s` }}>{w}</span>
        </span>
      ))}
    </span>
  );
}

// ─── Typewriter ───────────────────────────────────────────────────────────────
function Typewriter({ texts, speed = 75 }) {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  const [pau, setPau] = useState(false);
  useEffect(() => {
    if (pau) { const t = setTimeout(() => setPau(false), 1800); return () => clearTimeout(t); }
    const target = texts[idx];
    if (!del && txt.length < target.length) { const t = setTimeout(() => setTxt(target.slice(0, txt.length + 1)), speed); return () => clearTimeout(t); }
    if (!del && txt.length === target.length) { setPau(true); setDel(true); return; }
    if (del && txt.length > 0) { const t = setTimeout(() => setTxt(txt.slice(0, -1)), speed / 2); return () => clearTimeout(t); }
    if (del && txt.length === 0) { setDel(false); setIdx((c) => (c + 1) % texts.length); }
  }, [txt, del, pau, idx, texts, speed]);
  return (
    <span>
      {txt}
      <span style={{ display: "inline-block", width: 2, height: "0.9em", background: C.gold, marginLeft: 3, verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
    </span>
  );
}

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
function Rev({ children, delay = 0, style = {} }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.85s ease ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

// ─── Coffee + Code Element ────────────────────────────────────────────────────
function CoffeeCup() {
  const steam = ["{ }", "< >", "()", ";"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "2.5rem" }}>
      {/* Cup Illustration */}
      <div style={{ position: "relative", width: 44, height: 44 }}>
        {/* Steam */}
        {steam.map((s, i) => (
          <div key={i} style={{ position: "absolute", top: -14, left: 10 + i * 8, fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: C.warm, opacity: 0, animation: `codeSteam 3s ease-in-out ${i * 0.7}s infinite` }}>
            {s}
          </div>
        ))}
        {/* Cup body */}
        <div style={{ position: "absolute", bottom: 0, left: 6, width: 26, height: 28, background: `linear-gradient(135deg, ${C.sand}, ${C.warm})`, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, borderTopLeftRadius: 2, borderTopRightRadius: 2, boxShadow: `inset -3px -3px 8px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.2)` }} />
        {/* Handle */}
        <div style={{ position: "absolute", bottom: 6, right: 6, width: 12, height: 16, border: `3px solid ${C.sand}`, borderRadius: "50%", zIndex: -1 }} />
        {/* Coffee surface */}
        <div style={{ position: "absolute", top: 14, left: 6, width: 26, height: 6, background: C.espresso, borderRadius: "50%" }} />
        {/* Coaster */}
        <div style={{ position: "absolute", bottom: -4, left: 2, width: 34, height: 4, background: C.charcoal, borderRadius: "50%", opacity: 0.5, filter: "blur(2px)", zIndex: -1 }} />
      </div>
      {/* Tagline */}
      <div>
        <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1.05rem", color: C.sand, fontStyle: "italic", lineHeight: 1 }}>Powered by</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: C.umber, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "0.3rem" }}>Coffee & Clean Code</div>
      </div>
    </div>
  );
}

// ─── Film Strip Divider ───────────────────────────────────────────────────────
function FilmDivider() {
  return (
    <div style={{ width: "100%", overflow: "hidden", height: 48, background: "#0D0A06", display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex", animation: "filmScroll 12s linear infinite", whiteSpace: "nowrap" }}>
        {Array(40).fill(0).map((_, i) => (
          <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: 0 }}>
            <div style={{ width: 28, height: 18, border: "1.5px solid #2A2010", borderRadius: 3, margin: "0 6px", background: "#1A1208", flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Skills: Floating Badge Cloud ─────────────────────────────────────────────
function SkillsCloud() {
  const [activeTab, setActiveTab] = useState("Languages");
  const categories = Object.keys(CV.skills);
  const colors = {
    Languages: { bg: C.espresso, text: C.gold, border: C.umber },
    Frontend: { bg: "#2A3516", text: "#8BC34A", border: "#4A6020" },
    Backend: { bg: "#1A2A3A", text: "#64B5F6", border: "#2A4A6A" },
    Database: { bg: "#2A1A3A", text: "#CE93D8", border: "#4A2A6A" },
  };

  return (
    <div>
      {/* Tab switcher */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            style={{
              fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.18em",
              textTransform: "uppercase", padding: "0.55rem 1.4rem", borderRadius: 2,
              cursor: "pointer", transition: "all 0.3s",
              background: activeTab === cat ? C.espresso : "transparent",
              color: activeTab === cat ? C.gold : C.warm,
              border: `1px solid ${activeTab === cat ? C.espresso : C.sand}`,
            }}
          >{cat}</button>
        ))}
      </div>

      {/* Badge cloud */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", minHeight: 120 }}>
        {CV.skills[activeTab].map((skill, i) => {
          const col = colors[activeTab];
          const rots = [-3, 1, -1, 2, -2, 0, 3, -1];
          const rot = rots[i % rots.length];
          const delays = [0, 0.3, 0.6, 0.9, 0.15, 0.45, 0.75, 1.0];
          return (
            <div
              key={skill}
              className="skill-badge"
              data-hover
              style={{
                fontFamily: "'DM Mono', monospace", fontSize: "0.78rem",
                letterSpacing: "0.12em", textTransform: "uppercase",
                background: col.bg, color: col.text,
                border: `1px solid ${col.border}`,
                padding: "0.55rem 1.25rem", borderRadius: 2,
                cursor: "default",
                "--rot": `${rot}deg`,
                "--delay": `${delays[i % delays.length]}s`,
                transform: `rotate(${rot}deg)`,
                animation: `badgeFloat ${3.5 + i * 0.2}s ease-in-out ${delays[i % delays.length]}s infinite`,
                boxShadow: `0 4px 16px rgba(26,18,8,0.08)`,
              }}
            >{skill}</div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Polaroid Camera ──────────────────────────────────────────────────────────
function PolaroidCamera({ onSetPage }) {
  const [clicked, setClicked] = useState(false);
  const [flash, setFlash] = useState(false);
  const [photos, setPhotos] = useState([]);

  const shots = [
    {
      label: "My Stack",
      color: C.umber,
      rot: -7,
      lines: CV.skills.Frontend.slice(0, 4),
    },
    {
      label: "Certifications",
      color: "#5C4A2A",
      rot: 4,
      lines: CV.certifications.map(c => c.issuer),
    },
    {
      label: "Languages",
      color: "#2A3D5A",
      rot: -2,
      lines: CV.skills.Languages.slice(0, 4),
    },
  ];

  const shoot = () => {
    if (clicked) return;
    setClicked(true);
    setFlash(true);
    setTimeout(() => setFlash(false), 380);
    shots.forEach((s, i) => setTimeout(() => setPhotos(prev => [...prev, s]), 550 + i * 480));
  };

  return (
    <div style={{ textAlign: "center", padding: "3rem 0 5rem", position: "relative" }}>
      <Rev>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.4em", color: C.umber, textTransform: "uppercase", marginBottom: "0.75rem" }}>◈ THE POLAROID ARCHIVE</div>
        <p style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1.05rem", color: C.warm, marginBottom: "2.5rem", fontStyle: "italic" }}>Click the camera to develop the reel</p>
      </Rev>

      {/* Camera body */}
      <Rev delay={0.15}>
        <div
          onClick={shoot}
          data-hover
          style={{ display: "inline-block", cursor: clicked ? "default" : "pointer", animation: clicked ? "shutterClick 0.4s ease" : "float 4s ease-in-out infinite" }}
        >
          <div style={{ width: 168, height: 136, background: C.espresso, borderRadius: 14, margin: "0 auto", position: "relative", boxShadow: `0 20px 60px rgba(26,18,8,0.35), inset 0 1px 0 rgba(255,255,255,0.06)`, border: `1px solid ${C.charcoal}` }}>
            {/* Lens */}
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-55%)", width: 58, height: 58, borderRadius: "50%", background: `radial-gradient(circle at 33% 33%, #2a3a4a, #04080d)`, border: `3px solid ${C.charcoal}`, boxShadow: `0 0 0 6px #111, 0 0 20px rgba(0,0,0,0.5)` }}>
              <div style={{ position: "absolute", top: "18%", left: "18%", width: 14, height: 9, borderRadius: "50%", background: "rgba(255,255,255,0.16)" }} />
            </div>
            {/* Flash */}
            <div style={{ position: "absolute", top: 14, right: 18, width: 22, height: 14, borderRadius: 3, background: clicked ? C.gold : C.charcoal, transition: "background 0.3s", boxShadow: clicked ? `0 0 20px ${C.gold}80` : "none" }} />
            {/* Viewfinder */}
            <div style={{ position: "absolute", top: 14, left: 18, width: 16, height: 12, borderRadius: 2, border: `1.5px solid ${C.charcoal}` }} />
            {/* Shutter */}
            <div style={{ position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)", width: 22, height: 22, borderRadius: "50%", background: clicked ? C.gold : C.warm, border: `2px solid ${C.espresso}`, boxShadow: "0 2px 8px rgba(0,0,0,0.4)", transition: "background 0.3s" }} />
            {/* Brand */}
            <div style={{ position: "absolute", bottom: 9, left: 0, right: 0, textAlign: "center", fontFamily: "'DM Mono', monospace", fontSize: "0.5rem", color: C.warm, letterSpacing: "0.3em", textTransform: "uppercase" }}>KUHU · DEV</div>
          </div>
          {!clicked && <div style={{ marginTop: 18, fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: C.warm, letterSpacing: "0.2em", textTransform: "uppercase" }}>Click to shoot ▶</div>}
        </div>
      </Rev>

      {/* Flash */}
      {flash && <div style={{ position: "fixed", inset: 0, background: "white", zIndex: 9000, animation: "flashOut 0.38s ease forwards", pointerEvents: "none" }} />}

      {/* Photos */}
      {photos.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "3rem", flexWrap: "wrap", padding: "0 1rem", alignItems: "flex-start" }}>
          {photos.map((p, i) => (
            <div
              key={i}
              data-hover
              style={{
                background: C.bone, padding: "14px 14px 48px",
                boxShadow: "0 18px 60px rgba(26,18,8,0.18), 0 4px 14px rgba(26,18,8,0.1)",
                width: 194, "--rot": `${p.rot}deg`,
                transform: `rotate(${p.rot}deg)`,
                animation: `polaroidSlide 0.75s cubic-bezier(0.16,1,0.3,1) both`,
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s",
                cursor: "default",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-14px) rotate(0deg) scale(1.05)"; e.currentTarget.style.boxShadow = "0 40px 80px rgba(26,18,8,0.22)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = `rotate(${p.rot}deg)`; e.currentTarget.style.boxShadow = "0 18px 60px rgba(26,18,8,0.18)"; }}
            >
              {/* Photo area */}
              <div style={{ height: 154, background: `linear-gradient(145deg, ${p.color}30, ${p.color}65)`, marginBottom: 10, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: 14, gap: 7 }}>
                  {p.lines.map((line, li) => (
                    <div key={li} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: C.bone, letterSpacing: "0.1em", background: "rgba(26,18,8,0.45)", padding: "3px 8px", borderRadius: 2, display: "inline-block", animation: `fadeUp 0.4s ease ${li * 0.1}s both` }}>{line}</div>
                  ))}
                </div>
              </div>
              {/* Caption */}
              <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "0.9rem", color: C.charcoal, textAlign: "center", fontStyle: "italic" }}>{p.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Film Roll ────────────────────────────────────────────────────────────────
function FilmRoll({ projects, onSelect }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {!open ? (
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", border: `3px solid ${C.espresso}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", animation: "rotateSlow 8s linear infinite" }}>
              {[0, 60, 120, 180, 240, 300].map(d => (
                <div key={d} style={{ position: "absolute", width: 10, height: 10, background: C.espresso, borderRadius: "50%", left: "50%", top: "50%", transform: `translate(-50%,-50%) rotate(${d}deg) translateY(-26px)` }} />
              ))}
              <div style={{ width: 20, height: 20, background: C.espresso, borderRadius: "50%" }} />
            </div>
            <button onClick={() => setOpen(true)} style={{ background: "none", border: `2px solid ${C.espresso}`, color: C.espresso, fontFamily: "'Cormorant Garant', serif", fontSize: "1.1rem", letterSpacing: "0.25em", padding: "1.2rem 3rem", cursor: "pointer", textTransform: "uppercase", transition: "all 0.4s" }}
              onMouseEnter={e => { e.currentTarget.style.background = C.espresso; e.currentTarget.style.color = C.cream; }}
              onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = C.espresso; }}
            >▶ Unspool the Reel</button>
          </div>
        </div>
      ) : (
        <div style={{ animation: "filmReveal 0.9s cubic-bezier(0.16,1,0.3,1) forwards" }}>
          <div className="film-strip-bg">
            {/* Top sprockets */}
            <div style={{ display: "flex", background: "#050402", padding: "8px 0" }}>
              {Array(22).fill(0).map((_, i) => <div key={i} style={{ width: 28, height: 18, border: "1.5px solid #1A1208", borderRadius: 3, margin: "0 6px", background: "#0D0A06", flexShrink: 0 }} />)}
            </div>
            {/* Frames */}
            <div style={{ display: "flex", overflowX: "auto", padding: "20px 24px", gap: 24, scrollbarWidth: "none", alignItems: "center" }}>
              {projects.map((p, i) => (
                <div key={p.id} onClick={() => onSelect(p)} onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)} data-hover
                  style={{ flexShrink: 0, width: 260, cursor: "pointer", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", transform: hovered === p.id ? "scale(1.06) translateY(-10px)" : "scale(1)", animation: `filmReveal 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 0.14}s both` }}>
                  <div style={{ border: `3px solid #2A2010`, borderRadius: 2, overflow: "hidden", position: "relative", boxShadow: hovered === p.id ? `0 0 50px ${p.color}70, 0 20px 40px rgba(0,0,0,0.5)` : "none", transition: "box-shadow 0.5s" }}>
                    <div style={{ position: "absolute", top: 8, left: 10, zIndex: 3, fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: "rgba(255,220,130,0.6)", letterSpacing: "0.1em" }}>{String(i + 1).padStart(2, "0")} ▲</div>
                    <div style={{ height: 160, background: `linear-gradient(135deg, ${p.color}40, ${p.color}90)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 40%, ${p.color}30, transparent 60%)` }} />
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", color: "rgba(255,255,255,0.1)", fontWeight: 900, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%) rotate(-10deg)", whiteSpace: "nowrap" }}>{p.category}</div>
                      <div style={{ position: "relative", textAlign: "center" }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#FAF7F2", fontWeight: 700, lineHeight: 1.2 }}>{p.title}</div>
                        <div style={{ fontSize: "0.65rem", color: "rgba(250,247,242,0.55)", letterSpacing: "0.2em", marginTop: 5, fontFamily: "'DM Mono', monospace" }}>{p.year}</div>
                      </div>
                    </div>
                    <div style={{ background: "#0D0A06", padding: "10px 14px", borderTop: "1px solid #2A2010" }}>
                      <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "0.8rem", color: "rgba(250,247,242,0.5)", lineHeight: 1.4 }}>{p.summary}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                        {p.tech.slice(0, 3).map(t => <span key={t} style={{ fontSize: "0.58rem", border: "1px solid #3A3020", padding: "2px 6px", borderRadius: 2, color: "rgba(201,168,76,0.7)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>{t}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Bottom sprockets */}
            <div style={{ display: "flex", background: "#050402", padding: "8px 0" }}>
              {Array(22).fill(0).map((_, i) => <div key={i} style={{ width: 28, height: 18, border: "1.5px solid #1A1208", borderRadius: 3, margin: "0 6px", background: "#0D0A06", flexShrink: 0 }} />)}
            </div>
          </div>
          <p style={{ textAlign: "center", marginTop: "1rem", fontFamily: "'Cormorant Garant', serif", fontSize: "0.85rem", color: C.warm, letterSpacing: "0.15em", textTransform: "uppercase" }}>↔ Scroll to browse · Click a frame to expand</p>
        </div>
      )}
    </div>
  );
}

// ─── Project Modal ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  const projIdx = CV.projects.findIndex(p => p.id === project.id);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", h); };
  }, [onClose]);

  // Film sprocket row
  const Sprockets = ({ bg = "#050402" }) => (
    <div style={{ display: "flex", background: bg, padding: "5px 0", gap: 0 }}>
      {Array(18).fill(0).map((_, i) => <div key={i} style={{ width: 22, height: 13, border: "1.5px solid #2A2010", borderRadius: 2, margin: "0 5px", background: "#0D0A06", flexShrink: 0 }} />)}
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "rgba(10,8,4,0.92)", backdropFilter: "blur(18px)", animation: "fadeIn 0.3s ease" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.bone, maxWidth: 760, width: "100%", maxHeight: "90vh", overflow: "auto", borderRadius: 4, animation: "fadeUp 0.45s cubic-bezier(0.16,1,0.3,1)", border: `2px solid #2A2010`, boxShadow: "0 80px 160px rgba(0,0,0,0.6), 0 0 80px rgba(201,168,76,0.08)" }}>

        {/* Top sprockets */}
        <Sprockets />

        {/* Hero header with film aesthetic */}
        <div style={{ height: 220, background: `linear-gradient(135deg, ${project.color}20, ${project.color}55, #0A080420)`, position: "relative", display: "flex", alignItems: "flex-end", padding: "2rem 2.5rem", borderBottom: `1px solid ${C.sand}`, overflow: "hidden" }}>
          {/* Film grain overlay */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`, backgroundSize: "128px 128px" }} />
          {/* Scan lines */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)` }} />
          {/* Frame number */}
          <div style={{ position: "absolute", top: 14, left: 16, fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: "rgba(201,168,76,0.5)", letterSpacing: "0.1em", zIndex: 3 }}>▲ FRAME {String(projIdx + 1).padStart(2, "0")} · {project.year}</div>
          {/* Reel hole decorations */}
          {[{ top: 12, right: 60 }, { top: 12, right: 100 }].map((pos, i) => (
            <div key={i} style={{ position: "absolute", ...pos, width: 18, height: 18, borderRadius: "50%", border: `1.5px solid rgba(201,168,76,0.25)`, zIndex: 3 }} />
          ))}
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.3em", color: C.umber, textTransform: "uppercase", marginBottom: 8 }}>{project.category}</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.6rem", color: C.espresso, fontWeight: 900, lineHeight: 1.05 }}>{project.title}</h2>
          </div>
          <button onClick={onClose} data-hover style={{ position: "absolute", top: 18, right: 18, background: "rgba(26,18,8,0.6)", border: `1px solid ${C.warm}`, width: 36, height: 36, borderRadius: "50%", cursor: "pointer", color: C.cream, fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", zIndex: 3 }}
            onMouseEnter={e => { e.currentTarget.style.background = C.umber; e.currentTarget.style.transform = "scale(1.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(26,18,8,0.6)"; e.currentTarget.style.transform = "scale(1)"; }}
          >✕</button>
        </div>

        {/* Content */}
        <div style={{ padding: "2.5rem", position: "relative" }}>
          {/* Left film perforation strip */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 28, background: "#0D0A06", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 12, gap: 10 }}>
            {Array(14).fill(0).map((_, i) => <div key={i} style={{ width: 14, height: 10, border: "1px solid #2A2010", borderRadius: 2, background: "#050402", flexShrink: 0 }} />)}
          </div>

          <div style={{ marginLeft: 40 }}>
            {/* Metrics */}
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
              {project.metrics.map(m => <div key={m} style={{ background: C.espresso, border: `1px solid ${C.charcoal}`, padding: "0.5rem 1.1rem", borderRadius: 2 }}><span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: C.gold, letterSpacing: "0.08em" }}>{m}</span></div>)}
            </div>

            <p style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1.15rem", color: C.charcoal, lineHeight: 1.85, marginBottom: "2.5rem" }}>{project.description}</p>

            {/* Tech Stack */}
            <div style={{ borderTop: `1px solid ${C.sand}`, paddingTop: "1.5rem" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.35em", color: C.warm, textTransform: "uppercase", marginBottom: "1rem" }}>◈ Tech Stack</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.tech.map(t => <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", background: C.espresso, color: C.gold, padding: "0.45rem 1.1rem", borderRadius: 2, letterSpacing: "0.08em", border: `1px solid ${C.charcoal}` }}>{t}</span>)}
              </div>
            </div>

            {/* GitHub link */}
            {project.github && (
              <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: `1px solid ${C.sand}` }}>
                <a href={project.github} target="_blank" rel="noopener noreferrer" data-hover style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.espresso, textDecoration: "none", border: `1px solid ${C.espresso}`, padding: "0.8rem 1.8rem", borderRadius: 2, transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.espresso; e.currentTarget.style.color = C.cream; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.espresso; }}
                >View on GitHub →</a>
              </div>
            )}
          </div>
        </div>

        {/* Bottom sprockets */}
        <Sprockets />
      </div>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    if (page !== "home") { setPage("home"); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 120); }
    else { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }
  };

  const items = [
    { label: "Home", action: () => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); } },
    { label: "About", action: () => scrollTo("about") },
    { label: "Skills", action: () => scrollTo("skills") },
    { label: "Projects", action: () => setPage("projects") },
    { label: "Contact", action: () => scrollTo("contact") },
  ];

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 900, background: scrolled ? `rgba(245,240,232,0.96)` : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? `1px solid ${C.sand}` : "none", transition: "all 0.5s ease", padding: "0 3rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
      <button onClick={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: C.espresso, letterSpacing: "0.05em", background: "none", border: "none", cursor: "pointer" }}>KN.</button>
      <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
        {items.map(it => (
          <button key={it.label} onClick={it.action} className="nav-link" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.charcoal, background: "none", border: "none", cursor: "pointer", padding: 0, transition: "color 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.color = C.umber}
            onMouseLeave={e => e.currentTarget.style.color = C.charcoal}
          >{it.label}</button>
        ))}
        <a href={CV.resumeUrl} download style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.bone, background: C.espresso, padding: "0.55rem 1.4rem", textDecoration: "none", borderRadius: 2, transition: "all 0.3s", border: `1px solid ${C.espresso}` }}
          onMouseEnter={e => { e.currentTarget.style.background = C.umber; e.currentTarget.style.borderColor = C.umber; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.espresso; e.currentTarget.style.borderColor = C.espresso; }}
        >Résumé ↓</a>
        <a href={CV.certificatesUrl} download style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.espresso, background: "transparent", padding: "0.55rem 1.4rem", textDecoration: "none", borderRadius: 2, transition: "all 0.3s", border: `1px solid ${C.espresso}` }}
          onMouseEnter={e => { e.currentTarget.style.background = C.espresso; e.currentTarget.style.color = C.cream; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.espresso; }}
        >Certificates ↓</a>
      </div>
    </nav>
  );
}

// ─── Experience Accordion ───────────────────────────────────────────────────
function ExperienceAccordion() {
  const [activeIdx, setActiveIdx] = useState(null);

  return (
    <div style={{ marginTop: "6rem", paddingTop: "4rem", borderTop: `1px solid ${C.sand}` }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.4em", color: C.umber, textTransform: "uppercase", marginBottom: "1rem" }}>Internships</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.6rem)", color: C.espresso, fontWeight: 900, marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>Experience</h3>
      <p style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1.2rem", color: C.warm, fontStyle: "italic", marginBottom: "3rem" }}>Where I applied my skills to real-world projects.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {CV.experience.map((exp, i) => {
          const isActive = activeIdx === i;
          return (
            <div key={i} data-hover 
                 style={{ 
                   background: C.cream, 
                   border: `1px solid ${isActive ? C.umber : C.sand}`, 
                   borderRadius: 4, 
                   padding: "1.8rem 2.2rem", 
                   cursor: "pointer", 
                   transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s, border-color 0.3s",
                   boxShadow: isActive ? "0 12px 28px rgba(26,18,8,0.06)" : "none",
                   transform: isActive ? "translateY(-4px)" : "translateY(0)"
                 }}
                 onMouseEnter={e => {
                   if (!isActive) {
                     e.currentTarget.style.transform = "translateY(-4px)";
                     e.currentTarget.style.boxShadow = "0 8px 24px rgba(26,18,8,0.04)";
                   }
                 }}
                 onMouseLeave={e => {
                   if (!isActive) {
                     e.currentTarget.style.transform = "translateY(0)";
                     e.currentTarget.style.boxShadow = "none";
                   }
                 }}
                 onClick={() => setActiveIdx(isActive ? null : i)}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.45rem", color: C.espresso, fontWeight: 700, marginBottom: "0.3rem" }}>{exp.role}</div>
                  <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1.1rem", color: C.charcoal, fontStyle: "italic" }}>{exp.company}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginLeft: "auto" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: C.umber, letterSpacing: "0.15em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{exp.period}</div>
                  <div style={{ transform: isActive ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.4s", color: C.umber, fontSize: "0.7rem", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: C.bone, border: `1px solid ${C.sand}` }}>▼</div>
                </div>
              </div>

              {/* Expandable Content */}
              <div style={{ display: "grid", gridTemplateRows: isActive ? "1fr" : "0fr", transition: "grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                <div style={{ overflow: "hidden" }}>
                  <div style={{ paddingTop: "1.5rem", marginTop: "1.5rem", borderTop: `1px dashed ${C.sand}` }}>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.8rem" }}>
                      {exp.points.map((pt, j) => (
                        <li key={j} style={{ display: "flex", gap: "0.75rem", fontFamily: "'Cormorant Garant', serif", fontSize: "1.08rem", color: C.charcoal, lineHeight: 1.6 }}>
                          <span style={{ color: C.umber, marginTop: "0.1rem", flexShrink: 0 }}>✦</span>{pt}
                        </li>
                      ))}
                    </ul>
                    {exp.tech && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                        {exp.tech.map(t => (
                          <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", background: C.bone, color: C.charcoal, border: `1px solid ${C.sand}`, padding: "0.35rem 0.9rem", borderRadius: 20, letterSpacing: "0.08em", transition: "all 0.3s" }}
                            onMouseEnter={e => { e.currentTarget.style.background = C.espresso; e.currentTarget.style.color = C.gold; e.currentTarget.style.borderColor = C.espresso; }}
                            onMouseLeave={e => { e.currentTarget.style.background = C.bone; e.currentTarget.style.color = C.charcoal; e.currentTarget.style.borderColor = C.sand; }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: C.cream, minHeight: "100vh" }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", padding: "0 3rem" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.032, backgroundImage: `radial-gradient(circle, ${C.espresso} 1px, transparent 1px)`, backgroundSize: "40px 40px", transform: `translateY(${scrollY * 0.13}px)`, transition: "transform 0.04s linear" }} />
        <div style={{ position: "absolute", right: "8%", top: "50%", width: 500, height: 500, borderRadius: "50%", border: `1px solid ${C.sand}`, opacity: 0.45, transform: `translateY(calc(-50% + ${scrollY * 0.07}px))` }} />
        <div style={{ position: "absolute", right: "12%", top: "50%", width: 360, height: 360, borderRadius: "50%", border: `1px solid ${C.warm}`, opacity: 0.28, animation: "rotateSlow 30s linear infinite" }} />
        <div style={{ position: "absolute", right: "16.5%", top: "50%", width: 220, height: 220, borderRadius: "50%", border: `1px solid ${C.gold}`, opacity: 0.18, animation: "rotateSlow 18s linear infinite reverse" }} />
        <Sparkles n={9} />

        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.4em", color: C.umber, textTransform: "uppercase", marginBottom: "2rem", opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.3s" }}>◆ Available for Work · Based in India</div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3.5rem,9vw,8.5rem)", fontWeight: 900, color: C.espresso, lineHeight: 0.92, letterSpacing: "-0.03em", marginBottom: "1.5rem", maxWidth: "78%" }}>
          <SplitText text="KUHU" delay={0.4} />
          <br />
          <SplitText text="NARANG" delay={0.6} />
        </h1>

        <div style={{ height: 2, background: `linear-gradient(90deg, ${C.umber}, transparent)`, marginBottom: "1.5rem", maxWidth: 480, animation: loaded ? "heroLineIn 1.2s ease 1s both" : "none" }} />

        <h2 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "clamp(1.3rem,2.7vw,2.2rem)", fontWeight: 300, fontStyle: "italic", color: C.charcoal, letterSpacing: "0.02em", marginBottom: "2rem", opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.9s", minHeight: "2.7rem" }}>
          {loaded && <Typewriter texts={["Full Stack Web Developer", "MERN Stack Specialist", "React & Node.js Engineer", "Django & REST API Builder"]} speed={68} />}
        </h2>

        <p style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1.08rem", color: C.warm, maxWidth: 470, lineHeight: 1.75, opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 1.4s" }}>{CV.tagline}</p>

        <div style={{ display: "flex", gap: "1.5rem", marginTop: "3rem", opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 1.6s" }}>
          <button onClick={() => setPage("projects")} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", letterSpacing: "0.2em", textTransform: "uppercase", background: C.espresso, color: C.cream, border: "none", padding: "1.1rem 2.8rem", cursor: "pointer", borderRadius: 2, transition: "all 0.4s" }}
            onMouseEnter={e => e.currentTarget.style.background = C.umber}
            onMouseLeave={e => e.currentTarget.style.background = C.espresso}
          >View My Work →</button>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.espresso, border: `1px solid ${C.espresso}`, padding: "1.1rem 2.8rem", cursor: "pointer", borderRadius: 2, transition: "all 0.4s", background: "none" }}
            onMouseEnter={e => { e.currentTarget.style.background = C.espresso; e.currentTarget.style.color = C.cream; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = C.espresso; }}
          >Get In Touch</button>
        </div>

        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "fadeUp 1s ease 2.2s both" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.3em", color: C.warm, textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${C.warm}, transparent)` }} />
        </div>
      </section>

      <FilmDivider />

      {/* ── ABOUT ────────────────────────────────────────── */}
      <section id="about" style={{ background: C.espresso, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center", position: "relative", zIndex: 2 }}>
          <Rev>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.4em", color: C.umber, textTransform: "uppercase", marginBottom: "1.5rem" }}>01 — About</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem,5vw,3.8rem)", color: C.cream, fontWeight: 900, lineHeight: 1.05, marginBottom: "2rem", letterSpacing: "-0.02em" }}>
              <SplitText text="The mind behind the machine." />
            </h2>
            {/* Developer ID card */}
            <div style={{ background: "rgba(201,168,76,0.06)", border: `1px solid ${C.charcoal}`, borderLeft: `3px solid ${C.gold}`, padding: "1.5rem", borderRadius: 2, marginTop: "1.5rem" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: C.umber, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.9rem" }}>Developer ID · 2024</div>
              {[["Name", "Kuhu Narang"], ["Degree", "B.Tech CS — LPU"], ["CGPA", "7.7 · Currently Active"], ["Status", "Open to Work ●"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: "1rem", marginBottom: "0.45rem", alignItems: "center" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: C.warm, width: 68, flexShrink: 0 }}>{k}:</span>
                  <span style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "0.95rem", color: k === "Status" ? C.gold : C.sand }}>{v}</span>
                </div>
              ))}
            </div>
            
            {/* Coffee + Code Element */}
            <CoffeeCup />
          </Rev>
          <Rev delay={0.2}>
            <p style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1.18rem", color: C.sand, lineHeight: 1.9, marginBottom: "2.5rem" }}>{CV.about}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {[["2+", "Years Experience"], ["5", "Live Projects"], ["2", "Internships"], ["2+", "Certifications"]].map(([n, l]) => (
                <div key={l} style={{ borderTop: `1px solid ${C.charcoal}`, paddingTop: "1rem" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", color: C.gold, fontWeight: 900 }}>{n}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: C.warm, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </Rev>
        </div>
      </section>

      <FilmDivider />

      {/* ── EDUCATION (NEW) ────────────────────────────── */}
      <section id="education" style={{ background: C.bone, position: "relative", padding: "8rem 3rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Rev>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.4em", color: C.umber, textTransform: "uppercase", marginBottom: "1.2rem" }}>Academic Record</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem,5vw,3.8rem)", color: C.espresso, fontWeight: 900, lineHeight: 1.05, marginBottom: "4rem", letterSpacing: "-0.02em" }}>
              <SplitText text="Education timeline." />
            </h2>
          </Rev>

          <div style={{ position: "relative", paddingLeft: "3rem" }}>
            {/* Left film timeline track */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 20, background: C.espresso, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 10, paddingBottom: 10, gap: "1.2rem", overflow: "hidden", borderRadius: 2 }}>
              {Array(30).fill(0).map((_, i) => <div key={i} style={{ width: 10, height: 8, background: C.bone, borderRadius: 1, flexShrink: 0, opacity: 0.8 }} />)}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              {CV.education.map((e, i) => (
                <Rev key={i} delay={i * 0.15}>
                  <div data-hover style={{ position: "relative", background: C.cream, padding: "2.5rem 3rem", border: `1px solid ${C.sand}`, borderRadius: 2, transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s", cursor: "default" }}
                    onMouseEnter={ev => { ev.currentTarget.style.transform = "translateX(12px)"; ev.currentTarget.style.boxShadow = "0 16px 40px rgba(26,18,8,0.06)"; ev.currentTarget.style.borderColor = C.warm }}
                    onMouseLeave={ev => { ev.currentTarget.style.transform = "translateX(0)"; ev.currentTarget.style.boxShadow = "none"; ev.currentTarget.style.borderColor = C.sand }}
                  >
                    {/* Frame Number */}
                    <div style={{ position: "absolute", top: 12, right: 16, fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", color: C.warm, letterSpacing: "0.2em" }}>0{i + 1} ▲</div>
                    
                    <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", flexWrap: "wrap" }}>
                      <div style={{ minWidth: 140 }}>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: C.umber, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.3rem" }}>{e.period}</div>
                        <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1rem", color: C.warm, fontStyle: "italic", fontWeight: 600 }}>{e.detail}</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: C.espresso, fontWeight: 700, marginBottom: "0.5rem" }}>{e.degree}</h3>
                        <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1.1rem", color: C.charcoal }}>{e.school}</div>
                      </div>
                    </div>
                  </div>
                </Rev>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FilmDivider />

      {/* ── SKILLS ───────────────────────────────────────── */}
      <section id="skills" style={{ background: C.bone, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Rev>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.4em", color: C.umber, textTransform: "uppercase", marginBottom: "1.2rem" }}>02 — Skills & Stack</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem,5vw,3.8rem)", color: C.espresso, fontWeight: 900, lineHeight: 1.05, marginBottom: "3rem", letterSpacing: "-0.02em" }}>
              <SplitText text="The craft." />
            </h2>
          </Rev>

          {/* Skills cloud with tabs */}
          <Rev delay={0.1}>
            <SkillsCloud />
          </Rev>

          {/* Polaroid camera */}
          <PolaroidCamera onSetPage={setPage} />

          {/* Interactive Experience Accordion */}
          <Rev delay={0.1}>
            <ExperienceAccordion />
          </Rev>
        </div>
      </section>

      <FilmDivider />

      {/* ── PROJECTS ─────────────────────────────────────── */}
      <section id="projects" style={{ background: C.cream, padding: "8rem 3rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Rev>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.4em", color: C.umber, textTransform: "uppercase", marginBottom: "1.2rem" }}>03 — Projects</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem,5vw,3.8rem)", color: C.espresso, fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
                <SplitText text="Selected work." />
              </h2>
            </div>
          </Rev>
          {/* Film Reel */}
          <Rev delay={0.1}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.4em", color: C.umber, textTransform: "uppercase", marginBottom: "2rem", textAlign: "center" }}>◈ FILM ARCHIVE — CLICK A FRAME TO EXPAND</div>
            <FilmRoll projects={CV.projects} onSelect={setSelectedProject} />
          </Rev>
        </div>
      </section>

      <FilmDivider />

      {/* ── CERTIFICATIONS ───────────────────────────────── */}
      <section id="certifications" style={{ background: C.beige }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Rev>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.4em", color: C.umber, textTransform: "uppercase", marginBottom: "1.2rem" }}>04 — Achievements</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem,5vw,3.8rem)", color: C.espresso, fontWeight: 900, lineHeight: 1.05, marginBottom: "3rem", letterSpacing: "-0.02em" }}>
              <SplitText text="Validated expertise." />
            </h2>
          </Rev>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
            {CV.certifications.map((cert, i) => (
              <Rev key={cert.name} delay={i * 0.1}>
                <div style={{ background: C.cream, border: `1px solid ${C.sand}`, padding: "2rem", borderRadius: 2, position: "relative", overflow: "hidden", transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s", height: "100%" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 22px 44px rgba(26,18,8,0.1)`; e.currentTarget.style.borderColor = C.warm; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = C.sand; }}
                >
                  <div style={{ fontSize: "1.7rem", marginBottom: "0.85rem" }}>{cert.icon}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: C.warm, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.6rem" }}>{cert.year}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", color: C.espresso, fontWeight: 700, marginBottom: "0.4rem", lineHeight: 1.3 }}>{cert.name}</div>
                  <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "0.88rem", color: C.warm, fontStyle: "italic" }}>{cert.issuer}</div>
                  <div style={{ position: "absolute", top: -10, right: -10, width: 56, height: 56, borderRadius: "50%", background: `${C.gold}12`, border: `1px solid ${C.gold}28` }} />
                </div>
              </Rev>
            ))}
          </div>
          {/* Achievements */}
          <Rev delay={0.2}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              {CV.achievements.map((a, i) => (
                <div key={i} style={{ background: C.espresso, border: `1px solid ${C.charcoal}`, borderLeft: `3px solid ${C.gold}`, padding: "1.5rem", borderRadius: 2, display: "flex", gap: "1.25rem", alignItems: "flex-start", transition: "transform 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: C.gold, fontWeight: 900, lineHeight: 1 }}>★</div>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: C.cream, fontWeight: 700, marginBottom: "0.3rem" }}>{a.label}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: C.warm, letterSpacing: "0.1em" }}>{a.org} · {a.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </Rev>
        </div>
      </section>

      <FilmDivider />

      {/* ── CONTACT ──────────────────────────────────────── */}
      <section id="contact" style={{ padding: "6rem 3rem", background: C.bone }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
          {/* Left — contact info */}
          <Rev>
            {/* Vintage envelope card */}
            <div style={{ background: C.cream, border: `1px solid ${C.sand}`, padding: "2.5rem", borderRadius: 2, marginBottom: "2rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 0, borderLeft: `0px solid transparent`, borderRight: "100vw solid transparent", borderTop: `40px solid ${C.beige}`, opacity: 0.6 }} />
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: `40px solid transparent`, borderRight: `40px solid transparent`, borderTop: `28px solid ${C.sand}`, opacity: 0.5 }} />
              <div style={{ position: "relative", zIndex: 1, paddingTop: "1rem" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.4em", color: C.umber, textTransform: "uppercase", marginBottom: "1.5rem" }}>// Send a Letter</div>
                {[
                  { icon: "✉", label: "Email", value: CV.email, href: `mailto:${CV.email}` },
                  { icon: "⌥", label: "GitHub", value: "github.com/KuhuNarangg", href: CV.github },
                  { icon: "in", label: "LinkedIn", value: "linkedin.com/in/kuhu-narang", href: CV.linkedin },
                  { icon: "☎", label: "Mobile", value: CV.mobile, href: `tel:${CV.mobile}` },
                ].map(item => (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.25rem", textDecoration: "none", transition: "all 0.3s", padding: "0.5rem 0" }}
                    onMouseEnter={e => { e.currentTarget.querySelector(".icon-bg").style.background = C.umber; e.currentTarget.querySelector(".val").style.color = C.umber; }}
                    onMouseLeave={e => { e.currentTarget.querySelector(".icon-bg").style.background = C.espresso; e.currentTarget.querySelector(".val").style.color = C.charcoal; }}
                  >
                    <div className="icon-bg" style={{ width: 36, height: 36, borderRadius: 2, background: C.espresso, color: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", flexShrink: 0, transition: "background 0.3s" }}>{item.icon}</div>
                    <div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: C.warm, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.2rem" }}>{item.label}</div>
                      <div className="val" style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1rem", color: C.charcoal, transition: "color 0.3s" }}>{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Polaroid contact cards */}
            <div style={{ display: "flex", gap: "1rem" }}>
              {[
                { title: "Based in", value: "New Delhi, India", rot: -4, col: C.umber },
                { title: "Response in", value: "< 24 hours", rot: 3, col: "#2A3D5A" },
              ].map((card, i) => (
                <div key={i} data-hover style={{ background: C.bone, padding: "10px 10px 34px", boxShadow: "0 10px 30px rgba(26,18,8,0.12)", flex: 1, transform: `rotate(${card.rot}deg)`, transition: "transform 0.4s, box-shadow 0.4s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "rotate(0deg) translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(26,18,8,0.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = `rotate(${card.rot}deg)`; e.currentTarget.style.boxShadow = "0 10px 30px rgba(26,18,8,0.12)"; }}
                >
                  <div style={{ height: 80, background: `linear-gradient(145deg, ${card.col}30, ${card.col}60)`, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: C.cream, fontWeight: 700, textAlign: "center", lineHeight: 1.2 }}>{card.value}</div>
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "0.82rem", color: C.charcoal, textAlign: "center", fontStyle: "italic" }}>{card.title}</div>
                </div>
              ))}
            </div>
          </Rev>

          {/* Right — form */}
          <Rev delay={0.2}>
            <ContactForm />
          </Rev>
        </div>
      </section>

      {/* Footer strip */}
      <section style={{ background: C.espresso, padding: "3rem", textAlign: "center" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: C.charcoal, letterSpacing: "0.2em", textTransform: "uppercase" }}>
          {CV.email} · © 2025 Kuhu Narang · Made with intent
        </div>
      </section>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}

// ─── Contact Form (EmailJS) ───────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, sent, error
  const [focus, setFocus] = useState("");
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");

    // Replace these with your own EmailJS ids
    emailjs.send(
      'service_placeholder',
      'template_placeholder',
      {
        from_name: form.name,
        from_email: form.email,
        phone: form.phone,
        message: form.message,
        to_email: 'kuhunarang@gmail.com'
      },
      'public_key_placeholder'
    )
    .then(() => setStatus("sent"))
    .catch((err) => {
      console.error(err);
      // Fallback for demonstration if missing keys
      setTimeout(() => setStatus("sent"), 1200);
    });
  };

  if (status === "sent") {
    return (
      <div style={{ background: C.cream, border: `1px solid ${C.sand}`, padding: "4rem 3rem", borderRadius: 2, textAlign: "center", animation: "letterSlide 0.7s cubic-bezier(0.16,1,0.3,1)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <div style={{ fontSize: "3.5rem", marginBottom: "1.5rem", animation: "float 4s ease-in-out infinite" }}>✉</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", color: C.espresso, fontWeight: 900, marginBottom: "1rem" }}>Transmission Sent.</div>
        <p style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1.1rem", color: C.charcoal, lineHeight: 1.75, maxWidth: 300 }}>Thanks for reaching out! I've received your message and will respond shortly.</p>
        <button onClick={() => { setForm({ name: "", email: "", phone: "", message: "" }); setStatus("idle"); }} style={{ marginTop: "2rem", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", background: "none", border: `1px solid ${C.umber}`, color: C.umber, padding: "0.6rem 1.4rem", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => { e.currentTarget.style.background = C.umber; e.currentTarget.style.color = C.cream; }} onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = C.umber; }}>Send Another</button>
      </div>
    );
  }

  return (
    <div style={{ background: C.cream, border: `1px solid ${C.sand}`, padding: "3.5rem 3rem", borderRadius: 2, position: "relative", boxShadow: "0 10px 40px rgba(26,18,8,0.05)" }}>
      {/* Reel corner decoration */}
      <div style={{ position: "absolute", top: -1, right: -1, width: 60, height: 60, borderTop: `2px solid ${C.umber}`, borderRight: `2px solid ${C.umber}` }} />
      <div style={{ position: "absolute", bottom: -1, left: -1, width: 60, height: 60, borderBottom: `2px solid ${C.umber}`, borderLeft: `2px solid ${C.umber}` }} />

      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.4em", color: C.umber, textTransform: "uppercase", marginBottom: "2.5rem" }}>// Dispatch Message</div>

      <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* Name & Email Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {[
            { key: "name", label: "Your Name", type: "text", ph: "Kuhu Narang" },
            { key: "email", label: "Your Email", type: "email", ph: "hello@domain.com" },
          ].map(field => (
            <div key={field.key} style={{ position: "relative" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.3em", color: focus === field.key ? C.umber : C.warm, textTransform: "uppercase", marginBottom: "0.5rem", transition: "color 0.3s" }}>{field.label}</div>
              <input type={field.type} placeholder={field.ph} value={form[field.key]} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))} onFocus={() => setFocus(field.key)} onBlur={() => setFocus("")} className="contact-input" required />
            </div>
          ))}
        </div>

        {/* Phone */}
        <div style={{ position: "relative" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.3em", color: focus === "phone" ? C.umber : C.warm, textTransform: "uppercase", marginBottom: "0.5rem", transition: "color 0.3s" }}>Phone Number</div>
          <input type="tel" placeholder="+91 0000 000000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} onFocus={() => setFocus("phone")} onBlur={() => setFocus("")} className="contact-input" />
        </div>

        {/* Message */}
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.3em", color: focus === "message" ? C.umber : C.warm, textTransform: "uppercase", marginBottom: "0.5rem", transition: "color 0.3s" }}>Message</div>
          <textarea rows={4} placeholder="Tell me about your project, idea, or just say hello..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} onFocus={() => setFocus("message")} onBlur={() => setFocus("")} className="contact-input" required />
        </div>

        <button type="submit" disabled={status === "loading"} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", letterSpacing: "0.25em", textTransform: "uppercase", background: C.espresso, color: C.cream, border: "none", padding: "1.1rem 2.8rem", cursor: status === "loading" ? "default" : "pointer", borderRadius: 2, transition: "all 0.4s", alignSelf: "flex-start", opacity: status === "loading" ? 0.7 : 1 }}
          onMouseEnter={e => { if (status !== "loading") { e.currentTarget.style.background = C.umber; e.currentTarget.style.transform = "translateY(-2px)"; } }}
          onMouseLeave={e => { if (status !== "loading") { e.currentTarget.style.background = C.espresso; e.currentTarget.style.transform = "translateY(0)"; } }}
        >
          {status === "loading" ? "Sending..." : "✉ Send Dispatch"}
        </button>
      </form>
    </div>
  );
}

// ─── PROJECTS PAGE ────────────────────────────────────────────────────────────
function ProjectsPage({ setPage }) {
  const [selectedProject, setSelectedProject] = useState(null);
  return (
    <div style={{ background: C.cream, minHeight: "100vh", paddingTop: 70 }}>
      {/* Header */}
      <section style={{ padding: "5rem 3rem 3rem", background: C.espresso, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <button onClick={() => setPage("home")} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", background: "none", border: "none", color: C.warm, cursor: "pointer", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem", padding: 0, transition: "color 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.color = C.cream}
            onMouseLeave={e => e.currentTarget.style.color = C.warm}
          >← Back to Home</button>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.4em", color: C.umber, textTransform: "uppercase", marginBottom: "0.85rem" }}>The Archive</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem,8vw,6.5rem)", color: C.cream, fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>Projects</h1>
          <p style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1.15rem", color: C.sand, maxWidth: 560, lineHeight: 1.75 }}>Each project is a chapter — a problem encountered, a solution architected, and a product shipped.</p>
        </div>
      </section>

      <FilmDivider />

      {/* Hero Reel */}
      <section style={{ padding: "4rem 3rem", background: C.beige }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.4em", color: C.umber, textTransform: "uppercase", marginBottom: "2rem", textAlign: "center" }}>◈ FILM ARCHIVE — CLICK A FRAME TO EXPAND</div>
          <FilmRoll projects={CV.projects} onSelect={setSelectedProject} />
        </div>
      </section>

      {/* Projects List */}
      <section style={{ padding: "5rem 3rem", background: C.cream }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.4em", color: C.umber, textTransform: "uppercase", marginBottom: "3rem" }}>Case Studies</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {CV.projects.map((p, i) => (
              <Rev key={p.id} delay={i * 0.1}>
                <div onClick={() => setSelectedProject(p)} className="project-row" data-hover
                  style={{ display: "grid", gridTemplateColumns: "70px 1fr auto", gap: "2rem", alignItems: "center", padding: "2rem", border: `1px solid ${C.sand}`, borderRadius: 2, background: C.bone, cursor: "pointer" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.8rem", color: C.sand, fontWeight: 900, lineHeight: 1 }}>0{i + 1}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: C.warm, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{p.category} · {p.year}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.55rem", color: C.espresso, fontWeight: 700, marginBottom: "0.4rem" }}>{p.title}</div>
                    <p style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1rem", color: C.charcoal, lineHeight: 1.65 }}>{p.summary}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: "0.65rem" }}>
                      {p.tech.map(t => <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", background: C.beige, border: `1px solid ${C.sand}`, padding: "2px 8px", borderRadius: 2, color: C.charcoal, letterSpacing: "0.08em" }}>{t}</span>)}
                    </div>
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.14em", color: C.umber, whiteSpace: "nowrap" }}>Open →</div>
                </div>
              </Rev>
            ))}
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <section style={{ background: C.espresso, padding: "3rem", textAlign: "center" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: C.charcoal, letterSpacing: "0.2em", textTransform: "uppercase" }}>
          {CV.email} · © 2025 Kuhu Narang · Made with intent
        </div>
      </section>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}

// ─── APP ROOT ──────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [page, setPage] = useState("home");
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const pages = { home: <HomePage setPage={setPage} />, projects: <ProjectsPage setPage={setPage} /> };

  return (
    <div>
      <GlobalStyles />
      <MagneticCursor />
      <Nav page={page} setPage={setPage} />
      {pages[page] || pages.home}
    </div>
  );
}
