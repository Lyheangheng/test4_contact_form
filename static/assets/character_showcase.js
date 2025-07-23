// Character Showcase Interactions

document.addEventListener('DOMContentLoaded', function() {
    animateStatBars();
    setupCharacterCardInteractions();
    setupCarImageAnimation();
});

// Animate stat bars based on data-value
function animateStatBars() {
    const statFills = document.querySelectorAll('.stat-fill');
    statFills.forEach(fill => {
        const value = fill.getAttribute('data-value');
        if (value) {
            setTimeout(() => {
                fill.style.width = value + '%';
            }, 400); // Delay for smooth effect
        }
    });
}

// Character card hover and click interactions
function setupCharacterCardInteractions() {
    const cards = document.querySelectorAll('.character-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('active');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('active');
        });
        card.addEventListener('click', () => {
            const name = card.querySelector('.card-name').textContent;
            alert('Profile: ' + name + '\n(More info coming soon!)');
        });
    });
}

// Car image animation on hover
function setupCarImageAnimation() {
    const carImg = document.querySelector('.car-img');
    if (carImg) {
        carImg.addEventListener('mouseenter', () => {
            carImg.style.transform = 'scale(1.08) rotate(-2deg)';
            carImg.style.transition = 'transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275)';
        });
        carImg.addEventListener('mouseleave', () => {
            carImg.style.transform = '';
        });
    }
}
