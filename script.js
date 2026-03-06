// This file controls the interactive features of the portfolio
document.addEventListener("DOMContentLoaded", function() {
    console.log("Website loaded successfully.");
    
    // Add subtle interactive features to the project cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.opacity = '1';
        });
    });
});
