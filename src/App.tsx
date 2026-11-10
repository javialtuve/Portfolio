import { useState, useEffect, useRef } from 'react'
import javianaPhoto from './assets/javiana-photo.jpg'
import heroVideo from './assets/javiana-working.mp4'
import heroVideoPoster from './assets/javiana-working-poster.jpg'
import edvanceImg from './assets/edvance-design-system.jpg'
import physaflowImg from './assets/project3-2.jpg'
import littleCottonCover from './assets/little-cotton-case-cover.png'
import littleCottonFoundations from './assets/little-cotton-case-foundations.png'
import littleCottonSystem from './assets/little-cotton-case-system.png'
import littleCottonFlow from './assets/little-cotton-case-flow.png'
import littleCottonWireframes from './assets/little-cotton-case-wireframes.png'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre Mí', href: '#sobre' },
  { label: 'Contacto', href: '#contacto' },
]

const PROJECTS: {
  id: string; title: string; tags: string[]; year: string; desc: string
  img: string; localImg?: string; link?: string
}[] = [
  {
    id: '01',
    title: 'Edvance — Design System',
    tags: ['Design System', 'EdTech', 'Agile'],
    year: '2026',
    desc: 'Sistema de diseño integral para plataformas EdTech desarrollado en simulación laboral Agile (No Country). Estandarización de componentes y tokens que eliminó la fragmentación visual, redujo el retrabajo y aceleró el ciclo de entrega diseño–desarrollo.',
    img: '',
    localImg: edvanceImg,
    link: 'https://www.figma.com/proto/ucGv7K1iRJiIINmQK3mHBj/EDVANCE-DESIGN-SYSTEM-EDTECH?node-id=1-10338&t=YDaZuLX7dYTJldP0-1&scaling=min-zoom&content-scaling=fixed&page-id=1%3A10295',
  },
  {
    id: '02',
    title: 'Physaflow',
    tags: ['SaaS', 'Dashboard', 'B2B'],
    year: '2026',
    desc: 'Calculadora de capacidad ociosa para data centers. El usuario ingresa 3 datos —tamaño de instalación, utilización actual y tipo de enfriamiento— y obtiene en menos de 3 minutos una estimación instantánea de la capacidad varada y su costo anual potencial.',
    img: '',
    localImg: physaflowImg,
    link: 'https://www.figma.com/proto/JKVaTHmUt9AX6yV5JyyVDf/PhysaFlow-Calculator?node-id=3-17638&p=f&t=XEUjxoLekMbWFWxT-8&scaling=contain&content-scaling=fixed&page-id=3%3A17066&hide-ui=1',
  },
  {
    id: '03',
    title: 'Little Cotton Dreams',
    tags: ['E-commerce', 'Mobile', 'Conversión'],
    year: '2024',
    desc: 'Landing page de alta conversión para marca de ropa infantil. Arquitectura centrada en el usuario con diseño emocional que conecta con los padres —navegación simplificada, CTAs estratégicos y flujo de checkout de 3 pasos para reducir el abandono de carrito.',
    img: '',
    localImg: littleCottonCover,
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

function LittleCottonCaseStudy() {
  const imageClass = 'block h-auto w-full'

  return (
    <div className="border-t border-[var(--color-border)] bg-[var(--color-ground)]">
      <div className="grid border-b border-[var(--color-border)] lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col justify-center p-6 md:p-12 lg:p-16">
          <span className="mb-5 text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent-light)]">
            Paso 1 · Identidad y concepto
          </span>
          <h4 className="max-w-xl text-[clamp(2rem,4vw,4.5rem)] leading-[0.98] tracking-[-0.04em] text-[var(--color-ink)]">
            Little Cotton Dreams
          </h4>
          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted)] md:text-base">
            Identidad de marca y tienda online para ropa de bebé. Logo vectorial en Figma y e-commerce responsive, del concepto al checkout.
          </p>
          <div className="mt-9 flex flex-wrap gap-2">
            {['Branding', 'UX/UI', 'E-commerce', 'Responsive'].map(tag => (
              <span key={tag} className="border border-[var(--color-border)] px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] text-[var(--color-muted)]">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center bg-[#fff8ef] p-5 md:p-10">
          <img src={littleCottonCover} alt="Portada del proyecto Little Cotton Dreams" className={imageClass} />
        </div>
      </div>

      <div className="grid border-b border-[var(--color-border)] lg:grid-cols-[0.7fr_1.3fr]">
        <div className="p-6 md:p-12 lg:p-16">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent-light)]">Paso 2</span>
          <h4 className="mt-4 text-2xl tracking-[-0.025em] text-[var(--color-ink)] md:text-3xl">Fundamentos del proyecto</h4>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[var(--color-muted)]">
            Con estos fundamentos definidos, el siguiente paso fue investigar cómo compran hoy los usuarios y qué hace bien la competencia.
          </p>
        </div>
        <div className="border-t border-[var(--color-border)] bg-white p-4 md:p-8 lg:border-l lg:border-t-0">
          <img src={littleCottonFoundations} alt="Proyecto, objetivo, problema y solución de Little Cotton Dreams" className={imageClass} />
        </div>
      </div>

      <div className="grid border-b border-[var(--color-border)] lg:grid-cols-[1.25fr_0.75fr]">
        <div className="order-2 border-t border-[var(--color-border)] bg-[#f7f7f7] p-4 md:p-8 lg:order-1 lg:border-r lg:border-t-0">
          <img src={littleCottonSystem} alt="Colores, tipografía y espaciado del sistema de diseño" className={imageClass} />
        </div>
        <div className="order-1 p-6 md:p-12 lg:order-2 lg:p-16">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent-light)]">Paso 3</span>
          <h4 className="mt-4 text-2xl tracking-[-0.025em] text-[var(--color-ink)] md:text-3xl">Un sistema antes que pantallas</h4>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[var(--color-muted)]">
            Antes de diseñar las pantallas, definí colores, tipografía y espaciado. Con esa base construí los componentes para mantener una experiencia coherente desde el inicio hasta la factura.
          </p>
        </div>
      </div>

      <div className="border-b border-[var(--color-border)] px-6 py-14 md:px-12 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent-light)]">Paso 4 · User persona</span>
            <h4 className="mt-4 text-3xl tracking-[-0.035em] text-[var(--color-ink)] md:text-5xl">Conocer a Valentina</h4>
          </div>
          <div>
            <p className="text-[15px] leading-relaxed text-[var(--color-ink-soft)] md:text-lg">
              Para diseñar la tienda necesitaba saber para quién la hacía. Así nació Valentina Torres, una mamá de 24 años en Lima que trabaja medio tiempo y compra ropa para su bebé desde el celular.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-muted)]">
              Quiere que su bebé esté cómodo y lindo, pero no sabe qué talla comprar. Le frustran los precios poco claros y le da desconfianza comprar sin ver la tela. Descubre la marca en Instagram, entra a la tienda y finaliza por WhatsApp.
            </p>
            <div className="mt-8 grid gap-px border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
              {['Guía de tallas visible', 'Precios claros', 'Avisos de stock', 'WhatsApp siempre accesible'].map(item => (
                <div key={item} className="bg-[var(--color-surface)] p-4 text-sm text-[var(--color-ink-soft)]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid border-b border-[var(--color-border)] lg:grid-cols-[0.72fr_1.28fr]">
        <div className="p-6 md:p-12 lg:p-16">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent-light)]">Paso 5</span>
          <h4 className="mt-4 text-2xl tracking-[-0.025em] text-[var(--color-ink)] md:text-3xl">De descubrir a confirmar</h4>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[var(--color-muted)]">
            Diseñé la tienda para que Valentina pase de descubrir la marca a tener su pedido confirmado en menos de dos minutos, resolviendo en cada paso sus dudas sobre talla, precio, disponibilidad y confianza.
          </p>
        </div>
        <div className="border-t border-[var(--color-border)] bg-[#fff8ef] p-4 md:p-8 lg:border-l lg:border-t-0">
          <img src={littleCottonFlow} alt="Flujo de compra desde Instagram hasta la factura" className={imageClass} />
        </div>
      </div>

      <div className="grid border-b border-[var(--color-border)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="order-2 flex items-center justify-center border-t border-[var(--color-border)] bg-[#202020] p-5 md:p-10 lg:order-1 lg:border-r lg:border-t-0">
          <img src={littleCottonWireframes} alt="Wireframes móvil y escritorio de la tienda" className="block h-auto max-h-[48rem] max-w-full" />
        </div>
        <div className="order-1 p-6 md:p-12 lg:order-2 lg:p-16">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent-light)]">Paso 6</span>
          <h4 className="mt-4 text-2xl tracking-[-0.025em] text-[var(--color-ink)] md:text-3xl">Estructura antes del detalle</h4>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[var(--color-muted)]">
            Antes del diseño visual, dibujé la estructura para decidir qué ve primero el usuario: la marca, el contacto, las categorías y los productos con su precio y disponibilidad. Lo resolví en móvil y escritorio porque cada formato se usa de manera distinta.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-8 bg-[linear-gradient(135deg,var(--color-surface),var(--color-accent-deep))] px-6 py-12 md:flex-row md:items-center md:px-12 lg:px-16">
        <div>
          <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent-light)]">Producto final</span>
          <h4 className="mt-3 text-2xl tracking-[-0.025em] text-[var(--color-ink)] md:text-3xl">Explora la tienda funcionando</h4>
        </div>
        <motion.a
          href="https://littlecottondreams.lovable.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[var(--color-ink)] px-6 py-3.5 text-xs uppercase tracking-[0.12em] text-[var(--color-ground)]"
          whileHover={{ scale: 1.03, backgroundColor: 'var(--color-accent-light)' }}
          whileTap={{ scale: 0.97 }}
        >
          Visitar Little Cotton Dreams <span aria-hidden="true">↗</span>
        </motion.a>
      </div>
    </div>
  )
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
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    if (window.location.hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    }

    const scrollToStart = () => {
      document.documentElement.style.scrollBehavior = 'auto'
      window.scrollTo(0, 0)
    }

    scrollToStart()
    const frame = window.requestAnimationFrame(scrollToStart)
    const timeout = window.setTimeout(() => {
      scrollToStart()
      document.documentElement.style.removeProperty('scroll-behavior')
    }, 150)
    window.addEventListener('pageshow', scrollToStart)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timeout)
      window.removeEventListener('pageshow', scrollToStart)
      window.history.scrollRestoration = previousRestoration
      document.documentElement.style.removeProperty('scroll-behavior')
    }
  }, [])

  // Marquee items
  const marqueeItems = ['UX / UI', 'DISEÑO DE PRODUCTO', 'INVESTIGACIÓN', 'AUTO LAYOUT', 'PROTOTIPADO', 'UX RESEARCH']
  const selectedProject = PROJECTS.find(project => project.id === activeProject)

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
        className="relative min-h-screen overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-ground)]"
      >
        <div className="grid min-h-screen md:grid-cols-2">
          <div className="order-2 flex items-center border-t border-[var(--color-border)] px-6 py-14 md:order-1 md:border-r md:border-t-0 md:px-12 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl"
            >
              <p className="mb-6 text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent-light)]">
                Diseñadora UX/UI
              </p>
              <h1 className="text-[clamp(3.25rem,7vw,7rem)] leading-[0.88] tracking-[-0.055em] text-[var(--color-ink)]">
                Javiana
                <br />
                Altuve
              </h1>
              <span className="my-8 block h-px w-16 bg-[var(--color-accent)]" />
              <p className="max-w-md text-sm leading-relaxed text-[var(--color-ink-soft)] md:text-base">
                Diseño productos digitales claros y funcionales para experiencias B2B SaaS y E-commerce.
              </p>
              <motion.a
                href="#trabajos"
                className="mt-9 inline-flex items-center gap-3 border border-[var(--color-accent)] px-6 py-3 text-xs uppercase tracking-[0.12em] text-[var(--color-accent-light)]"
                whileHover={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-ink)' }}
                whileTap={{ scale: 0.97 }}
              >
                Ver proyectos <span aria-hidden="true">↓</span>
              </motion.a>
            </motion.div>
          </div>

          <div className="relative order-1 min-h-[48vh] overflow-hidden md:order-2 md:min-h-0">
            <video
              className="absolute inset-0 h-full w-full object-cover object-center"
              src={heroVideo}
              poster={heroVideoPoster}
              style={{ filter: 'saturate(0.62) brightness(0.72) contrast(1.1) hue-rotate(8deg)' }}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Javiana Altuve trabajando en diseño desde su computador"
            />
            <div className="pointer-events-none absolute inset-0 bg-[rgba(45,20,68,0.24)] mix-blend-color" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,6,14,0.18),transparent_42%,rgba(8,6,14,0.62))] md:bg-[linear-gradient(to_right,var(--color-ground)_0%,rgba(8,6,14,0.58)_8%,transparent_34%,rgba(8,6,14,0.3)_100%)]" />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(8,6,14,0.42)]" />
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-5 right-6 z-10 hidden whitespace-nowrap text-[0.62rem] uppercase tracking-[0.28em] text-white/70 md:block md:right-12"
        >
          Desliza para explorar
        </motion.p>
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

        <div className="grid gap-4 p-6 md:grid-cols-2 md:p-12 xl:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className={`group overflow-hidden rounded-2xl border text-left transition-colors ${
                activeProject === project.id
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent-dim)]'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]'
              }`}
              aria-expanded={activeProject === project.id}
            >
              <div className="flex h-8 items-center gap-1.5 border-b border-[var(--color-border)] px-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-border-strong)]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-border-strong)]" />
                <span className="ml-auto text-[9px] uppercase tracking-[0.14em] text-[var(--color-muted)]">Archivo {project.id}</span>
              </div>
              <div className="relative h-44 overflow-hidden bg-[var(--color-ground)]">
                <img
                  src={project.localImg ?? `https://images.unsplash.com/${project.img}?w=800&h=500&fit=crop&auto=format`}
                  alt={`Vista previa de ${project.title}`}
                  className="h-full w-full object-cover object-top opacity-75 grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_55%,rgba(8,6,14,0.78))]" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl leading-tight tracking-[-0.025em] text-[var(--color-ink)] md:text-2xl">{project.title}</h3>
                  <span className="pt-1 text-[10px] text-[var(--color-muted)]">{project.year}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="border border-[var(--color-border)] px-2.5 py-1 text-[9px] uppercase tracking-[0.1em] text-[var(--color-muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent-light)]">
                  {activeProject === project.id ? 'Cerrar archivo' : 'Abrir proyecto'}
                  <span aria-hidden="true">{activeProject === project.id ? '−' : '↘'}</span>
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedProject && (
            <motion.div
              key={selectedProject.id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="flex items-center justify-between border-t border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4 md:px-12">
                <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
                  Archivo abierto · {selectedProject.title}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="text-xs uppercase tracking-[0.12em] text-[var(--color-accent-light)] transition-opacity hover:opacity-60"
                >
                  Cerrar ×
                </button>
              </div>

              {selectedProject.id === '03' ? (
                <LittleCottonCaseStudy />
              ) : (
                <div className="grid border-t border-[var(--color-border)] bg-[var(--color-surface)] md:grid-cols-2">
                  <div className="flex flex-col justify-between border-b border-[var(--color-border)] p-6 md:border-b-0 md:border-r md:p-12">
                    <p className="mb-8 text-[15px] leading-relaxed text-[var(--color-muted)]">
                      {selectedProject.desc}
                    </p>
                    <a
                      href={selectedProject.link ?? '#'}
                      target={selectedProject.link ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.1em] text-[var(--color-accent)] transition-opacity hover:opacity-70"
                    >
                      Ver caso de estudio →
                    </a>
                  </div>
                  <div className="h-72 overflow-hidden md:h-[26rem]">
                    <img
                      src={selectedProject.localImg ?? `https://images.unsplash.com/${selectedProject.img}?w=1000&h=700&fit=crop&auto=format`}
                      alt={selectedProject.title}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
              <h2
                className="text-[clamp(2rem,4vw,3.75rem)] leading-[1.02] tracking-[-0.035em] text-[var(--color-ink)]"
                style={{ fontWeight: 400 }}
              >
                Hola, soy Javiana Altuve.
              </h2>
              <p className="mt-5 text-sm tracking-[0.02em] text-[var(--color-accent-light)] md:text-base">
                Diseñadora UX/UI <span className="text-[var(--color-muted)]">|</span> Experiencias digitales centradas en las personas.
              </p>
              <span className="my-8 block h-px w-16 bg-[var(--color-accent)]" />
              <div className="max-w-xl space-y-6">
                <p className="text-lg leading-relaxed text-[var(--color-ink-soft)]">
                  Diseño experiencias digitales que convierten necesidades reales en productos claros, intuitivos y visualmente atractivos.
                </p>
                <p className="text-[15px] leading-relaxed text-[var(--color-muted)]">
                  Me interesa comprender a las personas, identificar oportunidades y transformar problemas complejos en soluciones sencillas. Combino pensamiento estratégico, creatividad y sensibilidad visual para desarrollar experiencias digitales e identidades visuales que conectan con las personas y aportan valor a las marcas.
                </p>
                <p className="text-[15px] leading-relaxed text-[var(--color-muted)]">
                  Disfruto transformar ideas en propuestas visuales que transmitan identidad, claridad y propósito.
                </p>
              </div>
              <a
                href="#contacto"
                className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[var(--color-accent-light)] transition-opacity hover:opacity-70"
              >
                Hablemos y conectemos <span aria-hidden="true">→</span>
              </a>
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
                  alt="Retrato de Javiana Altuve"
                  className="h-80 w-full object-cover object-center md:h-[28rem]"
                  style={{ filter: 'grayscale(85%) contrast(1.06) brightness(0.78)', display: 'block' }}
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
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                {STACK.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    whileHover={{ y: -3, borderColor: 'var(--color-accent-soft)' }}
                    className="flex min-h-32 flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-[14px] text-[var(--color-ink)]"
                    style={{ fontWeight: 400 }}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-accent-soft)] bg-[var(--color-accent-dim)] text-[var(--color-accent-light)]">
                      <ToolIcon name={item} />
                    </span>
                    <span className="mt-5 leading-tight">{item}</span>
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
