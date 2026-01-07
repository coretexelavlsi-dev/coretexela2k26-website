// Pure Data Rain Background - Vertical Lines with Glowing Nodes
// Author: CORETEXELA Team
// No text symbols - Only visual lines and particles

class VLSIBackground {
  constructor() {
    this.canvas = document.getElementById('circuitCanvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.lines = [];
    this.maxLines = 80;
    
    this.init();
  }
  
  init() {
    this.resizeCanvas();
    this.createLines();
    this.animate();
    
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.createLines();
    });
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createLines() {
    this.lines = [];
    const lineCount = Math.min(this.maxLines, Math.floor(this.canvas.width / 25));
    
    for (let i = 0; i < lineCount; i++) {
      this.lines.push({
        x: Math.random() * this.canvas.width,
        particles: this.createParticles(),
        speed: 1 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.7
      });
    }
  }
  
  createParticles() {
    const particles = [];
    const particleCount = 5 + Math.floor(Math.random() * 15);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        y: Math.random() * this.canvas.height,
        size: 2 + Math.random() * 4,
        glowSize: 8 + Math.random() * 12,
        brightness: 0.5 + Math.random() * 0.5
      });
    }
    
    return particles;
  }
  
  animate() {
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.lines.forEach(line => {
      // Draw vertical line
      this.ctx.strokeStyle = `rgba(0, 217, 255, ${line.opacity * 0.15})`;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(line.x, 0);
      this.ctx.lineTo(line.x, this.canvas.height);
      this.ctx.stroke();
      
      // Draw and animate particles
      line.particles.forEach(particle => {
        // Move particle down
        particle.y += line.speed;
        
        // Reset to top when reaching bottom
        if (particle.y > this.canvas.height + 50) {
          particle.y = -50;
          particle.size = 2 + Math.random() * 4;
          particle.glowSize = 8 + Math.random() * 12;
        }
        
        // Draw outer glow
        const gradient = this.ctx.createRadialGradient(
          line.x, particle.y, 0,
          line.x, particle.y, particle.glowSize
        );
        gradient.addColorStop(0, `rgba(0, 255, 255, ${particle.brightness * 0.8})`);
        gradient.addColorStop(0.4, `rgba(0, 217, 255, ${particle.brightness * 0.4})`);
        gradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(line.x, particle.y, particle.glowSize, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw bright core
        this.ctx.fillStyle = `rgba(0, 255, 255, ${particle.brightness})`;
        this.ctx.beginPath();
        this.ctx.arc(line.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw connection line to next particle
        const nextParticle = line.particles.find(p => p.y > particle.y && p.y - particle.y < 100);
        if (nextParticle) {
          this.ctx.strokeStyle = `rgba(0, 217, 255, ${line.opacity * 0.3})`;
          this.ctx.lineWidth = 2;
          this.ctx.beginPath();
          this.ctx.moveTo(line.x, particle.y);
          this.ctx.lineTo(line.x, nextParticle.y);
          this.ctx.stroke();
        }
      });
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new VLSIBackground();
});
