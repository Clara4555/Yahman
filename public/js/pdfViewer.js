// PDF Viewer functionality using PDF.js
class PDFViewer {
    constructor() {
        this.pdfDoc = null;
        this.pageNum = 1;
        this.pageCount = 0;
        this.scale = 1.2;
        this.canvas = null;
        this.ctx = null;
        this.isLoading = false;
        
        // Initialize PDF.js worker
        if (window.pdfjsLib) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
    }

    async loadPDF(url) {
        const pdfViewer = document.getElementById('pdfViewer');
        if (!pdfViewer) return;

        this.isLoading = true;
        this.showLoading();

        try {
            // For demo purposes, show a styled menu instead of actual PDF
            // In production, you would uncomment the PDF.js code below
            await this.showDemoMenu();
            
            /* Uncomment this section for actual PDF loading:
            
            if (!window.pdfjsLib) {
                throw new Error('PDF.js not loaded');
            }

            const loadingTask = pdfjsLib.getDocument(url);
            this.pdfDoc = await loadingTask.promise;
            this.pageCount = this.pdfDoc.numPages;
            
            // Create canvas for PDF rendering
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            
            pdfViewer.innerHTML = '';
            pdfViewer.appendChild(this.canvas);
            
            // Render first page
            await this.renderPage(1);
            
            // Update controls
            this.updatePageInfo();
            this.setupControls();
            
            */
            
        } catch (error) {
            console.error('Error loading PDF:', error);
            this.showError('Failed to load menu. Please try again later.');
        } finally {
            this.isLoading = false;
        }
    }

