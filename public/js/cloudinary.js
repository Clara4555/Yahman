// public/js/cloudinary.js
class CloudinaryHelper {
    constructor() {
        this.cloudName = 'dnpk35ygf'; // Your cloud name
        this.baseUrl = `https://res.cloudinary.com/${this.cloudName}/image/upload`;
    }

    // Generate Cloudinary URL with optimizations
    getImageUrl(path, options = {}) {
        // Remove leading ./ from path
        const cleanPath = path.replace(/^\.\//, '');
        
        // Default optimizations for web
        const defaultOptions = {
            quality: 'auto',
            fetch_format: 'auto',
            width: 'auto',
            crop: 'scale',
            ...options
        };
        
        // Build transformation string
        const transformations = Object.entries(defaultOptions)
            .map(([key, value]) => `${key}_${value}`)
            .join(',');
        
        return `${this.baseUrl}/${transformations}/yaahman-refreshment/${cleanPath}`;
    }

    // Specific methods for different image types
    getLogoUrl(logoPath) {
        return this.getImageUrl(logoPath, {
            width: 300,
            quality: 80
        });
    }

    getGalleryImageUrl(imagePath) {
        return this.getImageUrl(imagePath, {
            width: 800,
            quality: 'auto',
            fetch_format: 'auto'
        });
    }

    getHeroImageUrl(imagePath) {
        return this.getImageUrl(imagePath, {
            width: 1920,
            quality: 80,
            fetch_format: 'auto'
        });
    }
}

// Create global instance
window.cloudinaryHelper = new CloudinaryHelper();