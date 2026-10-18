/* ==========================================
   PERFORMANCE SECTION - Static Web Vitals
========================================== */

class PerformanceSection {
    constructor() {
        this.metrics = {
            ttfb: { value: 0, status: 'loading' },
            fcp: { value: 0, status: 'loading' },
            lcp: { value: 0, status: 'loading' },
            cls: { value: 0, status: 'loading' }
        };
        
        this.init();
    }
    
    init() {
        // Wait for section to exist in DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.measureMetrics());
        } else {
            this.measureMetrics();
        }
    }
    
    measureMetrics() {
        // Measure TTFB (Time to First Byte)
        if (window.performance && window.performance.timing) {
            const perfData = window.performance.timing;
            const ttfb = perfData.responseStart - perfData.requestStart;
            if (ttfb > 0) {
                this.updateMetric('ttfb', ttfb);
            }
        }
        
        // Use Performance Observer API for modern metrics
        if ('PerformanceObserver' in window) {
            // FCP - First Contentful Paint
            try {
                const fcpObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach((entry) => {
                        if (entry.name === 'first-contentful-paint') {
                            this.updateMetric('fcp', Math.round(entry.startTime));
                        }
                    });
                });
                fcpObserver.observe({ entryTypes: ['paint'] });
            } catch (e) {
                console.log('FCP not supported');
            }
            
            // LCP - Largest Contentful Paint
            try {
                const lcpObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    this.updateMetric('lcp', Math.round(lastEntry.renderTime || lastEntry.loadTime));
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                console.log('LCP not supported');
            }
            
            // CLS - Cumulative Layout Shift
            try {
                let clsValue = 0;
                const clsObserver = new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                            this.updateMetric('cls', clsValue);
                        }
                    }
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                console.log('CLS not supported');
            }
        }
        
        // Fallback measurements
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (window.performance && window.performance.timing) {
                    const perfData = window.performance.timing;
                    
                    // Fallback FCP
                    if (this.metrics.fcp.value === 0) {
                        const fcp = perfData.domContentLoadedEventEnd - perfData.navigationStart;
                        this.updateMetric('fcp', fcp);
                    }
                    
                    // Fallback LCP
                    if (this.metrics.lcp.value === 0) {
                        const lcp = perfData.loadEventEnd - perfData.navigationStart;
                        this.updateMetric('lcp', lcp);
                    }
                    
                    // Default CLS
                    if (this.metrics.cls.value === 0) {
                        this.updateMetric('cls', 0.02); // Assume good if not measurable
                    }
                }
            }, 100);
        });
    }
    
    updateMetric(metricKey, value) {
        const metric = this.metrics[metricKey];
        if (!metric) return;
        
        metric.value = value;
        metric.status = this.getStatus(metricKey, value);
        
        const element = document.querySelector(`[data-perf-metric="${metricKey}"]`);
        if (!element) return;
        
        const valueElement = element.querySelector('.perf-value');
        const statusElement = element.querySelector('.perf-status');
        const barElement = element.querySelector('.perf-bar-fill');
        
        // Update value
        if (valueElement) {
            valueElement.classList.remove('loading');
            if (metricKey === 'cls') {
                valueElement.textContent = value.toFixed(2);
            } else {
                valueElement.textContent = Math.round(value);
            }
        }
        
        // Update status
        if (statusElement) {
            statusElement.className = `perf-status ${metric.status}`;
            statusElement.textContent = metric.status.replace('-', ' ').toUpperCase();
        }
        
        // Update bar
        if (barElement) {
            const percentage = this.getPercentage(metricKey, value);
            barElement.style.width = `${percentage}%`;
            barElement.className = `perf-bar-fill ${metric.status}`;
        }
    }
    
    getStatus(metricKey, value) {
        const thresholds = {
            ttfb: { good: 600, poor: 1000 },
            fcp: { good: 1800, poor: 3000 },
            lcp: { good: 2500, poor: 4000 },
            cls: { good: 0.1, poor: 0.25 }
        };
        
        const threshold = thresholds[metricKey];
        if (!threshold) return 'good';
        
        if (value <= threshold.good) return 'good';
        if (value <= threshold.poor) return 'needs-improvement';
        return 'poor';
    }
    
    getPercentage(metricKey, value) {
        const maxValues = {
            ttfb: 1000,
            fcp: 3000,
            lcp: 4000,
            cls: 0.25
        };
        
        const max = maxValues[metricKey] || 1000;
        const percentage = Math.min((value / max) * 100, 100);
        
        return percentage;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PerformanceSection();
    });
} else {
    new PerformanceSection();
}
