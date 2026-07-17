/**
 * ==========================================================================
 * PERFUME / FRAGRANCE BRAND — VANILLA JAVASCRIPT ATELIER ENGINE
 * ==========================================================================
 * Features:
 * 1. Sticky Navigation & Scroll Spy Active States
 * 2. Mobile Drawer Toggle & Accessible Navigation
 * 3. Scroll Reveal Intersection Observer Animations
 * 4. FAQ Accordion Expand / Collapse Logic
 * 5. Hero Canvas Floating Golden Dust & Scent Particles
 * 6. Hero & Collection Tab Filtering with Smooth Transitions
 * 7. Interactive Quick View Olfactory Modal
 * 8. Interactive Scent Consultation Quiz Modal
 * 9. Patron Testimonials Carousel Slider
 * 10. Atelier Bag Counter & Notification Toast
 * 11. Consultation Form Simulation
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ================= 1. STICKY NAV & SCROLL SPY ================= */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy for Nav Active States
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 180;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  /* ================= 2. MOBILE DRAWER TOGGLE ================= */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeMobileDrawerBtn = document.getElementById('close-mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const openDrawer = () => {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', openDrawer);
    closeMobileDrawerBtn.addEventListener('click', closeDrawer);

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on click outside drawer
    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('open') &&
          !mobileDrawer.contains(e.target) &&
          !hamburgerBtn.contains(e.target)) {
        closeDrawer();
      }
    });
  }

  /* ================= 3. SCROLL REVEAL ANIMATIONS ================= */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ================= 4. FAQ ACCORDION LOGIC ================= */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerDiv = item.querySelector('.faq-answer');
    const answerInner = item.querySelector('.faq-answer-inner');

    if (questionBtn && answerDiv) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Optional: Close all others for a neat accordion
        faqItems.forEach(other => {
          if (other !== item && other.classList.contains('open')) {
            other.classList.remove('open');
            other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            other.querySelector('.faq-answer').style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove('open');
          questionBtn.setAttribute('aria-expanded', 'false');
          answerDiv.style.maxHeight = null;
        } else {
          item.classList.add('open');
          questionBtn.setAttribute('aria-expanded', 'true');
          answerDiv.style.maxHeight = answerInner.scrollHeight + 40 + 'px';
        }
      });
    }
  });

  /* ================= 5. HERO CANVAS FLOATING GOLDEN DUST PARTICLES ================= */
  const canvas = document.getElementById('hero-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const numParticles = 65;
    const particles = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.4,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.6 - 0.15,
        opacity: Math.random() * 0.7 + 0.1,
        color: Math.random() > 0.3 ? '#d4af37' : '#f3e5ab'
      });
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#d4af37';
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // Hero Mouse Parallax Effect
    const heroTitle = document.querySelector('.hero-title');
    const heroImg = document.getElementById('hero-img');
    const heroSection = document.getElementById('hero');

    if (heroTitle && heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = (clientX - centerX) / centerX;
        const deltaY = (clientY - centerY) / centerY;

        heroTitle.style.transform = `translate(${deltaX * -12}px, ${deltaY * -12}px)`;
        if (heroImg) {
          heroImg.style.transform = `scale(1.04) translate(${deltaX * 15}px, ${deltaY * 15}px)`;
        }
      });

      heroSection.addEventListener('mouseleave', () => {
        heroTitle.style.transform = 'translate(0, 0)';
        heroTitle.style.transition = 'transform 0.8s ease';
        if (heroImg) {
          heroImg.style.transform = 'scale(1.03) translate(0, 0)';
          heroImg.style.transition = 'transform 0.8s ease';
        }
      });
    }
  }

  /* ================= 6. COLLECTION FILTERING (TABS & HERO PILLS) ================= */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const scentCards = document.querySelectorAll('.scent-card');
  const heroFamilyPills = document.querySelectorAll('.scent-family-pill');

  const filterCards = (category) => {
    scentCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      if (card._filterTimeout) clearTimeout(card._filterTimeout);
      
      if (category === 'all') {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 30);
      } else {
        // Check if card matches category (or keywords like woody, floral, etc.)
        const title = card.querySelector('.scent-card-title').textContent.toLowerCase();
        const desc = card.querySelector('.scent-card-desc').textContent.toLowerCase();
        
        let match = false;
        if (cardCategory.includes(category)) match = true;
        if (category === 'woody' && (desc.includes('amber') || desc.includes('vetiver') || desc.includes('cedar') || desc.includes('santal'))) match = true;
        if (category === 'floral' && (desc.includes('iris') || desc.includes('jasmine') || desc.includes('violet') || desc.includes('orris'))) match = true;
        if (category === 'smoky' && (desc.includes('plum') || desc.includes('pepper') || desc.includes('smoked') || desc.includes('vanilla'))) match = true;
        if (category === 'leather' && (desc.includes('leather') || desc.includes('velours') || desc.includes('oud'))) match = true;

        if (match) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          card._filterTimeout = setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      }
    });
  };

  // Tab button clicks
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-target');
      filterCards(target);
    });
  });

  // Hero pill clicks
  heroFamilyPills.forEach(pill => {
    pill.addEventListener('click', () => {
      heroFamilyPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const family = pill.getAttribute('data-family');
      
      // Update collection tabs to 'All Offerings' and filter cards by family
      tabBtns.forEach(b => b.classList.remove('active'));
      if (tabBtns[0]) tabBtns[0].classList.add('active');
      
      filterCards(family);

      // Smooth scroll to collections
      const collectionsSection = document.getElementById('collections');
      if (collectionsSection) {
        collectionsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ================= 7. INTERACTIVE QUICK VIEW MODAL ================= */
  const quickViewBtns = document.querySelectorAll('.scent-quick-view');
  const quickViewModal = document.getElementById('quick-view-modal');
  const closeQuickViewBtn = document.getElementById('close-quick-view');

  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalConcentration = document.getElementById('modal-concentration');
  const modalPrice = document.getElementById('modal-price');
  const modalAddBtn = document.getElementById('modal-add-btn');

  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');
      const price = btn.getAttribute('data-price');
      const concentration = btn.getAttribute('data-concentration');

      if (modalTitle && modalDesc && modalConcentration && modalPrice) {
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalConcentration.textContent = concentration;
        modalPrice.textContent = price;
        if (modalAddBtn) {
          modalAddBtn.setAttribute('data-item', title);
        }

        quickViewModal.classList.add('active');
        quickViewModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeQuickView = () => {
    if (quickViewModal) {
      quickViewModal.classList.remove('active');
      quickViewModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (closeQuickViewBtn) {
    closeQuickViewBtn.addEventListener('click', closeQuickView);
  }

  if (quickViewModal) {
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) closeQuickView();
    });
  }

  /* ================= 8. INTERACTIVE SCENT CONSULTATION QUIZ MODAL ================= */
  const quizModal = document.getElementById('quiz-modal');
  const openQuizHero = document.getElementById('open-quiz-hero');
  const openQuizNav = document.getElementById('open-quiz-nav');
  const closeQuizBtn = document.getElementById('close-quiz');
  const quizRestartBtn = document.getElementById('quiz-restart');
  const quizGotoCardBtn = document.getElementById('quiz-goto-card');

  const quizSteps = [
    document.getElementById('quiz-step-1'),
    document.getElementById('quiz-step-2'),
    document.getElementById('quiz-step-3'),
    document.getElementById('quiz-step-result')
  ];

  let currentQuizStep = 0;
  const scores = { amber: 0, iris: 0, plum: 0, discovery: 0 };

  const showQuizStep = (index) => {
    quizSteps.forEach((step, idx) => {
      if (step) {
        step.classList.remove('active');
        if (idx === index) step.classList.add('active');
      }
    });
  };

  const openQuiz = () => {
    currentQuizStep = 0;
    scores.amber = 0; scores.iris = 0; scores.plum = 0; scores.discovery = 0;
    showQuizStep(0);
    if (quizModal) {
      quizModal.classList.add('active');
      quizModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeQuiz = () => {
    if (quizModal) {
      quizModal.classList.remove('active');
      quizModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (openQuizHero) openQuizHero.addEventListener('click', openQuiz);
  if (openQuizNav) openQuizNav.addEventListener('click', openQuiz);
  if (closeQuizBtn) closeQuizBtn.addEventListener('click', closeQuiz);
  if (quizRestartBtn) quizRestartBtn.addEventListener('click', () => {
    currentQuizStep = 0;
    showQuizStep(0);
  });

  if (quizModal) {
    quizModal.addEventListener('click', (e) => {
      if (e.target === quizModal) closeQuiz();
    });
  }

  // Handle quiz options clicks
  const optionBtns = document.querySelectorAll('.quiz-option-btn');
  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const scoreKey = btn.getAttribute('data-score');
      if (scores[scoreKey] !== undefined) {
        scores[scoreKey]++;
      }

      currentQuizStep++;
      if (currentQuizStep < 3) {
        showQuizStep(currentQuizStep);
      } else {
        // Calculate recommended scent
        let highestScore = -1;
        let recommendedKey = 'amber';
        for (const [key, val] of Object.entries(scores)) {
          if (val > highestScore) {
            highestScore = val;
            recommendedKey = key;
          }
        }

        const resultTitle = document.getElementById('quiz-result-title');
        const resultDesc = document.getElementById('quiz-result-desc');

        if (recommendedKey === 'amber') {
          if (resultTitle) resultTitle.textContent = "No. 01 — L'Ombre d'Or Extrait";
          if (resultDesc) resultDesc.textContent = "Your selections reflect an affinity for warmth, atmospheric depth, and enveloping amber notes. L'Ombre d'Or will envelope your pulse points with hypnotic bergamot and dark iris before settling into smoked vetiver.";
        } else if (recommendedKey === 'iris') {
          if (resultTitle) resultTitle.textContent = "No. 03 — Iris Céleste EDP";
          if (resultDesc) resultDesc.textContent = "You value crisp elegance, buttery textures, and luminous floral grace. Iris Céleste combines Florentine orris butter and violet leaf with warm cashmeran for a radiant aura.";
        } else if (recommendedKey === 'plum') {
          if (resultTitle) resultTitle.textContent = "No. 02 — Noir Velours EDP";
          if (resultDesc) resultDesc.textContent = "Your presence is confident, bold, and mysteriously magnetic. Noir Velours harmonizes velvety dark plum petals with night-blooming jasmine and smoked Bourbon vanilla absolute.";
        } else {
          if (resultTitle) resultTitle.textContent = "The Atelier Discovery Box";
          if (resultDesc) resultDesc.textContent = "Because you appreciate variety and layered artistry across shifting occasions, we recommend our complete 5-vial Discovery Set — including our $65 credit toward your future signature vessel.";
        }

        showQuizStep(3);
      }
    });
  });

  if (quizGotoCardBtn) {
    quizGotoCardBtn.addEventListener('click', () => {
      closeQuiz();
      const collectionsSection = document.getElementById('collections');
      if (collectionsSection) {
        collectionsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ================= 9. TESTIMONIALS CAROUSEL SLIDER ================= */
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevSlideBtn = document.getElementById('prev-slide');
  const nextSlideBtn = document.getElementById('next-slide');
  const dots = document.querySelectorAll('.dot');

  let currentSlide = 0;
  let carouselTimer = null;

  const showSlide = (index) => {
    slides.forEach((slide, idx) => {
      slide.classList.remove('active');
      if (dots[idx]) dots[idx].classList.remove('active');
      if (idx === index) {
        slide.classList.add('active');
        if (dots[idx]) dots[idx].classList.add('active');
      }
    });
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  };

  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  };

  if (slides.length > 0) {
    if (nextSlideBtn) nextSlideBtn.addEventListener('click', () => {
      nextSlide();
      resetCarouselTimer();
    });

    if (prevSlideBtn) prevSlideBtn.addEventListener('click', () => {
      prevSlide();
      resetCarouselTimer();
    });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        currentSlide = idx;
        showSlide(currentSlide);
        resetCarouselTimer();
      });
    });

    const resetCarouselTimer = () => {
      if (carouselTimer) clearInterval(carouselTimer);
      carouselTimer = setInterval(nextSlide, 6500);
    };

    resetCarouselTimer();
  }

  /* ================= 10. ATELIER BAG & NOTIFICATION TOAST ================= */
  const cartCountEl = document.getElementById('cart-count');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  let cartItemsCount = 0;
  let toastTimeout = null;

  const showToast = (itemName, isCustomMessage = false) => {
    if (toast && toastText) {
      toastText.textContent = isCustomMessage ? itemName : `${itemName} added to your Atelier Bag.`;
      toast.style.transform = 'translateY(0)';
      
      if (toastTimeout) clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.style.transform = 'translateY(120px)';
      }, 3500);
    }
  };

  // Attach to all Add to Cart buttons including dynamically modal ones
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn') || e.target.id === 'modal-add-btn') {
      const item = e.target.getAttribute('data-item') || 'Selected Fragrance';
      cartItemsCount++;
      if (cartCountEl) {
        cartCountEl.textContent = cartItemsCount;
        cartCountEl.style.transform = 'scale(1.3)';
        setTimeout(() => {
          cartCountEl.style.transform = 'scale(1)';
        }, 300);
      }
      showToast(item, false);
      if (e.target.id === 'modal-add-btn') {
        closeQuickView();
      }
    }
  });

  /* ================= 11. CONTACT CONSULTATION FORM SIMULATION ================= */
  const formCard = document.querySelector('.form-card');
  let originalFormHTML = formCard ? formCard.innerHTML : '';

  const initContactForm = () => {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm || !formCard) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const interestInput = document.getElementById('contact-interest');
      
      const name = nameInput && nameInput.value ? nameInput.value : 'Patron';
      const email = emailInput && emailInput.value ? emailInput.value : 'your email';
      let interest = 'bespoke consultation';
      if (interestInput && interestInput.options && interestInput.selectedIndex >= 0) {
        interest = interestInput.options[interestInput.selectedIndex].text || interestInput.value;
      }

      showToast(`Dialogue initiated. We will contact ${name} shortly.`, true);
      
      // Visual confirmation right inside the form card
      formCard.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem;">
          <div style="width: 60px; height: 60px; border-radius: 50%; border: 1.5px solid var(--gold-metallic); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: var(--gold-metallic); font-size: 1.8rem;">&check;</div>
          <h3 class="font-serif" style="font-size: 2rem; color: var(--gold-metallic); margin-bottom: 0.8rem;">Consultation Requested</h3>
          <p style="font-size: 1.05rem; color: var(--text-cream); line-height: 1.7; margin-bottom: 2.2rem; max-width: 440px; margin-left: auto; margin-right: auto;">
            Thank you, <strong>${name}</strong>. Our Connoisseur Concierge has noted your interest in <strong>${interest}</strong> and will reach out to <strong>${email}</strong> within 12 business hours.
          </p>
          <button class="btn btn-secondary" id="reset-form-btn" style="padding: 14px 28px;">Submit Another Inquiry</button>
        </div>
      `;

      const resetBtn = document.getElementById('reset-form-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          formCard.innerHTML = originalFormHTML;
          initContactForm();
        });
      }
    });
  };

  initContactForm();
});
