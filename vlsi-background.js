// Digital Data Rain Background - Matrix Style
// Author: CORETEXELA Team
// Description: Binary code rain with glowing particles

class VLSIBackground {
  constructor() {
    this.canvas = document.getElementById('circuitCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.symbolsContainer = document.querySelector('.logic-symbols-container');
    
    // Binary digits and tech symbols
    this.binarySymbols = ['0', '1', '0', '1', '0', '1', '01', '10', '11', '00'];
    this.techSymbols = ['+', '-', '*', '/', '&', '|', '^', '~', '<', '>', '='];
    
    // Circuit nodes
    this.nodes = [];
    this.connections = [];
    
    this.init();
  }
  
  init() {
    this.resizeCanvas();
    this.createCircuitNodes();
    this.drawCircuit();
    this.startDigitalRain();
    
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
    const nodeCount = Math.floor((this.canvas.width * this.canvas.height) / 80000);
    this.nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
      this.nodes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 1
      });
    }
    
    // Create connections between nearby nodes
    this.connections = [];
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          this.connections.push({
            from: i,
            to: j,
            opacity: 1 - (distance / 120)
          });
        }
      }
    }
  }
  
  // Draw circuit board pattern
  drawCircuit() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw connections (circuit traces) - cyan blue
    this.connections.forEach(conn => {
      const from = this.nodes[conn.from];
      const to = this.nodes[conn.to];
      
      this.ctx.beginPath();
      this.ctx.moveTo(from.x, from.y);
      this.ctx.lineTo(to.x, to.y);
      this.ctx.strokeStyle = `rgba(0, 217, 255, ${conn.opacity * 0.15})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    });
    
    // Draw nodes (circuit components) - glowing blue
    this.nodes.forEach(node => {
      // Outer glow
      const gradient = this.ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, node.size * 4
      );
      gradient.addColorStop(0, 'rgba(0, 217, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
      
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.size * 4, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
      
      // Inner node - bright blue
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(0, 255, 255, 0.4)';
      this.ctx.fill();
    });
  }
  
  // Start digital rain effect
  startDigitalRain() {
    // Create initial rain columns
    const columnCount = Math.floor(window.innerWidth / 40);
    
    for (let i = 0; i < columnCount; i++) {
      setTimeout(() => {
        this.createRainColumn(i * 40);
      }, i * 100);
    }
    
    // Continuous rain creation
    setInterval(() => {
      const randomX = Math.random() * window.innerWidth;
      this.createRainColumn(randomX);
    }, 300);
  }
  
  // Create a column of falling symbols
  createRainColumn(xPosition) {
    const symbolCount = Math.floor(Math.random() * 8) + 5;
    
    for (let i = 0; i < symbolCount; i++) {
      setTimeout(() => {
        this.createFallingSymbol(xPosition, i);
      }, i * 80);
    }
  }
  
  // Create a single falling symbol
  createFallingSymbol(xPosition, index) {
    const symbol = document.createElement('div');
    symbol.className = 'logic-symbol';
    
    // Mix of binary and tech symbols (80% binary, 20% tech)
    const useBinary = Math.random() < 0.8;
    symbol.textContent = useBinary 
      ? this.binarySymbols[Math.floor(Math.random() * this.binarySymbols.length)]
      : this.techSymbols[Math.floor(Math.random() * this.techSymbols.length)];
    
    // Position
    symbol.style.left = xPosition + (Math.random() * 20 - 10) + 'px';
    symbol.style.top = '-50px';
    
    // Random animation duration (speed)
    const duration = 6 + Math.random() * 8;
    symbol.style.animationDuration = duration + 's';
    
    // Random delay
    symbol.style.animationDelay = Math.random() * 0.5 + 's';
    
    // Random size variation
    const size = 12 + Math.random() * 10;
    symbol.style.fontSize = size + 'px';
    
    this.symbolsContainer.appendChild(symbol);
    
    // Remove after animation completes
    setTimeout(() => {
      symbol.remove();
    }, (duration + 1) * 1000);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new VLSIBackground();
});
