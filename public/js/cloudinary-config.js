// js/cloudinary-config.js
const CLOUDINARY_CONFIG = {
    cloudName: 'dnpk35ygf',
    baseUrl: 'https://res.cloudinary.com/dnpk35ygf/image/upload',
    optimizations: {
        logo: 'w_300,q_80',
        hero: 'w_1920,q_80',
        gallery: 'w_800,q_80',
        thumbnail: 'w_400,q_80',
        icon: 'w_64,q_80'
    }
};

function getCloudinaryUrl(imagePath, optimization = 'auto') {
    const cleanPath = imagePath.replace(/^\.\//, '');
    const opt = CLOUDINARY_CONFIG.optimizations[optimization] || 'w_auto,q_auto,f_auto';
    return `${CLOUDINARY_CONFIG.baseUrl}/${opt}/yaahman-refreshment/${encodeURIComponent(cleanPath)}`;
}

// Auto-update images with data-cloudinary attribute
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-cloudinary]');
    images.forEach(img => {
        const src = img.getAttribute('data-cloudinary');
        const optimization = img.getAttribute('data-opt') || 'auto';
        img.src = getCloudinaryUrl(src, optimization);
    });
});