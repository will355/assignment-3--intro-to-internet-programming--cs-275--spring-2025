"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var modalTrigger = document.querySelector("#js-triggers li:nth-child(2) a");
  var menuTrigger = document.querySelector("#js-triggers li:nth-child(1) a");
  var modalPanel = document.querySelector(".modal-panel");
  var nav = document.querySelector("nav");
  var isMobile = window.innerWidth < 736;
  modalTrigger.addEventListener("click", function (e) {
    e.preventDefault();
    modalPanel.classList.add("active");
  });

  // Close Modal on background click or ESC key
  modalPanel.addEventListener("click", function (e) {
    if (e.target === modalPanel) {
      modalPanel.classList.remove("active");
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      modalPanel.classList.remove("active");
    }
  });

  // Toggle Menu
  menuTrigger.addEventListener("click", function (e) {
    e.preventDefault();
    if (isMobile) {
      nav.classList.toggle("side-tray-active");
    } else {
      nav.classList.toggle("dropdown-active");
    }
  });
  window.addEventListener("resize", function () {
    var newIsMobile = window.innerWidth < 736;
    if (newIsMobile !== isMobile) {
      isMobile = newIsMobile;
      nav.classList.remove("side-tray-active", "dropdown-active");
      modalPanel.classList.remove("active");
    }
  });
});
//# sourceMappingURL=main.js.map
