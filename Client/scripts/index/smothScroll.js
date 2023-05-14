const smothScrollFunction = function (target) {
  document.querySelectorAll(target).forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();

      const id = this.getAttribute("href");
      const idQuery = document.querySelector(id);
      idQuery.scrollIntoView({ behavior: "smooth" });
    });
  });
};

export { smothScrollFunction };
