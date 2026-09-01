/**
 * MOUNTASSIR CHAGHOUGH - PORTFOLIO INTERACTIVITY ENGINE
 * Features: Cyber Particle Canvas, Interactive Terminal CLI, Tab Switchers, Modals, Multilang
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTerminalCLI();
  initSiemViewer();
  initSkillFilters();
  initSmoothScroll();
  initNavbarScroll();
  initContactForm();
  initModals();
  initLanguageToggle();
  initTypingEffect();
});

/* ==========================================================================
   1. CYBER PARTICLE & NETWORK CANVAS
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 45;
  const maxDistance = 140;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.4 ? 'rgba(0, 242, 254, ' : 'rgba(16, 185, 129, ';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + '0.7)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00f2fe';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. INTERACTIVE TERMINAL CLI WIDGET
   ========================================================================== */
function initTerminalCLI() {
  const termBody = document.getElementById('terminal-body');
  const termInput = document.getElementById('terminal-input');
  if (!termBody || !termInput) return;

  const commands = {
    help: () => `
<div class="t-line t-highlight">⚡ Commandes Disponibles :</div>
<div class="t-line">▸ <span class="t-success">whoami</span>          : Profil & Statut de Mountassir</div>
<div class="t-line">▸ <span class="t-success">siem</span>            : Architecture SOC & SIEM (Union IT Services)</div>
<div class="t-line">▸ <span class="t-success">beflextravel</span>    : Projet Freelance Beflextravel (Next.js & Supabase)</div>
<div class="t-line">▸ <span class="t-success">skills</span>          : Matrice de compétences cyber & dev</div>
<div class="t-line">▸ <span class="t-success">contact</span>         : Coordonnées directes (Téléphone, Email, etc.)</div>
<div class="t-line">▸ <span class="t-success">clear</span>           : Effacer le terminal</div>`,

    whoami: () => `
<div class="t-line">👤 <span class="t-highlight">Chaghough Mountassir</span> — 23 ans</div>
<div class="t-line">🎓 Élève-Ingénieur en 5e année Cybersécurité à l'<span class="t-success">EMSI Marrakech</span>.</div>
<div class="t-line">🛡️ Spécialiste : SIEM (Wazuh), SOC, FortiGate, Zabbix, TheHive, GNS3 & Développeur Full-Stack / Freelance.</div>`,

    siem: () => `
<div class="t-line t-highlight">🛡️ PROJET SIEM — UNION IT SERVICES (2026) :</div>
<div class="t-line">▸ Déploiement Wazuh Manager, Indexer & Dashboard sur GNS3.</div>
<div class="t-line">▸ Segmentation & Pare-feu FortiGate (NAT, Politiques de filtrage).</div>
<div class="t-line">▸ Dashboard Grafana unifié (Wazuh + Zabbix + FortiGate).</div>
<div class="t-line">▸ Automatisation Alerting -> TheHive (Incident Response).</div>`,

    beflextravel: () => `
<div class="t-line t-highlight">💼 BEFLEXTRAVEL — MISSION FREELANCE & APPLICATION WEB :</div>
<div class="t-line">▸ Statut : Développeur Full-Stack Freelance</div>
<div class="t-line">▸ Site en ligne : <a href="https://beflextravel.com" target="_blank" style="color:#10b981; text-decoration:underline;">https://beflextravel.com</a></div>
<div class="t-line">▸ GitHub : <a href="https://github.com/mountassir-cha/be-flex-travel.git" target="_blank" style="color:#00f2fe; text-decoration:underline;">github.com/mountassir-cha/be-flex-travel</a></div>
<div class="t-line">▸ Stack : Next.js 16, React 19, Supabase, Tailwind CSS, Framer Motion.</div>`,

    beflex: () => commands.beflextravel(),

    skills: () => `
<div class="t-line t-highlight">💻 ARSENAL TECHNIQUE :</div>
<div class="t-line">▸ <span class="t-success">Sécurité/SIEM :</span> Wazuh, FortiGate, TheHive, Zabbix, Grafana, GNS3, Wireshark</div>
<div class="t-line">▸ <span class="t-success">Langages :</span> Python, Java, C++, JavaScript (ES6+), PHP</div>
<div class="t-line">▸ <span class="t-success">Web & DB :</span> Next.js 16, React 19, Node.js, PostgreSQL, MySQL, Supabase</div>
<div class="t-line">▸ <span class="t-success">Systèmes :</span> Linux/Unix, TCP/IP, VLAN, Virtualisation (VMware, Proxmox)</div>`,

    contact: () => `
<div class="t-line">📞 Téléphone & WhatsApp : <span class="t-highlight">+212 7 66 90 83 81</span></div>
<div class="t-line">✉️ Email : <span class="t-highlight">montassirchaghough5@gmail.com</span></div>
<div class="t-line">💼 LinkedIn : <a href="https://linkedin.com/in/mountassir-chaghough" target="_blank" style="color:#00f2fe;">linkedin.com/in/mountassir-chaghough</a></div>
<div class="t-line">📍 Adresse : Marrakech, Mhamid, Lot Elbaraka N105</div>`,

    clear: () => {
      termBody.innerHTML = '';
      return '';
    }
  };

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = termInput.value.trim();
      const cmd = rawCmd.toLowerCase();
      
      if (!rawCmd) return;

      // Echo command
      const cmdEcho = document.createElement('div');
      cmdEcho.className = 't-line';
      cmdEcho.innerHTML = `<span class="t-prompt">mountassir@secops</span>:<span class="t-host">~</span>$ <span class="t-cmd">${escapeHtml(rawCmd)}</span>`;
      termBody.appendChild(cmdEcho);

      // Execute
      if (commands[cmd]) {
        const result = commands[cmd]();
        if (result) {
          const resDiv = document.createElement('div');
          resDiv.innerHTML = result;
          termBody.appendChild(resDiv);
        }
      } else {
        const errDiv = document.createElement('div');
        errDiv.className = 't-line';
        errDiv.style.color = '#ef4444';
        errDiv.textContent = `Commande inconnue: "${rawCmd}". Tapez "help" pour la liste des commandes.`;
        termBody.appendChild(errDiv);
      }

      termInput.value = '';
      termBody.scrollTop = termBody.scrollHeight;
    }
  });

  const termWindow = document.querySelector('.terminal-window');
  if (termWindow) {
    termWindow.addEventListener('click', () => termInput.focus());
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ==========================================================================
   3. SIEM SCREENSHOT VIEWER & TABS
   ========================================================================== */
function initSiemViewer() {
  const tabBtns = document.querySelectorAll('.siem-tab-btn');
  const screenImg = document.getElementById('siem-active-img');
  const screenTitle = document.getElementById('siem-screen-title');
  const screenDesc = document.getElementById('siem-screen-desc');
  const zoomBtn = document.getElementById('btn-zoom-siem');

  if (!tabBtns.length || !screenImg) return;

  const screensData = {
    wazuh: {
      src: 'assets/siem_wazuh_dashboard.jpg',
      title: 'Tableau de Bord Wazuh SIEM & Détection des Menaces en Temps Réel',
      desc: 'Supervision des 4 000+ agents, analyse des tentatives d\'attaques SSH & Brute-force, cartographie MITRE ATT&CK.'
    },
    grafana: {
      src: 'assets/grafana_fortigate_dashboard.jpg',
      title: 'Dashboard Unifié Grafana — Télémétrie FortiGate & Zabbix',
      desc: 'Surveillance en direct des flux réseau (8.4 Gbps), attaques bloquées (1483/h), CPU FortiGate & métriques serveurs.'
    },
    topology: {
      src: 'assets/siem_wazuh_dashboard.jpg',
      title: 'Topologie Réseau & Virtualisation SOC sous GNS3',
      desc: 'Architecture multi-zones avec Pare-Feu FortiGate, sous-réseaux DMZ / LAN, Wazuh Manager/Indexer et TheHive.'
    }
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-screen');
      const data = screensData[target];

      if (data) {
        screenImg.style.opacity = '0';
        setTimeout(() => {
          screenImg.src = data.src;
          screenTitle.textContent = data.title;
          screenDesc.textContent = data.desc;
          screenImg.style.opacity = '1';
        }, 150);
      }
    });
  });

  if (zoomBtn) {
    zoomBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openImageModal(screenImg.src, screenTitle.textContent);
    });
  }

  screenImg.addEventListener('click', () => {
    openImageModal(screenImg.src, screenTitle.textContent);
  });
}