    async showDemoMenu() {
        const pdfViewer = document.getElementById('pdfViewer');
        
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        pdfViewer.innerHTML = `
            <div class="demo-menu" style="
                background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
                padding: 2rem;
                border-radius: 12px;
                max-width: 100%;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                font-family: 'Poppins', sans-serif;
            ">
                <div style="text-align: center; margin-bottom: 3rem;">
                    <h1 style="
                        color: #FF6B35;
                        font-size: 2.5rem;
                        font-weight: 800;
                        margin-bottom: 0.5rem;
                        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
                    ">Yaahman Foods</h1>
                    <p style="
                        color: #4ECDC4;
                        font-size: 1.2rem;
                        font-weight: 600;
                        letter-spacing: 2px;
                    ">PREMIUM BEVERAGE MENU</p>
                    <div style="
                        width: 100px;
                        height: 3px;
                        background: linear-gradient(90deg, #FF6B35, #4ECDC4);
                        margin: 1rem auto;
                        border-radius: 2px;
                    "></div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-bottom: 3rem;">
                    <div>
                        <h2 style="
                            color: #FF6B35;
                            font-size: 1.8rem;
                            font-weight: 700;
                            margin-bottom: 1.5rem;
                            border-bottom: 3px solid #FF6B35;
                            padding-bottom: 0.5rem;
                        ">🍸 Signature Cocktails</h2>
                        
                        <div class="menu-item" style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(255, 107, 53, 0.05); border-radius: 8px; border-left: 4px solid #FF6B35;">
                            <h3 style="color: #2C3E50; font-weight: 600; margin-bottom: 0.5rem;">Yaahman Special</h3>
                            <p style="color: #7F8C8D; line-height: 1.6; margin-bottom: 0.5rem;">Our signature house blend featuring tropical fruits, premium rum, and secret spices</p>
                            <span style="color: #FF6B35; font-weight: 600;">₦2,500</span>
                        </div>
                        
                        <div class="menu-item" style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(255, 107, 53, 0.05); border-radius: 8px; border-left: 4px solid #FF6B35;">
                            <h3 style="color: #2C3E50; font-weight: 600; margin-bottom: 0.5rem;">Caribbean Sunset</h3>
                            <p style="color: #7F8C8D; line-height: 1.6; margin-bottom: 0.5rem;">Premium rum with fresh pineapple, mango, and a hint of coconut</p>
                            <span style="color: #FF6B35; font-weight: 600;">₦2,200</span>
                        </div>
                        
                        <div class="menu-item" style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(255, 107, 53, 0.05); border-radius: 8px; border-left: 4px solid #FF6B35;">
                            <h3 style="color: #2C3E50; font-weight: 600; margin-bottom: 0.5rem;">Lagos Nights</h3>
                            <p style="color: #7F8C8D; line-height: 1.6; margin-bottom: 0.5rem;">Vodka-based cocktail with citrus twist and exotic African flavors</p>
                            <span style="color: #FF6B35; font-weight: 600;">₦2,000</span>
                        </div>
                        
                        <div class="menu-item" style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(255, 107, 53, 0.05); border-radius: 8px; border-left: 4px solid #FF6B35;">
                            <h3 style="color: #2C3E50; font-weight: 600; margin-bottom: 0.5rem;">Tropical Paradise</h3>
                            <p style="color: #7F8C8D; line-height: 1.6; margin-bottom: 0.5rem;">Coconut rum, passion fruit, and tropical mix</p>
                            <span style="color: #FF6B35; font-weight: 600;">₦2,300</span>
                        </div>
                    </div>

                    <div>
                        <h2 style="
                            color: #4ECDC4;
                            font-size: 1.8rem;
                            font-weight: 700;
                            margin-bottom: 1.5rem;
                            border-bottom: 3px solid #4ECDC4;
                            padding-bottom: 0.5rem;
                        ">🥤 Premium Mocktails</h2>
                        
                        <div class="menu-item" style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(78, 205, 196, 0.05); border-radius: 8px; border-left: 4px solid #4ECDC4;">
                            <h3 style="color: #2C3E50; font-weight: 600; margin-bottom: 0.5rem;">Virgin Mojito</h3>
                            <p style="color: #7F8C8D; line-height: 1.6; margin-bottom: 0.5rem;">Fresh mint, lime juice, and sparkling water with a twist</p>
                            <span style="color: #4ECDC4; font-weight: 600;">₦1,200</span>
                        </div>
                        
                        <div class="menu-item" style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(78, 205, 196, 0.05); border-radius: 8px; border-left: 4px solid #4ECDC4;">
                            <h3 style="color: #2C3E50; font-weight: 600; margin-bottom: 0.5rem;">Fruit Punch Paradise</h3>
                            <p style="color: #7F8C8D; line-height: 1.6; margin-bottom: 0.5rem;">Mixed tropical fruits with natural flavors and sparkling finish</p>
                            <span style="color: #4ECDC4; font-weight: 600;">₦1,500</span>
                        </div>
                        
                        <div class="menu-item" style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(78, 205, 196, 0.05); border-radius: 8px; border-left: 4px solid #4ECDC4;">
                            <h3 style="color: #2C3E50; font-weight: 600; margin-bottom: 0.5rem;">Cucumber Cooler</h3>
                            <p style="color: #7F8C8D; line-height: 1.6; margin-bottom: 0.5rem;">Refreshing cucumber, mint, and herbs with sparkling water</p>
                            <span style="color: #4ECDC4; font-weight: 600;">₦1,000</span>
                        </div>
                        
                        <div class="menu-item" style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(78, 205, 196, 0.05); border-radius: 8px; border-left: 4px solid #4ECDC4;">
                            <h3 style="color: #2C3E50; font-weight: 600; margin-bottom: 0.5rem;">Berry Blast</h3>
                            <p style="color: #7F8C8D; line-height: 1.6; margin-bottom: 0.5rem;">Mixed berries, natural sweeteners, and sparkling water</p>
                            <span style="color: #4ECDC4; font-weight: 600;">₦1,300</span>
                        </div>
                    </div>
                </div>

                <div style="
                    background: linear-gradient(135deg, #45B7D1, #4ECDC4);
                    padding: 2rem;
                    border-radius: 12px;
                    color: white;
                    text-align: center;
                    margin-bottom: 2rem;
                ">
                    <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">🎉 Professional Services</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; text-align: left;">
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 0.5rem;">✅ Professional bartender services</li>
                            <li style="margin-bottom: 0.5rem;">✅ Complete bar setup & breakdown</li>
                            <li style="margin-bottom: 0.5rem;">✅ Custom menu development</li>
                        </ul>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 0.5rem;">✅ Mobile bar rental</li>
                            <li style="margin-bottom: 0.5rem;">✅ Event planning consultation</li>
                            <li style="margin-bottom: 0.5rem;">✅ Staff training & coordination</li>
                        </ul>
                    </div>
                </div>

                <div style="text-align: center; padding: 1.5rem; background: rgba(45, 55, 72, 0.05); border-radius: 8px;">
                    <p style="
                        color: #2C3E50;
                        font-size: 1.1rem;
                        font-weight: 600;
                        margin-bottom: 0.5rem;
                    ">Ready to elevate your event?</p>
                    <p style="
                        color: #7F8C8D;
                        margin-bottom: 1rem;
                    ">Contact us for custom packages, group discounts, and event planning</p>
                    <div style="
                        color: #FF6B35;
                        font-weight: 600;
                        font-size: 1.1rem;
                    ">📞 +234 xxx xxx xxxx | 📧 info@yaahmanfoods.com</div>
                </div>
            </div>
        `;

        // Setup download functionality
        this.setupDownloadButton();
        
        // Hide PDF controls since we're showing a styled menu
        const pdfControls = document.querySelector('.pdf-controls');
        if (pdfControls) {
            pdfControls.style.display = 'none';
        }
    }

