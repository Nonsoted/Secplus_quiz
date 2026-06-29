import { useState, useCallback } from "react";

const DOMAINS = [
  { id: "D1", label: "General Security Concepts", weight: 12, color: "#818cf8" },
  { id: "D2", label: "Threats, Vulnerabilities & Mitigations", weight: 22, color: "#f472b6" },
  { id: "D3", label: "Security Architecture", weight: 18, color: "#34d399" },
  { id: "D4", label: "Security Operations", weight: 28, color: "#fb923c" },
  { id: "D5", label: "Security Program Management & Oversight", weight: 20, color: "#38bdf8" },
];

const DAILY_TARGET = 150;
const START_DATE = "2026-06-22";

const SEED_QUESTIONS = [
  { id: "s1", domain: "D1", q: "Which cryptographic concept ensures a sender cannot deny sending a message?", opts: ["A. Confidentiality", "B. Integrity", "C. Non-repudiation", "D. Availability"], ans: "C", exp: "Non-repudiation uses digital signatures to prove origin, preventing a sender from later denying they sent a message." },
  { id: "s2", domain: "D1", q: "A PKI certificate authority (CA) issues a certificate to a web server. What does this certificate primarily provide?", opts: ["A. Data encryption of all web traffic", "B. Proof of the server's identity", "C. A firewall rule for HTTPS traffic", "D. VPN tunnel establishment"], ans: "B", exp: "A digital certificate binds a public key to an identity, allowing clients to verify they're communicating with the legitimate server." },
  { id: "s3", domain: "D1", q: "Which of the following BEST describes symmetric encryption?", opts: ["A. Uses a public/private key pair", "B. Uses the same key for encryption and decryption", "C. Is slower than asymmetric encryption", "D. Is used only for key exchange"], ans: "B", exp: "Symmetric encryption uses a single shared key for both encryption and decryption. It's fast but requires secure key distribution." },
  { id: "s4", domain: "D1", q: "What is the PRIMARY purpose of a digital signature?", opts: ["A. Encrypting data at rest", "B. Providing integrity and authentication", "C. Establishing a VPN tunnel", "D. Generating one-time passwords"], ans: "B", exp: "Digital signatures verify the sender's identity (authentication) and confirm the message hasn't been altered (integrity)." },
  { id: "s5", domain: "D1", q: "Which of the following is an example of a Type 2 authentication factor?", opts: ["A. Password", "B. Retina scan", "C. Smart card", "D. Security question"], ans: "C", exp: "Type 2 is 'something you have' — physical tokens, smart cards, or hardware keys. Passwords are Type 1 (know), biometrics are Type 3 (are)." },
  { id: "s6", domain: "D2", q: "An attacker sends emails pretending to be a trusted bank, directing users to a fake login page. What attack is this?", opts: ["A. Vishing", "B. Spear phishing", "C. Phishing", "D. Smishing"], ans: "C", exp: "Phishing uses fraudulent emails impersonating trusted entities to trick users into revealing credentials. Spear phishing is targeted; this is a broad campaign." },
  { id: "s7", domain: "D2", q: "Which vulnerability allows an attacker to inject malicious scripts into web pages viewed by other users?", opts: ["A. SQL injection", "B. Cross-site scripting (XSS)", "C. CSRF", "D. Buffer overflow"], ans: "B", exp: "XSS injects malicious client-side scripts into trusted web pages, executing in victims' browsers to steal sessions or redirect users." },
  { id: "s8", domain: "D2", q: "A system is overwhelmed by traffic from thousands of compromised devices, causing legitimate users to lose access. This is BEST described as:", opts: ["A. A man-in-the-middle attack", "B. A distributed denial-of-service (DDoS) attack", "C. A replay attack", "D. A brute-force attack"], ans: "B", exp: "DDoS uses a botnet of compromised systems to flood a target, exhausting resources and denying service to legitimate users." },
  { id: "s9", domain: "D2", q: "Which mitigation technique involves replacing sensitive data with a non-sensitive placeholder value?", opts: ["A. Encryption", "B. Hashing", "C. Tokenisation", "D. Obfuscation"], ans: "C", exp: "Tokenisation substitutes sensitive data (e.g. credit card numbers) with a random token. The mapping is stored securely, reducing exposure of the real data." },
  { id: "s10", domain: "D2", q: "An attacker exploits a vulnerability on the same day it is publicly disclosed. What type of attack is this?", opts: ["A. Zero-day exploit", "B. Advanced persistent threat", "C. Insider threat", "D. Supply chain attack"], ans: "A", exp: "A zero-day exploit targets a vulnerability on or before the day a patch is available, giving defenders zero days to respond." },
  { id: "s11", domain: "D3", q: "Which network architecture concept assumes no user or device is trusted by default, even inside the perimeter?", opts: ["A. DMZ", "B. Zero trust", "C. Defence in depth", "D. Air-gapped network"], ans: "B", exp: "Zero trust operates on 'never trust, always verify' — every access request is authenticated and authorised regardless of network location." },
  { id: "s12", domain: "D3", q: "A company places its public-facing web server in a separate network segment isolated from internal systems. What is this segment called?", opts: ["A. VLAN", "B. DMZ (Demilitarised Zone)", "C. Intranet", "D. Honeypot"], ans: "B", exp: "A DMZ is a perimeter network that exposes external services while isolating them from the internal corporate network, limiting attack blast radius." },
  { id: "s13", domain: "D3", q: "Which cloud deployment model is exclusively operated for a single organisation?", opts: ["A. Public cloud", "B. Hybrid cloud", "C. Community cloud", "D. Private cloud"], ans: "D", exp: "A private cloud is provisioned for exclusive use by one organisation, offering greater control and security but higher cost than public cloud." },
  { id: "s14", domain: "D3", q: "What does RAID 5 provide that a single drive cannot?", opts: ["A. Encryption at rest", "B. Fault tolerance with parity", "C. Faster write speeds than RAID 0", "D. Geographic redundancy"], ans: "B", exp: "RAID 5 stripes data with distributed parity across three or more drives, allowing recovery from a single drive failure without data loss." },
  { id: "s15", domain: "D3", q: "A security architect recommends deploying separate firewalls for each network segment. Which principle does this implement?", opts: ["A. Least privilege", "B. Separation of duties", "C. Defence in depth", "D. Zero trust"], ans: "C", exp: "Defence in depth layers multiple security controls so that if one fails, others still protect the asset — multiple firewalls per segment is a classic example." },
  { id: "s16", domain: "D4", q: "A SOC analyst receives an alert for unusual outbound traffic at 3am. Which phase of the incident response process is the analyst currently in?", opts: ["A. Containment", "B. Eradication", "C. Detection and analysis", "D. Recovery"], ans: "C", exp: "Investigating and validating an alert falls under Detection and Analysis — the second phase of NIST's incident response lifecycle." },
  { id: "s17", domain: "D4", q: "Which tool is BEST suited to correlate log data from multiple sources and generate security alerts?", opts: ["A. IDS", "B. SIEM", "C. WAF", "D. Proxy server"], ans: "B", exp: "A SIEM (Security Information and Event Management) aggregates and correlates logs from multiple systems to detect patterns and trigger alerts." },
  { id: "s18", domain: "D4", q: "An administrator needs to ensure that no single employee can both approve and process a financial transaction. Which principle applies?", opts: ["A. Least privilege", "B. Job rotation", "C. Separation of duties", "D. Mandatory access control"], ans: "C", exp: "Separation of duties splits critical tasks between multiple people to prevent fraud or error — no single individual controls an entire sensitive process." },
  { id: "s19", domain: "D4", q: "Which type of scan identifies open ports and running services on a network without attempting exploitation?", opts: ["A. Vulnerability scan", "B. Penetration test", "C. Port scan", "D. Fuzzing"], ans: "C", exp: "A port scan (e.g. Nmap) discovers open ports and services. A vulnerability scan goes further by checking for known weaknesses; a pentest actively exploits them." },
  { id: "s20", domain: "D4", q: "During a forensic investigation, which action should be taken FIRST when imaging a compromised system?", opts: ["A. Power off the system immediately", "B. Preserve volatile memory (RAM)", "C. Change the administrator password", "D. Run antivirus software"], ans: "B", exp: "Volatile data in RAM (running processes, network connections, encryption keys) is lost on shutdown. Capturing it first follows the order of volatility principle." },
  { id: "s21", domain: "D5", q: "Which framework is MOST commonly used to align IT security with business risk management in the UK financial sector?", opts: ["A. COBIT", "B. NIST CSF", "C. ISO 27001", "D. PCI DSS"], ans: "C", exp: "ISO 27001 is the internationally recognised standard for information security management systems (ISMS), widely adopted in UK financial services for risk alignment." },
  { id: "s22", domain: "D5", q: "A company must notify affected individuals within 72 hours of a data breach. Which regulation mandates this?", opts: ["A. PCI DSS", "B. HIPAA", "C. GDPR", "D. SOX"], ans: "C", exp: "GDPR (Article 33) requires organisations to notify the supervisory authority within 72 hours of becoming aware of a personal data breach." },
  { id: "s23", domain: "D5", q: "What is the PRIMARY purpose of a Business Continuity Plan (BCP)?", opts: ["A. To restore IT systems after a disaster", "B. To ensure critical business functions continue during a disruption", "C. To identify vulnerabilities in network infrastructure", "D. To train employees on phishing awareness"], ans: "B", exp: "A BCP focuses on maintaining essential business operations during disruption. A Disaster Recovery Plan (DRP) is a subset focusing on IT system restoration." },
  { id: "s24", domain: "D5", q: "Which metric represents the average time expected between system failures?", opts: ["A. RTO", "B. RPO", "C. MTTR", "D. MTBF"], ans: "D", exp: "MTBF (Mean Time Between Failures) measures reliability — the average time a system operates between failures. MTTR is time to repair; RTO/RPO are recovery objectives." },
  { id: "s25", domain: "D5", q: "A vendor agreement that defines expected service levels, uptime guarantees, and remedies for non-compliance is called:", opts: ["A. MOU", "B. NDA", "C. SLA", "D. BPA"], ans: "C", exp: "An SLA (Service Level Agreement) formally defines performance expectations between a provider and customer, including uptime, response times, and penalties." },
];

