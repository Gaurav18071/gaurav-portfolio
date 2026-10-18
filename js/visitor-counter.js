/**
 * Real Live Visitor Counter
 * Live API tracking with smooth count-up animation and persistence
 */
(function () {
    'use strict';

    // ── API Configuration ──
    const API_VIEWS = 'https://countapi.mileshilliard.com/api/v1/hit/gaurav18071_portfolio_views';
    const API_VISITORS_HIT = 'https://countapi.mileshilliard.com/api/v1/hit/gaurav18071_portfolio_visitors';
    const API_VISITORS_GET = 'https://countapi.mileshilliard.com/api/v1/get/gaurav18071_portfolio_visitors';

    // Local cached values in case user is offline or API unreachable
    const LOCAL_VIEWS_KEY = 'gm_live_views_count';
    const LOCAL_VISITORS_KEY = 'gm_live_visitors_count';
    const VISITOR_FLAG_KEY = 'gm_has_visited_device';

    // ── Real Analytics Fetcher ──
    async function fetchRealStats() {
        let views = parseInt(localStorage.getItem(LOCAL_VIEWS_KEY) || '1', 10);
        let visitors = parseInt(localStorage.getItem(LOCAL_VISITORS_KEY) || '1', 10);
        const isNewVisitor = !localStorage.getItem(VISITOR_FLAG_KEY);

        try {
            const viewsRes = await fetch(API_VIEWS, { cache: 'no-cache' });
            if (viewsRes.ok) {
                const data = await viewsRes.json();
                if (data && typeof data.value === 'number') {
                    views = data.value;
                    localStorage.setItem(LOCAL_VIEWS_KEY, views);
                }
            }
        } catch (e) {
            views += 1;
            localStorage.setItem(LOCAL_VIEWS_KEY, views);
        }

        try {
            const visitorEndpoint = isNewVisitor ? API_VISITORS_HIT : API_VISITORS_GET;
            const visitorRes = await fetch(visitorEndpoint, { cache: 'no-cache' });
            if (visitorRes.ok) {
                const data = await visitorRes.json();
                if (data && typeof data.value === 'number') {
                    visitors = data.value;
                    localStorage.setItem(LOCAL_VISITORS_KEY, visitors);
                    if (isNewVisitor) {
                        localStorage.setItem(VISITOR_FLAG_KEY, 'true');
                    }
                }
            }
        } catch (e) {
            if (isNewVisitor) {
                visitors += 1;
                localStorage.setItem(LOCAL_VISITORS_KEY, visitors);
                localStorage.setItem(VISITOR_FLAG_KEY, 'true');
            }
        }

        return {
            views,
            visitors,
            online: 1
        };
    }

    // ── Number Count-up Animation ──
    function animateCount(elem, targetVal, duration) {
        if (!elem) return;
        const startVal = Math.max(0, targetVal > 50 ? targetVal - 40 : 0);
        const startTime = performance.now();

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(startVal + (targetVal - startVal) * ease);
            elem.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                elem.textContent = targetVal.toLocaleString();
            }
        }

        requestAnimationFrame(step);
    }

    // ── Initialize Counter & Analytics ──
    async function initLiveCounter() {
        const viewsEl = document.getElementById('statViewsCount');
        const visitorsEl = document.getElementById('statVisitorsCount');
        const onlineEl = document.getElementById('statOnlineCount');
        const container = document.querySelector('.footer-stats-wrap');

        if (!viewsEl || !visitorsEl || !container) return;

        let hasLoaded = false;
        const observer = new IntersectionObserver(async (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting && !hasLoaded) {
                    hasLoaded = true;
                    observer.disconnect();

                    const stats = await fetchRealStats();
                    animateCount(viewsEl, stats.views, 1200);
                    animateCount(visitorsEl, stats.visitors, 1000);
                    if (onlineEl) {
                        onlineEl.textContent = stats.online.toString();
                    }
                }
            }
        }, { threshold: 0.15 });

        observer.observe(container);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLiveCounter);
    } else {
        initLiveCounter();
    }
})();
