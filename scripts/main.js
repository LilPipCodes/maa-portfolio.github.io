// ================= PAGE LINK LOADING SCREEN =================
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    // Only add if loading screen exists
    if (loadingScreen) {
        // Select project links
        const projectLinks = document.querySelectorAll('a[href="solar-system.html"], a[href="rotoscoping.html"]');
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Only show loader for left-click, no modifier keys
                if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
                    e.preventDefault();
                    loadingScreen.classList.remove('hide');
                    loadingScreen.style.display = 'flex';
                    // Small delay for animation, then navigate
                    setTimeout(() => {
                        window.location.href = link.href;
                    }, 350);
                }
            });
        });
    }
});
// ================= CUTE STAR LOADING SCREEN =================
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hide');
        setTimeout(() => loadingScreen.style.display = 'none', 800);
    }
});
// ================= PLANET AGE CALCULATOR DASHBOARD =================
document.addEventListener('DOMContentLoaded', () => {
        // --- Planet Data ---
        const PLANETS = [
            {
                name: 'Sun',
                badge: 'Star',
                badgeClass: 'badge-featured',
                orbitalPeriod: 225000000, // 225 million years (galactic orbit)
                orbitalPeriodDays: 225000000 * 365.25,
                distance: 0,
                desc: 'The Sun is the heart of our solar system, a massive ball of burning plasma that provides the energy for life on Earth.',
                funFact: 'The Sun contains 99.86% of all the mass in the solar system!',
                video: 'sun'
            },
            {
                name: 'Mercury',
                badge: 'Closest to the Sun',
                badgeClass: 'badge-inner',
                orbitalPeriod: 0.2408467, // Earth years
                orbitalPeriodDays: 87.97,
                distance: 57.9,
                desc: 'Mercury is the smallest and innermost planet, orbiting the Sun every 88 days. Its iron core and lack of atmosphere create wild temperature swings.',
                funFact: 'A day on Mercury (sunrise to sunrise) lasts 176 Earth days!',
                video: 'mercury'
            },
            {
                name: 'Venus',
                badge: 'Hottest planet',
                badgeClass: 'badge-inner',
                orbitalPeriod: 0.61519726,
                orbitalPeriodDays: 224.7,
                distance: 108.2,
                desc: 'Venus is shrouded in thick clouds of CO₂ and sulfuric acid. Its runaway greenhouse effect makes it the hottest planet in the solar system.',
                funFact: 'Venus spins backwards compared to most planets—its day is longer than its year!',
                video: 'venus'
            },
            {
                name: 'Earth',
                badge: 'Our home planet',
                badgeClass: 'badge-featured',
                orbitalPeriod: 1.0,
                orbitalPeriodDays: 365.25,
                distance: 149.6,
                desc: 'Earth is the only known world with life, liquid water, and a protective atmosphere. Its magnetic field shields the biosphere from solar wind.',
                funFact: 'Earth is the densest planet in the solar system.',
                video: 'earth'
            },
            {
                name: 'Moon',
                badge: 'Earth’s Satellite',
                badgeClass: 'badge-moon',
                orbitalPeriod: 0.0748, // 27.32 days / 365.25
                orbitalPeriodDays: 27.32,
                distance: 0.384, // million km from Earth
                desc: 'The Moon stabilizes Earth’s tilt and tides. Its cratered surface preserves the solar system’s ancient history.',
                funFact: 'The Moon is slowly drifting away from Earth—about 3.8 cm per year.',
                video: 'moon'
            },
            {
                name: 'Mars',
                badge: 'Red Planet',
                badgeClass: 'badge-inner',
                orbitalPeriod: 1.8808158,
                orbitalPeriodDays: 687,
                distance: 227.9,
                desc: 'Mars is a cold desert with polar ice caps and the largest volcano. Its thin atmosphere is mostly CO₂.',
                funFact: 'Mars has the tallest volcano in the solar system—Olympus Mons.',
                video: 'mars'
            },
            {
                name: 'Jupiter',
                badge: 'Gas Giant',
                badgeClass: 'badge-gas',
                orbitalPeriod: 11.862615,
                orbitalPeriodDays: 4331,
                distance: 778.5,
                desc: 'Jupiter is the largest planet, a gas giant with a Great Red Spot storm and dozens of moons. Its gravity shapes the solar system.',
                funFact: 'Jupiter has at least 95 moons—the most of any planet!',
                video: 'jupiter'
            },
            {
                name: 'Saturn',
                badge: 'Gas Giant',
                badgeClass: 'badge-gas',
                orbitalPeriod: 29.447498,
                orbitalPeriodDays: 10747,
                distance: 1434,
                desc: 'Saturn is famous for its rings of ice and rock. Its low density means it would float in water.',
                funFact: 'Saturn’s rings are mostly made of water ice and are only about 30 feet thick!',
                video: 'saturn'
            },
            {
                name: 'Uranus',
                badge: 'Outer Planet',
                badgeClass: 'badge-outer',
                orbitalPeriod: 84.016846,
                orbitalPeriodDays: 30589,
                distance: 2871,
                desc: 'Uranus spins on its side, causing extreme seasons. Its blue-green color comes from methane in its atmosphere.',
                funFact: 'Uranus has 13 known rings and 27 known moons.',
                video: 'uranus'
            },
            {
                name: 'Neptune',
                badge: 'Coldest Planet',
                badgeClass: 'badge-outer',
                orbitalPeriod: 164.79132,
                orbitalPeriodDays: 59800,
                distance: 4495,
                desc: 'Neptune is a windy ice giant with supersonic storms. Its deep blue color is due to methane and unknown atmospheric components.',
                funFact: 'Neptune’s winds can reach up to 2,100 km/h—the fastest in the solar system.',
                video: 'neptune'
            },
            {
                name: 'Pluto',
                badge: 'Dwarf Planet',
                badgeClass: 'badge-moon',
                orbitalPeriod: 248.00,
                orbitalPeriodDays: 90560,
                distance: 5906.4,
                desc: 'Pluto is a dwarf planet in the Kuiper Belt, known for its eccentric orbit and icy surface.',
                funFact: 'Pluto has five known moons, the largest is Charon.',
                video: 'pluto'
            }
        ];

        // --- Card Rendering ---
        const grid = document.getElementById('planet-card-grid');
        if (grid) {
                function renderCards(EarthYears) {
                        grid.innerHTML = PLANETS.map(planet => {
                                const age = EarthYears / planet.orbitalPeriod;
                                const revs = Math.floor(age);
                                return `
                                <div class="col">
                                    <div class="planet-card h-100 d-flex flex-column p-0" style="background:rgba(30,20,50,0.98);border-radius:2rem;box-shadow:0 0 32px #a78bfa77,0 0 16px #ff5ecb77;border:2.5px solid #a78bfa;overflow:hidden;">
                                        <div class="planet-card-video" style="border-radius:2rem 2rem 0 0;overflow:hidden;">
                                            <video autoplay loop muted playsinline preload="metadata" style="width:100%;aspect-ratio:16/9;object-fit:contain;background:#0a0a1a;display:block;">
                                                <source src="assets/Planets/${planet.video}.webm" type="video/webm">
                                                <source src="assets/Planets/${planet.video}.mkv" type="video/mkv">
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                        <div class="p-4 d-flex flex-column flex-grow-1">
                                            <div class="d-flex align-items-center justify-content-between mb-2">
                                                <span class="planet-card-title" style="font-size:2rem;font-weight:800;color:#fff;">${planet.name}</span>
                                                <span class="planet-badge ${planet.badgeClass}" style="font-size:1.1rem;padding:0.4em 1.3em;">${planet.badge}</span>
                                            </div>
                                            <div class="planet-metrics mb-3" style="display:grid;grid-template-columns:1fr 1fr;gap:0.7em 1.2em;">
                                                <div>
                                                    <div class="metric-label" style="font-size:1.02rem;color:#a78bfa;font-weight:700;letter-spacing:0.01em;">AGE ON PLANET</div>
                                                    <div class="metric-value" id="age-${planet.name.toLowerCase()}" style="font-size:1.35rem;color:#fff;font-weight:700;">${age.toFixed(2)}</div>
                                                </div>
                                                <div>
                                                    <div class="metric-label" style="font-size:1.02rem;color:#a78bfa;font-weight:700;letter-spacing:0.01em;">REVOLUTIONS</div>
                                                    <div class="metric-value" id="rev-${planet.name.toLowerCase()}" style="font-size:1.35rem;color:#fff;font-weight:700;">${revs}</div>
                                                </div>
                                                <div>
                                                    <div class="metric-label" style="font-size:1.02rem;color:#a78bfa;font-weight:700;letter-spacing:0.01em;">ORBITAL PERIOD</div>
                                                    <div class="metric-value" style="font-size:1.15rem;color:#fff;font-weight:700;">${planet.orbitalPeriodDays} <span style="font-size:1rem;font-weight:500;color:#bdb7d6;">days</span></div>
                                                </div>
                                                <div>
                                                    <div class="metric-label" style="font-size:1.02rem;color:#a78bfa;font-weight:700;letter-spacing:0.01em;">DISTANCE FROM SUN</div>
                                                    <div class="metric-value" style="font-size:1.15rem;color:#fff;font-weight:700;">${planet.distance} <span style="font-size:1rem;font-weight:500;color:#bdb7d6;">M km</span></div>
                                                </div>
                                            </div>
                                            <div class="planet-desc mb-2" style="font-size:1.08rem;color:#e2d9ff;opacity:0.92;">${planet.desc}</div>
                                            <div class="planet-fact" style="font-size:1.01rem;color:#a78bfa;font-weight:600;opacity:0.98;"><span style="color:#fff;font-weight:700;">Fun Fact:</span> ${planet.funFact}</div>
                                        </div>
                                    </div>
                                </div>
                                `;
                        }).join('');
                }

                // --- Input Handling ---
                const input = document.getElementById('planet-calc-input');
                const form = document.getElementById('planet-calc-form');
                function getEarthYears() {
                        let val = parseFloat(input.value);
                        if (isNaN(val) || val < 0.01) val = 22.76;
                        return val;
                }
                window.updatePlanetCards = function() {
                        renderCards(getEarthYears());
                };
                input && input.addEventListener('input', () => renderCards(getEarthYears()));
                form && form.addEventListener('submit', () => renderCards(getEarthYears()));
                // Initial render
                renderCards(getEarthYears());
        }
});
/* jshint esversion: 6 */
document.addEventListener('DOMContentLoaded', () => {
    const loadComponent = (id, file) => {
        fetch(`includes/${file}`)
            .then(res => res.text())
            .then(data => {
                const el = document.getElementById(id);
                if (!el) return;
                el.innerHTML = data;
            })
            .catch(() => {});
    };

    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');

    // tech stack marquee duplication for seamless scrolling
    
    const tracks = document.querySelectorAll('[data-marquee]');
    tracks.forEach(track => {
        if (track.dataset.cloned === "true") return;
        track.innerHTML += track.innerHTML + track.innerHTML;
        track.dataset.cloned = "true";
    });


    // Typewriter effect for "Connect" in the contact section

    const str = "Connect";
    const typingSpeed = 120;   // ms per character
    const eraseSpeed = 75;     // ms per character erase
    const delayAfterType = 1600; // ms wait after typing
    const delayAfterErase = 700;  // ms wait after erasing
    let i = 0;
    let isErasing = false;
    const target = document.getElementById("typewrite-connect");
    if (!target) return;

    function typeLoop() {
        if (!isErasing) {
        // Typing
        target.textContent = str.slice(0, i+1);
        if (i < str.length - 1) {
            i++;
            setTimeout(typeLoop, typingSpeed);
        } else {
            setTimeout(() => {
            isErasing = true;
            setTimeout(typeLoop, eraseSpeed);
            }, delayAfterType);
        }
        } else {
        // Erasing
        target.textContent = str.slice(0, i);
        if (i > 0) {
            i--;
            setTimeout(typeLoop, eraseSpeed);
        } else {
            isErasing = false;
            setTimeout(typeLoop, delayAfterErase);
        }
        }
    }
    typeLoop();

    // Float-in animations

    const selectors = [
        '.hero-video__content',
        '.feature',
        '.profile-card--purplefire',
        '.tech-marquee',
        '.contact-transparent-card',
        '.text-center',
        '.story-divider'
        // Any other key container for animated float-in
    ];
    // Gather all elements matching those selectors
    const floatupEls = document.querySelectorAll(selectors.join(','));

    floatupEls.forEach(el => el.classList.add('floatup'));

    // Intersection Observer to toggle animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.12
    });

    const profileCardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.07
    });

    floatupEls.forEach(el => {
        if (el.matches('.profile-card--purplefire')) {
            profileCardObserver.observe(el);
        } else {
            observer.observe(el);
        }
    });

});
