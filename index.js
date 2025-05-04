
        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const navMenu = document.getElementById('nav-menu');

        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Smooth Scrolling for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            });
        });

        // Header Scroll Effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Committee Tabs
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.committee-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                btn.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // Scroll Reveal Animation
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.about-card, .member-card, .timeline-item');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight - 100) {
                    element.classList.add('visible');
                }
            });
        };

        // Initialize animations on load
        window.addEventListener('load', animateOnScroll);
        
        // Animate on scroll
        window.addEventListener('scroll', animateOnScroll);
    

        ////image slide///
        document.addEventListener('DOMContentLoaded', function() {
            const slider = document.querySelector('.slider-track');
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            const dotsContainer = document.getElementById('dotsContainer');
            
            let currentIndex = 0;
            const slideCount = slides.length;
            let slideInterval;
            
            // Create dots
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
            
            const dots = document.querySelectorAll('.dot');
            
            function updateSlider() {
                slider.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Update dots
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
            
            function goToSlide(index) {
                currentIndex = index;
                updateSlider();
                resetInterval();
            }
            
            function nextSlide() {
                currentIndex = (currentIndex + 1) % slideCount;
                updateSlider();
                resetInterval();
            }
            
            function prevSlide() {
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                updateSlider();
                resetInterval();
            }
            
            function resetInterval() {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            }
            
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
            
            // Auto-slide every 5 seconds
            slideInterval = setInterval(nextSlide, 5000);
            
            // Pause on hover
            const sliderContainer = document.querySelector('.conference-slider');
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                resetInterval();
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') nextSlide();
                if (e.key === 'ArrowLeft') prevSlide();
            });
            
            // Touch support for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            sliderContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].clientX;
            }, {passive: true});
            
            sliderContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].clientX;
                if (touchEndX < touchStartX - 50) nextSlide();
                if (touchEndX > touchStartX + 50) prevSlide();
            }, {passive: true});
        });


        //marquee
        const dateData = {
            'submission': {
                date: '30.05.2025',
                event: 'Full Paper Submission Deadline',
                description: 'Last date to submit your research papers for consideration.'
            },
            'notification': {
                date: '02.06.2025',
                event: 'Acceptance Notification',
                description: 'Authors will be notified about paper acceptance status.'
            },
            'final': {
                date: '15.06.2025',
                event: 'Final Paper Submission',
                description: 'Deadline for camera-ready versions of accepted papers.'
            },
            'conference': {
                date: '11.07.2025',
                event: 'Conference Date',
                description: 'Main event day featuring presentations and workshops.'
            }
        };
    
        function showPopup(type) {
            const data = dateData[type];
            document.getElementById('popup-title').textContent = data.event;
            document.getElementById('popup-date').textContent = data.date;
            document.getElementById('popup-event').textContent = data.event;
            
            // You can add more content here if needed
            document.getElementById('popup').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        }
        
        function hidePopup() {
            document.getElementById('popup').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        }
        
        // Close popup when clicking ESC key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                hidePopup();
            }
        });