function load(key, def) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; } }
function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }

function getDayNumber() {
  const diff = Math.floor((new Date() - new Date(START_DATE)) / 86400000);
  return Math.min(Math.max(diff + 1, 1), 23);
}

function getWeakestDomain(stats) {
  const scored = DOMAINS.map(d => { const s = stats[d.id] || { correct: 0, total: 0 }; return { id: d.id, pct: s.total > 0 ? (s.correct / s.total) * 100 : -1 }; }).filter(d => d.pct >= 0);
  if (!scored.length) return null;
  return scored.reduce((a, b) => a.pct < b.pct ? a : b).id;
}

function pickDomain(stats) {
  const weights = DOMAINS.map(d => { const s = stats[d.id] || { correct: 0, total: 0 }; const acc = s.total > 0 ? s.correct / s.total : 0.5; return { id: d.id, w: (d.weight / 100) + (1 - acc) * 0.3 }; });
  const total = weights.reduce((s, d) => s + d.w, 0);
  let r = Math.random() * total;
  for (const d of weights) { r -= d.w; if (r <= 0) return d.id; }
  return weights[weights.length - 1].id;
}

async function fetchAIQuestion(domain, answeredIds) {
  const domainObj = DOMAINS.find(d => d.id === domain);
  const prompt = `You are a CompTIA Security+ SY0-701 exam question writer. Generate ONE unique multiple-choice exam question for the domain: "${domainObj.label}".

Return ONLY valid JSON in this exact format, no markdown, no extra text:
{
  "q": "Question text here",
  "opts": ["A. Option one", "B. Option two", "C. Option three", "D. Option four"],
  "ans": "A",
  "exp": "Explanation of why this answer is correct and why others are wrong."
}

Rules:
- Question must be exam-realistic and scenario-based
- All 4 options must be plausible
- ans must be exactly one letter: A, B, C, or D
- Explanation should be 1-2 sentences
- Make this question different from common ones — be creative with the scenario
- Do NOT wrap in markdown code blocks`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content: prompt }] })
  });
  const data = await res.json();
  const text = data.content?.map(b => b.text || "").join("").trim();
  const clean = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);
  return { ...parsed, id: `ai_${domain}_${Date.now()}_${Math.random()}`, domain };
}

