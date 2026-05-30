import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  color: string;
  type: 'dot' | 'cross' | 'ring';
  rotation: number;
  rotSpeed: number;
  pulse: number;
  pulseSpeed: number;
}

interface FloatingShape {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  opacity: number;
  type: 'triangle' | 'square' | 'line';
  rotation: number;
  rotSpeed: number;
  color: string;
}

interface Props {
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

const HOT    = '#FF3D00';
const PAPER  = '#F0ECE4';
const WIRE   = '#2a2a2a';
const ASH    = '#6e6e6e';

export default function ParticleCanvas({ intensity = 'medium', className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: -9999, y: -9999, vx: 0, vy: 0, px: -9999, py: -9999 });
  const particles = useRef<Particle[]>([]);
  const shapes    = useRef<FloatingShape[]>([]);
  const rafRef    = useRef<number>(0);
  const timeRef   = useRef(0);

  const COUNT = intensity === 'low' ? 60 : intensity === 'high' ? 140 : 90;
  const SHAPE_COUNT = intensity === 'low' ? 8 : intensity === 'high' ? 18 : 12;

  const rand = (min: number, max: number) => Math.random() * (max - min) + min;
  const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const initParticles = useCallback((w: number, h: number) => {
    particles.current = Array.from({ length: COUNT }, () => ({
      x: rand(0, w), y: rand(0, h),
      vx: rand(-0.18, 0.18), vy: rand(-0.18, 0.18),
      size: rand(1, 3.5),
      opacity: rand(0.05, 0.35),
      baseOpacity: rand(0.05, 0.35),
      color: pick([HOT, PAPER, WIRE, ASH, ASH, ASH, WIRE, WIRE]),
      type: pick(['dot', 'dot', 'dot', 'cross', 'ring']),
      rotation: rand(0, Math.PI * 2),
      rotSpeed: rand(-0.01, 0.01),
      pulse: rand(0, Math.PI * 2),
      pulseSpeed: rand(0.008, 0.025),
    }));

    shapes.current = Array.from({ length: SHAPE_COUNT }, () => ({
      x: rand(0, w), y: rand(0, h),
      vx: rand(-0.06, 0.06), vy: rand(-0.06, 0.06),
      size: rand(12, 55),
      opacity: rand(0.03, 0.12),
      type: pick(['triangle', 'square', 'square', 'line']),
      rotation: rand(0, Math.PI * 2),
      rotSpeed: rand(-0.003, 0.003),
      color: pick([HOT, PAPER, WIRE]),
    }));
  }, [COUNT, SHAPE_COUNT]);

