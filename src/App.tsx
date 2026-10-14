import { useState, useEffect, useRef } from 'react'
import javianaPhoto from './assets/javiana-photo.jpg'
import heroPhoto from './assets/hero-photo.jpg'
import altuveShoes2 from './assets/altuve-shoes-2.jpg'
import edvanceImg from './assets/edvance-design-system.jpg'
import physaflowImg from './assets/project3-2.jpg'
import littleCottonImg from './assets/little-cotton-1.jpg'
import { motion, useScroll, useTransform, useInView, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre Mí', href: '#sobre' },
  { label: 'Contacto', href: '#contacto' },
]

const PROJECTS: {
  id: string; title: string; tags: string[]; year: string; desc: string
  img: string; localImg?: string; link?: string; linkMobile?: string
}[] = [
  {
    id: '01',
    title: 'Altuve Shoes',
    tags: ['E-commerce', 'UX Research', 'Checkout'],
    year: '2026',
    desc: 'Optimización del flujo de compra para una tienda de calzado local. Arquitectura de información en 4 fases —homepage, PDP, checkout y confirmación— que redujo la tasa de abandono del carrito minimizando la sobrecarga cognitiva del usuario.',
    img: '',
    localImg: altuveShoes2,
    link: 'https://www.figma.com/proto/Mp7gRXhRLgEo7Vrmv96u0w/Altuve-Shoes?node-id=3-788&t=dxHTv7rSzb0P1mfL-1&scaling=min-zoom&content-scaling=fixed&page-id=3%3A147',
  },
  {
    id: '02',
    title: 'Edvance — Design System',
    tags: ['Design System', 'EdTech', 'Agile'],
    year: '2026',
    desc: 'Sistema de diseño integral para plataformas EdTech desarrollado en simulación laboral Agile (No Country). Estandarización de componentes y tokens que eliminó la fragmentación visual, redujo el retrabajo y aceleró el ciclo de entrega diseño–desarrollo.',
    img: '',
    localImg: edvanceImg,
    link: 'https://www.figma.com/proto/ucGv7K1iRJiIINmQK3mHBj/EDVANCE-DESIGN-SYSTEM-EDTECH?node-id=1-10338&t=YDaZuLX7dYTJldP0-1&scaling=min-zoom&content-scaling=fixed&page-id=1%3A10295',
  },
  {
    id: '03',
    title: 'Physaflow',
    tags: ['SaaS', 'Dashboard', 'B2B'],
    year: '2026',
    desc: 'Calculadora de capacidad ociosa para data centers. El usuario ingresa 3 datos —tamaño de instalación, utilización actual y tipo de enfriamiento— y obtiene en menos de 3 minutos una estimación instantánea de la capacidad varada y su costo anual potencial.',
    img: '',
    localImg: physaflowImg,
    link: 'https://www.figma.com/proto/JKVaTHmUt9AX6yV5JyyVDf/PhysaFlow-Calculator?node-id=3-17638&p=f&t=XEUjxoLekMbWFWxT-8&scaling=contain&content-scaling=fixed&page-id=3%3A17066&hide-ui=1',
  },
  {
    id: '04',
    title: 'Little Cotton Dreams',
    tags: ['E-commerce', 'Mobile', 'Conversión'],
    year: '2024',
    desc: 'Landing page de alta conversión para marca de ropa infantil. Arquitectura centrada en el usuario con diseño emocional que conecta con los padres —navegación simplificada, CTAs estratégicos y flujo de checkout de 3 pasos para reducir el abandono de carrito.',
    img: '',
    localImg: littleCottonImg,
    link: 'https://www.figma.com/proto/UYzQUyIZY4f7On4zZUeaSB/Little-Cotton-Dreams?node-id=258-183&t=2kRT8z9qdejAd44J-1&scaling=min-zoom&content-scaling=fixed&page-id=17%3A10&starting-point-node-id=258%3A183&show-proto-sidebar=1',
    linkMobile: 'https://www.figma.com/proto/UYzQUyIZY4f7On4zZUeaSB/Little-Cotton-Dreams?node-id=258-185&p=f&t=gufQiGJXEx6gLOv4-1&scaling=min-zoom&content-scaling=fixed&page-id=17%3A10&starting-point-node-id=258%3A185&show-proto-sidebar=1',
  },
]

