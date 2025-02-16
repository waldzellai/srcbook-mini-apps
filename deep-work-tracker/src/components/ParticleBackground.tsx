import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];
    const particleCount = 30;
    const connectionDistance = 150;
    
    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    const drawHexagon = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      glowIntensity: number
    ) => {
      const points: [number, number][] = [];
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3 + rotation;
        points.push([
          x + size * Math.cos(angle),
          y + size * Math.sin(angle),
        ]);
      }

      // Enhanced glow effect with more extreme values
      ctx!.beginPath();
      ctx!.moveTo(points[0][0], points[0][1]);
      points.forEach(([px, py]) => {
        ctx!.lineTo(px, py);
      });
      ctx!.closePath();
      
      const gradient = ctx!.createLinearGradient(
        x - size,
        y - size,
        x + size,
        y + size
      );
      // Increased alpha values for more dramatic effect
      gradient.addColorStop(0, `rgba(255, 255, 255, ${0.02 + (0.3 * glowIntensity)})`);
      gradient.addColorStop(0.5, `rgba(220, 240, 255, ${0.05 + (0.4 * glowIntensity)})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, ${0.02 + (0.3 * glowIntensity)})`);
      
      ctx!.strokeStyle = gradient;
      ctx!.lineWidth = 1.5;
      ctx!.stroke();

      // Enhanced inner lines with more contrast
      ctx!.beginPath();
      ctx!.moveTo(x, y);
      points.forEach(([px, py], index) => {
        if (index % 2 === 0) {
          ctx!.lineTo(px, py);
          ctx!.moveTo(x, y);
        }
      });
      ctx!.strokeStyle = `rgba(255, 255, 255, ${0.01 + (0.15 * glowIntensity)})`; // More dramatic inner lines
      ctx!.lineWidth = 1;
      ctx!.stroke();
    };

    const drawHoneycombGrid = (time: number) => {
      const hexSize = 100;
      const horizontalSpacing = hexSize * Math.sqrt(3);
      const verticalSpacing = hexSize * 1.5;
      const columns = Math.ceil(canvas.width / horizontalSpacing) + 1;
      const rows = Math.ceil(canvas.height / verticalSpacing) + 1;
      const offsetX = -hexSize + (canvas.width % horizontalSpacing) / 2;
      const offsetY = -hexSize + (canvas.height % verticalSpacing) / 2;

      // Enhanced wave pattern for more dramatic effect
      const waveSpeed = 0.0004; // Slightly faster
      const waveLength = 0.003; // Increased wavelength

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < columns; col++) {
          const x = offsetX + col * horizontalSpacing + (row % 2) * (horizontalSpacing / 2);
          const y = offsetY + row * verticalSpacing;
          
          // More dramatic wave calculation using multiple sine waves
          const wave1 = Math.sin((x * waveLength) + (y * waveLength) + (time * waveSpeed));
          const wave2 = Math.cos((x * waveLength * 0.5) - (y * waveLength * 0.5) + (time * waveSpeed * 1.5));
          const combinedWave = (wave1 + wave2) * 0.5;
          
          // Enhanced intensity calculation with more extreme values
          const baseIntensity = Math.pow(Math.abs(combinedWave), 1.5); // More dramatic falloff
          const glowIntensity = baseIntensity * (0.4 + Math.sin(time * 0.001) * 0.6); // More extreme variation
          
          // Enhanced rotation effect
          const rotation = Math.sin(time * 0.0002 + (x + y) * 0.001) * 0.1;
          
          drawHexagon(x, y, hexSize, rotation, glowIntensity);
        }
      }
    };

    const drawGlowingParticle = (x: number, y: number, size: number) => {
      const gradient = ctx!.createRadialGradient(x, y, 0, x, y, size * 6);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)'); // Increased brightness
      gradient.addColorStop(0.5, 'rgba(220, 240, 255, 0.15)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx!.beginPath();
      ctx!.arc(x, y, size * 6, 0, Math.PI * 2);
      ctx!.fillStyle = gradient;
      ctx!.fill();

      ctx!.beginPath();
      ctx!.arc(x, y, size, 0, Math.PI * 2);
      ctx!.fillStyle = 'rgba(255, 255, 255, 1.0)'; // Full brightness for center
      ctx!.fill();
    };

    const drawGlowingConnection = (x1: number, y1: number, x2: number, y2: number, alpha: number) => {
      ctx!.beginPath();
      ctx!.moveTo(x1, y1);
      ctx!.lineTo(x2, y2);
      ctx!.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.4})`; // Increased connection brightness
      ctx!.lineWidth = 1;
      ctx!.stroke();
    };

    let animationTime = 0;
    let lastFrameTime = performance.now();
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - lastFrameTime;
      
      if (elapsed > frameInterval) {
        lastFrameTime = currentTime - (elapsed % frameInterval);
        
        animationTime += 16;
        ctx!.fillStyle = 'rgba(13, 17, 23, 0.2)'; // Slightly increased fade for more contrast
        ctx!.fillRect(0, 0, canvas.width, canvas.height);

        drawHoneycombGrid(animationTime);

        particles.forEach((particle, i) => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          drawGlowingParticle(particle.x, particle.y, particle.size);

          particles.slice(i + 1).forEach((otherParticle) => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              const alpha = 0.2 * (1 - distance / connectionDistance); // Increased connection intensity
              drawGlowingConnection(
                particle.x,
                particle.y,
                otherParticle.x,
                otherParticle.y,
                alpha
              );
            }
          });
        });
      }

      requestAnimationFrame(animate);
    };

    animate(performance.now());

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: '#0d1117' }}
    />
  );
};
