// Nút "Xem thêm [N] bài" của demo: mỗi lần bấm hiện thêm data-step bài đang ẩn, cập nhật [N], hết bài thì ẩn nút.
document.querySelectorAll('.more-btn').forEach(function (btn) {
  var list = btn.closest('.more-wrap').previousElementSibling;
  var step = parseInt(btn.dataset.step, 10) || 20;
  btn.addEventListener('click', function () {
    var hidden = list.querySelectorAll(':scope > [hidden]');
    for (var i = 0; i < Math.min(step, hidden.length); i++) hidden[i].removeAttribute('hidden');
    var left = hidden.length - Math.min(step, hidden.length);
    if (left > 0) btn.querySelector('b').textContent = left;
    else btn.closest('.more-wrap').remove();
  });
});