const STACK = ['Figma', 'Figma Make', 'FigJam', 'Lovable', 'Framer', 'Canva', 'Trello', 'Claude', 'ChatGPT']

function ToolIcon({ name }: { name: string }) {
  const iconClass = 'h-5 w-5 shrink-0'

  if (name === 'Figma') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClass} fill="currentColor">
        <path d="M8 2a4 4 0 0 0 0 8h4V2H8Zm0 10a4 4 0 1 0 4 4v-4H8Zm6-10v8h2a4 4 0 0 0 0-8h-2Zm0 10v4a4 4 0 1 0 0-4Z" />
      </svg>
    )
  }

  if (name === 'Figma Make') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClass} fill="none">
        <path d="M6.5 3a3 3 0 0 0 0 6h3V3h-3Zm0 7.5a3 3 0 1 0 3 3v-3h-3Zm4.5-7.5v6h1.5a3 3 0 0 0 0-6H11Zm0 7.5v3a3 3 0 1 0 0-3Z" fill="currentColor" opacity=".75" />
        <path d="m18 12 .8 2.2L21 15l-2.2.8L18 18l-.8-2.2L15 15l2.2-.8L18 12Zm-3.2 5.3.45 1.25 1.25.45-1.25.45-.45 1.25-.45-1.25L13.1 19l1.25-.45.45-1.25Z" fill="currentColor" />
      </svg>
    )
  }

  if (name === 'FigJam') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3.1" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (name === 'Lovable') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClass} fill="currentColor">
        <path d="M12 21s-8.2-4.9-8.2-11.1A4.9 4.9 0 0 1 12 6.3a4.9 4.9 0 0 1 8.2 3.6C20.2 16.1 12 21 12 21Z" />
      </svg>
    )
  }

  if (name === 'Framer') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClass} fill="currentColor">
        <path d="M5 3h14v6H12l7 6h-7v6l-7-6V3Zm7 6H5l7 6V9Z" />
      </svg>
    )
  }

  if (name === 'Canva') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17.8 7.2A7 7 0 1 0 18 16.5" strokeLinecap="round" />
        <path d="M15.5 8.4a4.5 4.5 0 1 0 .2 7.4" strokeLinecap="round" opacity=".55" />
      </svg>
    )
  }

  if (name === 'Trello') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <rect x="6.5" y="6.5" width="4" height="10" rx="1" fill="currentColor" stroke="none" />
        <rect x="13.5" y="6.5" width="4" height="7" rx="1" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (name === 'Claude') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 2.5v19M2.5 12h19M5.3 5.3l13.4 13.4M18.7 5.3 5.3 18.7" />
        <path d="m8.7 3.2 6.6 17.6M20.8 8.7 3.2 15.3M15.3 3.2 8.7 20.8M3.2 8.7l17.6 6.6" opacity=".6" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3.2a4.2 4.2 0 0 1 7.1 3 4.2 4.2 0 0 1 1.1 7.9 4.2 4.2 0 0 1-5.9 5.7A4.2 4.2 0 0 1 7.2 17a4.2 4.2 0 0 1-1.1-7.9A4.2 4.2 0 0 1 12 3.2Z" />
      <path d="m8.2 8.7 7.6 4.4M15.8 8.7 8.2 13.1M12 5.8v12.4" />
    </svg>
  )
}

function useInViewOnce(margin = '-60px') {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: margin as any })
  return { ref, inView }
}

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInViewOnce()
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

