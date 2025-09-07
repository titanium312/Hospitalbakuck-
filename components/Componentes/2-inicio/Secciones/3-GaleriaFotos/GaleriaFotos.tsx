"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  src: string;
  title: string;
  caption?: string;
  ctaHref?: string;
  ctaLabel?: string;
  badge?: string;
};

const DURATION_MS = 5000;
const TICK_MS = 50;

export default function GaleriaEstreno() {
  const rawSlides: Slide[] = [
    {
      src: "https://images.unsplash.com/photo-1580281657527-47e6ba6dbf9b?q=80&w=1600",
      title: "Cuidado de la salud",
      caption: "Atención médica excepcional para toda la familia",
      badge: "Salud",
      ctaHref: "https://wa.me/573001112233",
      ctaLabel: "Contáctanos",
    },
    {
      src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600",
      title: "Resultados en línea",
      caption: "Consulta tus exámenes de laboratorio desde casa",
      badge: "Nuevo",
      ctaHref: "/pacientes/resultados",
      ctaLabel: "Ver resultados",
    },
    {
      src: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1600",
      title: "Citas disponibles",
      caption: "Agenda tu consulta externa en minutos",
      badge: "Hoy",
      ctaHref: "/pacientes/citas",
      ctaLabel: "Agendar",
    },
  ];

  const slides = useMemo(() => rawSlides.filter((s) => s.src && s.title), [rawSlides]);
  const total = slides.length;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (paused || total <= 1) return;
    setProgress(0);
    const step = (TICK_MS / DURATION_MS) * 100;
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + step;
        if (next >= 100) {
          setIdx((prev) => (prev + 1) % total);
          return 0;
        }
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [idx, paused, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIdx((p) => (p + 1) % total);
      if (e.key === "ArrowLeft") setIdx((p) => (p - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      setIdx((p) => (p + (dx < 0 ? 1 : -1) + total) % total);
      setProgress(0);
    }
    touchStartX.current = null;
  };

  if (!total) return null;

  const goTo = (n: number) => { setIdx(n); setProgress(0); };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Cartelera azul hospitalaria */}
      <div
        className="relative overflow-hidden rounded-3xl border border-blue-200/50 bg-gradient-to-b from-blue-50 via-white to-blue-50 shadow-2xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-live="polite"
      >
        {/* Progreso superior */}
        <div className="absolute left-0 right-0 top-0 z-20 flex gap-1 p-3">
          {slides.map((_, i) => (
            <div key={i} className="h-1.5 w-full overflow-hidden rounded-full bg-blue-200">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-[width] duration-100"
                style={{ width: i === idx ? `${progress}%` : i < idx ? "100%" : "0%" }}
              />
            </div>
          ))}
        </div>

        {/* Badge */}
        {slides[idx]?.badge && (
          <div className="absolute left-4 top-4 z-20">
            <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800 backdrop-blur border border-blue-300/30">
              {slides[idx].badge}
            </span>
          </div>
        )}

        {/* Imagen 16:9 con Ken Burns */}
        <div className="relative aspect-[16/9]">
          <img
            src={slides[idx].src}
            alt={slides[idx].title}
            className="absolute inset-0 h-full w-full select-none object-cover will-change-transform animate-kenburns"
            draggable={false}
            loading="lazy"
            decoding="async"
          />
          {/* Lavado de color y gradientes */}
          <div className="pointer-events-none absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-950/55 via-blue-900/15 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-950/30 via-transparent to-blue-950/30" />
        </div>

        {/* Texto en tarjeta de vidrio */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end">
          <div className="w-full p-6 md:p-8">
            <div className="max-w-3xl rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 p-5 md:p-6 text-blue-50 shadow-md">
              <h3 className="text-balance text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                {slides[idx].title}
              </h3>
              {slides[idx].caption && (
                <p className="mt-2 text-pretty text-sm md:text-base text-blue-50/90">
                  {slides[idx].caption}
                </p>
              )}
              {slides[idx].ctaHref && slides[idx].ctaLabel && (
                <div className="pointer-events-auto mt-4">
                  <a
                    href={slides[idx].ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-blue-700 transition-all hover:-translate-y-0.5"
                  >
                    {slides[idx].ctaLabel}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Flechas */}
        <button
          aria-label="Anterior"
          onClick={() => goTo((idx - 1 + total) % total)}
          className="pointer-events-auto absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 text-blue-800 p-2 shadow hover:bg-white"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          aria-label="Siguiente"
          onClick={() => goTo((idx + 1) % total)}
          className="pointer-events-auto absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 text-blue-800 p-2 shadow hover:bg-white"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Puntos */}
        <div className="pointer-events-auto absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir al slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${i === idx ? "w-7 bg-blue-600" : "w-2.5 bg-blue-300 hover:bg-blue-400"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
