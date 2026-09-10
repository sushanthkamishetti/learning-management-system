/* ==========================================================================
   SkillNova — single JavaScript file for the whole site

   Structure:
   1. HELPERS            — small functions used everywhere
   2. RUNS ON EVERY PAGE — navbar, cart count, footer year
   3. PAGE ROUTER        — runs only the code for the page that is open
   4. PAGE FUNCTIONS     — one function per page (we add them as we go)
   ========================================================================== */


/* ==========================================================================
   1. HELPERS
   ========================================================================== */

// Short way to grab one element:  $("#cartCount")
function $(selector) {
    return document.querySelector(selector);
  }
  
  // Short way to grab many elements: $$(".course-card")
  function $$(selector) {
    return document.querySelectorAll(selector);
  }
  
  // Read a saved value from localStorage.
  // localStorage only stores text, so we convert it back with JSON.parse.
  function getStorage(key, fallback) {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
  
    try {
      return JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  }
  
  // Save a value to localStorage as text.
  function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  // Format a number as rupees: 1499 -> "₹1,499"
  function formatPrice(amount) {
    if (amount === 0) return "Free";
    return "₹" + amount.toLocaleString("en-IN");
  }
  
  
  /* ==========================================================================
     2. RUNS ON EVERY PAGE
     ========================================================================== */
  
  // Opens and closes the mobile menu
  function initMenu() {
    const toggle = $("#menuToggle");
    const links = $("#navLinks");
  
    if (!toggle || !links) return;
  
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }
  
  // Shows how many items are in the cart, in the navbar
  function updateCartCount() {
    const badge = $("#cartCount");
    if (!badge) return;
  
    const cart = getStorage("cart", []);
    badge.textContent = cart.length;
  }
  
  // Puts the current year in the footer automatically
  function initYear() {
    const yearEl = $("#year");
    if (!yearEl) return;
  
    yearEl.textContent = new Date().getFullYear();
  }
  
  
  /* ==========================================================================
     3. PAGE ROUTER
     Every page has <body data-page="something">.
     We read that value and run only the matching function.
     ========================================================================== */
  
  document.addEventListener("DOMContentLoaded", function () {
  
    // These run on all pages
    initMenu();
    updateCartCount();
    initYear();
  
    // These run only on their own page
    const page = document.body.dataset.page;
  
    if (page === "home") initHome();
  
    // We will add these in later steps:
    // if (page === "courses")  initCourses();
    // if (page === "details")  initCourseDetails();
    // if (page === "register") initRegister();
    // if (page === "login")    initLogin();
    // if (page === "cart")     initCart();
    // if (page === "checkout") initCheckout();
    // if (page === "payment")  initPayment();
  });
  
  
  /* ==========================================================================
     4. PAGE FUNCTIONS
     ========================================================================== */
  
  /* ----- index.html ----- */
  function initHome() {
    const input = $("#heroSearch");
    const button = $("#heroSearchBtn");
  
    if (!input || !button) return;
  
    // Send whatever the user typed to the courses page as a URL value,
    // like: courses.html?search=python
    function goToSearch() {
      const term = input.value.trim();
  
      if (term === "") {
        window.location.href = "courses.html";
      } else {
        window.location.href = "courses.html?search=" + encodeURIComponent(term);
      }
    }
  
    button.addEventListener("click", goToSearch);
  
    // Pressing Enter should work the same as clicking the button
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") goToSearch();
    });
  }