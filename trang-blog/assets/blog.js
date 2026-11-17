// Demo /blog: tắt/bật ô ghi chú; trang tìm kiếm thì đổi trạng thái (có / không có kết quả) và tab lọc hệ.
// Không có JS thì trang vẫn đọc được: cả 2 trạng thái và mọi tab hiện nối nhau (class no-js).
(function () {
  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // Ghi chú: nút × tắt từng ô, nút trên dải DEMO tắt / bật tất cả
  var toggle = $('[data-note-toggle]');
  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener('click', function () {
      var off = root.classList.toggle('notes-off');
      toggle.setAttribute('aria-pressed', String(!off));
      toggle.querySelector('b').textContent = off ? 'Tắt' : 'Bật';
    });
  }
  // Máy tính: mở sẵn ghi chú; điện thoại: thu gọn để không đẩy bài xuống dưới màn hình
  if (matchMedia('(min-width: 900px)').matches) $$('[data-note-details]').forEach(function (d) { d.open = true; });
  $$('[data-note-close]').forEach(function (b) {
    b.addEventListener('click', function () { b.closest('[data-demo-note]').hidden = true; });
  });

  // Trang tìm kiếm
  var panels = $$('[data-case-panel]');
  if (!panels.length) return;
  var caseBtns = $$('[data-case]');
  var DEFAULT_KEY = 'iphone 18';

  var setKey = function (key) {
    $$('[data-key]').forEach(function (el) { el.textContent = key; });
    $$('input[name="key"]').forEach(function (el) { el.value = key; });
  };
  var setCase = function (name) {
    panels.forEach(function (p) { p.hidden = p.getAttribute('data-case-panel') !== name; });
    caseBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-case') === name)); });
    var p = $('[data-case-panel="' + name + '"]');
    if (name === 'co') document.title = p.getAttribute('data-doc-title') || document.title;
    else document.title = 'Kết quả tìm kiếm "' + ($('[data-key]', p) || {}).textContent + '" - Thegioididong.com';
  };
  caseBtns.forEach(function (b) {
    b.hidden = false;
    b.addEventListener('click', function () {
      var name = b.getAttribute('data-case');
      if (name === 'khong' && /iphone\s*(18|duo)/i.test($('input[name="key"]').value || DEFAULT_KEY)) setKey('samsung galaxy z fold 99');
      if (name === 'co') setKey(DEFAULT_KEY);
      setCase(name);
    });
  });

  // Tab lọc hệ: demo dựng sẵn nội dung từng tab, bấm thì đổi vùng hiện
  $$('[data-tab]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var k = a.getAttribute('data-tab');
      $$('[data-tab]').forEach(function (x) {
        var on = x === a;
        x.classList.toggle('is-active', on);
        if (on) x.setAttribute('aria-current', 'page'); else x.removeAttribute('aria-current');
      });
      $$('[data-tab-panel]').forEach(function (p) { p.hidden = p.getAttribute('data-tab-panel') !== k; });
    });
  });

  // ?key=...: từ khoá iPhone 18 / iPhone Duo → có kết quả (bài thật có sẵn); từ khoá khác → không có kết quả
  var key = (new URLSearchParams(location.search).get('key') || '').trim();
  if (key) {
    var hit = /iphone\s*(18|duo)/i.test(key);
    setKey(key);
    setCase(hit ? 'co' : 'khong');
  } else if (location.hash === '#khong-co-ket-qua') {
    setKey('samsung galaxy z fold 99');
    setCase('khong');
  }
})();
