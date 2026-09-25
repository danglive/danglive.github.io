(() => {
  const body = document.body;
  if (!body) return;

  body.classList.add('editorial-article');
  const lang = (document.documentElement.lang || 'en').toLowerCase();
  const isVietnamese = lang.startsWith('vi');

  if (!document.querySelector('.editorial-skip-link')) {
    const skipLink = document.createElement('a');
    skipLink.className = 'editorial-skip-link';
    skipLink.href = '#editorial-content';
    skipLink.textContent = isVietnamese ? 'Đi đến nội dung chính' : 'Skip to main content';
    body.prepend(skipLink);
  }

  let sitebar = document.querySelector('.sitebar');
  if (!sitebar) {
    sitebar = document.createElement('header');
    sitebar.className = 'sitebar editorial-injected-sitebar';
    sitebar.innerHTML = `
      <div class="sitebar-inner">
        <a class="brand" href="../index.html">Van Tuan Dang</a>
        <nav class="navlinks" aria-label="${isVietnamese ? 'Điều hướng chính' : 'Main navigation'}">
          <a href="../index.html">${isVietnamese ? 'Trang chủ' : 'Home'}</a>
          <a href="../blog.html" data-editorial-primary>${isVietnamese ? 'Bài viết' : 'Articles'}</a>
          <a href="../index.html#about">${isVietnamese ? 'Giới thiệu' : 'About'}</a>
          <a href="../index.html#contact">${isVietnamese ? 'Liên hệ' : 'Contact'}</a>
        </nav>
      </div>`;
    body.insertBefore(sitebar, body.firstChild.nextSibling);
  }

  const contentTarget = document.querySelector(
    'main, article, .article-container, .blog-post-header, .hero, .container, header:not(.sitebar):not(#header-container), body > h1'
  ) || [...body.children].find(element =>
    !element.matches('.editorial-skip-link, .sitebar, script, style, link')
  );
  if (contentTarget && !contentTarget.id) contentTarget.id = 'editorial-content';
  if (contentTarget) contentTarget.setAttribute('tabindex', '-1');
  if (contentTarget && contentTarget.matches('body > h1')) {
    body.classList.add('editorial-uncontained');
  }

  let footer = document.querySelector('.editorial-site-footer');
  if (!footer) {
    footer = document.createElement('footer');
    footer.className = 'editorial-site-footer';
    footer.innerHTML = `
      <div class="editorial-footer-inner">
        <span>© ${new Date().getFullYear()} Van Tuan Dang</span>
        <span><a href="../blog.html">${isVietnamese ? 'Tất cả bài viết' : 'All articles'} →</a></span>
      </div>`;
    body.appendChild(footer);
  }
})();
