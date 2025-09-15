// Simple QR Code generator using canvas
// This is a minimal implementation for basic QR codes
function generateQRCode(text, elementId, size = 220) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = size;
    canvas.height = size;
    
    // For simplicity, we'll create a visual representation
    // In a real implementation, you'd use a proper QR algorithm
    // This creates a placeholder QR-like pattern
    
    const cellSize = size / 25; // 25x25 grid
    
    // Fill background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    
    // Draw border
    ctx.fillStyle = '#1c5c93';
    ctx.fillRect(0, 0, size, cellSize * 2);
    ctx.fillRect(0, 0, cellSize * 2, size);
    ctx.fillRect(size - cellSize * 2, 0, cellSize * 2, size);
    ctx.fillRect(0, size - cellSize * 2, size, cellSize * 2);
    
    // Draw corner squares (finder patterns)
    drawFinderPattern(ctx, cellSize, cellSize, cellSize * 6);
    drawFinderPattern(ctx, size - cellSize * 7, cellSize, cellSize * 6);
    drawFinderPattern(ctx, cellSize, size - cellSize * 7, cellSize * 6);
    
    // Draw some data pattern based on text
    const hash = simpleHash(text);
    for (let i = 3; i < 22; i++) {
        for (let j = 3; j < 22; j++) {
            if ((hash >> (i + j)) & 1) {
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }
    
    // Add canvas to element
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    element.appendChild(canvas);
    
    // Add text below for accessibility
    const textDiv = document.createElement('div');
    textDiv.style.marginTop = '10px';
    textDiv.style.fontSize = '12px';
    textDiv.style.color = '#666';
    textDiv.style.wordBreak = 'break-all';
    textDiv.textContent = text;
    element.appendChild(textDiv);
}

function drawFinderPattern(ctx, x, y, size) {
    const cellSize = size / 6;
    
    // Outer black square
    ctx.fillStyle = '#1c5c93';
    ctx.fillRect(x, y, size, size);
    
    // Inner white square
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + cellSize, y + cellSize, size - 2 * cellSize, size - 2 * cellSize);
    
    // Center black square
    ctx.fillStyle = '#1c5c93';
    ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, size - 4 * cellSize, size - 4 * cellSize);
}

function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}