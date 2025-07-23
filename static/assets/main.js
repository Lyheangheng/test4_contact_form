document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initializeCardInteractions();
    initializeThumbnailGallery();
    initializeStarRatings();
    initializeStatAnimations();
    initializeParallaxEffect();
});

// Card hover and click interactions
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.character-card');
    
    cards.forEach(card => {
        // Add hover sound effect simulation
        card.addEventListener('mouseenter', () => {
            // Simulate hover sound
            playHoverEffect(card);
        });
        
        // Add click interaction
        card.addEventListener('click', () => {
            toggleCardExpansion(card);
        });
        
        // Add touch support for mobile
        card.addEventListener('touchstart', (e) => {
            e.preventDefault();
            card.classList.add('touched');
        });
        
        card.addEventListener('touchend', () => {
            card.classList.remove('touched');
        });
    });
}

// Thumbnail gallery functionality
function initializeThumbnailGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Remove active class from siblings
            const siblings = thumbnail.parentNode.querySelectorAll('.thumbnail');
            siblings.forEach(sibling => sibling.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
            
            // Animate thumbnail selection
            animateThumbnailSelection(thumbnail);
            
            // Update main portrait (simulation)
            updateMainPortrait(thumbnail, index);
        });
        
        // Add hover effects
        thumbnail.addEventListener('mouseenter', () => {
            if (!thumbnail.classList.contains('active')) {
                thumbnail.style.transform = 'translateY(-5px) scale(1.1)';
            }
        });
        
        thumbnail.addEventListener('mouseleave', () => {
            if (!thumbnail.classList.contains('active')) {
                thumbnail.style.transform = '';
            }
        });
    });
}

// Star rating interactions
function initializeStarRatings() {
    const starContainers = document.querySelectorAll('.stars');
    
    starContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        
        stars.forEach((star, index) => {
            star.addEventListener('mouseenter', () => {
                // Light up stars up to hovered star
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('active');
                        s.style.transform = 'scale(1.2)';
                    } else {
                        s.classList.remove('active');
                        s.style.transform = '';
                    }
                });
            });
            
            star.addEventListener('click', (e) => {
                e.stopPropagation();
                // Set permanent rating
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('active');
                        s.setAttribute('data-rating', index + 1);
                    } else {
                        s.classList.remove('active');
                    }
                });
                
                // Animate rating selection
                animateRatingSelection(stars, index);
            });
        });
        
        // Reset on mouse leave
        container.addEventListener('mouseleave', () => {
            stars.forEach(star => {
                star.style.transform = '';
                // Restore original rating if set
                const rating = star.getAttribute('data-rating') || 5;
                const starIndex = Array.from(stars).indexOf(star);
                if (starIndex < rating) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });
        });
    });
}

// Stats animation
function initializeStatAnimations() {
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(statItem => {
        const statValue = statItem.querySelector('.stat-value');
        const targetValue = parseInt(statValue.textContent);
        
        statItem.addEventListener('mouseenter', () => {
            animateStatValue(statValue, targetValue);
        });
        
        statItem.addEventListener('click', (e) => {
            e.stopPropagation();
            // Create floating text effect
            createFloatingText(statItem, `+${targetValue}`);
        });
    });
}