    async renderPage(num) {
        if (!this.pdfDoc || !this.canvas) return;

        const page = await this.pdfDoc.getPage(num);
        const viewport = page.getViewport({ scale: this.scale });
        
        this.canvas.height = viewport.height;
        this.canvas.width = viewport.width;
        
        const renderContext = {
            canvasContext: this.ctx,
            viewport: viewport
        };
        
        await page.render(renderContext).promise;
        this.pageNum = num;
    }

    showLoading() {
        const pdfViewer = document.getElementById('pdfViewer');
        if (pdfViewer) {
            pdfViewer.innerHTML = `
                <div class="pdf-loading" style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 400px;
                    color: #7F8C8D;
                ">
                    <div class="spinner" style="
                        width: 40px;
                        height: 40px;
                        border: 4px solid #f3f3f3;
                        border-top: 4px solid #FF6B35;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin-bottom: 1rem;
                    "></div>
                    <p style="font-size: 1.1rem; font-weight: 500;">Loading delicious menu...</p>
                    <p style="font-size: 0.9rem; opacity: 0.7;">Please wait while we prepare our offerings</p>
                </div>
            `;
        }
    }

    showError(message) {
        const pdfViewer = document.getElementById('pdfViewer');
        if (pdfViewer) {
            pdfViewer.innerHTML = `
                <div class="pdf-error" style="
                    text-align: center;
                    padding: 2rem;
                    color: #EF5350;
                    min-height: 300px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                ">
                    <div style="
                        font-size: 3rem;
                        margin-bottom: 1rem;
                        opacity: 0.7;
                    ">😞</div>
                    <h3 style="margin-bottom: 1rem; color: #2C3E50;">Oops! Something went wrong</h3>
                    <p style="margin-bottom: 1.5rem; color: #7F8C8D;">${message}</p>
                    <button onclick="window.pdfViewer.loadPDF('/assets/menu.pdf')" style="
                        background: linear-gradient(135deg, #FF6B35, #4ECDC4);
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: transform 0.3s ease;
                    " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        Try Again
                    </button>
                </div>
            `;
        }
    }

    setupControls() {
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        
        if (prevBtn && nextBtn) {
            prevBtn.onclick = () => this.previousPage();
            nextBtn.onclick = () => this.nextPage();
        }
    }

