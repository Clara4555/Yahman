// Enhanced Loader with Progress Simulation
class EnhancedLoader {
    constructor() {
        this.progress = 0;
        this.loader = document.getElementById('loader');
        this.landingPage = document.getElementById('landingPage');
        this.init();
    }

    init() {
        this.setupProgressSimulation();
        this.setupLoadingMessages();
        this.setupLoaderAnimations();
        console.log('🎯 Enhanced Loader Initialized');
    }

    setupProgressSimulation() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        const loadingStages = [
            { message: "Initializing premium experience...", weight: 10 },
            { message: "Loading cocktail recipes...", weight: 20 },
            { message: "Preparing service modules...", weight: 30 },
            { message: "Optimizing for your device...", weight: 20 },
            { message: "Final touches...", weight: 15 },
            { message: "Ready to serve! 🍹", weight: 5 }
        ];
        
        let currentStage = 0;
        let stageProgress = 0;
        
        const simulateProgress = () => {
            if (currentStage >= loadingStages.length) {
                this.progress = 100;
                progressFill.style.width = '100%';
                progressText.textContent = loadingStages[loadingStages.length - 1].message + ' 100%';
                this.completeLoading();
                return;
            }
            
            const stage = loadingStages[currentStage];
            const increment = (stage.weight / 100) * (0.5 + Math.random() * 0.5);
            
            stageProgress += increment;
            this.progress = Math.min(
                loadingStages.slice(0, currentStage).reduce((sum, s) => sum + s.weight, 0) + stageProgress,
                100
            );
            
            progressFill.style.width = `${this.progress}%`;
            progressText.textContent = `${stage.message} ${Math.round(this.progress)}%`;
            
            if (stageProgress >= stage.weight) {
                currentStage++;
                stageProgress = 0;
            }
            
            // Random delay to simulate realistic loading
            const delay = 100 + Math.random() * 150;
            setTimeout(simulateProgress, delay);
        };
        
        simulateProgress();
    }

    setupLoadingMessages() {
        const messages = document.querySelectorAll('.loading-message');
        let currentIndex = 0;
        
        const rotateMessages = () => {
            messages.forEach(msg => msg.classList.remove('active'));
            messages[currentIndex].classList.add('active');
            currentIndex = (currentIndex + 1) % messages.length;
        };
        
        // Start rotation
        rotateMessages();
        setInterval(rotateMessages, 2500);
        
        // Add typing effect to first message
        this.typeWriterEffect(messages[0], "Welcome to Yaahman");
    }

    typeWriterEffect(element, text) {
        element.textContent = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        };
        
        type();
    }

    setupLoaderAnimations() {
        // Enhanced floating elements animation
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 2}s`;
            el.style.animationDuration = `${15 + index * 3}s`;
        });
        
        // Progress bar shimmer effect
        const progressGlow = document.querySelector('.progress-glow');
        progressGlow.style.animation = 'progressShimmer 2s linear infinite';
    }

    completeLoading() {
        // Final celebration before transition
        this.celebrateCompletion();
        
        setTimeout(() => {
            // Fade out loader
            this.loader.style.opacity = '0';
            this.loader.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            this.loader.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                this.loader.style.display = 'none';
                this.showLandingPage();
            }, 800);
        }, 1000);
    }

    celebrateCompletion() {
        // Add completion effects
        const loaderContent = document.querySelector('.loader-content');
        
        // Celebration animation
        loaderContent.style.animation = 'celebrate 1s ease forwards';
        
        // Confetti effect
        this.createConfetti();
        
        // Success sound (optional - would need audio file)
        this.playSuccessSound();
    }

    createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        this.loader.appendChild(confettiContainer);
        
        // Create confetti pieces
        const colors = ['#FF6B35', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${colors[i % colors.length]};
                top: -20px;
                left: ${Math.random() * 100}%;
                animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
                opacity: ${0.7 + Math.random() * 0.3};
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            confettiContainer.appendChild(confetti);
        }
        
        // Remove confetti after animation
        setTimeout(() => {
            confettiContainer.remove();
        }, 3000);
    }

    playSuccessSound() {
        // This would require an audio file
        // For now, we'll just log to console
        console.log('🎉 Loading complete!');
    }

    showLandingPage() {
        this.landingPage.classList.remove('hidden');
        
        // Animate landing page entrance
        this.landingPage.style.animation = 'landingPageEntrance 1.2s ease forwards';
        
        // Initialize landing page functionality
        this.initializeLandingPage();
    }

    initializeLandingPage() {
        // Landing page is now ready
        console.log('🏠 Landing page initialized');
        
        // Add any additional initialization here
        document.body.style.overflow = 'auto';
        
        // Trigger custom event for other scripts
        window.dispatchEvent(new Event('landingPageReady'));
    }
}

// Add confetti animation to CSS
const confettiStyles = document.createElement('style');
confettiStyles.textContent = `
    @keyframes confettiFall {
        0% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 1; 
        }
        100% { 
            transform: translateY(100vh) rotate(360deg); 
            opacity: 0; 
        }
    }
    
    @keyframes celebrate {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes landingPageEntrance {
        from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95); 
        }
        to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
        }
    }
`;
document.head.appendChild(confettiStyles);

// Initialize loader when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new EnhancedLoader();
    });
} else {
    new EnhancedLoader();
}