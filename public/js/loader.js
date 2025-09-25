// Loader functionality
class LoaderManager {
    constructor() {
        this.progress = 0;
        this.progressElement = document.getElementById('progressFill');
        this.progressTextElement = document.getElementById('progressText');
        this.assets = [];
        this.loadedAssets = 0;
    }

    updateProgress(percentage, message = null) {
        this.progress = Math.max(0, Math.min(100, percentage));
        
        if (this.progressElement) {
            this.progressElement.style.width = this.progress + '%';
        }
        
        if (this.progressTextElement) {
            const displayMessage = message || `Loading assets... ${Math.round(this.progress)}%`;
            this.progressTextElement.textContent = displayMessage;
        }
    }

    addAsset(url, type = 'image') {
        this.assets.push({ url, type, loaded: false });
        return this.assets.length - 1;
    }

    async preloadAssets() {
        const totalAssets = this.assets.length;
        if (totalAssets === 0) {
            this.updateProgress(100, 'Loading complete!');
            return Promise.resolve();
        }

        const loadPromises = this.assets.map((asset, index) => {
            return this.loadAsset(asset, index);
        });

        // Ensure minimum loading time for visual feedback
        const minLoadTime = new Promise(resolve => setTimeout(resolve, 2000));
        
        await Promise.all([Promise.all(loadPromises), minLoadTime]);
        
        this.updateProgress(100, 'Loading complete!');
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    async loadAsset(asset, index) {
        try {
            switch (asset.type) {
                case 'image':
                    await this.loadImage(asset.url);
                    break;
                case 'pdf':
                    await this.loadPDF(asset.url);
                    break;
                case 'font':
                    await this.loadFont(asset.url);
                    break;
                case 'script':
                    await this.loadScript(asset.url);
                    break;
                default:
                    await this.loadGeneric(asset.url);
            }
            
            asset.loaded = true;
            this.loadedAssets++;
            
            // Update progress
            const percentage = (this.loadedAssets / this.assets.length) * 100;
            this.updateProgress(percentage);
            
        } catch (error) {
            console.warn(`Failed to load asset: ${asset.url}`, error);
            asset.loaded = false;
            this.loadedAssets++;
            
            // Still update progress even on failure
            const percentage = (this.loadedAssets / this.assets.length) * 100;
            this.updateProgress(percentage);
        }
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
            img.src = src;
            
            // Set a timeout to prevent hanging
            setTimeout(() => reject(new Error(`Timeout loading image: ${src}`)), 10000);
        });
    }

    loadPDF(url) {
        return fetch(url, { method: 'HEAD' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`PDF not found: ${url}`);
                }
                return response;
            })
            .catch(error => {
                console.warn(`PDF preload failed: ${url}`, error);
                // Don't reject, just warn and continue
                return null;
            });
    }

    loadFont(url) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.onload = () => resolve();
            link.onerror = () => reject(new Error(`Failed to load font: ${url}`));
            
            document.head.appendChild(link);
            
            // Set a timeout
            setTimeout(() => reject(new Error(`Timeout loading font: ${url}`)), 8000);
        });
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            
            document.head.appendChild(script);
            
            // Set a timeout
            setTimeout(() => reject(new Error(`Timeout loading script: ${src}`)), 10000);
        });
    }

    loadGeneric(url) {
        return fetch(url, { method: 'HEAD' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load: ${url}`);
                }
                return response;
            });
    }

    // Simulate loading progress for visual effect
    simulateProgress(duration = 2000) {
        const startTime = Date.now();
        const interval = 50;
        
        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const percentage = Math.min((elapsed / duration) * 90, 90); // Max 90% for simulation
            
            this.updateProgress(percentage);
            
            if (elapsed < duration) {
                setTimeout(updateProgress, interval);
            }
        };
        
        updateProgress();
    }
}

// Initialize loader when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.loaderManager = new LoaderManager();
    
    // Add critical assets to preload
    if (window.loaderManager) {
        // Add hero images
        window.loaderManager.addAsset('https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg?auto=compress&cs=tinysrgb&w=800', 'image');
        
        // Add about section image
        window.loaderManager.addAsset('https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600', 'image');
    }
});

// Enhanced loader animations
function initializeLoaderAnimations() {
    const loaderDots = document.querySelectorAll('.loading-dots span');
    const logoText = document.querySelector('.logo-text');
    
    // Stagger dot animations
    loaderDots.forEach((dot, index) => {
        dot.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add floating animation to logo
    if (logoText) {
        logoText.style.animation = 'logoFloat 3s ease-in-out infinite alternate';
    }
    
    // Add particle effect to background
    createParticleEffect();
}

function createParticleEffect() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'loader-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: floatParticle ${5 + Math.random() * 5}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        loader.appendChild(particle);
    }
    
    // Add particle animation keyframes
    if (!document.querySelector('#particle-animations')) {
        const style = document.createElement('style');
        style.id = 'particle-animations';
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeLoaderAnimations);

// Export for global access
window.LoaderManager = LoaderManager;