    setupDownloadButton() {
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.onclick = () => {
                // Create a downloadable HTML version of the menu
                this.downloadMenuAsHTML();
            };
        }
    }

    downloadMenuAsHTML() {
        const menuContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Yaahman Foods Menu</title>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .menu-container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #FF6B35; font-size: 2.5rem; margin: 0; }
        .header p { color: #4ECDC4; font-weight: bold; letter-spacing: 2px; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 5px; }
        .menu-item { margin: 15px 0; padding: 10px; background: #f9f9f9; border-left: 4px solid #4ECDC4; }
        .item-name { font-weight: bold; color: #333; }
        .item-price { color: #FF6B35; font-weight: bold; float: right; }
        .services { background: linear-gradient(135deg, #45B7D1, #4ECDC4); color: white; padding: 20px; border-radius: 10px; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="menu-container">
        <div class="header">
            <h1>Yaahman Foods</h1>
            <p>PREMIUM BEVERAGE MENU</p>
        </div>
        
        <div class="section">
            <h2>🍸 Signature Cocktails</h2>
            <div class="menu-item">
                <span class="item-name">Yaahman Special</span>
                <span class="item-price">₦2,500</span>
                <br><small>Our signature house blend featuring tropical fruits, premium rum, and secret spices</small>
            </div>
            <div class="menu-item">
                <span class="item-name">Caribbean Sunset</span>
                <span class="item-price">₦2,200</span>
                <br><small>Premium rum with fresh pineapple, mango, and a hint of coconut</small>
            </div>
            <div class="menu-item">
                <span class="item-name">Lagos Nights</span>
                <span class="item-price">₦2,000</span>
                <br><small>Vodka-based cocktail with citrus twist and exotic African flavors</small>
            </div>
            <div class="menu-item">
                <span class="item-name">Tropical Paradise</span>
                <span class="item-price">₦2,300</span>
                <br><small>Coconut rum, passion fruit, and tropical mix</small>
            </div>
        </div>
        
        <div class="section">
            <h2>🥤 Premium Mocktails</h2>
            <div class="menu-item">
                <span class="item-name">Virgin Mojito</span>
                <span class="item-price">₦1,200</span>
                <br><small>Fresh mint, lime juice, and sparkling water with a twist</small>
            </div>
            <div class="menu-item">
                <span class="item-name">Fruit Punch Paradise</span>
                <span class="item-price">₦1,500</span>
                <br><small>Mixed tropical fruits with natural flavors and sparkling finish</small>
            </div>
            <div class="menu-item">
                <span class="item-name">Cucumber Cooler</span>
                <span class="item-price">₦1,000</span>
                <br><small>Refreshing cucumber, mint, and herbs with sparkling water</small>
            </div>
            <div class="menu-item">
                <span class="item-name">Berry Blast</span>
                <span class="item-price">₦1,300</span>
                <br><small>Mixed berries, natural sweeteners, and sparkling water</small>
            </div>
        </div>
        
        <div class="services">
            <h2>Professional Services</h2>
            <ul>
                <li>Professional bartender services</li>
                <li>Complete bar setup & breakdown</li>
                <li>Custom menu development</li>
                <li>Mobile bar rental</li>
                <li>Event planning consultation</li>
                <li>Staff training & coordination</li>
            </ul>
            <p><strong>Contact:</strong> +234 xxx xxx xxxx | info@yaahmanfoods.com</p>
        </div>
    </div>
</body>
</html>`;

        const blob = new Blob([menuContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'yaahman-foods-menu.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Show success message
        if (window.showToast) {
            window.showToast('Menu downloaded successfully!', 'success');
        }
    }

    async previousPage() {
        if (this.pageNum <= 1 || this.isLoading) return;
        this.isLoading = true;
        await this.renderPage(this.pageNum - 1);
        this.updatePageInfo();
        this.isLoading = false;
    }

    async nextPage() {
        if (this.pageNum >= this.pageCount || this.isLoading) return;
        this.isLoading = true;
        await this.renderPage(this.pageNum + 1);
        this.updatePageInfo();
        this.isLoading = false;
    }

    updatePageInfo() {
        const pageInfo = document.getElementById('pageInfo');
        if (pageInfo) {
            pageInfo.textContent = `Page ${this.pageNum} of ${this.pageCount}`;
        }
        
        // Update button states
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        
        if (prevBtn) {
            prevBtn.disabled = this.pageNum <= 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.pageNum >= this.pageCount;
        }
    }
}

// Initialize PDF viewer when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.pdfViewer = new PDFViewer();
});

// Export for global access
window.PDFViewer = PDFViewer;