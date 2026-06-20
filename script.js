// ===================================
// やきとり・一番星 - JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function () {

  // ===================================
  // ヘッダースクロール制御
  // ===================================
  const header = document.getElementById('site-header');

  function updateHeader() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ===================================
  // ハンバーガーメニュー
  // ===================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // モバイルメニューのリンククリックで閉じる
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ===================================
  // スムーズスクロール（ヘッダー高さ考慮）
  // ===================================
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

  allAnchorLinks.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = header.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    });
  });

  // ===================================
  // トップへ戻るボタン
  // ===================================
  const backToTop = document.getElementById('back-to-top');

  function updateBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();

  // ===================================
  // スクロールフェードインアニメーション
  // ===================================
  const fadeTargets = document.querySelectorAll(
    '.about-grid, .menu-card, .enkai-card, .gallery-item, .reserve-card, .feature-item, .shop-info-table, .access-map-col, .section-header'
  );

  fadeTargets.forEach(function (el) {
    el.classList.add('fade-in');
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // 少し遅延をもたせてグループでフェードイン
        const el = entry.target;
        const siblings = Array.from(el.parentElement.querySelectorAll('.fade-in'));
        const idx = siblings.indexOf(el);
        const delay = Math.min(idx * 80, 400);

        setTimeout(function () {
          el.classList.add('visible');
        }, delay);

        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeTargets.forEach(function (el) {
    observer.observe(el);
  });

  // ===================================
  // ヒーロータイトル演出
  // ===================================
  const heroTitle = document.querySelector('.hero-title-main');
  const heroBadge = document.querySelector('.hero-badge');
  const heroCatch = document.querySelector('.hero-catch');
  const heroStrip = document.querySelector('.hero-info-strip');
  const heroBtns = document.querySelector('.hero-btns');

  if (heroTitle) {
    // 初期状態
    [heroBadge, heroTitle, heroCatch, heroStrip, heroBtns].forEach(function (el) {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      }
    });

    // 順番にフェードイン
    var items = [heroBadge, heroTitle, heroCatch, heroStrip, heroBtns];
    items.forEach(function (el, i) {
      if (!el) return;
      setTimeout(function () {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 300 + i * 200);
    });
  }

  // ===================================
  // ナビゲーションのアクティブ制御
  // ===================================
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + header.offsetHeight + 40;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ===================================
  // メニュースライドショー（5秒間隔）
  // ===================================
  function initSlideshow(slideshowId, dotsId) {
    const slideshow = document.getElementById(slideshowId);
    if (!slideshow) return;

    const slides = slideshow.querySelectorAll('.menu-slide');
    const dotsContainer = document.getElementById(dotsId);
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.menu-dot') : [];
    let currentIndex = 0;
    let timer = null;

    function showSlide(index) {
      if (index >= slides.length) index = 0;
      if (index < 0) index = slides.length - 1;

      slides[currentIndex].classList.remove('active');
      if (dots.length > 0) dots[currentIndex].classList.remove('active');

      slides[index].classList.add('active');
      if (dots.length > 0) dots[index].classList.add('active');

      currentIndex = index;
    }

    function nextSlide() {
      showSlide(currentIndex + 1);
    }

    function startTimer() {
      timer = setInterval(nextSlide, 5000);
    }

    function resetTimer() {
      clearInterval(timer);
      startTimer();
    }

    dots.forEach(function (dot, idx) {
      dot.addEventListener('click', function () {
        showSlide(idx);
        resetTimer();
      });
    });

    startTimer();
  }

  // スライドショー初期化
  initSlideshow('slideshow-kushiyaki', 'dots-kushiyaki');
  initSlideshow('slideshow-ippin', 'dots-ippin');

  // ===================================
  // メニューモーダル制御（詳しく見る）
  // ===================================
  const detailButtons = document.querySelectorAll('.menu-detail-btn');
  const modals = document.querySelectorAll('.modal');

  detailButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modals.forEach(function (modal) {
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    function closeModal() {
      modal.classList.remove('open');
      const anyOpen = Array.from(modals).some(function (m) {
        return m.classList.contains('open');
      });
      if (!anyOpen) {
        document.body.style.overflow = '';
      }
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
    if (overlay) {
      overlay.addEventListener('click', closeModal);
    }
  });

});
