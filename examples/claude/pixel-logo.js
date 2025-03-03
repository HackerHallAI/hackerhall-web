/**
 * HackerHall Pixel Logo Generator
 * 
 * This script creates a pixel art version of the HackerHall logo
 * and saves it as an image file.
 * 
 * To use:
 * 1. Create a new file named pixel-logo.js with this content
 * 2. Run it with Node.js: node pixel-logo.js
 * 3. It will generate hackerhall-pixel-logo.png in the same directory
 */

const fs = require('fs');
const { createCanvas } = require('canvas');

// Canvas size (32x32 pixels)
const size = 32;
const scale = 10; // Scale for better visibility when saving
const canvas = createCanvas(size * scale, size * scale);
const ctx = canvas.getContext('2d');

// Define colors
const colors = {
  background: '#0a0a0a',
  dark: '#121212',
  primary: '#CC5500',    // Burnt Orange
  secondary: '#00FFFF',  // Electric Cyan
  accent: '#6A0DAD',     // Deep Purple
};

// Clear canvas with dark background
ctx.fillStyle = colors.background;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Create pixel grid
const grid = Array(size).fill().map(() => Array(size).fill(null));

// Fill the grid with pixel art
function createPixelArt() {
  // Draw circular dark background
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const distance = Math.sqrt(Math.pow(x - size/2, 2) + Math.pow(y - size/2, 2));
      if (distance < size/2) {
        grid[y][x] = colors.dark;
      }
    }
  }
  
  // Draw "H" shape
  // Left vertical line
  for (let y = 8; y < 24; y++) {
    grid[y][10] = colors.primary;
    grid[y][11] = colors.primary;
  }
  
  // Right vertical line
  for (let y = 8; y < 24; y++) {
    grid[y][20] = colors.primary;
    grid[y][21] = colors.primary;
  }
  
  // Horizontal middle line
  for (let x = 10; x < 22; x++) {
    grid[15][x] = colors.primary;
    grid[16][x] = colors.primary;
  }
  
  // Add cyberpunk circuit lines
  for (let x = 5; x < 27; x++) {
    if (x % 3 === 0) {
      grid[6][x] = colors.secondary;
      grid[25][x] = colors.secondary;
    }
  }
  
  for (let y = 8; y < 24; y++) {
    if (y % 4 === 0) {
      grid[y][5] = colors.secondary;
      grid[y][26] = colors.secondary;
    }
  }
  
  // Add glowing dots at corners and intersections
  const glowDots = [
    [8, 8], [8, 23], [23, 8], [23, 23],
    [15, 8], [15, 23], [8, 15], [23, 15]
  ];
  
  glowDots.forEach(([y, x]) => {
    grid[y][x] = colors.accent;
  });
  
  // Add some pixel noise for texture
  for (let i = 0; i < 20; i++) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    if (grid[y][x] === colors.dark || grid[y][x] === null) {
      const alpha = Math.random() * 0.3;
      const colorChoice = Math.random();
      let color;
      
      if (colorChoice < 0.33) {
        color = `rgba(204, 85, 0, ${alpha})`;  // Primary
      } else if (colorChoice < 0.66) {
        color = `rgba(0, 255, 255, ${alpha})`;  // Secondary
      } else {
        color = `rgba(106, 13, 173, ${alpha})`;  // Accent
      }
      
      grid[y][x] = color;
    }
  }
}

// Render the grid to canvas
function renderPixelArt() {
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (grid[y][x]) {
        ctx.fillStyle = grid[y][x];
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }
  
  // Add a subtle glow effect
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = 'rgba(204, 85, 0, 0.1)';
  ctx.beginPath();
  ctx.arc(size/2 * scale, size/2 * scale, size/2.5 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  // Add a second glow layer
  ctx.fillStyle = 'rgba(0, 255, 255, 0.05)';
  ctx.beginPath();
  ctx.arc(size/2 * scale, size/2 * scale, size/2.2 * scale, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.globalCompositeOperation = 'source-over';
}

// Create and render the pixel art
createPixelArt();
renderPixelArt();

// Save to file
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./hackerhall-pixel-logo.png', buffer);

console.log('Pixel logo created: hackerhall-pixel-logo.png'); 