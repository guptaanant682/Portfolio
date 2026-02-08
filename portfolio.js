// Portfolio JavaScript - Simplified for Immediate Functionality
// Author: Anant Gupta

class Portfolio {
    constructor() {
        this.isLoading = true;
        this.isTouchDevice = this.detectTouchDevice();
        this.isMobile = this.detectMobileDevice();
        this.init();
    }
    
    detectTouchDevice() {
        return ('ontouchstart' in window) || 
               (navigator.maxTouchPoints > 0) || 
               (navigator.msMaxTouchPoints > 0) ||
               (window.matchMedia && window.matchMedia('(hover: none)').matches);
    }
    
    detectMobileDevice() {
        return window.innerWidth <= 768 || this.isTouchDevice;
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        console.log('Portfolio setup starting...');
        console.log('Touch device detected:', this.isTouchDevice);
        console.log('Mobile device detected:', this.isMobile);
        
        // Initialize performance monitoring first
        this.initPerformanceMonitoring();
        
        this.setupPreloader();
        this.setupAdvancedNavbar();
        
        // Only setup cursor on non-touch devices
        if (!this.isTouchDevice) {
            this.setupAdvancedCursor();
        } else {
            // Ensure cursor is hidden and body has normal cursor
            document.body.style.cursor = 'auto';
            const cursor = document.getElementById('cursor');
            if (cursor) cursor.style.display = 'none';
        }
        
        this.setupMagneticEffects();
        this.setupAdvancedHeroAnimations();
        this.setupAdvancedAboutAnimations();
        this.setupAdvancedProcessAnimations();
        this.setupWorkImages();
        
        // Only setup 3D carousel on desktop
        if (!this.isMobile) {
            this.setup3DCarousel();
        }
        
        // Setup touch-friendly skills interaction
        this.setupTouchSkillsInteraction();
        
        // Only setup works scroll jacking on non-mobile devices
        if (!this.isMobile) {
            this.setupWorksScrollJacking();
        } else {
            console.log('Skipping GSAP scroll jacking on mobile device');
        }
        
        // Add viewport height fix for mobile browsers
        this.fixMobileViewportHeight();
        
        // Hide preloader after a shorter delay
        setTimeout(() => this.hidePreloader(), 1500);
    }

