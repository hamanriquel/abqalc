document.addEventListener("DOMContentLoaded", () => {document) {
        more.style.maxHeight = null;
        btn.textContent = "View More";
      } else {
        more.style.maxHeight = more.scrollHeight + "px";
        btn.textContent = "View Less";
      }
    });
  });
});
  document.querySelectorAll(".p-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const info = btn.closest(".p-info");
      const more = info.querySelector(".p-more");

      const open = more.style.maxHeight;

