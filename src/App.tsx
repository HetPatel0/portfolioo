import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import {
  DrawablyButton,
  DrawablyCard,
  DrawablyBadge,
  DrawablyList,
  DrawablyInput,
  DrawablyTextarea,
  DrawablyDivider,
  DrawablyUnderline,
  DrawablyHighlight,
  DrawablyCircle,
} from 'drawably/react'
import { Badge } from '@/components/ui/badge'
import Starfield from '@/components/Starfield'

const PROFILE = {
  name: 'Bhuva Het',
  role: 'AI/ML Engineer + Full-Stack Developer',
  tagline: 'I work with data and build practical AI features — RAG chat, ML models, and full-stack apps. Currently working as an intern.',
  about:
    'AI/ML and full-stack developer based in Rajkot, Gujarat. B.Tech CSE at Darshan University (May 2027, CGPA 8.18/10). I apply machine learning to real-world problems — document intelligence, health prediction, and AI-assisted apps.',
  email: 'hetp5852@gmail.com',
  location: 'Rajkot, Gujarat, India',
  github: 'https://github.com/HetPatel0',
  linkedin: 'https://www.linkedin.com/in/het-bhuva-b1330b332/',
  x: 'https://x.com/Het1501',
  resume: '/resume.pdf',
}

const SKILLS = [
  'Python',
  'TypeScript',
  'JavaScript',
  'Java',
  'SQL',
  'scikit-learn',
  'PyTorch',
  'OpenCV',
  'FastAPI',
  'Next.js',
  'React',
  'PostgreSQL',
  'LangChain',
  'Docker',
]

const PROJECTS = [
  {
    title: 'Doc Analysis — Chat with PDF',
    desc: 'RAG pipeline over documents: ingestion, chunking, vector embeddings, semantic search + context-aware QA with a Next.js chat frontend.',
    link: 'https://github.com/HetPatel0/doc_analysis',
    tech: 'Python · LangChain · vector-db · Next.js',
  },
  {
    title: 'Cardiovascular Disease Detector',
    desc: 'Random Forest model with engineered features (BMI, age-group, BP category, pulse pressure). FastAPI endpoint with probability + risk-level mapping.',
    link: 'https://github.com/HetPatel0/CardioCheck',
    tech: 'Python · scikit-learn · FastAPI',
  },
  {
    title: 'Expense Tracker (StacksUp)',
    desc: 'Full-stack expense manager with auth, Postgres schemas, and AI-powered spending insights, monthly summaries and budget tips.',
    link: 'https://github.com/HetPatel0/Expense_tracker',
    tech: 'Next.js · PostgreSQL · Auth · AI summaries',
  },
  {
    title: 'ML Simulations',
    desc: 'Interactive platform visualising ML algorithms in real time — regressions, gradient descent, SVR, kernel methods — plus articles and parameter tables.',
    link: 'https://github.com/HetPatel0/ml_simulation',
    tech: 'Next.js 16 · TypeScript · Tailwind · shadcn',
  },
  {
    title: 'Talkd (SecureTerm)',
    desc: 'End-to-end encrypted P2P terminal chat in Go — no servers, no accounts. X25519 + ChaCha20-Poly1305 over direct TCP.',
    link: 'https://github.com/HetPatel0/Talkd',
    tech: 'Go · P2P · E2E encryption',
  },
]

type SendState = 'idle' | 'loading' | 'success' | 'error'

const iconProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
} as const

