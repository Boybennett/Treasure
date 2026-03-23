// Variable to ensure the message only reveals once per load
let isRevealed = false;

function revealMessage() {
    if (isRevealed) return; // Prevent multiple clicks interfering
    isRevealed = true;

    const heart = document.getElementById('heart');
    const message = document.getElementById('message');
    const title = document.getElementById('title');
    const tap = document.getElementById('tap');
    
    tap.innerHTML = " "
    // 1. Visually hide the title and stop the gentle pulsing
    title.style.opacity = '0';
    heart.style.animation = 'none'; // Stop base CSS pulse

    // 2. Perform a grander "pop" effect on click
    heart.style.transform = 'scale(1.6) rotate(15deg)';
    
    setTimeout(() => {
        heart.style.transform = 'scale(1)';
        heart.style.opacity = '0.7'; // Fade heart slightly after click
        title.classList.add('hidden'); // Fully remove title from layout
    }, 400);

    // 3. Reveal the main message with its CSS transition
    setTimeout(() => {
        message.classList.remove('hidden');
        // Force reflow for transition to trigger
        void message.offsetWidth; 
        message.classList.add('revealed');
    }, 600);

    // 4. Create floating hearts effect
    createFloatingHearts();
}

function createFloatingHearts() {
    // Generate 18 hearts for a gentle, upward confetti feel
    const heartSymbols = ['❤️', '💖', '💝', '💕'];
    const container = document.body;

    for (let i = 0; i < 18; i++) {
        const heartEl = document.createElement('div');
        
        // Use a random heart symbol from the list
        heartEl.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        heartEl.classList.add('floating-heart');
        
        // Randomize speed, horizontal position, and starting scale
        heartEl.style.left = (Math.random() * 90 + 5) + 'vw';
        heartEl.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heartEl.style.fontSize = (Math.random() * 15 + 15) + 'px';
        heartEl.style.opacity = Math.random() * 0.7 + 0.3;
        
        container.appendChild(heartEl);

        // Remove the element after animation ends to free up memory
        setTimeout(() => {
            heartEl.remove();
        }, 6000); // 6s ensures all hearts finish animation
    }
}