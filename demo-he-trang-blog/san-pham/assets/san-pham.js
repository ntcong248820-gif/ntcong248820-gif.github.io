/* Nút đổi trường hợp xem của demo trang Sản phẩm. Tắt JS vẫn thấy cách hiện mặc định, link bài nằm sẵn trong HTML.
   Địa chỉ nhận ?cach=1|2|3&bai=0|1&dg=0|1&ghichu=0|1 để mở thẳng một trường hợp. */
(function () {
  var q = new URLSearchParams(location.search), $ = function (s, r) { return (r || document).querySelector(s); };
  var all = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var st = { scn: q.get('cach') || $('.blog-scn:not([hidden])').getAttribute('data-scn'),
             art: q.get('bai') != null ? q.get('bai') : String(window.SP_ART_DEFAULT),
             rev: q.get('dg') != null ? q.get('dg') : '1', notes: q.get('ghichu') != null ? q.get('ghichu') : '1' };
  function press(group, val) {
    all('[data-' + group + ']').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-' + group) === val)); });
  }
  function apply() {
    all('.blog-scn').forEach(function (e) { e.hidden = e.getAttribute('data-scn') !== st.scn; });
    all('[data-note-scn]').forEach(function (e) { e.hidden = e.getAttribute('data-note-scn') !== st.scn; });
    all('.pdp-tabs').forEach(function (e) { e.hidden = e.getAttribute('data-article') !== st.art; });
    var rev = $('.pdp-rev'); if (rev) rev.hidden = st.rev !== '1';
    var pos = $('[data-pos]'); if (pos && window.SP_POS) pos.textContent = window.SP_POS[st.art + st.rev];
    document.body.classList.toggle('notes-off', st.notes === '0');
    press('scn', st.scn); press('art', st.art); press('rev', st.rev); press('notes', st.notes);
  }
  [['scn', 'scn'], ['art', 'art'], ['rev', 'rev'], ['notes', 'notes']].forEach(function (g) {
    all('[data-' + g[0] + ']').forEach(function (b) {
      b.addEventListener('click', function () { st[g[1]] = b.getAttribute('data-' + g[0]); apply(); });
    });
  });
  var hide = $('[data-notes-hide]'); if (hide) hide.addEventListener('click', function () { st.notes = '0'; apply(); });
  // Trang đang bán: đổi dung lượng, màu chỉ đổi tên, giá, dòng ghi chú biến thể; khối Bài viết về giữ nguyên (biến thể dùng chung Tag của model)
  var v = $('[data-variant]'), ver = '256GB', url = '/dtdd/iphone-18-pro-max', color = '';
  function variant() {
    var h1 = $('#h1'); if (h1) h1.textContent = 'iPhone 18 Pro Max ' + ver;
    if (v) v.textContent = 'Biến thể: đang xem ' + ver + (color ? ', màu ' + color : '') + ' (' + url +
      '). Mọi biến thể của iPhone 18 Pro Max dùng chung Tag của model "iphone 18 pro max", nên khối Bài viết về không đổi.';
  }
  all('[data-ver]').forEach(function (b) { b.addEventListener('click', function () {
    all('[data-ver]').forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
    ver = b.getAttribute('data-ver'); url = b.getAttribute('data-url'); $('[data-price]').textContent = b.getAttribute('data-price') + 'đ'; variant(); }); });
  all('[data-color]').forEach(function (b) { b.addEventListener('click', function () {
    all('[data-color]').forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
    color = b.getAttribute('data-color'); variant(); }); });
  apply();
})();
