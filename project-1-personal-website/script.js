// Simple script to show the deployment time
document.getElementById('deploy-time').textContent = new Date().toLocaleString();

// Simulate a visitor counter (in a real project, this would connect to a backend)
const visitorCount = Math.floor(Math.random() * 100) + 50;
document.getElementById('visitor-count').textContent = 
    `Visitor Count: ${visitorCount} (simulated)`;