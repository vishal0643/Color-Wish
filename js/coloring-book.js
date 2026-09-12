/**
 * Color-Wish Local Storage Coloring Book Manager
 */
window.ColorWishBook = (function () {
  'use strict';

  const STORAGE_KEY = 'cw_coloring_book';

  function getPages() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  function savePages(pages) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  }

  function add(page) {
    if (!page || !page.id) return false;
    const pages = getPages();
    const exists = pages.some(p => p.id === page.id);
    if (!exists) {
      pages.push(page);
      savePages(pages);
      return true;
    }
    return false;
  }

  function remove(id) {
    let pages = getPages();
    pages = pages.filter(p => p.id !== id);
    savePages(pages);
  }

  function clear() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function count() {
    return getPages().length;
  }

  function print() {
    const pages = getPages();
    if (pages.length === 0) return;
    
    const printWindow = window.open('', '_blank');
    let html = '<html><head><title>Coloring Book</title><style>img{max-width:100%;page-break-after:always;}</style></head><body>';
    pages.forEach(p => {
      html += '<img src="' + p.url + '" />';
    });
    html += '</body></html>';
    
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  return {
    add: add,
    remove: remove,
    clear: clear,
    getPages: getPages,
    count: count,
    print: print
  };
})();