const GithubIcon = (
  <svg {...iconProps}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const LinkedinIcon = (
  <svg {...iconProps}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
)

const XIcon = (
  <svg {...iconProps}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const MailIcon = (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden={true}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6L22 7" />
  </svg>
)

const MoonIcon = (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden={true}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const SunIcon = (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden={true}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)

type Theme = 'light' | 'dark'

export default function App() {
  const [sendState, setSendState] = useState<SendState>('idle')
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark'
      ? 'dark'
      : 'light',
  )
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, duration: 1.2 })
    lenisRef.current = lenis
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('portfolioo-theme', theme)
    } catch {
      /* private mode — theme just won't persist */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0a0f24' : '#faf7ef')
  }, [theme])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -90, duration: 1.4 })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleTheme = () => {
    const flip = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> }
    }
    if (doc.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      doc.startViewTransition(flip)
    } else {
      flip()
    }
  }

  const fakeSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (sendState === 'loading') return
    setSendState('loading')
    setTimeout(() => setSendState('success'), 1200)
    setTimeout(() => setSendState('idle'), 3500)
  }

  return (
    <>
      <Starfield />
      <nav className="nav">
        <DrawablyBadge>
          <span className="hand" style={{ padding: '4px 8px', display: 'inline-block' }}>
            ✏️ {PROFILE.name}
          </span>
        </DrawablyBadge>
        <div className="nav-links">
          <DrawablyButton variant="outline" onClick={() => scrollTo('about')}>
            About
          </DrawablyButton>
          <DrawablyButton variant="outline" onClick={() => scrollTo('projects')}>
            Work
          </DrawablyButton>
          <DrawablyButton variant="solid" onClick={() => scrollTo('contact')}>
            Contact
          </DrawablyButton>
          <DrawablyButton
            variant="outline"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            <span key={theme} className="theme-icon swap">
              {theme === 'light' ? MoonIcon : SunIcon}
            </span>
          </DrawablyButton>
        </div>
      </nav>

      <header className="hero">
        <img src="/avatar.jpg" alt="Bhuva Het" className="avatar" width={120} height={120} />
        <h1>
          Hi, I&apos;m <DrawablyCircle>{PROFILE.name}</DrawablyCircle>
        </h1>
        <p>
          <DrawablyHighlight>{PROFILE.role}</DrawablyHighlight>{' '}
          — <DrawablyUnderline>{PROFILE.tagline}</DrawablyUnderline>
        </p>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          📍 {PROFILE.location} · 🎓 B.Tech CSE, Darshan University (2027)
        </p>
        <div className="hero-cta">
          <DrawablyButton variant="solid" onClick={() => scrollTo('projects')}>
            View my work
          </DrawablyButton>
          <DrawablyButton variant="outline" onClick={() => window.open(PROFILE.resume, '_blank')}>
            Resume ↓
          </DrawablyButton>
          <DrawablyButton variant="outline" onClick={() => scrollTo('contact')}>
            Get in touch
          </DrawablyButton>
        </div>
        <p style={{ marginTop: 12, fontSize: '0.85rem', color: 'var(--muted-ink)' }}>
          Hover any sketch to re-sketch — every mount is a fresh pen stroke.
        </p>
      </header>

      <DrawablyDivider />

      <section id="about" className="block">
        <h2 className="section-title">About</h2>
        <div className="grid-2">
          <DrawablyCard>
            <div className="card-pad">
              <h3 className="hand">👋 Bio</h3>
              <p>{PROFILE.about}</p>
              <div className="social-row">
                <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <DrawablyBadge>
                    <span className="social-chip">{GithubIcon}GitHub</span>
                  </DrawablyBadge>
                </a>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <DrawablyBadge>
                    <span className="social-chip">{LinkedinIcon}LinkedIn</span>
                  </DrawablyBadge>
                </a>
                <a href={PROFILE.x} target="_blank" rel="noreferrer" aria-label="X">
                  <DrawablyBadge>
                    <span className="social-chip">{XIcon}X</span>
                  </DrawablyBadge>
                </a>
                <a href={`mailto:${PROFILE.email}`} aria-label="Email">
                  <DrawablyBadge>
                    <span className="social-chip">{MailIcon}Email</span>
                  </DrawablyBadge>
                </a>
              </div>
            </div>
          </DrawablyCard>
          <DrawablyCard>
            <div className="card-pad">
              <h3 className="hand">🛠 Stack</h3>
              <DrawablyList>
                <li>Languages — Python, Java, TypeScript, JavaScript, SQL</li>
                <li>ML — scikit-learn, PyTorch, OpenCV, RAG, embeddings</li>
                <li>Full-stack — Next.js, React, FastAPI, PostgreSQL, Docker</li>
              </DrawablyList>
              <div className="badges">
                {SKILLS.map((s) => (
                  <DrawablyBadge key={s} variant="outline">
                    <span style={{ padding: '2px 8px', display: 'inline-block' }}>{s}</span>
                  </DrawablyBadge>
                ))}
              </div>
            </div>
          </DrawablyCard>
        </div>
      </section>

      <section id="projects" className="block">
        <h2 className="section-title">Projects</h2>
        <div className="grid-3">
          {PROJECTS.map((p) => (
            <DrawablyCard key={p.title}>
              <div className="card-pad">
                <h3 className="hand">{p.title}</h3>
                <p style={{ color: 'var(--muted-ink)', minHeight: 48 }}>{p.desc}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.tech.split('·').map((t) => (
                    <Badge key={t.trim()} variant="secondary">
                      {t.trim()}
                    </Badge>
                  ))}
                </div>
                <div style={{ marginTop: 12 }}>
                  <DrawablyButton
                    variant="outline"
                    onClick={() => window.open(p.link, '_blank')}
                  >
                    Open →
                  </DrawablyButton>
                </div>
              </div>
            </DrawablyCard>
          ))}
        </div>
      </section>

      <section id="contact" className="block">
        <h2 className="section-title">Contact</h2>
        <DrawablyCard>
          <div className="card-pad">
            <p style={{ marginBottom: 16 }}>
              📧 {PROFILE.email} · 📍 {PROFILE.location}
            </p>
            <form className="contact" onSubmit={fakeSend}>
              <label>
                Name
                <DrawablyInput placeholder="Your name" required />
              </label>
              <label>
                Email
                <DrawablyInput type="email" placeholder="you@company.com" required />
              </label>
              <label>
                Message
                <DrawablyTextarea rows={4} placeholder="Hi Het! I saw your portfolio…" required />
              </label>
              <div>
                <DrawablyButton variant="solid" state={sendState} type="submit">
                  {sendState === 'loading'
                    ? 'Sending…'
                    : sendState === 'success'
                      ? 'Sent ✓'
                      : 'Send message'}
                </DrawablyButton>
              </div>
              <small style={{ color: 'var(--muted-ink)' }}>
                Prefer email? Write to {PROFILE.email} — or grab my{' '}
                <a href={PROFILE.resume} target="_blank" rel="noreferrer">
                  resume (PDF)
                </a>
                .
              </small>
            </form>
          </div>
        </DrawablyCard>
      </section>

      <footer>
        <DrawablyDivider />
        <p>
          Built with <span className="hand">drawably</span> ✏️ —{' '}
          <a href={PROFILE.github}>GitHub</a> · <a href={PROFILE.linkedin}>LinkedIn</a> ·{' '}
          <a href={PROFILE.x}>X</a>
        </p>
      </footer>
    </>
  )
}
