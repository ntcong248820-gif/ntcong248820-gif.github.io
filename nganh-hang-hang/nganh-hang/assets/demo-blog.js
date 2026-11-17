// Nút đổi trạng thái / cách hiện khối cho trang demo. Nội dung đã render sẵn trong HTML; JS chỉ bật tắt phần đang xem.
// Địa chỉ nhớ lựa chọn: #dang-ban/du/co (trạng thái / cách hiện khối / bài viết SEO). Tắt JS thì trang hiện mặc định.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const panes = $$('.db-pane');
  const sel = { state: panes[0]?.dataset.pane, mode: 'du', seo: 'co' };

  // Lưới sản phẩm gập còn 2 hàng (lưới 2 cột: 3 hàng) + nút "Xem thêm", như danh mục thật.
  const foldPane = (pane) => {
    const grid = $('[data-fold-grid]', pane);
    if (!grid || pane.hidden) return;
    const cards = [...grid.children].filter((c) => c.hasAttribute('data-fold-item'));
    let btn = $('.db-more', pane);
    if (!btn) {
      btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'db-more'; btn.hidden = true;
      grid.after(btn);
      btn.addEventListener('click', () => { pane._open = true; foldPane(pane); });
    }
    const old = $('.btn-more', pane); if (old) old.remove();
    const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    const limit = cols * (cols <= 2 ? 3 : 2);
    cards.forEach((c, i) => c.classList.toggle('is-folded', !pane._open && i >= limit));
    const rest = pane._open ? 0 : Math.max(0, cards.length - limit);
    btn.hidden = !rest;
    btn.textContent = `Xem thêm ${rest} sản phẩm`;
  };

  // Bài viết SEO của trang: gập còn phần đầu + "Xem thêm" (nút có sẵn trong HTML)
  panes.forEach((pane) => {
    const art = $('.ib-article', pane), btn = $('[data-ib-toggle]', pane);
    if (art && btn) {
      art.classList.add('is-collapsed');
      btn.hidden = false; btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', () => {
        const open = art.classList.toggle('is-collapsed') === false;
        btn.setAttribute('aria-expanded', String(open));
        btn.firstElementChild.textContent = open ? 'Thu gọn' : 'Xem thêm';
      });
    }
    const bi = $('[data-bi]', pane), more = $('[data-bi-more]', pane);
    if (bi && more) {
      const set = (open) => {
        bi.classList.toggle('is-collapsed', !open);
        more.setAttribute('aria-expanded', String(open));
        more.firstElementChild.firstChild.textContent = open ? 'Thu gọn' : 'Xem thêm';
      };
      set(false); more.hidden = false;
      more.addEventListener('click', () => set(bi.classList.contains('is-collapsed')));
      $$('[data-toc-link]', pane).forEach((a) => a.addEventListener('click', () => set(true)));
      const tocBtn = $('[data-toc-btn]', pane);
      if (tocBtn) tocBtn.addEventListener('click', () => {
        const open = tocBtn.getAttribute('aria-expanded') !== 'true';
        tocBtn.setAttribute('aria-expanded', String(open));
        $('.bi-toc-list', pane).hidden = !open;
      });
    }
  });

  const apply = () => {
    panes.forEach((p) => {
      p.hidden = p.dataset.pane !== sel.state;
      p.classList.toggle('no-seo', sel.seo === 'khong');
      $$('.db-variant', p).forEach((v) => { v.hidden = v.dataset.mode !== sel.mode; });
    });
    $$('[data-pick]').forEach((b) => {
      const [k, v] = b.dataset.pick.split(':');
      b.setAttribute('aria-pressed', String(sel[k] === v));
    });
    panes.filter((p) => !p.hidden).forEach(foldPane);
    try { history.replaceState(null, '', `#${sel.state}/${sel.mode}/${sel.seo}`); } catch (e) { /* mở bằng file: thì bỏ qua */ }
  };

  $$('[data-pick]').forEach((b) => b.addEventListener('click', () => {
    const [k, v] = b.dataset.pick.split(':'); sel[k] = v; apply();
  }));
  const noteBtn = $('[data-toggle-notes]');
  if (noteBtn) noteBtn.addEventListener('click', () => {
    const off = document.body.classList.toggle('hide-notes');
    noteBtn.setAttribute('aria-pressed', String(!off));
    noteBtn.querySelector('b').textContent = off ? 'Tắt' : 'Bật';
  });
  document.addEventListener('click', (e) => {
    const x = e.target.closest('.db-note-x');
    if (x) x.closest('.db-note').hidden = true;
  });

  const m = location.hash.slice(1).split('/');
  if (panes.some((p) => p.dataset.pane === m[0])) sel.state = m[0];
  if (['du', 'thieu', 'khong'].includes(m[1])) sel.mode = m[1];
  if (['co', 'khong'].includes(m[2])) sel.seo = m[2];
  addEventListener('resize', () => panes.filter((p) => !p.hidden).forEach(foldPane));
  apply();
  // Ghi chú bị tắt từng ô thì bật lại khi đổi lựa chọn
  $$('[data-pick]').forEach((b) => b.addEventListener('click', () => $$('.db-note').forEach((n) => { n.hidden = false; })));
})();
