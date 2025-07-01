document.addEventListener("DOMContentLoaded", () => {
  // sidebar toggler
  const toggler = document.querySelector(".toggler-btn");
  toggler.addEventListener("click", function () {
    document.querySelector("#sidebar").classList.toggle("collapsed");
  });

  // Change the sidebar links active color
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      // Remove 'active' class from all links
      document
        .querySelectorAll(".nav-pills .nav-link")
        .forEach((item) => item.classList.remove("active"));
      // Add 'active' class to the clicked link
      this.classList.add("active");
    });
  });
});
