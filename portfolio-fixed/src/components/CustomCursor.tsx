import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const dot  = document.getElementById('custom-cursor');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let ringX = 0, ringY = 0;
    let dotX  = 0, dotY  = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      dotX  = e.clientX;
      dotY  = e.clientY;
    };

    const animate = () => {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;

      dot.style.left  = `${dotX}px`;
      dot.style.top   = `${dotY}px`;
      ring.style.left = `${ringX}px`;
      ring.style.top  = `${ringY}px`;

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const addHover = () => {
      const els = document.querySelectorAll('a, button, [role="button"], input, textarea, select, label');
      els.forEach(el => {
        el.addEventListener('mouseenter', () => {
          dot.classList.add('hovering');
          ring.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
          dot.classList.remove('hovering');
          ring.classList.remove('hovering');
        });
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    addHover();

    // Re-bind on DOM changes
    const observer = new MutationObserver(addHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="custom-cursor" />
      <div id="cursor-ring" />
    </>
  );
}
