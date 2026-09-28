// ==UserScript==
// @name         Rabbit AI Compact
// @namespace    rabbit.web.ai
// @version      0.1.0
// @description  Compact mobile UI for AI web apps on Rabbit R1
// @match        https://chatgpt.com/*
// @match        https://gemini.google.com/*
// @match        https://claude.ai/*
// @match        https://chat.deepseek.com/*
// @match        https://modelstudio.alibabacloud.com/*
// @run-at       document-start
// ==/UserScript==

(() => {
  'use strict';

  const host = location.hostname;

  const style = document.createElement('style');
  style.id = 'rabbit-ai-compact-style';
  style.textContent =
    'html,body{max-width:100vw!important;overflow-x:hidden!important;overscroll-behavior:none!important;}' +
    '*{box-sizing:border-box!important;}' +
    'textarea,input,[contenteditable="true"]{font-size:16px!important;}';
  (document.head || document.documentElement).appendChild(style);

  function compactChatGPT() {
    const all = document.querySelectorAll('body *');
    for (const el of all) {
      if ((el.textContent || '').trim() === 'Workspace out of credits') {
        const banner = el.closest('.bg-token-main-surface-secondary.w-full');
        if (banner) banner.style.setProperty('display', 'none', 'important');
      }
    }
  }

  function compact() {
    if (host === 'chatgpt.com') compactChatGPT();
  }

  const observer = new MutationObserver(compact);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', compact, { once: true });
  setTimeout(compact, 250);
  setTimeout(compact, 1000);

  let fullscreenTried = false;
  function enterFullscreen() {
    if (fullscreenTried || document.fullscreenElement) return;
    fullscreenTried = true;
    const root = document.documentElement;
    if (root.requestFullscreen) {
      root.requestFullscreen().catch(() => {
        fullscreenTried = false;
      });
    }
  }

  document.addEventListener('pointerdown', enterFullscreen, {
    capture: true,
    once: true
  });
})();
