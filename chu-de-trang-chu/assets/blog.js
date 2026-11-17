/* Ghi chú: gập sẵn, bấm để mở, có nút Ẩn; ô tìm kiếm Hỏi Đáp và ô tìm đầu trang cập nhật dòng "sẽ sang". */
(function () {
  var note = document.getElementById('note');
  if (note) {
    var s = note.querySelector('summary'), b = document.createElement('button');
    b.type = 'button'; b.className = 'close'; b.textContent = 'Ẩn';
    b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); note.hidden = true; });
    s.appendChild(b);
  }
  function setText(sel, v) { document.querySelectorAll(sel).forEach(function (n) { n.textContent = v || ''; }); }
  var ask = document.getElementById('ask-key');
  if (ask) ask.addEventListener('input', function () { setText('[data-ask-key]', ask.value.trim()); });
  var hdr = document.getElementById('hdr-search'), strip = document.getElementById('a7-strip'), link = document.getElementById('a7-link');
  if (hdr && strip && link) hdr.addEventListener('submit', function () {
    var v = document.getElementById('q').value.trim() || 'iphone 18';
    setText('[data-a7-key]', v);
    link.href = link.href.split('?')[0] + '?key=' + encodeURIComponent(v).replace(/%20/g, '+');
    strip.open = true; strip.scrollIntoView({ block: 'nearest' });
  });
})();
