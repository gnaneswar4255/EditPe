// Sidebar toggle
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");

menuToggle.addEventListener("click", () => {
  sidebar.style.left = "0px";
});

closeSidebar.addEventListener("click", () => {
  sidebar.style.left = "-250px";
});

document.querySelectorAll(".sidebar ul li a").forEach(link => {
  link.addEventListener("click", () => {
    sidebar.style.left = "-250px";
  });
});

// Booking modal
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

// Auth modals
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

authTrigger.addEventListener("click", () => {
  authOptions.style.display = authOptions.style.display === "block" ? "none" : "block";
});

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

// Escape key closes modals
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    [bookingModal, signupModal, loginModal, packagesModal].forEach(m => m.style.display = "none");
    [modalOverlay, authModalOverlay, packagesOverlay].forEach(o => o.style.display = "none");
  }
});

// Session logic
function updateUIForLogin(name) {
  logoutBtn.style.display = "block";
  authOptions.style.display = "none";
  authTrigger.innerHTML = `<span style="font-family:'Space Mono';color:#6a0dad;">👤 ${name}</span>`;
  localStorage.setItem("editpeUser", name);
}

document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("signupName").value;
  const password = document.getElementById("signupPassword").value;
  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }
  updateUIForLogin(name);
  signupModal.style.display = "none";
  authModalOverlay.style.display = "none";
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const phone = document.getElementById("loginPhone").value;
  updateUIForLogin(`+91 ${phone}`);
  loginModal.style.display = "none";
  authModalOverlay.style.display = "none";
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("editpeUser");
  alert("Logged out!");
  location.reload();
});

window.addEventListener("load", () => {
  const savedUser = localStorage.getItem("editpeUser");
  if (savedUser) updateUIForLogin(savedUser);
});

// Packages modal
const packagesLink = document.getElementById("packagesPopup");
const packagesModal = document.getElementById("packagesModal");
const packagesOverlay = document.getElementById("packagesOverlay");
const closePackages = document.getElementById("closePackages");

packagesLink.addEventListener("click", (e) => {
  e.preventDefault();
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

// Booking form WhatsApp send
const bookingForm = document.getElementById("bookingForm");
bookingForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value.trim();
  const service = document.getElementById("service").value.trim();

  const message = `New Booking Received:\n\nName: ${name}\nPhone: ${phone}\nDate: ${date}\nService: ${service}`;
  const encodedMsg = encodeURIComponent(message);

  console.log({ name, phone, date, service });

  const whatsapp1 = `https://wa.me/918790505612?text=${encodedMsg}`;
  const whatsapp2 = `https://wa.me/918466921944?text=${encodedMsg}`;

  if (confirm("Submit booking and open WhatsApp to notify team?")) {
    window.open(whatsapp1, '_blank');
    setTimeout(() => {
      window.open(whatsapp2, '_blank');
    }, 500);

    bookingModal.style.display = "none";
    modalOverlay.style.display = "none";
    this.reset();
  }
});

// Stop video on scroll away
const videoSection = document.querySelector(".our-work");
const videoIframe = document.querySelector(".video-item iframe");

if (videoIframe) {
  videoIframe.setAttribute('loading', 'lazy');
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting && videoIframe) {
        const src = videoIframe.src;
        videoIframe.src = src;
      }
    });
  },
  { threshold: 0.1 }
);

if (videoSection && videoIframe) {
  observer.observe(videoSection);
}

// Toggle service description (slide down/up effect)
document.querySelectorAll(".service-item").forEach(item => {
  const desc = item.querySelector("p");
  desc.style.maxHeight = "0px";
  desc.style.overflow = "hidden";
  desc.style.transition = "max-height 0.5s ease";

  item.style.cursor = "pointer";
  item.addEventListener("click", () => {
    const isOpen = desc.style.maxHeight && desc.style.maxHeight !== "0px";
    
    // Close all other open items
    document.querySelectorAll(".service-item p").forEach(p => {
      p.style.maxHeight = "0px";
    });

    if (!isOpen) {
      desc.style.maxHeight = desc.scrollHeight + "px";
    } else {
      desc.style.maxHeight = "0px";
    }
  });
});
