// Sidebar toggle
document.getElementById("menuToggle").onclick = () => {
  document.getElementById("sidebar").style.left = "0px";
};
document.getElementById("closeSidebar").onclick = () => {
  document.getElementById("sidebar").style.left = "-250px";
};
document.querySelectorAll(".sidebar ul li a").forEach(link =>
  link.onclick = () => document.getElementById("sidebar").style.left = "-250px"
);

// Modal toggle for Booking
const toggleModal = (open, modal, overlay) => {
  modal.style.display = open ? "block" : "none";
  overlay.style.display = open ? "block" : "none";
};

document.getElementById("openModal").onclick = () => toggleModal(true, bookingModal, modalOverlay);
document.getElementById("closeModal").onclick = () => toggleModal(false, bookingModal, modalOverlay);
document.getElementById("modalOverlay").onclick = () => toggleModal(false, bookingModal, modalOverlay);

// Auth modals
document.getElementById("authTrigger").onclick = () => {
  const el = document.getElementById("authOptions");
  el.style.display = el.style.display === "block" ? "none" : "block";
};

document.getElementById("signupBtn").onclick = () => {
  toggleModal(true, signupModal, authModalOverlay);
  document.getElementById("authOptions").style.display = "none";
};
document.getElementById("loginBtn").onclick = () => {
  toggleModal(true, loginModal, authModalOverlay);
  document.getElementById("authOptions").style.display = "none";
};

document.getElementById("closeSignup").onclick =
  () => toggleModal(false, signupModal, authModalOverlay);
document.getElementById("closeLogin").onclick =
  () => toggleModal(false, loginModal, authModalOverlay);
document.getElementById("authModalOverlay").onclick = () => {
  toggleModal(false, signupModal, authModalOverlay);
  toggleModal(false, loginModal, authModalOverlay);
};

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    [bookingModal, signupModal, loginModal, packagesModal].forEach(m => m.style.display = "none");
    [modalOverlay, authModalOverlay, packagesOverlay].forEach(o => o.style.display = "none");
  }
});

// Login/Signup UI
const updateUIForLogin = name => {
  logoutBtn.style.display = "block";
  authOptions.style.display = "none";
  authTrigger.innerHTML = `<span style="font-family:'Space Mono';color:#6a0dad;">👤 ${name}</span>`;
  localStorage.setItem("editpeUser", name);
};

document.getElementById("signupForm").onsubmit = e => {
  e.preventDefault();
  const name = signupName.value.trim();
  if (signupPassword.value.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }
  updateUIForLogin(name);
  toggleModal(false, signupModal, authModalOverlay);
};

document.getElementById("loginForm").onsubmit = e => {
  e.preventDefault();
  updateUIForLogin(`+91 ${loginPhone.value.trim()}`);
  toggleModal(false, loginModal, authModalOverlay);
};

logoutBtn.onclick = () => {
  localStorage.removeItem("editpeUser");
  alert("Logged out!");
  location.reload();
};

window.onload = () => {
  const savedUser = localStorage.getItem("editpeUser");
  if (savedUser) updateUIForLogin(savedUser);
};

// Packages popup
packagesPopup.onclick = e => {
  e.preventDefault();
  toggleModal(true, packagesModal, packagesOverlay);
};
closePackages.onclick = () => toggleModal(false, packagesModal, packagesOverlay);
packagesOverlay.onclick = () => toggleModal(false, packagesModal, packagesOverlay);

// Booking form to WhatsApp
bookingForm.onsubmit = function (e) {
  e.preventDefault();
  const msg = `New Booking:\nName: ${name.value}\nPhone: ${phone.value}\nDate: ${date.value}\nService: ${service.value}`;
  const encodedMsg = encodeURIComponent(msg);

  const links = [
    `https://wa.me/918790505612?text=${encodedMsg}`,
    `https://wa.me/918466921944?text=${encodedMsg}`
  ];

  if (confirm("Submit booking and notify on WhatsApp?")) {
    window.open(links[0], '_blank');
    setTimeout(() => window.open(links[1], '_blank'), 500);
    toggleModal(false, bookingModal, modalOverlay);
    this.reset();
  }
};

// Lazy-load and reset YouTube video
const videoIframe = document.querySelector(".video-item iframe");
if (videoIframe) {
  videoIframe.loading = 'lazy';
  const observer = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) videoIframe.src = videoIframe.src;
  }, { threshold: 0.1 });
  observer.observe(videoIframe);
}

// Expand service cards
document.querySelectorAll(".service-item").forEach(item => {
  const desc = item.querySelector("p");
  const arrow = item.querySelector(".scroll-down-arrow");

  item.onclick = () => {
    document.querySelectorAll(".service-item").forEach(i => {
      i.classList.remove("open");
      const a = i.querySelector(".scroll-down-arrow");
      if (a) a.classList.remove("hidden");
    });
    item.classList.add("open");
    if (arrow) arrow.classList.add("hidden");
  };

  if (arrow) arrow.onclick = e => {
    e.stopPropagation();
    item.classList.add("open");
    arrow.classList.add("hidden");
  };
});

