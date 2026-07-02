document.addEventListener("DOMContentLoaded", function() {
    // -------- القائمة الجانبية (Mobile Menu) --------
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');

    function closeMenu() {
        if(mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
    }

    // إغلاق القائمة عند الضغط على أي رابط داخلي فيها
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // -------- تأثير الظهور عند التمرير (Reveal on scroll) --------
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

    // -------- عدادات الخبرة والملفات (عند ظهورهم في الشاشة) --------
    const expYearsElement = document.getElementById('exp-years-counter');
    const casesSuccessElement = document.getElementById('cases-success-counter');

    if (expYearsElement && casesSuccessElement) {
        const expYearsTarget = 22;
        const casesSuccessTarget = 1500;
        let expYearsCounted = false;
        let casesSuccessCounted = false;

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!expYearsCounted) {
                        expYearsCounted = true;
                        let current = 0;
                        const increment = 1;
                        const timer = setInterval(() => {
                            current += increment;
                            expYearsElement.textContent = current;
                            if (current >= expYearsTarget) {
                                expYearsElement.textContent = expYearsTarget;
                                clearInterval(timer);
                            }
                        }, 50);
                    }

                    if (!casesSuccessCounted) {
                        casesSuccessCounted = true;
                        let current = 0;
                        const increment = 10;
                        const timer = setInterval(() => {
                            current += increment;
                            casesSuccessElement.textContent = current;
                            if (current >= casesSuccessTarget) {
                                casesSuccessElement.textContent = casesSuccessTarget;
                                clearInterval(timer);
                            }
                        }, 20);
                    }

                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        counterObserver.observe(expYearsElement);
        counterObserver.observe(casesSuccessElement);
    }

    // -------- تأثير تلوين الصورة الشخصية بعد 3 ثوانٍ --------
    setTimeout(function() {
        document.querySelectorAll('.auto-colorize').forEach(img => {
            img.classList.add('colorized');
        });
    }, 3000);
});
