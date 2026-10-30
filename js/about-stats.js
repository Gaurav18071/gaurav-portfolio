/**
 * About Stats Counter Animation
 * Animates stat values when they come into view
 */

class AboutStatsCounter {
  constructor() {
    this.stats = document.querySelectorAll('.stat-value[data-count]');
    this.animated = new Set();
    this.init();
  }

  init() {
    if (this.stats.length === 0) return;

    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    // Observe each stat element
    this.stats.forEach(stat => {
      this.observer.observe(stat);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !this.animated.has(entry.target)) {
        this.animateCounter(entry.target);
        this.animated.add(entry.target);
      }
    });
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'), 10);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    // Start animation
    requestAnimationFrame(updateCounter);
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.aboutStatsCounter = new AboutStatsCounter();
  });
} else {
  window.aboutStatsCounter = new AboutStatsCounter();
}
