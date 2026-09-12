/**
 * Color-Wish SVG Coloring Engine
 * Safe element coloring, history tracking (Undo/Redo), and export capabilities.
 */
window.ColorWishSVG = (function () {
  'use strict';

  let container = null;
  let activeSvg = null;
  let currentColor = '#FF5E7E';
  let history = [];
  let historyStep = -1;

  const DANGEROUS_TAGS = ['script', 'iframe', 'object', 'embed', 'foreignObject'];

  function sanitize(svgMarkup) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgMarkup, 'image/svg+xml');

    DANGEROUS_TAGS.forEach(tag => {
      const elements = doc.querySelectorAll(tag);
      elements.forEach(el => el.remove());
    });

    const allElements = doc.querySelectorAll('*');
    allElements.forEach(el => {
      Array.from(el.attributes).forEach(attr => {
        if (attr.name.startsWith('on') || attr.value.startsWith('javascript:')) {
          el.removeAttribute(attr.name);
        }
      });
    });

    return doc.documentElement;
  }

  function init(targetContainerSelector) {
    container = document.querySelector(targetContainerSelector);
    if (!container) return;

    container.addEventListener('click', handleElementClick);
  }

  function load(svgMarkup) {
    if (!container) return;

    const cleanSvg = sanitize(svgMarkup);
    container.innerHTML = '';
    container.appendChild(cleanSvg);
    activeSvg = container.querySelector('svg');

    if (activeSvg) {
      activeSvg.setAttribute('width', '100%');
      activeSvg.setAttribute('height', '100%');
      saveState();
    }
  }

  function handleElementClick(e) {
    const target = e.target;
    const colorableTags = ['path', 'polygon', 'rect', 'circle', 'ellipse'];

    if (activeSvg && colorableTags.includes(target.tagName.toLowerCase())) {
      target.style.fill = currentColor;
      target.setAttribute('fill', currentColor);
      saveState();
    }
  }

  function setColor(color) {
    currentColor = color;
  }

  function saveState() {
    if (!activeSvg) return;
    historyStep++;
    history = history.slice(0, historyStep);
    history.push(activeSvg.outerHTML);
  }

  function undo() {
    if (historyStep > 0) {
      historyStep--;
      renderHistoryStep();
    }
  }

  function redo() {
    if (historyStep < history.length - 1) {
      historyStep++;
      renderHistoryStep();
    }
  }

  function reset() {
    if (history.length > 0) {
      historyStep = 0;
      renderHistoryStep();
    }
  }

  function renderHistoryStep() {
    if (!container || !history[historyStep]) return;
    container.innerHTML = history[historyStep];
    activeSvg = container.querySelector('svg');
  }

  function download(filename) {
    if (!activeSvg) return;
    const blob = new Blob([activeSvg.outerHTML], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'colored-page.svg';
    a.click();
    URL.revokeObjectURL(url);
  }

  function print() {
    if (!activeSvg) return;
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print Page</title></head><body style="display:flex;justify-content:center;align-items:center;height:100vh;">' + activeSvg.outerHTML + '</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  return {
    init: init,
    load: load,
    setColor: setColor,
    undo: undo,
    redo: redo,
    reset: reset,
    download: download,
    print: print
  };
})();