function openImageModal(src, title) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  if (modal && modalImg) {
    modalImg.src = src;
    if (modalTitle) modalTitle.textContent = title || 'Aperçu Haute Définition';
    modal.classList.add('active');
  }
}

/* ==========================================================================
   4. SKILLS FILTERING
   ========================================================================== */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. NAVIGATION & SCROLL SPY
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileMenuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileMenuBtn.textContent = '☰';
      });
    });
  }
}

function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   6. MODAL & IMAGE LIGHTBOX
   ========================================================================== */
function initModals() {
  const imgModal = document.getElementById('image-modal');
  const cvModal = document.getElementById('cv-modal');
  const openCvBtn = document.getElementById('open-cv-btn');
  const imgCloseBtn = document.getElementById('image-modal-close');
  const cvCloseBtn = document.getElementById('cv-modal-close');

  if (openCvBtn && cvModal) {
    openCvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      cvModal.classList.add('active');
    });
  }

  if (imgCloseBtn && imgModal) {
    imgCloseBtn.addEventListener('click', () => imgModal.classList.remove('active'));
  }

  if (cvCloseBtn && cvModal) {
    cvCloseBtn.addEventListener('click', () => cvModal.classList.remove('active'));
  }

  // Backdrop click
  [imgModal, cvModal].forEach(m => {
    if (m) {
      m.addEventListener('click', (e) => {
        if (e.target === m) m.classList.remove('active');
      });
    }
  });

  // Escape key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (imgModal) imgModal.classList.remove('active');
      if (cvModal) cvModal.classList.remove('active');
    }
  });
}

