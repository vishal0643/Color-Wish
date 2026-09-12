/**
 * Color-Wish Main Application Framework
 * Handles UI, Navigation, Search Filters, and Toast Notifications.
 */
window.ColorWish = (function () {
  'use strict';

  const state = {
    activeCategory: 'all',
    searchQuery: '',
  };

  function init() {
    setupNavigation();
    setupSearch();
    setupCategories();
    updateCopyrightYear();
  }

  function setupNavigation() {
    const mobileBtn = document.querySelector('.cw-mobile-menu-btn');
    const nav = document.querySelector('.cw-nav');

    if (mobileBtn && nav) {
      mobileBtn.addEventListener('click', function () {
        nav.classList.toggle('open');
      });
    }
  }

  function setupSearch() {
    const searchInput = document.querySelector('[data-cw-search]');
    if (!searchInput) return;

    searchInput.addEventListener('input', function (e) {
      state.searchQuery = e.target.value.toLowerCase().trim();
      filterGallery();
    });
  }

  function setupCategories() {
    const chips = document.querySelectorAll('.cw-chip');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        state.activeCategory = this.getAttribute('data-cw-category') || 'all';
        filterGallery();
      });
    });
  }

  function filterGallery() {
    const cards = document.querySelectorAll('[data-cw-card]');
    cards.forEach(function (card) {
      const title = (card.getAttribute('data-cw-title') || '').toLowerCase();
      const category = card.getAttribute('data-cw-category') || '';

      const matchesSearch = title.includes(state.searchQuery);
      const matchesCategory = state.activeCategory === 'all' || category === state.activeCategory;

      if (matchesSearch && matchesCategory) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function updateCopyrightYear() {
    const yearElem = document.querySelector('[data-cw-year]');
    if (yearElem) {
      yearElem.textContent = new Date().getFullYear();
    }
  }

  function showToast(message) {
    let toast = document.querySelector('.cw-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'cw-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function () {
      toast.classList.remove('show');
    }, 3000);
  }

  return {
    init: init,
    showToast: showToast
  };
})();

document.addEventListener('DOMContentLoaded', function () {
  ColorWish.init();
});