const bg = "#0a0f1e", card = "#111827", border = "#1f2937";

export default function App() {
  const [tab, setTab] = useState("dashboard"); // dashboard | quiz | review | results
  const [stats, setStats] = useState(() => load("sy0701_stats", {}));
  const [dailyDone, setDailyDone] = useState(() => load("sy0701_daily", 0));
  const [answeredIds, setAnsweredIds] = useState(() => load("sy0701_answered", []));
  const [failedQs, setFailedQs] = useState(() => load("sy0701_failed", []));
  const [sessionDay] = useState(getDayNumber());

  // quiz state
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [sessionCount, setSessionCount] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewQueue, setReviewQueue] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);

  const saveStats = useCallback((s) => { setStats(s); save("sy0701_stats", s); }, []);
  const saveDailyDone = useCallback((n) => { setDailyDone(n); save("sy0701_daily", n); }, []);
  const saveAnsweredIds = useCallback((ids) => { setAnsweredIds(ids); save("sy0701_answered", ids); }, []);
  const saveFailedQs = useCallback((qs) => { setFailedQs(qs); save("sy0701_failed", qs); }, []);

  async function loadNextQuestion(domain, answered) {
    setLoading(true); setSelected(null); setFeedback(null);
    const d = domain || pickDomain(stats);
    const answeredSet = new Set(answered || answeredIds);
    const available = SEED_QUESTIONS.filter(q => q.domain === d && !answeredSet.has(q.id));

    if (available.length > 0) {
      const q = available[Math.floor(Math.random() * available.length)];
      setQuestion(q);
    } else {
      try {
        const q = await fetchAIQuestion(d, [...answeredSet]);
        setQuestion(q);
      } catch {
        // fallback: any seed not yet answered
        const anyAvailable = SEED_QUESTIONS.filter(q => !answeredSet.has(q.id));
        if (anyAvailable.length > 0) {
          setQuestion(anyAvailable[Math.floor(Math.random() * anyAvailable.length)]);
        } else {
          // all seeds done, force AI
          const q = await fetchAIQuestion(d, []).catch(() => SEED_QUESTIONS[0]);
          setQuestion(q);
        }
      }
    }
    setLoading(false);
  }

  function startQuiz() {
    setReviewMode(false);
    setSessionCount(0);
    setTab("quiz");
    loadNextQuestion();
  }

  function startReview() {
    if (failedQs.length === 0) return;
    const queue = [...failedQs].sort(() => Math.random() - 0.5);
    setReviewQueue(queue);
    setReviewIndex(0);
    setReviewMode(true);
    setSelected(null);
    setFeedback(null);
    setQuestion(queue[0]);
    setSessionCount(0);
    setTab("quiz");
  }

  function handleAnswer(letter) {
    if (selected || !question) return;
    setSelected(letter);
    const correct = letter === question.ans;

    // Update stats
    const newStats = { ...stats };
    if (!newStats[question.domain]) newStats[question.domain] = { correct: 0, total: 0 };
    newStats[question.domain].total += 1;
    if (correct) newStats[question.domain].correct += 1;
    saveStats(newStats);

    // Track answered (only non-AI seeds)
    if (!question.id.startsWith("ai_")) {
      const newAnswered = [...new Set([...answeredIds, question.id])];
      saveAnsweredIds(newAnswered);
    }

    // Track failed questions — add if wrong, remove if correct in review
    if (!correct) {
      const alreadyFailed = failedQs.find(q => q.id === question.id);
      if (!alreadyFailed) {
        const newFailed = [...failedQs, { ...question }];
        saveFailedQs(newFailed);
      }
    } else if (reviewMode) {
      const newFailed = failedQs.filter(q => q.id !== question.id);
      saveFailedQs(newFailed);
    }

    saveDailyDone(dailyDone + 1);
    setFeedback({ correct, explanation: question.exp, correctLetter: question.ans });
    setSessionCount(c => c + 1);
  }

  function handleNext() {
    if (sessionCount >= 10) { setTab("results"); return; }
    if (reviewMode) {
      const nextIdx = reviewIndex + 1;
      if (nextIdx >= reviewQueue.length) { setTab("results"); return; }
      setReviewIndex(nextIdx);
      setSelected(null);
      setFeedback(null);
      setQuestion(reviewQueue[nextIdx]);
    } else {
      loadNextQuestion();
    }
  }

  function pct(domId) { const s = stats[domId] || { correct: 0, total: 0 }; return s.total > 0 ? Math.round((s.correct / s.total) * 100) : null; }
  function totalAnswered() { return Object.values(stats).reduce((s, d) => s + d.total, 0); }
  function overallPct() { const tot = Object.values(stats).reduce((s, d) => s + d.total, 0); const cor = Object.values(stats).reduce((s, d) => s + d.correct, 0); return tot > 0 ? Math.round((cor / tot) * 100) : null; }

  const weakest = getWeakestDomain(stats);
  const weakestDomain = weakest ? DOMAINS.find(d => d.id === weakest) : null;
  const dailyPct = Math.min(Math.round((dailyDone / DAILY_TARGET) * 100), 100);
  const op = overallPct();

  // ── BOTTOM NAV ───────────────────────────────────────────────────────────
  const NavBar = () => (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#0d1526", borderTop: `1px solid ${border}`, display: "flex", zIndex: 100 }}>
      {[
        { id: "dashboard", label: "Dashboard", icon: "⊞" },
        { id: "review", label: `Review${failedQs.length > 0 ? ` (${failedQs.length})` : ""}`, icon: "✗" },
      ].map(t => (
        <button key={t.id} onClick={() => t.id === "review" ? (failedQs.length > 0 ? setTab("review") : null) : setTab(t.id)}
          style={{ flex: 1, padding: "14px 8px", background: "transparent", border: "none", color: tab === t.id ? "#6366f1" : "#475569", fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 18 }}>{t.icon}</span>
          {t.label}
        </button>
      ))}
      <button onClick={startQuiz} style={{ flex: 1, padding: "14px 8px", background: "transparent", border: "none", color: "#34d399", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <span style={{ fontSize: 18 }}>▶</span>
        Practice
      </button>
    </div>
  );

  // ── DASHBOARD ────────────────────────────────────────────────────────────
  if (tab === "dashboard") return (
    <div style={{ background: bg, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", padding: "24px 16px 100px", color: "#e2e8f0" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ background: "linear-gradient(135deg,#6366f1,#38bdf8)", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.08em" }}>SY0-701</div>
            <span style={{ color: "#475569", fontSize: 12 }}>CompTIA Security+</span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", margin: 0 }}>Study Dashboard</h1>
          <p style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>Day {sessionDay} of 23 · Exam: 18 July</p>
        </div>

        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "20px", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8" }}>Today's Progress</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: dailyDone >= DAILY_TARGET ? "#34d399" : "#f1f5f9" }}>{dailyDone} / {DAILY_TARGET}</span>
          </div>
          <div style={{ background: "#1e293b", borderRadius: 99, height: 8, overflow: "hidden" }}>
            <div style={{ background: dailyPct >= 100 ? "#34d399" : "linear-gradient(90deg,#6366f1,#38bdf8)", height: "100%", width: `${dailyPct}%`, borderRadius: 99, transition: "width 0.5s ease" }} />
          </div>
          <p style={{ color: "#475569", fontSize: 12, marginTop: 8 }}>{dailyDone >= DAILY_TARGET ? "🎯 Daily target reached!" : `${DAILY_TARGET - dailyDone} more to hit today's target`}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "16px" }}>
            <p style={{ color: "#64748b", fontSize: 12, margin: "0 0 4px" }}>Overall accuracy</p>
            <p style={{ fontSize: 30, fontWeight: 800, margin: 0, color: op === null ? "#334155" : op >= 75 ? "#34d399" : op >= 60 ? "#fbbf24" : "#f87171" }}>{op !== null ? `${op}%` : "—"}</p>
            <p style={{ color: "#475569", fontSize: 12, marginTop: 2 }}>{totalAnswered()} answered</p>
          </div>
          <div style={{ background: card, border: `1px solid ${failedQs.length > 0 ? "#f87171" : border}`, borderRadius: 14, padding: "16px" }}>
            <p style={{ color: "#64748b", fontSize: 12, margin: "0 0 4px" }}>Failed questions</p>
            <p style={{ fontSize: 30, fontWeight: 800, margin: 0, color: failedQs.length > 0 ? "#f87171" : "#334155" }}>{failedQs.length}</p>
            <p style={{ color: "#475569", fontSize: 12, marginTop: 2 }}>{failedQs.length > 0 ? "tap Review to retry" : "none yet"}</p>
          </div>
        </div>

        {weakestDomain && (
          <div style={{ background: card, border: `1px solid ${weakestDomain.color}44`, borderRadius: 14, padding: "16px", marginBottom: 14 }}>
            <p style={{ color: "#64748b", fontSize: 12, margin: "0 0 4px" }}>⚠️ Weakest domain — focus here</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: weakestDomain.color, margin: 0 }}>{weakestDomain.label}</p>
            <p style={{ color: "#475569", fontSize: 12, margin: "2px 0 0" }}>{pct(weakestDomain.id)}% accuracy</p>
          </div>
        )}

        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "20px", marginBottom: 14 }}>
          <p style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600, margin: "0 0 14px" }}>Domain Breakdown</p>
          {DOMAINS.map(d => { const s = stats[d.id] || { correct: 0, total: 0 }; const p = pct(d.id); return (
            <div key={d.id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#cbd5e1" }}>{d.label}</span>
                <span style={{ fontSize: 12, color: p !== null ? d.color : "#334155", fontWeight: 600 }}>{p !== null ? `${p}%` : "—"} <span style={{ color: "#475569", fontWeight: 400 }}>({s.correct}/{s.total})</span></span>
              </div>
              <div style={{ background: "#1e293b", borderRadius: 99, height: 5, overflow: "hidden" }}>
                <div style={{ background: d.color, height: "100%", width: p !== null ? `${p}%` : "0%", borderRadius: 99, opacity: 0.85, transition: "width 0.5s ease" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                <span style={{ fontSize: 10, color: "#334155" }}>{d.weight}% of exam</span>
                <span style={{ fontSize: 10, color: p !== null && p < 75 ? "#f87171" : "#334155" }}>target ≥75%</span>
              </div>
            </div>
          ); })}
        </div>

        {totalAnswered() > 0 && (
          <button onClick={() => { saveStats({}); saveDailyDone(0); saveAnsweredIds([]); saveFailedQs([]); }}
            style={{ width: "100%", background: "transparent", color: "#475569", border: `1px solid ${border}`, borderRadius: 12, padding: "12px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Reset all progress
          </button>
        )}
      </div>
      <NavBar />
    </div>
  );

  // ── REVIEW TAB ───────────────────────────────────────────────────────────
  if (tab === "review") return (
    <div style={{ background: bg, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", padding: "24px 16px 100px", color: "#e2e8f0" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", marginBottom: 4 }}>Failed Questions</h2>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>{failedQs.length} question{failedQs.length !== 1 ? "s" : ""} to review · Answer correctly to remove from this list</p>

        {failedQs.length === 0 ? (
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "40px", textAlign: "center" }}>
            <p style={{ fontSize: 32, marginBottom: 8 }}>🎯</p>
            <p style={{ color: "#34d399", fontWeight: 700, marginBottom: 4 }}>No failed questions!</p>
            <p style={{ color: "#475569", fontSize: 13 }}>Keep practising to build this list.</p>
          </div>
        ) : (
          <>
            <button onClick={startReview} style={{ width: "100%", background: "linear-gradient(135deg,#f87171,#f472b6)", color: "#fff", border: "none", borderRadius: 12, padding: "16px", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 20 }}>
              Retry All {failedQs.length} Failed Questions →
            </button>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {failedQs.map((q, i) => {
                const d = DOMAINS.find(d => d.id === q.domain);
                return (
                  <div key={q.id} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "14px 16px" }}>
                    <div style={{ display: "inline-block", background: d.color + "22", border: `1px solid ${d.color}44`, borderRadius: 4, padding: "2px 8px", fontSize: 10, fontWeight: 600, color: d.color, marginBottom: 8 }}>{d.label}</div>
                    <p style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 }}>{q.q}</p>
                    <p style={{ color: "#475569", fontSize: 12, marginTop: 6 }}>Correct answer: <span style={{ color: "#34d399", fontWeight: 600 }}>{q.ans}</span></p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <NavBar />
    </div>
  );

  // ── QUIZ ─────────────────────────────────────────────────────────────────
  if (tab === "quiz") {
    const domainObj = question ? DOMAINS.find(d => d.id === question.domain) : null;
    return (
      <div style={{ background: bg, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", padding: "24px 16px 100px", color: "#e2e8f0" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <button onClick={() => setTab("dashboard")} style={{ background: "transparent", border: `1px solid ${border}`, color: "#64748b", borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer" }}>← Dashboard</button>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {reviewMode && <span style={{ background: "#f8717122", border: "1px solid #f87171", borderRadius: 6, padding: "2px 8px", fontSize: 11, color: "#f87171", fontWeight: 600 }}>REVIEW MODE</span>}
              <span style={{ color: "#475569", fontSize: 13 }}>Q{sessionCount + 1} of 10</span>
            </div>
          </div>

          <div style={{ background: "#1e293b", borderRadius: 99, height: 4, marginBottom: 20, overflow: "hidden" }}>
            <div style={{ background: reviewMode ? "#f87171" : (domainObj ? domainObj.color : "#6366f1"), height: "100%", width: `${(sessionCount / 10) * 100}%`, borderRadius: 99, transition: "width 0.4s ease" }} />
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⚡</div>
              <p style={{ color: "#475569", fontSize: 14 }}>Generating fresh question…</p>
            </div>
          ) : question ? (
            <>
              {domainObj && <div style={{ display: "inline-block", background: domainObj.color + "22", border: `1px solid ${domainObj.color}44`, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 600, color: domainObj.color, marginBottom: 14 }}>{domainObj.label}</div>}
              <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: "22px", marginBottom: 12 }}>
                <p style={{ color: "#e2e8f0", fontSize: 15, lineHeight: 1.7, fontWeight: 500, margin: 0 }}>{question.q}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
                {question.opts.map(opt => {
                  const letter = opt[0];
                  let bg2 = "#111827", borderC = "#1f2937", color = "#cbd5e1";
                  if (selected) { if (letter === question.ans) { bg2 = "rgba(52,211,153,0.1)"; borderC = "#34d399"; color = "#34d399"; } else if (letter === selected) { bg2 = "rgba(248,113,113,0.1)"; borderC = "#f87171"; color = "#f87171"; } else { color = "#334155"; } }
                  return <button key={letter} onClick={() => handleAnswer(letter)} style={{ width: "100%", textAlign: "left", padding: "13px 16px", borderRadius: 10, border: `1px solid ${borderC}`, background: bg2, color, fontSize: 14, fontWeight: 500, cursor: selected ? "default" : "pointer", transition: "all 0.15s ease" }}>{opt}</button>;
                })}
              </div>
              {feedback && (
                <div style={{ background: feedback.correct ? "rgba(52,211,153,0.08)" : "rgba(248,113,113,0.08)", border: `1px solid ${feedback.correct ? "#34d399" : "#f87171"}`, borderRadius: 12, padding: "14px 18px", marginBottom: 12 }}>
                  <p style={{ color: feedback.correct ? "#34d399" : "#f87171", fontWeight: 700, fontSize: 14, margin: "0 0 4px" }}>{feedback.correct ? "✓ Correct!" : `✗ Correct answer: ${feedback.correctLetter}`}</p>
                  <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{feedback.explanation}</p>
                </div>
              )}
              {feedback && <button onClick={handleNext} style={{ width: "100%", background: reviewMode ? "#f87171" : (domainObj ? domainObj.color : "#6366f1"), color: "#0a0f1e", border: "none", borderRadius: 10, padding: "14px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{sessionCount >= 9 ? "See Results →" : "Next Question →"}</button>}
            </>
          ) : null}
        </div>
        <NavBar />
      </div>
    );
  }

  // ── SESSION RESULTS ───────────────────────────────────────────────────────
  if (tab === "results") return (
    <div style={{ background: bg, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", padding: "24px 16px 100px", color: "#e2e8f0" }}>
      <div style={{ maxWidth: 540, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🛡️</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", margin: "0 0 4px" }}>{reviewMode ? "Review Complete" : "Session Complete"}</h2>
        <p style={{ color: "#475569", fontSize: 13, marginBottom: 24 }}>{dailyDone} today · {failedQs.length} failed question{failedQs.length !== 1 ? "s" : ""} remaining</p>
        <div style={{ fontSize: 56, fontWeight: 800, color: op >= 80 ? "#34d399" : op >= 60 ? "#fbbf24" : "#f87171", marginBottom: 4 }}>{op !== null ? `${op}%` : "—"}</div>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 28 }}>Overall accuracy</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button onClick={startQuiz} style={{ width: "100%", background: "linear-gradient(135deg,#6366f1,#38bdf8)", color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Next 10 Questions →</button>
          {failedQs.length > 0 && <button onClick={startReview} style={{ width: "100%", background: "rgba(248,113,113,0.15)", color: "#f87171", border: "1px solid #f87171", borderRadius: 10, padding: "14px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Retry {failedQs.length} Failed Questions →</button>}
          <button onClick={() => setTab("dashboard")} style={{ width: "100%", background: "#1e293b", color: "#cbd5e1", border: `1px solid ${border}`, borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>View Dashboard</button>
        </div>
      </div>
      <NavBar />
    </div>
  );
}
