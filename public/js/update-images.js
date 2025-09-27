// update-all-images.js
const fs = require('fs');
const path = require('path');

const imageMappings = {
    './assets/Yaahmanlogo/YaahmanRefreshments/YaahMan Primary Logo.png': 'https://res.cloudinary.com/dnpk35ygf/image/upload/w_300,q_80/yaahman-refreshment/assets/Yaahmanlogo/YaahmanRefreshments/YaahMan%20Primary%20Logo.png',
    './assets/Yaahmanlogo/yaahmanfoods/YaahMan Logo.png': 'https://res.cloudinary.com/dnpk35ygf/image/upload/w_300,q_80/yaahman-refreshment/assets/Yaahmanlogo/yaahmanfoods/YaahMan%20Logo.png',
    './assets/YaahmanWebPicture/img-1.jpg': 'https://res.cloudinary.com/dnpk35ygf/image/upload/w_1920,q_80/yaahman-refreshment/assets/YaahmanWebPicture/img-1.jpg',
    './assets/YaahmanWebPicture/img-17.jpg': 'https://res.cloudinary.com/dnpk35ygf/image/upload/w_1920,q_80/yaahman-refreshment/assets/YaahmanWebPicture/img-17.jpg',
    './assets/YaahmanWebPicture/img-20.jpg': 'https://res.cloudinary.com/dnpk35ygf/image/upload/w_1920,q_80/yaahman-refreshment/assets/YaahmanWebPicture/img-20.jpg',
    './assets/YaahmanWebPicture/img-19.jpg': 'https://res.cloudinary.com/dnpk35ygf/image/upload/w_800,q_80/yaahman-refreshment/assets/YaahmanWebPicture/img-19.jpg',
    './assets/YaahmanWebPicture/img-18.jpeg': 'https://res.cloudinary.com/dnpk35ygf/image/upload/w_800,q_80/yaahman-refreshment/assets/YaahmanWebPicture/img-18.jpeg',
    './assets/YaahmanWebPicture/img-14.jpg': 'https://res.cloudinary.com/dnpk35ygf/image/upload/w_400,q_80/yaahman-refreshment/assets/YaahmanWebPicture/img-14.jpg',
    './assets/YaahmanWebPicture/img-15.jpg': 'https://res.cloudinary.com/dnpk35ygf/image/upload/w_400,q_80/yaahman-refreshment/assets/YaahmanWebPicture/img-15.jpg',
    './assets/YaahmanWebPicture/img-16.jpg': 'https://res.cloudinary.com/dnpk35ygf/image/upload/w_400,q_80/yaahman-refreshment/assets/YaahmanWebPicture/img-16.jpg',
    './assets/YaahmanWebPicture/img-11.jpg': 'https://res.cloudinary.com/dnpk35ygf/image/upload/w_800,q_80/yaahman-refreshment/assets/YaahmanWebPicture/img-11.jpg',
    './assets/YaahmanWebPicture/img-12.jpg': 'https://res.cloudinary.com/dnpk35ygf/image/upload/w_800,q_80/yaahman-refreshment/assets/YaahmanWebPicture/img-12.jpg'
};

const htmlFiles = ['about.html', 'booking.html', 'contact.html', 'gallery.html', 'home.html', 'index.html', 'menu.html', 'services.html'];

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, 'public', file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace each image path
        Object.entries(imageMappings).forEach(([oldPath, newUrl]) => {
            const regex = new RegExp(oldPath.replace(/\./g, '\\.').replace(/\s/g, '\\s'), 'g');
            content = content.replace(regex, newUrl);
        });
        
        fs.writeFileSync(filePath, content);
        console.log(`✅ Updated: ${file}`);
    }
});

console.log('🎉 All files updated with Cloudinary URLs!');