function useMagnetic(strength = 0.4) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setOffset({
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
    })
  }
  const handleLeave = () => setOffset({ x: 0, y: 0 })
  return { ref, offset, handleMove, handleLeave }
}

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, [data-cursor-hover]')) setHovered(true)
    }
    const onLeave = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, [data-cursor-hover]')) setHovered(false)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
      animate={{ x: pos.x - 8, y: pos.y - 8, scale: hovered ? 3 : 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
    >
      <div className="w-4 h-4 rounded-full bg-[var(--color-accent)]" />
    </motion.div>
  )
}

export default function App() {
  const magnetic = useMagnetic(0.4)
  const reduceMotion = useReducedMotion()
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  // Marquee items
  const marqueeItems = ['UX / UI', 'DISEÑO DE PRODUCTO', 'INVESTIGACIÓN', 'AUTO LAYOUT', 'PROTOTIPADO', 'UX RESEARCH']

  return (
    <div className="min-h-screen bg-[var(--color-ground)] text-[var(--color-ink)] [&_*]:cursor-none cursor-none" style={{ fontFamily: 'Manrope, sans-serif' }}>
      <CustomCursor />

      {/* ── NAV ── */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)]"
        style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(8, 6, 14, 0.86)' }}
      >
        <div className="flex items-center justify-between px-6 md:px-12 h-14">
          <a href="#" className="text-[13px] font-500 tracking-[0.08em] text-[var(--color-ink)] uppercase" style={{ fontWeight: 500, letterSpacing: '0.08em' }}>
            Javiana Altuve
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="text-[13px] text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors duration-200 uppercase"
                style={{ fontWeight: 500, letterSpacing: '0.07em' }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span className="text-lg">{menuOpen ? '✕' : '≡'}</span>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-[var(--color-border)]"
            >
              {NAV_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-4 text-[13px] text-[var(--color-muted)] hover:text-[var(--color-ink)] border-b border-[var(--color-border)] transition-colors uppercase"
                  style={{ fontWeight: 500, letterSpacing: '0.07em' }}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── HERO ── */}
      <section
        id="inicio"
        ref={heroRef}
        className="hero-scene relative min-h-screen overflow-hidden border-b border-[var(--color-border)] pt-14"
      >
        <div className="hero-grid absolute inset-0 opacity-30" />
        <div className="hero-glow absolute left-1/2 top-[47%] h-[68vw] max-h-[54rem] w-[68vw] max-w-[54rem] -translate-x-1/2 -translate-y-1/2 rounded-full" />

        <motion.div
          className="absolute left-1/2 top-[50%] h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-accent-soft)] md:h-[47rem] md:w-[47rem]"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute left-[9%] top-[12%] h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_24px_var(--color-accent)]" />
          <span className="absolute bottom-[18%] right-[4%] h-1.5 w-1.5 rounded-full bg-[var(--color-accent-light)] shadow-[0_0_18px_var(--color-accent)]" />
        </motion.div>

        <motion.div
          className="relative z-10 mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-[90rem] items-center justify-center px-5 py-14 md:px-12"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Left product panel */}
          <motion.div
            initial={{ opacity: 0, x: -80, rotateY: 25 }}
            animate={{ opacity: 1, x: 0, rotateY: 12 }}
            transition={{ delay: 1.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-panel absolute left-[4%] top-[27%] hidden h-[25rem] w-[27%] overflow-hidden rounded-3xl border border-[var(--color-accent-soft)] p-5 lg:block"
          >
            <div className="mb-7 flex items-center gap-3 border-b border-[var(--color-border)] pb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent)] text-xs font-bold text-[var(--color-ground)]">JA</span>
              <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Portfolio / 2026</span>
            </div>
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[var(--color-accent-light)]">Diseño con intención</p>
            <p className="max-w-64 text-3xl leading-tight tracking-[-0.03em] text-[var(--color-ink)]">Mejores experiencias. Impacto real.</p>
            <div className="relative mt-8 h-28 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)]">
              <div className="absolute inset-x-5 bottom-5 flex h-16 items-end gap-2">
                {[35, 58, 42, 83, 62, 96, 74].map((height, index) => (
                  <motion.span
                    key={height}
                    className="flex-1 rounded-t-sm bg-[var(--color-accent)]"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 1.5 + index * 0.06, duration: 0.55 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right product panel */}
          <motion.div
            initial={{ opacity: 0, x: 80, rotateY: -25 }}
            animate={{ opacity: 1, x: 0, rotateY: -10 }}
            transition={{ delay: 1.25, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-panel absolute right-[5%] top-[25%] hidden h-[25rem] w-[23%] rounded-3xl border border-[var(--color-accent-soft)] p-5 lg:block"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="text-xs tracking-[0.08em] text-[var(--color-ink)]">Product design</span>
              <span className="text-[var(--color-accent-light)]">•••</span>
            </div>
            <div className="rounded-2xl bg-[linear-gradient(135deg,var(--color-accent-deep),var(--color-accent))] p-5">
              <p className="text-xl leading-tight text-white">Explora<br />y descubre</p>
              <span className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">↗</span>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4">
              <span className="h-12 w-12 rounded-xl bg-[var(--color-accent-dim)]" />
              <span className="flex-1 space-y-2">
                <span className="block h-1.5 w-4/5 rounded-full bg-[var(--color-muted)]" />
                <span className="block h-1.5 w-3/5 rounded-full bg-[var(--color-border-strong)]" />
              </span>
            </div>
            <div className="mt-5 flex justify-around text-[var(--color-muted)]">
              <span className="text-[var(--color-accent)]">◆</span><span>○</span><span>□</span>
            </div>
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="phone-floor-shadow pointer-events-none absolute left-1/2 top-[83%] z-10 h-8 w-56 -translate-x-1/2 rounded-full"
            animate={reduceMotion
              ? { opacity: [0.3, 0.27, 0.3], scale: [1, 0.97, 1] }
              : { opacity: [0.3, 0.18, 0.3], scale: [1, 0.86, 1] }}
            transition={reduceMotion
              ? { duration: 7, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Phone */}
          <motion.div
            initial={false}
            animate={reduceMotion
              ? { opacity: 1, rotateX: 0, rotateY: 0, rotateZ: -6, scale: 1, y: [0, -4, 0] }
              : {
                  opacity: 1,
                  rotateX: [0, 1, 0, -0.7, 0],
                  rotateY: [0, -1.8, 0, 1.4, 0],
                  rotateZ: [-6, -5, -6, -6.7, -6],
                  scale: [1, 1.006, 1, 0.997, 1],
                  x: 0,
                  y: [0, -22, 0],
                }}
            transition={reduceMotion
              ? { duration: 7, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="phone-shell relative z-20 h-[35rem] w-[18rem] rounded-[3.2rem] p-[0.42rem] sm:h-[40rem] sm:w-[20.5rem] md:h-[43rem] md:w-[22rem]"
          >
            <span className="phone-button phone-button-action" />
            <span className="phone-button phone-button-volume-up" />
            <span className="phone-button phone-button-volume-down" />
            <span className="phone-button phone-button-power" />

            <div className="phone-back absolute inset-[0.42rem] overflow-hidden rounded-[2.8rem] border border-white/10">
              <div className="phone-back-shine absolute inset-0" />
              <div className="camera-island absolute left-5 top-5 h-32 w-32 rounded-[2.2rem]">
                <span className="camera-lens left-3 top-3"><span /></span>
                <span className="camera-lens bottom-3 left-3"><span /></span>
                <span className="camera-lens right-3 top-[2.8rem]"><span /></span>
                <span className="absolute bottom-5 right-5 h-3.5 w-3.5 rounded-full bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
                <span className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full bg-[#25142f]" />
              </div>
              <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-sm font-semibold tracking-[0.12em] text-white/65">
                JA
              </div>
              <p className="absolute inset-x-0 bottom-8 text-center text-[0.52rem] uppercase tracking-[0.3em] text-white/35">
                Designed by Javiana
              </p>
            </div>

            <div className="phone-front relative h-full overflow-hidden rounded-[2.8rem] border border-white/10 bg-[var(--color-ground)]">
              <img src={heroPhoto} alt="Retrato de Javiana Altuve" className="absolute inset-0 h-[56%] w-full object-cover object-top" />
              <div className="absolute inset-x-0 top-0 h-[58%] bg-[linear-gradient(to_bottom,rgba(8,6,14,0.05),rgba(8,6,14,0.05)_55%,var(--color-ground)_100%)]" />
              <div className="dynamic-island absolute left-1/2 top-3 h-7 w-24 -translate-x-1/2 rounded-full bg-black shadow-inner md:top-4">
                <span className="absolute right-2.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#121a2d] shadow-[inset_0_0_3px_#4361a0]" />
              </div>
              <div className="absolute left-6 right-6 top-5 flex justify-between text-[0.62rem] font-semibold text-white/90">
                <span>9:41</span><span className="tracking-widest">● ◔ ▰</span>
              </div>

              <div className="absolute inset-x-6 bottom-6">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="mb-1 text-[2rem] leading-none tracking-[-0.04em] text-[var(--color-ink)] md:text-[2.25rem]"
                >
                  Javiana Altuve
                </motion.p>
                <p className="text-base text-[var(--color-accent-light)]">Diseñadora UX/UI</p>
                <span className="my-4 block h-px w-11 bg-[var(--color-accent)]" />
                <p className="text-xs leading-relaxed text-[var(--color-ink-soft)] md:text-sm">
                  Diseño de productos digitales<br />UX Research · Prototipado en Figma<br />B2B SaaS y E-commerce
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['Figma', 'UX Research', 'UI Design'].map(label => (
                    <span key={label} className="rounded-full border border-[var(--color-accent-soft)] bg-[var(--color-panel)] px-3 py-1.5 text-[0.58rem] text-[var(--color-ink-soft)]">
                      {label}
                    </span>
                  ))}
                </div>
                <motion.a
                  ref={magnetic.ref}
                  href="#trabajos"
                  aria-label="Ver trabajos"
                  onMouseMove={magnetic.handleMove}
                  onMouseLeave={magnetic.handleLeave}
                  animate={{ x: magnetic.offset.x, y: magnetic.offset.y }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="ml-auto mt-5 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-accent-soft)] bg-[var(--color-accent-dim)] text-xl text-[var(--color-accent-light)]"
                  whileHover={{ scale: 1.08, backgroundColor: 'var(--color-accent)' }}
                  whileTap={{ scale: 0.94 }}
                >
                  ↘
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.62rem] uppercase tracking-[0.28em] text-[var(--color-muted)]"
          >
            Desliza para explorar
          </motion.p>
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="overflow-hidden border-b border-[var(--color-border)] py-4" style={{ backgroundColor: 'var(--color-surface)' }}>
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="text-[11px] uppercase shrink-0 text-[var(--color-muted)]"
              style={{ fontWeight: 500, letterSpacing: '0.14em' }}
            >
              {item}
              <span className="ml-10 mr-2 text-[var(--color-accent)] opacity-60">·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── TRABAJOS ── */}
      <section id="trabajos" className="border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-[var(--color-border)]">
          <span className="text-[11px] uppercase text-[var(--color-muted)]" style={{ fontWeight: 500, letterSpacing: '0.13em' }}>
            Trabajos seleccionados
          </span>
          <span className="text-[11px] text-[var(--color-muted)]" style={{ fontWeight: 400, letterSpacing: '0.04em' }}>2024–2026</span>
        </div>

        {PROJECTS.map((p, i) => (
          <FadeUp key={p.id} delay={i * 0.05}>
            <div
              className="border-b border-[var(--color-border)] last:border-b-0 group"
              onClick={() => setActiveProject(activeProject === p.id ? null : p.id)}
            >
              <motion.div
                className="grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[2.5rem_1fr_auto_auto] items-center gap-4 px-6 md:px-12 py-6 cursor-pointer"
                whileHover={{ backgroundColor: 'var(--color-surface)' }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-[11px] text-[var(--color-muted)] tabular-nums" style={{ fontWeight: 400 }}>{p.id}</span>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <h3
                    className="text-[clamp(1.25rem,2.5vw,1.75rem)] group-hover:text-[var(--color-accent)] transition-colors duration-200"
                    style={{ fontWeight: 500, letterSpacing: '-0.01em' }}
                  >
                    {p.title}
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {p.tags.map(t => (
                      <span
                        key={t}
                        className="text-[10px] uppercase px-2.5 py-1 border border-[var(--color-border)] text-[var(--color-muted)]"
                        style={{ fontWeight: 500, letterSpacing: '0.1em' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="hidden md:block text-[12px] text-[var(--color-muted)]" style={{ fontWeight: 400 }}>{p.year}</span>

                <motion.span
                  animate={{ rotate: activeProject === p.id ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-colors text-lg"
                >
                  +
                </motion.span>
              </motion.div>

              <AnimatePresence>
                {activeProject === p.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid md:grid-cols-2 border-t border-[var(--color-border)]" style={{ backgroundColor: 'var(--color-surface)' }}>
                      <div className="p-6 md:p-12 border-b md:border-b-0 md:border-r border-[var(--color-border)] flex flex-col justify-between">
                        <p className="text-[15px] text-[var(--color-muted)] leading-relaxed mb-8" style={{ fontWeight: 400 }}>
                          {p.desc}
                        </p>
                        <div className="flex flex-col gap-3">
                          <a
                            href={p.link ?? '#'}
                            target={p.link ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[13px] text-[var(--color-accent)] hover:opacity-70 transition-opacity uppercase"
                            style={{ fontWeight: 500, letterSpacing: '0.1em' }}
                          >
                            {p.linkMobile ? 'Ver prototipo web' : 'Ver caso de estudio'} →
                          </a>
                          {p.linkMobile && (
                            <a
                              href={p.linkMobile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-[13px] text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors uppercase"
                              style={{ fontWeight: 500, letterSpacing: '0.1em' }}
                            >
                              Ver prototipo móvil →
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="overflow-hidden h-64 md:h-72">
                        <motion.img
                          src={p.localImg ?? `https://images.unsplash.com/${p.img}?w=800&h=500&fit=crop&auto=format`}
                          alt={p.title}
                          className="w-full h-full object-cover grayscale"
                          style={{ filter: 'grayscale(100%) brightness(0.75) contrast(1.05)' }}
                          initial={{ scale: 1.06 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>
        ))}
      </section>

      {/* ── SOBRE MÍ ── */}
      <section id="sobre" className="border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-[var(--color-border)]">
          <span className="text-[11px] uppercase text-[var(--color-muted)]" style={{ fontWeight: 500, letterSpacing: '0.13em' }}>
            Sobre Mí
          </span>
        </div>

        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">

          {/* Bio + foto */}
          <div className="flex flex-col gap-10 p-6 md:p-12">
            <FadeUp>
              <p
                className="text-[clamp(1.4rem,3vw,2.25rem)] leading-[1.25] tracking-[-0.015em] text-[var(--color-ink)] mb-8"
                style={{ fontWeight: 400 }}
              >
                Diseño y construyo interfaces donde la claridad es el oficio — no una ocurrencia tardía.
              </p>
              <p className="text-[15px] text-[var(--color-muted)] leading-relaxed max-w-lg" style={{ fontWeight: 400 }}>
                Con experiencia desarrollando proyectos de alto impacto que van desde e-commerce optimizados hasta sistemas de diseño escalables y herramientas SaaS complejas (como PhysaFlow y Edvance). Me especializo en traducir problemas de negocio y datos de investigación en experiencias digitales limpias, eficientes y centradas en el usuario. Actualmente disponible para colaborar en equipos de producto o asumir proyectos freelance seleccionados.
              </p>
            </FadeUp>

            <div className="mt-auto overflow-hidden border border-[var(--color-border)]">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <img
                  src={javianaPhoto}
                  alt="Javiana Altuve trabajando en diseño de producto"
                  className="h-72 w-full object-cover object-center md:h-80"
                  style={{ filter: 'grayscale(100%) contrast(1.08) brightness(0.8)', display: 'block' }}
                />
              </motion.div>
            </div>
          </div>

          {/* Herramientas */}
          <div className="p-6 md:p-12">
            <div>
              <p className="text-[11px] uppercase text-[var(--color-muted)] mb-5" style={{ fontWeight: 500, letterSpacing: '0.13em' }}>
                Herramientas
              </p>
              <div className="flex flex-col">
                {STACK.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    whileHover={{ x: 6, color: 'var(--color-accent)' }}
                    className="flex items-center gap-3 border-b border-[var(--color-border)] py-3 text-[14px] text-[var(--color-ink)] transition-colors"
                    style={{ fontWeight: 400 }}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-accent-dim)] text-[var(--color-accent-light)]">
                      <ToolIcon name={item} />
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" className="border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-[var(--color-border)]">
          <span className="text-[11px] uppercase text-[var(--color-muted)]" style={{ fontWeight: 500, letterSpacing: '0.13em' }}>
            Contacto
          </span>
        </div>

        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">

          {/* CTA */}
          <div className="p-6 md:p-16 flex flex-col justify-center">
            <FadeUp>
              <h2
                className="text-[clamp(3rem,7vw,5.5rem)] leading-[0.92] tracking-[-0.03em] text-[var(--color-ink)] mb-8"
                style={{ fontWeight: 400 }}
              >
                HABLEMOS.
              </h2>
              <p className="text-[15px] text-[var(--color-muted)] mb-10 max-w-sm leading-relaxed" style={{ fontWeight: 400 }}>
                Disponible para integrarme a equipos de producto, contratos a largo plazo o proyectos freelance seleccionados. Respuesta en menos de 24 horas.
              </p>
              <motion.a
                href="mailto:javianaaltuve3@gmail.com"
                className="inline-flex items-center gap-4 border border-[var(--color-accent)] text-[var(--color-accent)] px-7 py-3.5 text-[13px] uppercase w-fit transition-all duration-300"
                style={{ fontWeight: 500, letterSpacing: '0.1em' }}
                whileHover={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-ink)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                Enviar correo →
              </motion.a>
            </FadeUp>
          </div>

          {/* Redes */}
          <div className="p-6 md:p-16">
            <p className="text-[11px] uppercase text-[var(--color-muted)] mb-8" style={{ fontWeight: 500, letterSpacing: '0.13em' }}>
              Redes
            </p>
            {[
              { label: 'GitHub', handle: 'github.com/javialtuve', href: 'https://github.com/javialtuve' },
              { label: 'LinkedIn', handle: 'linkedin.com/in/javalt', href: 'https://www.linkedin.com/in/javalt/' },
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border-b border-[var(--color-border)] py-5 group"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ x: 4 }}
              >
                <span
                  className="text-[15px] text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  {link.label}
                </span>
                <span className="text-[11px] text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-colors" style={{ fontWeight: 400 }}>
                  {link.handle} ↗
                </span>
              </motion.a>
            ))}

            <div className="mt-10 p-5 border border-[var(--color-border)]" style={{ backgroundColor: 'var(--color-surface)' }}>
              <p className="text-[10px] uppercase text-[var(--color-muted)] mb-2" style={{ fontWeight: 500, letterSpacing: '0.12em' }}>
                Estado actual
              </p>
              <div className="flex items-center gap-2.5">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <span className="text-[13px] text-[var(--color-ink)]" style={{ fontWeight: 400 }}>
                  Disponible para nuevos proyectos
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 md:px-12 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-t border-[var(--color-border)]">
        <span className="text-[12px] text-[var(--color-muted)] uppercase" style={{ fontWeight: 400, letterSpacing: '0.08em' }}>
          © 2026 Javiana Altuve
        </span>
        <span className="text-[12px] text-[var(--color-muted)] italic" style={{ fontWeight: 300 }}>
          Diseñado con precisión, pensado para el usuario.
        </span>
      </footer>
    </div>
  )
}
