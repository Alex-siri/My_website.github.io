const fs = require('fs');
let html = fs.readFileSync('Alex Gym.html', 'utf8');

// Replace the trainers layout
html = html.replace(/<div class="box animate-on-scroll" id="trainers">([\s\S]*?)<div class="team">([\s\S]*?)(?=<\/div>\s*<\/div>\s*<div class="box|\Z)/, (match, prefix, teamContent) => {
    // extract until the end of the team
    return `<div class="box animate-on-scroll" id="trainers">${prefix}<div class="split-layout">
        <div class="split-cards">
${teamContent}        </div>
        <div class="split-text animate-on-scroll">
            <h3 style="color: var(--tertiary); margin-bottom: 15px; font-size: 2rem;">World Class Experts</h3>
            <p>Our trainers are the heartbeat of Alex Gym. We don't just hire fitness instructors; we bring on dedicated professionals who are deeply passionate about transformation and human performance.</p>
            <br>
            <p>With specialties spanning strength conditioning, yoga, mobility, and comprehensive nutritional planning, our team works cohesively to ensure every aspect of your health is covered. Let our certified experts guide you safely to your maximum potential.</p>
        </div>
    </div>`;
});

// We need a more accurate regex or DOM parsing to safely replace the nested divs.
// Doing it via straightforward string replacement might be risky with nested divs.
// Let's write a simple custom replacer.
