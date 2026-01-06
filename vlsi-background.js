// VLSI Background Animation Script
// Author: CORETEXELA Team
// Description: Animated circuit board with floating logic symbols

class VLSIBackground {
  constructor() {
    this.canvas = document.getElementById('circuitCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.symbolsContainer = document.querySelector('.logic-symbols-container');
    
    // VLSI Logic Symbols
    this.logicSymbols = ['+', '-', '*', '%', '&', '^', '<', '~', '|', '>>', '==', '!=', '&&', '||'];
    
    // Circuit nodes
    this.nodes = [];
    this.connections = [];
    
    this.init();
  }
  
  init() {
    this.resizeCanvas();
    this.createCircuitNodes();
    this.drawCircuit();
    this.startSymbolRain();
    
    // Redraw on window resize
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.createCircuitNodes();
      this.drawCircuit();
    });
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  // Create random circuit nodes
  createCircuitNodes() {
    const nodeCount = Math.floor((this.canvas.width * this.canvas.height) / 50000);
    this.nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
      this.nodes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 2
      });
    }
    
    // Create connections between nearby nodes
    this.connections = [];
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          this.connections.push({
            from: i,
            to: j,
            opacity: 1 - (distance / 150)
          });
        }
      }
    }
  }
  
  // Draw circuit board pattern
  drawCircuit() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw connections (circuit traces)
    this.connections.forEach(conn => {
      const from = this.nodes[conn.from];
      const to = this.nodes[conn.to];
      
      this.ctx.beginPath();
      this.ctx.moveTo(from.x, from.y);
      this.ctx.lineTo(to.x, to.y);
      this.ctx.strokeStyle = `rgba(244, 178, 58, ${conn.opacity * 0.2})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    });
    
    // Draw nodes (circuit components)
    this.nodes.forEach(node => {
      // Outer glow
      const gradient = this.ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, node.size * 3
      );
      gradient.addColorStop(0, 'rgba(244, 178, 58, 0.4)');
      gradient.addColorStop(1, 'rgba(244, 178, 58, 0)');
      
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.size * 3, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
      
      // Inner node
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(242, 138, 26, 0.6)';
      this.ctx.fill();
    });
    
    // Draw chip outline structures
    this.drawChipStructures();
  }
  
  // Draw chip-like rectangular structures
  drawChipStructures() {
    const structures = [
      { x: this.canvas.width * 0.1, y: this.canvas.height * 0.2, w: 120, h: 80 },
      { x: this.canvas.width * 0.7, y: this.canvas.height * 0.15, w: 100, h: 100 },
      { x: this.canvas.width * 0.3, y: this.canvas.height * 0.7, w: 90, h: 70 },
      { x: this.canvas.width * 0.85, y: this.canvas.height * 0.8, w: 80, h: 60 }
    ];
    
    structures.forEach(chip => {
      // Chip outline
      this.ctx.strokeStyle = 'rgba(244, 178, 58, 0.15)';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(chip.x, chip.y, chip.w, chip.h);
      
      // Chip pins (left side)
      for (let i = 0; i < 5; i++) {
        const pinY = chip.y + (chip.h / 6) * (i + 1);
        this.ctx.beginPath();
        this.ctx.moveTo(chip.x - 10, pinY);
        this.ctx.lineTo(chip.x, pinY);
        this.ctx.stroke();
      }
      
      // Chip pins (right side)
      for (let i = 0; i < 5; i++) {
        const pinY = chip.y + (chip.h / 6) * (i + 1);
        this.ctx.beginPath();
        this.ctx.moveTo(chip.x + chip.w, pinY);
        this.ctx.lineTo(chip.x + chip.w + 10, pinY);
        this.ctx.stroke();
      }
    });
  }
  
  // Start raining logic symbols
  startSymbolRain() {
    // Create initial symbols
    for (let i = 0; i < 20; i++) {
      setTimeout(() => this.createSymbol(), i * 500);
    }
    
    // Continuous symbol creation
    setInterval(() => {
      this.createSymbol();
    }, 2000);
  }
  
  // Create a single floating symbol
  createSymbol() {
    const symbol = document.createElement('div');
    symbol.className = 'logic-symbol';
    symbol.textContent = this.logicSymbols[
      Math.floor(Math.random() * this.logicSymbols.length)
    ];
    
    // Random horizontal position
    symbol.style.left = Math.random() * 100 + '%';
    
    // Random animation duration
    const duration = 15 + Math.random() * 10;
    symbol.style.animationDuration = duration + 's';
    
    // Random delay
    symbol.style.animationDelay = Math.random() * 2 + 's';
    
    // Random size variation
    const size = 18 + Math.random() * 12;
    symbol.style.fontSize = size + 'px';
    
    this.symbolsContainer.appendChild(symbol);
    
    // Remove after animation completes
    setTimeout(() => {
      symbol.remove();
    }, (duration + 2) * 1000);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new VLSIBackground();
});
