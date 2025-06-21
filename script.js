const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const closeSidebar = document.getElementById("closeSidebar");

  menuToggle.addEventListener("click", () => {
    sidebar.style.left = "0px";
  });

  closeSidebar.addEventListener("click", () => {
    sidebar.style.left = "-250px";
  });
  const sidebarLinks = document.querySelectorAll(".sidebar ul li a");

sidebarLinks.forEach(link => {
  link.addEventListener("click", () => {
    sidebar.style.left = "-250px";
  });
});
const openModal = document.getElementById("openModal");
  const bookingModal = document.getElementById("bookingModal");
  const closeModal = document.getElementById("closeModal");
  const modalOverlay = document.getElementById("modalOverlay");

  openModal.addEventListener("click", () => {
    bookingModal.style.display = "block";
    modalOverlay.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    bookingModal.style.display = "none";
    modalOverlay.style.display = "none";
  });

  modalOverlay.addEventListener("click", () => {
    bookingModal.style.display = "none";
    modalOverlay.style.display = "none";
  });
  const authTrigger = document.getElementById("authTrigger");
const authOptions = document.getElementById("authOptions");
const authModalOverlay = document.getElementById("authModalOverlay");

const signupModal = document.getElementById("signupModal");
const loginModal = document.getElementById("loginModal");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");

const closeSignup = document.getElementById("closeSignup");
const closeLogin = document.getElementById("closeLogin");

// Toggle auth menu
authTrigger.addEventListener("click", () => {
  authOptions.style.display = authOptions.style.display === "block" ? "none" : "block";
});

// Show Modals
signupBtn.addEventListener("click", () => {
  signupModal.style.display = "block";
  authModalOverlay.style.display = "block";
  authOptions.style.display = "none";
});
loginBtn.addEventListener("click", () => {
  loginModal.style.display = "block";
  authModalOverlay.style.display = "block";
  authOptions.style.display = "none";
});

// Close Modals
closeSignup.addEventListener("click", () => {
  signupModal.style.display = "none";
  authModalOverlay.style.display = "none";
});
closeLogin.addEventListener("click", () => {
  loginModal.style.display = "none";
  authModalOverlay.style.display = "none";
});
authModalOverlay.addEventListener("click", () => {
  signupModal.style.display = "none";
  loginModal.style.display = "none";
  authModalOverlay.style.display = "none";
});

// Login/Signup Logic
document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Signup successful!");
  signupModal.style.display = "none";
  authModalOverlay.style.display = "none";
  logoutBtn.style.display = "block";
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Login successful!");
  loginModal.style.display = "none";
  authModalOverlay.style.display = "none";
  logoutBtn.style.display = "block";
});

// Logout
logoutBtn.addEventListener("click", () => {
  alert("Logged out!");
  logoutBtn.style.display = "none";
});
const packagesLink = document.getElementById("packagesPopup");
const packagesModal = document.getElementById("packagesModal");
const packagesOverlay = document.getElementById("packagesOverlay");
const closePackages = document.getElementById("closePackages");

packagesLink.addEventListener("click", (e) => {
  e.preventDefault(); // prevent jump
  packagesModal.style.display = "block";
  packagesOverlay.style.display = "block";
});

closePackages.addEventListener("click", () => {
  packagesModal.style.display = "none";
  packagesOverlay.style.display = "none";
});

packagesOverlay.addEventListener("click", () => {
  packagesModal.style.display = "none";
  packagesOverlay.style.display = "none";
});
document.querySelector("#bookingModal form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission

  // Get form values
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const date = document.getElementById("date").value;
  const service = document.getElementById("service").value;

  // Format WhatsApp message
  const message = `📸 *New Booking Request on EditPe* 📸

*Name:* ${name}
*Phone:* ${phone}
*Preferred Date:* ${date}
*Service:* ${service}

Please follow up with the customer.`;

  // Your WhatsApp number (replace with your business number)
  const yourPhoneNumber = "918790505612"; // with country code, no + sign

  // Open WhatsApp
  const whatsappURL = `https://wa.me/${8466921944}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
  // Close modal
  document.getElementById("bookingModal").style.display = "none";
  document.getElementById("modalOverlay").style.display = "none";

  // Optional: Reset form
  this.reset();
});
