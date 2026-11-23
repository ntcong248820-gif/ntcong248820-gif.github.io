// Tab đang chọn nằm khuất trong thanh cuộn ngang (điện thoại) thì cuộn tới cho thấy.
(function () {
  var on = document.querySelector('.tabs .is-on');
  if (on && on.parentNode.scrollWidth > on.parentNode.clientWidth) {
    on.parentNode.scrollLeft = on.offsetLeft - 12;
  }
})();
// Nút "Ẩn ghi chú": bật/tắt mọi ô ghi chú cho PM. Không có JS thì ghi chú vẫn hiện và nút không hiện.
(function () {
  var btn = document.querySelector('.note-toggle');
  if (!btn || !document.querySelector('.note')) return;
  var KEY = 'demo-blog-an-ghi-chu';
  function apply(hide) {
    document.body.classList.toggle('notes-off', hide);
    btn.textContent = hide ? 'Hiện ghi chú' : 'Ẩn ghi chú';
    btn.setAttribute('aria-pressed', hide ? 'true' : 'false');
  }
  var saved = false;
  try { saved = localStorage.getItem(KEY) === '1'; } catch (e) { /* trình duyệt chặn lưu: giữ mặc định hiện */ }
  apply(saved);
  btn.hidden = false;
  btn.addEventListener('click', function () {
    var hide = !document.body.classList.contains('notes-off');
    apply(hide);
    try { localStorage.setItem(KEY, hide ? '1' : '0'); } catch (e) { /* không lưu được thì chỉ áp cho trang này */ }
  });
})();
