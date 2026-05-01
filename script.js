/*****************************
 NAVBAR TOGGLE (MOBILE)
*****************************/
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-menu");
const menuItems = document.querySelectorAll(".menu-item, .has-children");

toggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

/* Cerrar todos los submenús */
function closeAllMenus(except = null) {
  menuItems.forEach(item => {
    if (item !== except) {
      item.classList.remove("active");
    }
  });
}

/* Click en items (mobile) */
menuItems.forEach(item => {
  item.addEventListener("click", (e) => {
    const submenu = item.querySelector(".submenu");
    if (submenu && window.innerWidth <= 768) {
      e.stopPropagation();
      e.preventDefault();

      const isOpen = item.classList.contains("active");
      closeAllMenus(item);

      if (!isOpen) {
        item.classList.add("active");
      }
    }
  });
});

/* Click fuera del menú → cerrar todo */
document.addEventListener("click", (e) => {
  if (!e.target.closest(".navbar")) {
    closeAllMenus();
  }
});

/*****************************
 NETWORK CANVAS (HERO)
*****************************/
const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");
const hero = document.querySelector(".hero");

let points = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = hero.offsetHeight;
}
window.addEventListener("resize", resize);
resize();

/* Crear puntos iniciales */
for (let i = 0; i < 80; i++) {
  points.push(createPoint());
}

function createPoint(x, y) {
  return {
    x: x ?? Math.random() * canvas.width,
    y: y ?? Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6
  };
}

/* Click → nuevo punto */
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  points.push(createPoint(
    e.clientX - rect.left,
    e.clientY - rect.top
  ));
});

/* Animación */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  points.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = "#fdbd4a";
    ctx.fill();
  });

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 130) {
        ctx.strokeStyle = "rgba(23,126,137,0.35)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}

animate();


/**************************************
  MÉTRICAS – CONTADOR ANIMADO
**************************************/
const stats = document.querySelectorAll(".stat");

const startCount = (stat) => {
  const target = +stat.getAttribute("data-target");
  const number = stat.querySelector("strong");
  let current = 0;

  const step = Math.max(Math.floor(target / 100), 1);

  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      number.textContent = target + "+";
      clearInterval(interval);
    } else {
      number.textContent = current;
    }
  }, 20);
};

/* Activar solo cuando entren en pantalla */
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

stats.forEach(stat => observer.observe(stat));

/**************************************
  FOOTER – AÑO AUTOMÁTICO
**************************************/
const yearSpan = document.getElementById("year");
yearSpan.textContent = new Date().getFullYear();

/**************************************
  FOOTER – EFECTO ELEGANTE EN SCROLL
**************************************/
const footer = document.querySelector(".footer");

window.addEventListener("scroll", () => {
  if (footer.getBoundingClientRect().top < window.innerHeight) {
    footer.classList.add("visible");
  }
});


/* Enfatiza contacto al hacer hover/tap */
document.querySelectorAll(".connect-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow = "0 30px 50px rgba(0,0,0,0.3)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "none";
  });
});


const carousel = document.querySelector(".carousel-track");

carousel.addEventListener("mouseenter", () => {
  carousel.style.animationPlayState = "paused";
});

carousel.addEventListener("mouseleave", () => {
  carousel.style.animationPlayState = "running";
});


/**************************************
  LIGHTBOX PARA LOGOS DEL CARRUSEL
**************************************/
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");
const overlay = document.querySelector(".lightbox-overlay");

// Abrir al hacer clic en un logo
document.querySelectorAll(".partner-logo img").forEach(img => {
  img.addEventListener("click", () => {
    const src = img.getAttribute("data-full") || img.src;
    lightboxImg.src = src;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // bloqueo scroll
  });
});

// Cerrar con X
closeBtn.addEventListener("click", closeLightbox);

// Cerrar al hacer clic fuera
overlay.addEventListener("click", closeLightbox);

// Función cerrar
function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}




document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".toggle-btn").forEach(button => {
    button.addEventListener("click", () => {
      const programInfo = button.closest(".program-info");
      const details = programInfo.querySelector(".program-details");

      const isOpen = details.style.display === "block";

      details.style.display = isOpen ? "none" : "block";
      button.textContent = isOpen ? "View More" : "View Less";
    });
  });
});



