import { useState, useEffect, useRef } from 'react'
import javianaPhoto from './assets/javiana-photo.jpg'
import heroPhoto from './assets/hero-photo.jpg'
import altuveShoes2 from './assets/altuve-shoes-2.jpg'
import edvanceImg from './assets/edvance-design-system.jpg'
import physaflowImg from './assets/project3-2.jpg'
import littleCottonImg from './assets/little-cotton-1.jpg'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'

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

const STACK = ['Figma', 'FigJam', 'Lovable', 'Framer', 'Canva', 'Trello', 'Claude', 'ChatGPT']

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
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

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
        style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(12,12,12,0.85)' }}
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
      <section ref={heroRef} className="pt-14 min-h-screen grid md:grid-cols-2 border-b border-[var(--color-border)]">

        {/* Left — text */}
        <motion.div
          className="flex flex-col justify-between px-6 md:px-12 pt-20 pb-28 md:pt-24 md:pb-28 border-b md:border-b-0 md:border-r border-[var(--color-border)]"
          style={{ y: heroY }}
        >
          <motion.div className="flex-1 flex flex-col justify-center" style={{ opacity: heroOpacity }}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-[13px] uppercase text-[var(--color-accent)] mb-10 md:mb-14"
              style={{ fontWeight: 500, letterSpacing: '0.13em' }}
            >
              UX/UI Designer
            </motion.p>

            <h1
              className="text-[clamp(4rem,8.5vw,6.5rem)] leading-[0.92] tracking-[-0.03em]"
              style={{ fontWeight: 400 }}
            >
              {['DISEÑANDO', 'COSAS QUE', 'FUNCIONAN.'].map((line, i) => (
                <motion.span
                  key={line}
                  className={`block ${line === 'FUNCIONAN.' ? 'text-[var(--color-accent)]' : 'text-[var(--color-ink)]'}`}
                  initial={{ opacity: 0, y: '0.4em' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.13, duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-10"
          >
            <motion.a
              ref={magnetic.ref}
              href="#inicio"
              onMouseMove={magnetic.handleMove}
              onMouseLeave={magnetic.handleLeave}
              onMouseEnter={() => {}}
              animate={{ x: magnetic.offset.x, y: magnetic.offset.y }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="inline-flex items-center gap-3 bg-[var(--color-accent)] text-black px-6 py-3 text-lg font-bold tracking-widest uppercase cursor-none"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Ver trabajos
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right — photo */}
        <motion.div
          className="relative overflow-hidden min-h-[60vw] md:min-h-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
        >
          <motion.img
            src={heroPhoto}
            alt="Javiana Altuve"
            className="w-full h-full object-cover object-center grayscale"
            style={{ y: heroY, filter: 'grayscale(100%) contrast(1.05) brightness(0.75)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(12,12,12,0.5) 100%)' }} />
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
      <section id="inicio" className="border-b border-[var(--color-border)]">
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

        <div className="grid md:grid-cols-[1fr_1fr_1fr] divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">

          {/* Bio */}
          <div className="p-6 md:p-12 md:col-span-2">
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
          </div>

          {/* Foto + tools */}
          <div className="p-6 md:p-10 flex flex-col gap-8">
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
                    className="border-b border-[var(--color-border)] py-3 text-[14px] text-[var(--color-ink)] transition-colors"
                    style={{ fontWeight: 400 }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden border border-[var(--color-border)]">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <img
                  src={javianaPhoto}
                  alt="Javiana Altuve"
                  className="w-full"
                  style={{ filter: 'grayscale(100%) contrast(1.08) brightness(0.8)', display: 'block' }}
                />
              </motion.div>
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
                whileHover={{ backgroundColor: 'var(--color-accent)', color: '#000' }}
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