    // Advanced Navbar Setup
    setupAdvancedNavbar() {
        console.log('Setting up advanced navbar...');
        
        const navbar = document.getElementById('navbar');
        const navbarToggle = document.getElementById('navbarToggle');
        const navbarMenu = document.getElementById('navbarMenu');
        
        if (!navbar) {
            console.log('Navbar not found');
            return;
        }
        
        // Scroll effect for navbar
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar--scrolled');
            } else {
                navbar.classList.remove('navbar--scrolled');
            }
        });
        
        // Mobile menu toggle
        if (navbarToggle && navbarMenu) {
            navbarToggle.addEventListener('click', () => {
                navbarToggle.classList.toggle('active');
                navbarMenu.classList.toggle('active');
                document.body.classList.toggle('nav-open');
            });
            
            // Close mobile menu when clicking on a link
            const navLinks = document.querySelectorAll('.navbar__link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navbarToggle.classList.remove('active');
                    navbarMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                });
            });
        }
        
        // Smooth scroll for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for navbar height
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Preloader Management
    setupPreloader() {
        console.log('Setting up preloader...');
        const preloader = document.getElementById('preloader');
        if (!preloader) {
            console.error('Preloader element not found');
            return;
        }
        
        const letters = document.querySelectorAll('.preloader__letter');
        console.log('Found preloader letters:', letters.length);
        
        // Animate letters sequentially
        letters.forEach((letter, index) => {
            letter.style.animationDelay = `${index * 0.1}s`;
        });
    }

    hidePreloader() {
        console.log('Hiding preloader...');
        const preloader = document.getElementById('preloader');
        if (!preloader) {
            console.error('Preloader element not found for hiding');
            return;
        }
        
        preloader.classList.add('hidden');
        
        setTimeout(() => {
            preloader.style.display = 'none';
            this.isLoading = false;
            this.startHeroAnimation();
            console.log('Preloader hidden, starting hero animation');
        }, 800);
    }

    // Advanced Custom Cursor - Only for non-touch devices
    setupAdvancedCursor() {
        console.log('Setting up advanced cursor...');
        
        // Skip cursor setup on touch devices
        if (this.isTouchDevice) {
            console.log('Touch device detected, skipping cursor setup');
            return;
        }
        
        this.cursor = document.getElementById('cursor');
        
        if (!this.cursor) {
            console.log('Custom cursor element not found, skipping cursor setup');
            return;
        }
        
        this.cursorPos = { x: 0, y: 0 };
        this.cursorTarget = { x: 0, y: 0 };
        
        // Show cursor for non-touch devices
        this.cursor.style.display = 'block';
        
        // Smooth cursor movement with GSAP
        document.addEventListener('mousemove', (e) => {
            this.cursorTarget.x = e.clientX;
            this.cursorTarget.y = e.clientY;
        });
        
        // Smooth interpolation
        this.updateCursor();
        
        // Enhanced hover states - Include all interactive elements
        const hoverElements = document.querySelectorAll(`
            a, button, 
            .hero__card, .work__item, .skill-col, .process__step,
            .navbar__link, .navbar__logo, .navbar__cta, .navbar__toggle,
            .hero__cta-link, .work__link, .footer__link, .footer__email,
            .about__card, .about__achievement, .hero__tech-item,
            [data-magnetic], [href], [onclick]
        `.replace(/\s+/g, ' ').trim());
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (!this.cursor || this.isTouchDevice) return;
                
                this.cursor.classList.add('is-hovering');
                if (typeof gsap !== 'undefined') {
                    gsap.to(this.cursor, {
                        scale: 1.5,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            
            el.addEventListener('mouseleave', () => {
                if (!this.cursor || this.isTouchDevice) return;
                
                this.cursor.classList.remove('is-hovering');
                if (typeof gsap !== 'undefined') {
                    gsap.to(this.cursor, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }

    updateCursor() {
        if (!this.cursor || this.isTouchDevice) return;
        
        // Smooth interpolation with better precision
        this.cursorPos.x += (this.cursorTarget.x - this.cursorPos.x) * 0.2;
        this.cursorPos.y += (this.cursorTarget.y - this.cursorPos.y) * 0.2;
        
        // Center the cursor properly (20px width/height from CSS)
        const offsetX = this.cursorPos.x - 10;
        const offsetY = this.cursorPos.y - 10;
        
        // Use transform3d for better GPU acceleration
        this.cursor.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
        
        requestAnimationFrame(() => this.updateCursor());
    }

    // Magnetic Effects for Cards
    setupMagneticEffects() {
        console.log('Setting up magnetic effects...');
        
        const magneticElements = document.querySelectorAll('[data-magnetic]');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                this.magneticMove(e, element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.magneticReset(element);
            });
        });
    }

    magneticMove(e, element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * 0.08;
        const deltaY = (e.clientY - centerY) * 0.08;
        
        if (typeof gsap !== 'undefined') {
            gsap.to(element, {
                x: deltaX,
                y: deltaY,
                duration: 0.4,
                ease: 'power2.out'
            });
        } else {
            element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        }
        
        // Enhanced cursor interaction
        if (this.cursor) {
            this.cursor.classList.add('is-magnetic');
        }
    }

    magneticReset(element) {
        if (typeof gsap !== 'undefined') {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        } else {
            element.style.transform = 'translate(0px, 0px)';
        }
        
        // Reset cursor
        if (this.cursor) {
            this.cursor.classList.remove('is-magnetic');
        }
    }

    // Advanced Hero Animations Setup - Performance Optimized
    setupAdvancedHeroAnimations() {
        console.log('Setting up advanced hero animations...');
        
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded, skipping advanced hero animations');
            return;
        }

        // Reduce animations on mobile for performance
        if (this.isMobile) {
            console.log('Mobile device - using simplified animations');
            this.setupSimplifiedHeroAnimations();
            return;
        }

        // Full animations for desktop
        ScrollTrigger.create({
            trigger: '.hero__bento-grid',
            start: 'top 80%',
            onEnter: () => {
                this.animateHeroElements();
            }
        });

        // Parallax effect for floating elements (desktop only)
        gsap.to('.hero__particle', {
            y: '-30vh',
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }
    
    // Simplified animations for mobile devices
    setupSimplifiedHeroAnimations() {
        // Simple fade-in animation for mobile
        const cards = document.querySelectorAll('.hero__card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    animateHeroElements() {
        if (typeof gsap === 'undefined') return;

        // Animate tech items on hover
        const techItems = document.querySelectorAll('.hero__tech-item');
        techItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    scale: 1.1,
                    y: -5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }

    // Basic interactions without external libraries
    setupBasicInteractions() {
        console.log('Setting up basic interactions...');
        
        // Work items click interaction
        const workItems = document.querySelectorAll('.work__item');
        workItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                console.log(`Work item ${index + 1} clicked`);
            });
        });

        // Magnetic button effect
        const magneticButton = document.getElementById('magneticButton');
        if (magneticButton) {
            magneticButton.addEventListener('mousemove', (e) => {
                const rect = magneticButton.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (e.clientX - centerX) * 0.1;
                const deltaY = (e.clientY - centerY) * 0.1;
                
                magneticButton.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            });
            
            magneticButton.addEventListener('mouseleave', () => {
                magneticButton.style.transform = 'translate(0px, 0px)';
            });
        }
    }

    // Advanced Hero Animations with GSAP
    startHeroAnimation() {
        console.log('Starting advanced hero animation...');
        
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded, using fallback animations');
            this.fallbackHeroAnimation();
            return;
        }

        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        // Create master timeline
        const tl = gsap.timeline({ delay: 0.5 });
        
        // Set initial states and animate status bar entrance
        tl.set('.hero__status-bar', { y: -50, opacity: 0 })
        .to('.hero__status-bar', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
        })
        
        // Set initial states and animate cards entrance
        .set('.hero__card', { y: 60, opacity: 0, scale: 0.95 })
        .to('.hero__card', {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        }, '-=0.3')
        
        // Set initial states and animate name characters
        .set('.hero__char', { y: 100, opacity: 0 })
        .to('.hero__char', {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'back.out(1.7)'
        }, '-=0.4')
        
        // Animate scroll indicator
        .from('.hero__scroll-indicator', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.2');

        // Counter animations for number cards
        this.animateCounters();
    }

    fallbackHeroAnimation() {
        // Fallback for when GSAP is not available
        const heroChars = document.querySelectorAll('.hero__char');
        heroChars.forEach((char, index) => {
            setTimeout(() => {
                char.style.transform = 'translateY(0)';
                char.style.opacity = '1';
            }, index * 50);
        });

        const cards = document.querySelectorAll('.hero__card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100 + 300);
        });
    }

    // Advanced Counter Animations
    // animateCounters() {
    //     const counters = document.querySelectorAll('[data-count]');
        
    //     counters.forEach(counter => {
    //         const target = parseInt(counter.getAttribute('data-count'));
    //         const element = counter;
            
    //         if (typeof gsap !== 'undefined') {
    //             gsap.from({ value: 0 }, {
    //                 value: target,
    //                 duration: 1.5,
    //                 ease: 'power2.out',
    //                 delay: 1,
    //                 onUpdate: function() {
    //                     const currentValue = Math.ceil(this.targets()[0].value);
    //                     if (element.textContent.includes('+')) {
    //                         element.textContent = currentValue + '+';
    //                     } else {
    //                         element.textContent = currentValue;
    //                     }
    //                 }
    //             });
    //         }
    //     });
    // }

    // Advanced Counter Animations (HERO SECTION ONLY)
    animateCounters() {
        // 1. FIX: Target ONLY the hero section counters to avoid breaking the About section
        const counters = document.querySelectorAll('.hero__card-number[data-count]');
        
        counters.forEach(counter => {
            // Get the target number
            const target = parseInt(counter.getAttribute('data-count'));
            const element = counter;
            
            if (typeof gsap !== 'undefined') {
                // 2. FIX: Use a proxy object starting at 0
                const proxy = { value: 0 };
                
                // 3. FIX: Use 'gsap.to' to animate FROM 0 -> TARGET (Count UP)
                gsap.to(proxy, {
                    value: target,
                    duration: 1.5,
                    ease: 'power2.out',
                    delay: 1, // Wait for hero reveal
                    onUpdate: function() {
                        const currentValue = Math.ceil(this.targets()[0].value);
                        // Preserve the "+" sign if it exists in the HTML text
                        if (element.innerText.includes('+')) {
                            element.textContent = currentValue + '+';
                        } else {
                            element.textContent = currentValue;
                        }
                    }
                });
            }
        });
    }

    // Simplified scroll setup without external libraries
    setupSmoothScroll() {
        console.log('Smooth scroll setup (simplified)');
        // Using native browser scroll for now
        // Can be enhanced later with external libraries
    }

    // 3D Carousel Setup with GSAP Physics
    setup3DCarousel() {
        console.log('Setting up 3D Carousel...');
        
        // Check if GSAP is available
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded, skipping 3D carousel');
            return;
        }

        this.carousel = {
            scene: document.getElementById('carouselScene'),
            stage: document.getElementById('carouselStage'),
            items: document.querySelectorAll('.carousel-3d__item'),
            currentRotation: 0,
            targetRotation: 0,
            autoRotationSpeed: 0.2, // degrees per frame
            scrollSpeed: 0,
            isScrolling: false,
            scrollTimeout: null,
            animationId: null
        };

        if (!this.carousel.scene) {
            console.warn('3D Carousel elements not found');
            return;
        }

        this.initializeCarousel();
        this.setupScrollTrigger();
        this.startCarouselAnimation();
    }

    initializeCarousel() {
        // Set initial transforms for perfect cylinder positioning
        const radius = this.getCarouselRadius();
        
        this.carousel.items.forEach((item, index) => {
            const rotationY = index * 60;
            
            gsap.set(item, {
                rotationY: rotationY,
                z: radius,
                transformOrigin: "center center",
                force3D: true
            });
        });

        // Set initial scene rotation
        gsap.set(this.carousel.scene, {
            rotationY: 0,
            transformOrigin: "center center",
            force3D: true
        });
    }

    getCarouselRadius() {
        // Calculate radius based on current screen size
        const width = window.innerWidth;
        if (width <= 768) {
            return 115; // Mobile
        } else if (width <= 1024) {
            return 144; // Tablet
        }
        return 173; // Desktop
    }

    setupScrollTrigger() {
        // Check if ScrollTrigger is available
        if (typeof ScrollTrigger === 'undefined') {
            console.warn('ScrollTrigger not loaded, using fallback scroll');
            this.setupFallbackScroll();
            return;
        }

        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Create scroll trigger for the carousel section
        ScrollTrigger.create({
            trigger: "#carousel3d",
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
                this.handleScrollUpdate(self);
            },
            onToggle: (self) => {
                if (self.isActive) {
                    this.carousel.isScrolling = true;
                } else {
                    this.carousel.isScrolling = false;
                }
            }
        });
    }

    setupFallbackScroll() {
        // Fallback scroll handling without ScrollTrigger
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const carouselSection = document.getElementById('carousel3d');
                    const rect = carouselSection.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    
                    if (rect.bottom >= 0 && rect.top <= windowHeight) {
                        this.carousel.isScrolling = true;
                        
                        // Calculate scroll velocity
                        const scrollY = window.pageYOffset;
                        const velocity = scrollY - (this.lastScrollY || scrollY);
                        this.lastScrollY = scrollY;
                        
                        this.carousel.scrollSpeed = velocity * 0.5;
                        
                        clearTimeout(this.carousel.scrollTimeout);
                        this.carousel.scrollTimeout = setTimeout(() => {
                            this.carousel.isScrolling = false;
                        }, 150);
                    }
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    handleScrollUpdate(self) {
        // Calculate scroll velocity
        const velocity = self.getVelocity();
        this.carousel.scrollSpeed = velocity * 0.01; // Scale down for smooth rotation
        
        // Mark as actively scrolling
        this.carousel.isScrolling = true;
        
        // Clear existing timeout
        clearTimeout(this.carousel.scrollTimeout);
        
        // Set timeout to return to auto-rotation
        this.carousel.scrollTimeout = setTimeout(() => {
            this.carousel.isScrolling = false;
        }, 150); // Smooth transition after scroll stops
    }

    startCarouselAnimation() {
        const animate = () => {
            this.updateCarouselRotation();
            this.carousel.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }

    updateCarouselRotation() {
        let targetSpeed;
        
        if (this.carousel.isScrolling) {
            // Use scroll speed when scrolling
            targetSpeed = this.carousel.scrollSpeed;
        } else {
            // Use auto-rotation speed when idle
            targetSpeed = this.carousel.autoRotationSpeed;
        }
        
        // Smooth interpolation (lerp) for velocity changes
        this.carousel.currentRotation += targetSpeed;
        
        // Apply smooth deceleration when transitioning from scroll to auto
        if (!this.carousel.isScrolling && Math.abs(this.carousel.scrollSpeed) > 0.1) {
            this.carousel.scrollSpeed *= 0.95; // Gradual deceleration
        }
        
        // Update scene rotation
        if (this.carousel.scene) {
            gsap.set(this.carousel.scene, {
                rotationY: this.carousel.currentRotation,
                force3D: true
            });
        }
        
        // Add subtle scale effect for depth
        this.updateItemDepth();
    }

    updateItemDepth() {
        // Calculate which item is closest to front
        this.carousel.items.forEach((item, index) => {
            const itemRotation = (this.carousel.currentRotation + (index * 60)) % 360;
            const normalizedRotation = ((itemRotation % 360) + 360) % 360;
            
            // Calculate distance from front (0 degrees)
            const distanceFromFront = Math.min(
                normalizedRotation,
                360 - normalizedRotation
            );
            
            // Calculate opacity and scale based on distance
            const opacity = 1 - (distanceFromFront / 180) * 0.3;
            const scale = 1 - (distanceFromFront / 180) * 0.1;
            
            gsap.set(item, {
                opacity: opacity,
                scale: scale,
                force3D: true
            });
        });
    }

    // Handle window resize for responsive radius calculation
    handleResize() {
        if (this.carousel && this.carousel.items) {
            const newRadius = this.getCarouselRadius();
            
            this.carousel.items.forEach((item) => {
                gsap.set(item, {
                    z: newRadius,
                    force3D: true
                });
            });
        }
    }

    // Cleanup carousel on destroy
    destroyCarousel() {
        if (this.carousel && this.carousel.animationId) {
            cancelAnimationFrame(this.carousel.animationId);
        }
        
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
    }
    
    // Performance monitoring and optimization
    initPerformanceMonitoring() {
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.disableAnimations();
        }
        
        // Monitor performance and reduce animations if needed
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                console.log('Slow connection detected - reducing animations');
                this.disableAnimations();
            }
        }
    }
    
    disableAnimations() {
        document.documentElement.style.setProperty('--ease-out-expo', 'none');
        document.documentElement.style.setProperty('--ease-out-quart', 'none');
        document.documentElement.style.setProperty('--ease-out-back', 'none');
        
        // Add a class to disable all transitions
        document.body.classList.add('reduce-motion');
    }
    
    // Fix mobile viewport height issues
    fixMobileViewportHeight() {
        if (this.isMobile) {
            const setViewportHeight = () => {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            };
            
            setViewportHeight();
            window.addEventListener('resize', setViewportHeight, { passive: true });
            window.addEventListener('orientationchange', () => {
                setTimeout(setViewportHeight, 100);
            }, { passive: true });
        }
    }

    // GSAP Pinned Horizontal Scroll for Works Section
    setupWorksScrollJacking() {
        console.log('Setting up GSAP Pinned Horizontal Scroll...');
        
        // Check if GSAP and ScrollTrigger are available
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP or ScrollTrigger not loaded');
            return;
        }

        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        this.initPinnedHorizontalScroll();
    }

    initPinnedHorizontalScroll() {
        const worksSection = document.getElementById('works');
        const scrollContainer = document.getElementById('worksScroll');
        
        if (!worksSection || !scrollContainer) {
            console.warn('Works section elements not found');
            return;
        }

        // Enhanced mobile detection
        if (this.isMobile || window.innerWidth <= 1024) {
            console.log('Mobile/tablet detected - GSAP pinning disabled');
            
            // Ensure scroll container is not transformed on mobile
            scrollContainer.style.transform = 'none';
            scrollContainer.style.willChange = 'auto';
            
            return;
        }

        // Ensure proper CSS setup for hardware acceleration
        gsap.set(scrollContainer, {
            willChange: "transform",
            force3D: true
        });

        // Calculate the horizontal scroll distance dynamically
        const getScrollAmount = () => {
            const scrollWidth = scrollContainer.scrollWidth;
            const windowWidth = window.innerWidth;
            return -(scrollWidth - windowWidth);
        };

        // Create the pinned horizontal scroll animation
        this.horizontalScrollTween = gsap.to(scrollContainer, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: worksSection,
                start: "center 32%", // Start when section top meets viewport center (delays pinning)
                end: () => `+=${Math.abs(getScrollAmount()) + window.innerHeight}`, // Longer scroll distance for smoother exit
                pin: true,
                scrub: 1, // Smooth scrubbing with 1 second lag
                invalidateOnRefresh: true, // Recalculate on resize
                anticipatePin: 1, // Prevent jump when pinning starts
                onUpdate: (self) => {
                    this.updateHorizontalProgress(self.progress);
                },
                onToggle: (self) => {
                    this.handlePinToggle(self.isActive);
                }
            }
        });

        // Add progress indicator
        this.addHorizontalProgressIndicator(worksSection);

        console.log('GSAP Pinned Horizontal Scroll initialized');
    }

    updateHorizontalProgress(progress) {
        // Update progress indicator if it exists
        if (this.progressIndicator) {
            const fill = this.progressIndicator.querySelector('.works__progress-fill');
            const current = this.progressIndicator.querySelector('.works__progress-current');
            
            if (fill && current) {
                fill.style.height = `${progress * 100}%`;
                current.textContent = Math.min(Math.ceil(progress * 4), 4);
            }
        }

        // Update scroll hint opacity
        const hint = document.querySelector('.works__scroll-indicator');
        if (hint) {
            hint.style.opacity = progress > 0.1 ? '0' : '1';
        }
    }

    handlePinToggle(isActive) {
        const worksSection = document.getElementById('works');
        if (isActive) {
            worksSection?.classList.add('works--pinned');
            console.log('Works section pinned');
        } else {
            worksSection?.classList.remove('works--pinned');
            console.log('Works section unpinned');
        }
    }

    addHorizontalProgressIndicator(worksSection) {
        // Create progress indicator
        const progressIndicator = document.createElement('div');
        progressIndicator.className = 'works__progress-indicator';
        progressIndicator.innerHTML = `
            <div class="works__progress-track">
                <div class="works__progress-fill"></div>
            </div>
            <div class="works__progress-text">
                <span class="works__progress-current">0</span> / 
                <span class="works__progress-total">4</span>
            </div>
        `;
        
        worksSection.appendChild(progressIndicator);
        this.progressIndicator = progressIndicator;
    }

    // Cleanup GSAP ScrollTrigger
    destroyWorksScrollJacking() {
        if (this.horizontalScrollTween) {
            this.horizontalScrollTween.scrollTrigger?.kill();
            this.horizontalScrollTween.kill();
        }
        
        if (this.progressIndicator) {
            this.progressIndicator.remove();
        }
        
        // Clean up any ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.trigger?.id === 'works') {
                trigger.kill();
            }
        });
    }

    // Advanced About Section Animations - Performance Optimized
    setupAdvancedAboutAnimations() {
        console.log('Setting up advanced About animations...');
        
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded, skipping about animations');
            return;
        }

        // Reduce animations on mobile for better performance
        if (this.isMobile) {
            console.log('Mobile device - using simplified about animations');
            this.setupSimplifiedAboutAnimations();
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        this.setupAboutCardAnimations();
        this.setupAboutSkillBars();
        this.setupAboutStatsAnimation();
        this.setupAboutTimelineAnimation();
        this.setupAboutParallax();
        this.setupAboutBioAnimation();
    }
    
    // Simplified about animations for mobile
    setupSimplifiedAboutAnimations() {
        // Simple intersection observer for mobile
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.about__card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    setupAboutCardAnimations() {
        const cards = document.querySelectorAll('.about__card');
        
        cards.forEach((card, index) => {
            // Initial state
            gsap.set(card, {
                opacity: 0,
                y: 100,
                scale: 0.9
            });

            // Entrance animation with stagger
            gsap.to(card, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.1
            });

            // Advanced hover magnetic effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = (e.clientX - centerX) * 0.05;
                const deltaY = (e.clientY - centerY) * 0.05;
                
                gsap.to(card, {
                    x: deltaX,
                    y: deltaY,
                    rotateX: deltaY * 0.1,
                    rotateY: deltaX * 0.1,
                    duration: 0.3,
                    ease: "power2.out"
                });

                // Glow effect
                gsap.to(card, {
                    boxShadow: `${deltaX}px ${deltaY + 10}px 30px rgba(0, 0, 0, 0.15)`,
                    duration: 0.3
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    x: 0,
                    y: 0,
                    rotateX: 0,
                    rotateY: 0,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        });
    }

    setupAboutSkillBars() {
        const skillBars = document.querySelectorAll('.about__skill-progress');
        
        skillBars.forEach((bar) => {
            const progress = bar.getAttribute('data-progress');
            
            gsap.set(bar, { width: '0%' });
            
            gsap.to(bar, {
                width: `${progress}%`,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: bar,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    setupAboutStatsAnimation() {
        const stats = document.querySelectorAll('.about__stat');
        
        stats.forEach((stat) => {
            const valueEl = stat.querySelector('.about__stat-value');
            const fillEl = stat.querySelector('.about__stat-fill');
            const targetCount = stat.getAttribute('data-count');
            const fillWidth = fillEl.getAttribute('data-width');
            
            gsap.set(fillEl, { width: '0%' });
            
            ScrollTrigger.create({
                trigger: stat,
                start: "top 80%",
                onEnter: () => {
                    // Animate fill bar
                    gsap.to(fillEl, {
                        width: `${fillWidth}%`,
                        duration: 1.2,
                        ease: "power2.out"
                    });
                    
                    // Counter animation
                    const counter = { value: 0 };
                    gsap.to(counter, {
                        value: parseFloat(targetCount),
                        duration: 1.2,
                        ease: "power2.out",
                        onUpdate: () => {
                            if (valueEl.textContent.includes('%')) {
                                valueEl.textContent = Math.round(counter.value) + '%';
                            } else if (valueEl.textContent.includes('+')) {
                                valueEl.textContent = Math.round(counter.value) + '+';
                            } else {
                                valueEl.textContent = counter.value.toFixed(1);
                            }
                        }
                    });
                }
            });
        });
    }

    setupAboutTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.about__timeline-item');
        
        timelineItems.forEach((item, index) => {
            gsap.set(item, {
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50
            });
            
            gsap.to(item, {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.2
            });
        });
    }

    setupAboutParallax() {
        const floatingElements = document.querySelectorAll('.about__float');
        
        floatingElements.forEach((element, index) => {
            gsap.to(element, {
                y: "-30vh",
                ease: "none",
                scrollTrigger: {
                    trigger: ".about",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }

    // Smooth bio text animation without jitter
    setupAboutBioAnimation() {
        const bioTexts = document.querySelectorAll('.about__bio-text');
        
        bioTexts.forEach((text, index) => {
            // Set initial state for smooth fade-in
            gsap.set(text, {
                opacity: 0,
                y: 20
            });
            
            // Smooth fade-in animation
            gsap.to(text, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: text,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.2
            });
        });
    }

    setupAboutTypewriter() {
        const bioTexts = document.querySelectorAll('.about__bio-text');
        
        bioTexts.forEach((text, index) => {
            const originalText = text.textContent;
            text.textContent = '';
            
            ScrollTrigger.create({
                trigger: text,
                start: "top 80%",
                onEnter: () => {
                    this.typewriterEffect(text, originalText, 30, index * 500);
                }
            });
        });
    }

    typewriterEffect(element, text, speed, delay) {
        setTimeout(() => {
            let i = 0;
            const timer = setInterval(() => {
                element.textContent = text.slice(0, i + 1);
                i++;
                if (i === text.length) {
                    clearInterval(timer);
                }
            }, speed);
        }, delay);
    }

    // Advanced Process Section Animations
    setupAdvancedProcessAnimations() {
        console.log('Setting up advanced Process animations...');
        
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded, skipping process animations');
            return;
        }

        this.setupProcessPathAnimation();
        this.setupProcessStepAnimations();
    }

    setupProcessPathAnimation() {
        const path = document.getElementById('processPath');
        const pathElement = path?.querySelector('path');
        
        if (!pathElement) return;

        const pathLength = pathElement.getTotalLength();
        
        gsap.set(pathElement, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
        });

        gsap.to(pathElement, {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: ".process",
                start: "top center",
                toggleActions: "play none none reverse"
            }
        });
    }

    setupProcessStepAnimations() {
        const steps = document.querySelectorAll('.process__step');
        
        steps.forEach((step, index) => {
            gsap.set(step, {
                opacity: 0,
                y: 50,
                scale: 0.8
            });
            
            gsap.to(step, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: step,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.2
            });

            // Hover effect
            step.addEventListener('mouseenter', () => {
                gsap.to(step, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            step.addEventListener('mouseleave', () => {
                gsap.to(step, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }


    // Touch-Friendly Skills Interaction
    setupTouchSkillsInteraction() {
        if (!this.isTouchDevice) {
            console.log('Non-touch device, using hover interactions');
            return;
        }
        
        console.log('Setting up touch-friendly skills interaction...');
        
        const skillCols = document.querySelectorAll('.skill-col');
        let activeSkill = null;
        
        skillCols.forEach((col, index) => {
            // Add touch event listeners
            col.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleSkillTouch(col, skillCols);
            });
            
            col.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSkillTouch(col, skillCols);
            });
        });
        
        // Close expanded skill when clicking outside
        document.addEventListener('touchstart', (e) => {
            const isSkillCol = e.target.closest('.skill-col');
            if (!isSkillCol && activeSkill) {
                activeSkill.classList.remove('active');
                activeSkill = null;
            }
        });
    }
    
    handleSkillTouch(col, allCols) {
        // Remove active class from all columns
        allCols.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked column
        col.classList.add('active');
        
        // Store reference to active skill
        this.activeSkill = col;
    }
    
    // Work Section Image Integration
    setupWorkImages() {
        const workItems = [
            { selector: '[data-project="alpha-ai"]', imageName: 'Alpha.png' },
            { selector: '[data-project="infiFeed"]', imageName: 'InfiFeed.png' },
            { selector: '[data-project="iphone-clone"]', imageName: 'iphone.png' },
            { selector: '[data-project="travel-booking"]', imageName: 'Travel-Booking-Homepage.webp' }
        ];

        workItems.forEach(item => {
            const workEl = document.querySelector(item.selector);
            const placeholderEl = workEl?.querySelector('.work__placeholder');
            
            if (placeholderEl) {
                // Add loading and error handling for images
                const img = document.createElement('img');
                img.src = `./images/works/${item.imageName}`;
                img.alt = item.imageName.split('.')[0];
                img.className = 'work__real-image';
                img.loading = 'lazy'; // Lazy loading for performance
                
                img.onerror = () => {
                    console.warn(`Failed to load image: ${item.imageName}`);
                    placeholderEl.textContent = item.imageName.split('.')[0];
                };
                
                placeholderEl.innerHTML = '';
                placeholderEl.appendChild(img);
            }
        });
    }

}

// Initialize portfolio when DOM is ready
console.log('Initializing portfolio...');
const portfolio = new Portfolio();

// Add CSS for reduced motion and mobile viewport fixes
if (!document.querySelector('#responsive-fixes-styles')) {
    const style = document.createElement('style');
    style.id = 'responsive-fixes-styles';
    style.textContent = `
        .reduce-motion *,
        .reduce-motion *::before,
        .reduce-motion *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        /* Mobile viewport height fix */
        @media (max-width: 768px) {
            .hero,
            .works,
            .footer {
                min-height: calc(var(--vh, 1vh) * 100);
            }
        }
        
        /* Prevent zoom on iOS form inputs */
        @supports (-webkit-touch-callout: none) {
            input, select, textarea {
                font-size: max(16px, 1rem);
            }
        }
        
        /* Improve touch targets */
        @media (hover: none) {
            .navbar__link,
            .hero__cta-link,
            .work__link,
            .footer__link,
            .skill-col {
                min-height: 44px;
                min-width: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    `;
    document.head.appendChild(style);
}

// Expose to global scope for debugging
window.portfolio = portfolio;

// Handle window resize for responsive carousel and GSAP ScrollTrigger
window.addEventListener('resize', () => {
    // Update device detection on resize
    portfolio.isMobile = portfolio.detectMobileDevice();
    portfolio.isTouchDevice = portfolio.detectTouchDevice();
    
    if (portfolio.handleResize) {
        portfolio.handleResize();
    }
    
    // Only refresh ScrollTrigger on non-mobile devices
    if (typeof ScrollTrigger !== 'undefined' && !portfolio.isMobile) {
        ScrollTrigger.refresh();
    }
    
    // Handle cursor visibility on resize
    if (portfolio.isTouchDevice && portfolio.cursor) {
        portfolio.cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
    } else if (!portfolio.isTouchDevice && portfolio.cursor) {
        portfolio.cursor.style.display = 'block';
        document.body.style.cursor = 'none';
    }
}, { passive: true });

// Performance optimization: Pause carousel when tab is not active
document.addEventListener('visibilitychange', () => {
    if (portfolio.carousel) {
        if (document.hidden) {
            // Pause animations when tab is hidden
            if (portfolio.carousel.animationId) {
                cancelAnimationFrame(portfolio.carousel.animationId);
                portfolio.carousel.animationId = null;
            }
        } else {
            // Resume animations when tab is visible
            if (!portfolio.carousel.animationId && portfolio.carousel.scene) {
                portfolio.startCarouselAnimation();
            }
        }
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (portfolio.destroyCarousel) {
        portfolio.destroyCarousel();
    }
    if (portfolio.destroyWorksScrollJacking) {
        portfolio.destroyWorksScrollJacking();
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});