// Parallax scrolling effect
function initializeParallaxEffect() {
    window.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.character-card');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        cards.forEach(card => {
            const background = card.querySelector('.card-background');
            const content = card.querySelector('.card-content');
            
            // Subtle parallax movement
            background.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px) scale(1.1)`;
            content.style.transform = `translate(${mouseX * -10}px, ${mouseY * -10}px)`;
        });
    });
}

// Helper functions
function playHoverEffect(card) {
    // Add visual feedback
    card.style.filter = 'brightness(1.1)';
    
    setTimeout(() => {
        card.style.filter = '';
    }, 200);
}

function toggleCardExpansion(card) {
    const isExpanded = card.classList.contains('expanded');
    
    // Remove expanded class from all cards
    document.querySelectorAll('.character-card').forEach(c => {
        c.classList.remove('expanded');
    });
    
    if (!isExpanded) {
        card.classList.add('expanded');
        // Animate expansion
        card.style.transform = 'scale(1.05) translateY(-20px)';
        card.style.zIndex = '10';
        
        // Show additional details (simulation)
        showCharacterDetails(card);
    } else {
        card.style.transform = '';
        card.style.zIndex = '';
        hideCharacterDetails(card);
    }
}

function animateThumbnailSelection(thumbnail) {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    thumbnail.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function updateMainPortrait(thumbnail, index) {
    const card = thumbnail.closest('.character-card');
    const portrait = card.querySelector('.main-portrait');
    
    // Simulate image change with fade effect
    portrait.style.opacity = '0.5';
    portrait.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        portrait.style.opacity = '1';
        portrait.style.transform = 'scale(1)';
        
        // Add sparkle effect
        createSparkleEffect(portrait);
    }, 300);
}

function animateRatingSelection(stars, selectedIndex) {
    stars.forEach((star, index) => {
        if (index <= selectedIndex) {
            star.style.animation = `starBurst 0.6s ease-out ${index * 0.1}s`;
        }
    });
    
    // Add burst animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes starBurst {
            0% { transform: scale(1); }
            50% { transform: scale(1.5) rotate(180deg); }
            100% { transform: scale(1) rotate(0deg); }
        }
    `;
    document.head.appendChild(style);
}

function animateStatValue(statValue, targetValue) {
    let currentValue = 0;
    const increment = targetValue / 20;
    const animation = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(animation);
        }
        statValue.textContent = Math.floor(currentValue);
    }, 50);
}

function createFloatingText(element, text) {
    const floatingText = document.createElement('div');
    floatingText.textContent = text;
    floatingText.style.cssText = `
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        color: #00ff88;
        font-weight: bold;
        font-size: 1.2rem;
        pointer-events: none;
        animation: floatUp 2s ease-out forwards;
        z-index: 1000;
    `;
    
    element.appendChild(floatingText);
    
    setTimeout(() => {
        floatingText.remove();
    }, 2000);
    
    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            100% {
                opacity: 0;
                transform: translateX(-50%) translateY(-50px);
            }
        }
    `;
    document.head.appendChild(style);
}

function createSparkleEffect(element) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #ffd700;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: sparkle 1s ease-out forwards;
            pointer-events: none;
        `;
        
        element.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
    
    // Add sparkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle {
            0% {
                opacity: 1;
                transform: scale(0);
            }
            50% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0);
            }
        }
    `;
    document.head.appendChild(style);
}

function showCharacterDetails(card) {
    // Create additional info panel (simulation)
    const detailsPanel = document.createElement('div');
    detailsPanel.className = 'character-details';
    detailsPanel.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        padding: 20px;
        transform: translateY(100%);
        transition: transform 0.3s ease;
        z-index: 5;
    `;
    
    detailsPanel.innerHTML = `
        <h4 style="color: white; margin-bottom: 10px;">Character Details</h4>
        <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">
            Click thumbnails to view different images. Hover over stats for animations.
        </p>
    `;
    
    card.appendChild(detailsPanel);
    
    setTimeout(() => {
        detailsPanel.style.transform = 'translateY(0)';
    }, 100);
}

function hideCharacterDetails(card) {
    const detailsPanel = card.querySelector('.character-details');
    if (detailsPanel) {
        detailsPanel.style.transform = 'translateY(100%)';
        setTimeout(() => {
            detailsPanel.remove();
        }, 300);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const cards = document.querySelectorAll('.character-card');
    const focusedCard = document.querySelector('.character-card:focus');
    
    if (e.key === 'Enter' && focusedCard) {
        toggleCardExpansion(focusedCard);
    }
    
    if (e.key === 'Escape') {
        cards.forEach(card => {
            card.classList.remove('expanded');
            card.style.transform = '';
            card.style.zIndex = '';
            hideCharacterDetails(card);
        });
    }
});

// Make cards focusable for accessibility
document.querySelectorAll('.character-card').forEach(card => {
    card.setAttribute('tabindex', '0');
});