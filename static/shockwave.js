class ShockWaveEffect {
    constructor() {
        this.container = null;
        this.cooldown = 200; // Minimum time between shockwaves (ms)
        this.lastShockwaveTime = 0;
        this.colors = ['shockwave-blue', 'shockwave-cyan', 'shockwave-purple'];
        this.init();
    }

    init() {
        // Create shockwave container
        this.container = document.createElement('div');
        this.container.className = 'shockwave-container';
        document.body.appendChild(this.container);

        // Add mouse move event listener
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    handleMouseMove(event) {
        const currentTime = Date.now();

        // Check if cooldown has passed
        if (currentTime - this.lastShockwaveTime > this.cooldown) {
            this.createShockwaveAtPosition(event.clientX, event.clientY);
            this.lastShockwaveTime = currentTime;
        }
    }

    createShockwave(scrollY) {
        const shockwave = document.createElement('div');
        shockwave.className = 'shockwave';
        
        // Random color from the array
        const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        shockwave.classList.add(randomColor);

        // Random size between 100px and 300px
        const size = Math.random() * 200 + 100;
        shockwave.style.width = `${size}px`;
        shockwave.style.height = `${size}px`;

        // Random position on screen
        const x = Math.random() * (window.innerWidth - size);
        const y = Math.random() * (window.innerHeight - size);
        
        shockwave.style.left = `${x}px`;
        shockwave.style.top = `${y}px`;

        // Add to container
        this.container.appendChild(shockwave);

        // Remove after animation completes
        setTimeout(() => {
            if (shockwave.parentNode) {
                shockwave.parentNode.removeChild(shockwave);
            }
        }, 1500);

        // Create additional shockwaves for more dramatic effect
        if (Math.random() > 0.5) {
            setTimeout(() => {
                this.createSecondaryShockwave();
            }, 200);
        }
    }

    createShockwaveAtPosition(x, y) {
        const shockwave = document.createElement('div');
        shockwave.className = 'shockwave';
        
        // Random color from the array
        const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        shockwave.classList.add(randomColor);

        // Smaller size for mouse-triggered shockwaves (50px to 150px)
        const size = Math.random() * 100 + 50;
        shockwave.style.width = `${size}px`;
        shockwave.style.height = `${size}px`;

        // Position at mouse coordinates (centered on cursor)
        shockwave.style.left = `${x - size/2}px`;
        shockwave.style.top = `${y - size/2}px`;

        // Add to container
        this.container.appendChild(shockwave);

        // Remove after animation completes
        setTimeout(() => {
            if (shockwave.parentNode) {
                shockwave.parentNode.removeChild(shockwave);
            }
        }, 1500);

        // Occasionally create secondary shockwave for more dramatic effect
        if (Math.random() > 0.7) {
            setTimeout(() => {
                this.createSecondaryShockwaveAt(x, y);
            }, 100);
        }
    }

    createSecondaryShockwave() {
        const shockwave = document.createElement('div');
        shockwave.className = 'shockwave shockwave-cyan';
        
        const size = Math.random() * 150 + 50;
        shockwave.style.width = `${size}px`;
        shockwave.style.height = `${size}px`;

        const x = Math.random() * (window.innerWidth - size);
        const y = Math.random() * (window.innerHeight - size);
        
        shockwave.style.left = `${x}px`;
        shockwave.style.top = `${y}px`;

        this.container.appendChild(shockwave);

        setTimeout(() => {
            if (shockwave.parentNode) {
                shockwave.parentNode.removeChild(shockwave);
            }
        }, 1500);
    }

    createSecondaryShockwaveAt(x, y) {
        const shockwave = document.createElement('div');
        shockwave.className = 'shockwave shockwave-cyan';
        
        const size = Math.random() * 80 + 30;
        shockwave.style.width = `${size}px`;
        shockwave.style.height = `${size}px`;

        // Position near the original shockwave with some offset
        const offsetX = (Math.random() - 0.5) * 100;
        const offsetY = (Math.random() - 0.5) * 100;
        
        shockwave.style.left = `${x + offsetX - size/2}px`;
        shockwave.style.top = `${y + offsetY - size/2}px`;

        this.container.appendChild(shockwave);

        setTimeout(() => {
            if (shockwave.parentNode) {
                shockwave.parentNode.removeChild(shockwave);
            }
        }, 1500);
    }

    // Public method to manually trigger shockwave
    triggerShockwave(x = null, y = null) {
        const currentTime = Date.now();
        if (currentTime - this.lastShockwaveTime > this.cooldown) {
            if (x !== null && y !== null) {
                this.createShockwaveAtPosition(x, y);
            } else {
                // Create at random position if no coordinates provided
                const randomX = Math.random() * window.innerWidth;
                const randomY = Math.random() * window.innerHeight;
                this.createShockwaveAtPosition(randomX, randomY);
            }
            this.lastShockwaveTime = currentTime;
        }
    }
}

// Initialize shockwave effect when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on home page
    if (window.location.pathname === '/' || window.location.pathname === '/index') {
        window.shockWaveEffect = new ShockWaveEffect();
    }
});