  const drawCross = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    ctx.moveTo(x - size, y); ctx.lineTo(x + size, y);
    ctx.moveTo(x, y - size); ctx.lineTo(x, y + size);
    ctx.stroke();
  };

  const drawTriangle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size * 0.866, y + size * 0.5);
    ctx.lineTo(x - size * 0.866, y + size * 0.5);
    ctx.closePath();
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width  = rect.width  || window.innerWidth;
      canvas.height = rect.height || window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };
    resize();

    const onMove = (e: MouseEvent | TouchEvent) => {
      const { clientX, clientY } =
        'touches' in e ? e.touches[0] : (e as MouseEvent);
      const rect = canvas.getBoundingClientRect();
      mouse.current.vx = clientX - rect.left - mouse.current.px;
      mouse.current.vy = clientY - rect.top  - mouse.current.py;
      mouse.current.px = mouse.current.x;
      mouse.current.py = mouse.current.y;
      mouse.current.x  = clientX - rect.left;
      mouse.current.y  = clientY - rect.top;
    };

    const onLeave = () => { mouse.current.x = -9999; mouse.current.y = -9999; };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove',  onMove, { passive: true });
    canvas.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', resize);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      timeRef.current += 0.008;
      const t = timeRef.current;

      ctx.clearRect(0, 0, W, H);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const MOUSE_RADIUS  = 160;
      const REPEL_FORCE   = 0.55;
      const CONNECT_DIST  = 110;

      // ── Floating geometric shapes ──────────────────────────
      for (const s of shapes.current) {
        s.x += s.vx; s.y += s.vy; s.rotation += s.rotSpeed;

        // Wrap
        if (s.x < -100) s.x = W + 80;
        if (s.x > W + 100) s.x = -80;
        if (s.y < -100) s.y = H + 80;
        if (s.y > H + 100) s.y = -80;

        // Mouse repel
        const dx = s.x - mx, dy = s.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 0.3;
          s.vx += (dx / dist) * force;
          s.vy += (dy / dist) * force;
        }
        // Dampen velocity
        s.vx *= 0.98; s.vy *= 0.98;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.globalAlpha = s.opacity;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 0.6;

        if (s.type === 'square') {
          ctx.strokeRect(-s.size / 2, -s.size / 2, s.size, s.size);
        } else if (s.type === 'triangle') {
          drawTriangle(ctx, 0, 0, s.size / 2);
        } else {
          ctx.beginPath();
          ctx.moveTo(-s.size / 2, 0); ctx.lineTo(s.size / 2, 0);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, -s.size / 2); ctx.lineTo(0, s.size / 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // ── Particles ──────────────────────────────────────────
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];

        p.pulse += p.pulseSpeed;
        p.rotation += p.rotSpeed;
        p.x += p.vx; p.y += p.vy;

        // Wrap at edges
        if (p.x < -20) p.x = W + 10;
        if (p.x > W + 20) p.x = -10;
        if (p.y < -20) p.y = H + 10;
        if (p.y > H + 20) p.y = -10;

        // Mouse repulsion / attraction
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * REPEL_FORCE * 0.06;
          p.vy += (dy / dist) * force * REPEL_FORCE * 0.06;
          p.opacity = Math.min(1, p.baseOpacity + force * 0.6);
        } else {
          p.opacity += (p.baseOpacity * (0.85 + Math.sin(p.pulse) * 0.15) - p.opacity) * 0.05;
        }

        // Velocity damping
        p.vx *= 0.985; p.vy *= 0.985;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle   = p.color;
        ctx.strokeStyle = p.color;
        ctx.lineWidth   = 0.8;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'dot') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * (0.9 + Math.sin(p.pulse) * 0.1), 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'cross') {
          drawCross(ctx, 0, 0, p.size * 1.8);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 1.4, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // ── Connection lines between nearby particles ──────────
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i];
          const b = particles.current[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.12;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = WIRE;
            ctx.lineWidth   = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // ── Mouse cursor ripple effect ──────────────────────────
      if (mx > 0 && mx < W && my > 0 && my < H) {
        const rippleR = 50 + Math.sin(t * 3) * 8;
        ctx.save();
        ctx.globalAlpha = 0.06 + Math.sin(t * 3) * 0.02;
        ctx.strokeStyle = HOT;
        ctx.lineWidth   = 0.8;
        ctx.beginPath();
        ctx.arc(mx, my, rippleR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 0.04;
        ctx.beginPath();
        ctx.arc(mx, my, rippleR * 1.8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Lines from mouse to closest particles
        const sorted = [...particles.current]
          .map(p => ({ p, d: Math.hypot(p.x - mx, p.y - my) }))
          .filter(({ d }) => d < 180)
          .sort((a, b) => a.d - b.d)
          .slice(0, 5);

        for (const { p, d } of sorted) {
          ctx.save();
          ctx.globalAlpha = (1 - d / 180) * 0.18;
          ctx.strokeStyle = HOT;
          ctx.lineWidth   = 0.5;
          ctx.setLineDash([3, 6]);
          ctx.beginPath();
          ctx.moveTo(mx, my);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
          ctx.restore();
        }
      }

      // ── Ambient slow grid pulse ─────────────────────────────
      const gridStep = 80;
      for (let gx = 0; gx < W; gx += gridStep) {
        for (let gy = 0; gy < H; gy += gridStep) {
          const distToMouse = Math.hypot(gx - mx, gy - my);
          const alpha = Math.max(0, 0.025 - distToMouse / 8000 + Math.sin(t + gx * 0.01 + gy * 0.01) * 0.008);
          if (alpha > 0.002) {
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle   = WIRE;
            ctx.beginPath();
            ctx.arc(gx, gy, 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove',  onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