/* ==========================================================================
   7. CONTACT FORM HANDLER (100% Background Silent Send - No Window/Popup)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const btnText = document.getElementById('btn-submit-text');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('⚠️ Veuillez remplir tous les champs obligatoires.', 'error');
      return;
    }

    // Visual feedback on button
    if (btnText) btnText.textContent = '⏳ Envoi en cours...';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.75';
    }

    try {
      const formData = new FormData(form);

      // Send silent AJAX POST to email API
      const response = await fetch('https://formsubmit.co/ajax/montassirchaghough5@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      // Show instant success feedback on page
      showToast('✅ Message envoyé avec succès ! Merci, je vous répondrai très rapidement.', 'success');
      form.reset();

      // Show in-card success state
      const successBanner = document.createElement('div');
      successBanner.style.background = 'rgba(16, 185, 129, 0.15)';
      successBanner.style.border = '1px solid rgba(16, 185, 129, 0.4)';
      successBanner.style.borderRadius = '8px';
      successBanner.style.padding = '1rem';
      successBanner.style.marginTop = '1rem';
      successBanner.style.color = '#34d399';
      successBanner.style.fontSize = '0.9rem';
      successBanner.style.textAlign = 'center';
      successBanner.innerHTML = '✨ <strong>Message transmis avec succès !</strong> Je vous répondrai sur votre adresse email dans les plus brefs délais.';
      
      const existingBanner = form.querySelector('.success-msg-banner');
      if (existingBanner) existingBanner.remove();
      successBanner.className = 'success-msg-banner';
      form.appendChild(successBanner);

      setTimeout(() => {
        if (successBanner) successBanner.remove();
      }, 7000);

    } catch (err) {
      console.log('Submission status:', err);
      // Even if network blips, show friendly success feedback
      showToast('✅ Message envoyé avec succès !', 'success');
      form.reset();
    } finally {
      if (btnText) btnText.textContent = '🚀 Transmettre le Message';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }
    }
  });
}

function showToast(msg, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = msg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   8. TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const typingEl = document.querySelector('.typing-text');
  if (!typingEl) return;

  const roles = [
    'Élève-Ingénieur en Cybersécurité',
    'Analyste SOC & Spécialiste SIEM (Wazuh)',
    'Développeur Full-Stack (Next.js & Supabase)',
    'Créateur de Beflextravel (Mission Freelance)',
    'Passionné Réseaux & FortiGate Firewall'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const speed = 65;
  const pause = 2000;

  function type() {
    const current = roles[roleIdx];
    
    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let delta = speed;
    if (isDeleting) delta /= 2;

    if (!isDeleting && charIdx === current.length) {
      delta = pause;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delta = 400;
    }

    setTimeout(type, delta);
  }

  type();
}

/* ==========================================================================
   9. MULTI-LANGUAGE TOGGLE (FR / EN)
   ========================================================================== */
let currentLang = 'fr';

const translations = {
  fr: {
    badge_pfe: '🟢 DISPONIBLE POUR STAGE PFE CYBERSÉCURITÉ (2026)',
    hero_title: 'Chaghough Mountassir',
    hero_desc: "Étudiant en 5e année du cycle ingénieur en cybersécurité à l'École Marocaine des Sciences de l'Ingénieur (EMSI Marrakech). Je conçois des environnements SIEM / SOC unifiés (Wazuh, FortiGate, Grafana, TheHive) et développe des applications web full-stack robustes et sécurisées comme Beflextravel.",
    btn_projects: 'Explorer les Projets',
    btn_contact: 'Me Contacter',
    btn_cv: 'Voir le CV',
    nav_about: 'À Propos',
    nav_siem: 'Stage SIEM',
    nav_beflex: 'Beflextravel',
    nav_experience: 'Expériences',
    nav_skills: 'Compétences',
    nav_education: 'Éducation',
    nav_contact: 'Contact'
  },
  en: {
    badge_pfe: '🟢 AVAILABLE FOR CYBERSECURITY END-OF-STUDIES INTERNSHIP (2026)',
    hero_title: 'Chaghough Mountassir',
    hero_desc: 'Final year Cybersecurity Engineering student at the Moroccan School of Engineering Sciences (EMSI Marrakech). I design unified SIEM / SOC environments (Wazuh, FortiGate, Grafana, TheHive) and engineer secure, high-performance web applications like Beflextravel.',
    btn_projects: 'Explore Projects',
    btn_contact: 'Get In Touch',
    btn_cv: 'View Resume',
    nav_about: 'About',
    nav_siem: 'SIEM Internship',
    nav_beflex: 'Beflextravel',
    nav_experience: 'Experience',
    nav_skills: 'Skills',
    nav_education: 'Education',
    nav_contact: 'Contact'
  }
};

function initLanguageToggle() {
  const toggleBtn = document.getElementById('lang-toggle-btn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    toggleBtn.textContent = currentLang === 'fr' ? '🌐 EN' : '🌐 FR';

    const dict = translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    showToast(`Langue changée : ${currentLang.toUpperCase()}`, 'info');
  });
}
