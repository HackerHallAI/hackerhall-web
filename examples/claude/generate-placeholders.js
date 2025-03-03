// This script uses the Canvas API to generate placeholder images
// Run this in a browser console or save as an HTML file

function generatePlaceholder(name, width, height, color) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, width, height);
    
    // Grid lines
    ctx.strokeStyle = color + '33'; // Semi-transparent
    ctx.lineWidth = 1;
    
    // Draw grid
    for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    // Draw text
    ctx.fillStyle = color;
    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name, width/2, height/2);
    
    // Return data URL
    return canvas.toDataURL('image/jpeg', 0.9);
}

// Generate placeholders
const zombieApocalypse = generatePlaceholder('AI Zombie Apocalypse', 800, 450, '#CC5500');
const neuralRacer = generatePlaceholder('Neural Network Racer', 800, 450, '#00FFFF');
const hackerDefense = generatePlaceholder('Hacker Defense', 800, 450, '#6A0DAD');

// Log the data URLs to save them
console.log('Zombie Apocalypse:', zombieApocalypse);
console.log('Neural Racer:', neuralRacer);
console.log('Hacker Defense:', hackerDefense); 