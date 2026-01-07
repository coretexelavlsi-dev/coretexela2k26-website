// VLSI Chip Layout Background - Grid-based with Distributed Pulses
// Author: CORETEXELA Team
// Perfect grid chip architecture with animated pulsing connections

class VLSIChipLayoutBackground {
  constructor() {
    this.canvas = document.getElementById('circuitCanvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.grid = [];
    this.time = 0;
    this.activeConnections = [];
    
    this.init();
  }
  
  init() {
    this.resizeCanvas();
    this.createGrid();
    this.createConnections();
    this.animate();
    
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.createGrid();
      this.createConnections();
    });
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createGrid() {
    this.grid = [];
    const cellSize = 80;
    const colsCount = Math.ceil(this.canvas.width / cellSize) + 1;
    const rowsCount = Math.ceil(this.canvas.height / cellSize) + 1;
    
    for (let row = 0; row < rowsCount; row++) {
      for (let col = 0; col < colsCount; col++) {
        const isActive = Math.random() > 0.5; // 50% nodes are active
        
        this.grid.push({
          x: col * cellSize,
          y: row * cellSize,
          col: col,
          row: row,
          active: isActive,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          brightness: 0.5 + Math.random() * 0.5
        });
      }
    }
  }
  
  createConnections() {
    this.activeConnections = [];
    const cellSize = 80;
    
    // Connect nearby active nodes
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = i + 1; j < this.grid.length; j++) {
        if (this.grid[i].active && this.grid[j].active) {
          const dx = this.grid[i].col - this.grid[j].col;
          const dy = this.grid[i].row - this.grid[j].row;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Connect only adjacent nodes (distance = 1 or sqrt(2))
          if (distance <= 1.5 && Math.random() > 0.3) {
            this.activeConnections.push({
              from: i,
              to: j,
              pulse: Math.random() * Math.PI * 2,
              pulseSpeed: 0.015 + Math.random() * 0.02
            });
          }
        }
      }
    }
  }
  
  animate() {
    this.time += 0.01;
    
    // Clear with semi-transparent white
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw grid lines (very subtle)
    this.drawGridLines();
    
    // Draw connections with pulsing effect
    this.drawConnections();
    
    // Draw pulsing nodes
    this.drawNodes();
    
    requestAnimationFrame(() => this.animate());
  }
  
  drawGridLines() {
    const cellSize = 80;
    
    this.ctx.strokeStyle = 'rgba(244, 178, 58, 0.06)';
    this.ctx.lineWidth = 0.8;
    
    // Vertical lines
    for (let x = 0; x < this.canvas.width; x += cellSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y < this.canvas.height; y += cellSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }
  
  drawConnections() {
    this.activeConnections.forEach(conn => {
      const fromNode = this.grid[conn.from];
      const toNode = this.grid[conn.to];
      
      // Update pulse
      conn.pulse += conn.pulseSpeed;
      
      // Calculate opacity based on pulse
      const pulseValue = Math.sin(conn.pulse);
      const opacity = 0.2 + Math.abs(pulseValue) * 0.15;
      
      // Draw glowing connection line
      const gradient = this.ctx.createLinearGradient(
        fromNode.x, fromNode.y,
        toNode.x, toNode.y
      );
      
      gradient.addColorStop(0, `rgba(244, 178, 58, ${opacity * 0.5})`);
      gradient.addColorStop(0.5, `rgba(244, 178, 58, ${opacity})`);
      gradient.addColorStop(1, `rgba(244, 178, 58, ${opacity * 0.5})`);
      
      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = 1.5 + Math.abs(pulseValue) * 0.5;
      
      this.ctx.beginPath();
      this.ctx.moveTo(fromNode.x, fromNode.y);
      this.ctx.lineTo(toNode.x, toNode.y);
      this.ctx.stroke();
    });
  }
  
  drawNodes() {
    this.grid.forEach(node => {
      if (node.active) {
        // Update pulse
        node.pulse += node.pulseSpeed;
        
        // Calculate pulse value
        const pulseValue = Math.sin(node.pulse);
        const pulseSize = 3 + Math.abs(pulseValue) * 3;
        const pulseOpacity = 0.5 + Math.abs(pulseValue) * 0.4;
        
        // Draw outer glow
        const glowGradient = this.ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, pulseSize * 4
        );
        glowGradient.addColorStop(0, `rgba(244, 178, 58, ${pulseOpacity * 0.4})`);
        glowGradient.addColorStop(0.5, `rgba(244, 178, 58, ${pulseOpacity * 0.2})`);
        glowGradient.addColorStop(1, 'rgba(244, 178, 58, 0)');
        
        this.ctx.fillStyle = glowGradient;
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, pulseSize * 4, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw node core
        this.ctx.fillStyle = `rgba(244, 178, 58, ${pulseOpacity})`;
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw bright center dot
        this.ctx.fillStyle = `rgba(244, 178, 58, ${pulseOpacity + 0.2})`;
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new VLSIChipLayoutBackground();
});
