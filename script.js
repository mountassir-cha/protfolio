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
  initProjectSimulations();
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
<div class="t-line">▸ <span class="t-success">ocp</span>             : Traçabilité Supply Chain Blockchain TSP (Groupe OCP)</div>
<div class="t-line">▸ <span class="t-success">zabbix</span>          : Supervision Réseau & Corrélation CPU (GNS3)</div>
<div class="t-line">▸ <span class="t-success">beflextravel</span>    : Projet Freelance Beflextravel (Next.js & Supabase)</div>
<div class="t-line">▸ <span class="t-success">skills</span>          : Matrice de compétences cyber, web3 & dev</div>
<div class="t-line">▸ <span class="t-success">contact</span>         : Coordonnées directes (Téléphone, Email, etc.)</div>
<div class="t-line">▸ <span class="t-success">clear</span>           : Effacer le terminal</div>`,

    whoami: () => `
<div class="t-line">👤 <span class="t-highlight">Chaghough Mountassir</span> — 23 ans</div>
<div class="t-line">🎓 Élève-Ingénieur en 5e année Cybersécurité à l'<span class="t-success">EMSI Marrakech</span>.</div>
<div class="t-line">🛡️ Spécialiste : SIEM (Wazuh), SOC, FortiGate, Zabbix/GNS3, Blockchain Web3 (Projet OCP TSP) & Développeur Full-Stack.</div>`,

    siem: () => `
<div class="t-line t-highlight">🛡️ PROJET SIEM — UNION IT SERVICES (2026) :</div>
<div class="t-line">▸ Déploiement Wazuh Manager, Indexer & Dashboard sur GNS3.</div>
<div class="t-line">▸ Segmentation & Pare-feu FortiGate (NAT, Politiques de filtrage).</div>
<div class="t-line">▸ Dashboard Grafana unifié (Wazuh + Zabbix + FortiGate).</div>
<div class="t-line">▸ Automatisation Alerting -> TheHive (Incident Response).</div>`,

    ocp: () => `
<div class="t-line t-highlight">⛓️ PROJET BLOCKCHAIN & SUPPLY CHAIN — GROUPE OCP (PRODUIT TSP) :</div>
<div class="t-line">▸ Organisme : Office Chérifien des Phosphates (OCP Group)</div>
<div class="t-line">▸ Produit : Triple Super Phosphate (TSP) — Engrais phosphaté certifié</div>
<div class="t-line">▸ Web3 & MetaMask : Authentification décentralisée et signatures d'expédition</div>
<div class="t-line">▸ Preuves Numériques : HMAC-SHA256 & Horodatage d'événements critiques</div>
<div class="t-line">▸ Stockage Décentralisé : IPFS avec Content Identifier (CID)</div>
<div class="t-line">▸ Qualité Chimique : Taux de Pentoxyde de phosphore (P₂O₅ ≥ 46%) validé</div>
<div class="t-line">▸ Livrables : Passeport Digital PDF, QR Code, Frontend React, API REST & MySQL</div>`,

    tsp: () => commands.ocp(),
    blockchain: () => commands.ocp(),

    zabbix: () => `
<div class="t-line t-highlight">📊 PROJET SUPERVISION & TÉLÉMÉTRIE — GNS3 & ZABBIX :</div>
<div class="t-line">▸ Infrastructure : Topologie multi-noeuds virtualisée sous GNS3</div>
<div class="t-line">▸ Configuration Items : CPU Utilization, RAM Buffers, Traffic Ethernet, ICMP Ping</div>
<div class="t-line">▸ Triggers & Alerting : Seuils dynamiques multi-sévérités (Warning, High, Disaster)</div>
<div class="t-line">▸ Corrélation : Détection proactive d'anomalies lors des pics de charge CPU / Débit</div>`,

    gns3: () => commands.zabbix(),

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
<div class="t-line">▸ <span class="t-success">Web3 & Blockchain :</span> MetaMask, IPFS (CID), HMAC-SHA256, Smart Contracts, Web3.js</div>
<div class="t-line">▸ <span class="t-success">Langages & Dev :</span> Python, Java, C++, JavaScript (ES6+), React, Next.js, Node.js, UML</div>
<div class="t-line">▸ <span class="t-success">Bases de Données :</span> MySQL, PostgreSQL, Supabase, Storage IPFS</div>
<div class="t-line">▸ <span class="t-success">Systèmes :</span> Linux/Unix, TCP/IP, VLAN, Virtualisation (VMware, GNS3)</div>`,

    contact: () => `
<div class="t-line">📞 Téléphone & WhatsApp : <span class="t-highlight">+212 7 66 90 83 81</span></div>
<div class="t-line">✉️ Email : <span class="t-highlight">montassirchaghough5@gmail.com</span></div>
<div class="t-line">💼 LinkedIn : <a href="https://linkedin.com/in/mountassir-chaghough" target="_blank" style="color:#00f2fe;">linkedin.com/in/mountassir-chaghough</a></div>
<div class="t-line">📍 Adresse : Marrakech, Mhamid, Lot Elbaraka N105</div>`,

    ping: (target) => {
      const targets = {
        siem: {
          ip: '192.168.10.10',
          host: 'secops-wazuh.union-it.lab',
          name: 'Stage SIEM & SOC (Union IT Services)',
          sectionId: 'siem-project',
          cardSelector: '.siem-hero-card'
        },
        soc: {
          ip: '192.168.10.10',
          host: 'secops-wazuh.union-it.lab',
          name: 'Stage SIEM & SOC (Union IT Services)',
          sectionId: 'siem-project',
          cardSelector: '.siem-hero-card'
        },
        ocp: {
          ip: '10.24.8.100',
          host: 'web3-gateway.ocp-tsp.chain',
          name: 'Blockchain OCP (Traçabilité TSP)',
          sectionId: 'ocp-project',
          cardSelector: '.blockchain-card'
        },
        tsp: {
          ip: '10.24.8.100',
          host: 'web3-gateway.ocp-tsp.chain',
          name: 'Blockchain OCP (Traçabilité TSP)',
          sectionId: 'ocp-project',
          cardSelector: '.blockchain-card'
        },
        blockchain: {
          ip: '10.24.8.100',
          host: 'web3-gateway.ocp-tsp.chain',
          name: 'Blockchain OCP (Traçabilité TSP)',
          sectionId: 'ocp-project',
          cardSelector: '.blockchain-card'
        },
        zabbix: {
          ip: '172.16.1.100',
          host: 'zabbix-srv01.gns3-telemetry.local',
          name: 'Supervision Zabbix & GNS3',
          sectionId: 'zabbix-project',
          cardSelector: '.zabbix-card'
        },
        gns3: {
          ip: '172.16.1.100',
          host: 'zabbix-srv01.gns3-telemetry.local',
          name: 'Supervision Zabbix & GNS3',
          sectionId: 'zabbix-project',
          cardSelector: '.zabbix-card'
        },
        beflex: {
          ip: '104.21.48.12',
          host: 'beflextravel.com',
          name: 'Plateforme Beflextravel',
          sectionId: 'beflex-project',
          cardSelector: '.beflex-card'
        },
        beflextravel: {
          ip: '104.21.48.12',
          host: 'beflextravel.com',
          name: 'Plateforme Beflextravel',
          sectionId: 'beflex-project',
          cardSelector: '.beflex-card'
        }
      };

      if (!target) {
        return `
<div class="t-line t-highlight">📡 Utilisation de la commande PING :</div>
<div class="t-line">▸ <span class="t-success">ping siem</span>    : Tester le nœud SecOps SIEM & ouvrir la session</div>
<div class="t-line">▸ <span class="t-success">ping ocp</span>     : Tester la passerelle Web3 OCP & ouvrir la session</div>
<div class="t-line">▸ <span class="t-success">ping zabbix</span>  : Tester le serveur de télémétrie Zabbix & ouvrir la session</div>
<div class="t-line">▸ <span class="t-success">ping beflex</span>  : Tester la plateforme Beflextravel & ouvrir la session</div>`;
      }

      const info = targets[target.toLowerCase()];
      if (!info) {
        return `<div class="t-line" style="color:#ef4444;">❌ Hôte inconnu: "${escapeHtml(target)}". Cibles disponibles: siem, ocp, zabbix, beflex.</div>`;
      }

      // Execute live ICMP ping simulation
      runLivePing(info);
      return '';
    },

    clear: () => {
      termBody.innerHTML = '';
      return '';
    }
  };

  function runLivePing(info) {
    const initLine = document.createElement('div');
    initLine.className = 't-line';
    initLine.innerHTML = `<span class="t-highlight">PING ${info.host} (${info.ip}) 56(84) bytes of data.</span>`;
    termBody.appendChild(initLine);
    termBody.scrollTop = termBody.scrollHeight;

    let seq = 1;
    const interval = setInterval(() => {
      if (seq <= 4) {
        const pingTime = (0.28 + Math.random() * 0.22).toFixed(2);
        const seqLine = document.createElement('div');
        seqLine.className = 't-line';
        seqLine.innerHTML = `64 bytes from <span class="t-success">${info.ip}</span>: icmp_seq=${seq} ttl=64 time=<span class="t-highlight">${pingTime} ms</span>`;
        termBody.appendChild(seqLine);
        termBody.scrollTop = termBody.scrollHeight;
        seq++;
      } else {
        clearInterval(interval);
        
        // Stats & Success
        const statLine = document.createElement('div');
        statLine.className = 't-line';
        statLine.innerHTML = `--- ${info.host} ping statistics ---<br><span class="t-success">4 packets transmitted, 4 received, 0% packet loss</span>, time 3004ms`;
        termBody.appendChild(statLine);

        const openLine = document.createElement('div');
        openLine.className = 't-line t-highlight';
        openLine.style.fontWeight = 'bold';
        openLine.innerHTML = `🔓 [PING SUCCEEDED] Hôte accessible — Connexion & Ouverture de la session <strong>${info.name}</strong>...`;
        termBody.appendChild(openLine);
        termBody.scrollTop = termBody.scrollHeight;

        showToast(`📡 Ping réussi (0% loss) ! Ouverture de la session : ${info.name}`, 'success');

        // Smooth scroll to section and pulse highlight
        setTimeout(() => {
          const targetSection = document.getElementById(info.sectionId);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            const card = targetSection.querySelector(info.cardSelector);
            if (card) {
              card.classList.remove('session-highlight');
              void card.offsetWidth; // Trigger reflow
              card.classList.add('session-highlight');
            }
          }
        }, 800);
      }
    }, 280);
  }

  // Quick Ping Chips Click Listener
  document.querySelectorAll('.term-ping-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const target = btn.getAttribute('data-ping');
      if (target) {
        // Echo command
        const cmdEcho = document.createElement('div');
        cmdEcho.className = 't-line';
        cmdEcho.innerHTML = `<span class="t-prompt">mountassir@secops</span>:<span class="t-host">~</span>$ <span class="t-cmd">ping ${escapeHtml(target)}</span>`;
        termBody.appendChild(cmdEcho);
        
        commands.ping(target);
      }
    });
  });

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = termInput.value.trim();
      if (!rawCmd) return;

      const parts = rawCmd.split(/\s+/);
      const mainCmd = parts[0].toLowerCase();
      const arg = parts[1] || '';

      // Echo command
      const cmdEcho = document.createElement('div');
      cmdEcho.className = 't-line';
      cmdEcho.innerHTML = `<span class="t-prompt">mountassir@secops</span>:<span class="t-host">~</span>$ <span class="t-cmd">${escapeHtml(rawCmd)}</span>`;
      termBody.appendChild(cmdEcho);

      // Execute
      if (mainCmd === 'ping') {
        const result = commands.ping(arg);
        if (result) {
          const resDiv = document.createElement('div');
          resDiv.innerHTML = result;
          termBody.appendChild(resDiv);
        }
      } else if (commands[mainCmd]) {
        const result = commands[mainCmd]();
        if (result) {
          const resDiv = document.createElement('div');
          resDiv.innerHTML = result;
          termBody.appendChild(resDiv);
        }
      } else {
        const errDiv = document.createElement('div');
        errDiv.className = 't-line';
        errDiv.style.color = '#ef4444';
        errDiv.textContent = `Commande inconnue: "${rawCmd}". Tapez "help" ou "ping <session>" pour explorer.`;
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
    hero_desc: "Étudiant en 5e année du cycle ingénieur en cybersécurité à l'École Marocaine des Sciences de l'Ingénieur (EMSI Marrakech). Je conçois des environnements SIEM / SOC unifiés (Wazuh, FortiGate, Grafana), des architectures de Supervision Zabbix & GNS3, des solutions Blockchain & Web3 (Projet OCP TSP) et développe des applications web robustes comme Beflextravel.",
    btn_projects: 'Explorer les Projets',
    btn_contact: 'Me Contacter',
    btn_cv: 'Voir le CV',
    nav_about: 'À Propos',
    nav_siem: 'Stage SIEM',
    nav_ocp: 'Blockchain OCP',
    nav_zabbix: 'Zabbix & GNS3',
    nav_beflex: 'Beflextravel',
    nav_experience: 'Expériences',
    nav_skills: 'Compétences',
    nav_education: 'Éducation',
    nav_contact: 'Contact'
  },
  en: {
    badge_pfe: '🟢 AVAILABLE FOR CYBERSECURITY END-OF-STUDIES INTERNSHIP (2026)',
    hero_title: 'Chaghough Mountassir',
    hero_desc: 'Final year Cybersecurity Engineering student at the Moroccan School of Engineering Sciences (EMSI Marrakech). I design unified SIEM / SOC environments (Wazuh, FortiGate, Grafana), Zabbix & GNS3 network telemetry, Web3 & Blockchain systems (OCP TSP project) and engineer robust web platforms like Beflextravel.',
    btn_projects: 'Explore Projects',
    btn_contact: 'Get In Touch',
    btn_cv: 'View Resume',
    nav_about: 'About',
    nav_siem: 'SIEM Internship',
    nav_ocp: 'Blockchain OCP',
    nav_zabbix: 'Zabbix & GNS3',
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

/* ==========================================================================
   10. INTERACTIVE PROJECT SIMULATIONS (OCP Blockchain & Zabbix Telemetry)
   ========================================================================== */
function initProjectSimulations() {
  // Blockchain OCP Simulation
  const verifyBtn = document.getElementById('btn-verify-blockchain');
  const hashDisplay = document.getElementById('blockchain-hash-display');

  if (verifyBtn) {
    verifyBtn.addEventListener('click', () => {
      verifyBtn.disabled = true;
      verifyBtn.innerHTML = '<span>⏳ Calcul Preuve HMAC-SHA256 & Interrogation IPFS...</span>';

      setTimeout(() => {
        const randomHex = Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
        if (hashDisplay) {
          hashDisplay.textContent = randomHex;
          hashDisplay.style.color = '#34d399';
        }
        showToast('✅ Preuve cryptographique vérifiée sur la Blockchain OCP ! Lot TSP conforme (P₂O₅: 46.85%).', 'success');
        verifyBtn.disabled = false;
        verifyBtn.innerHTML = '<span>✓ Preuve Validée & Bloc Scellé (Refaire)</span>';
      }, 1000);
    });
  }

  // Zabbix GNS3 CPU Load Correlation Simulation
  const zabbixBtn = document.getElementById('btn-trigger-zabbix');
  const cpuVal = document.getElementById('zabbix-cpu-val');
  const cpuTrigger = document.getElementById('zabbix-cpu-trigger');

  if (zabbixBtn && cpuVal) {
    zabbixBtn.addEventListener('click', () => {
      zabbixBtn.disabled = true;
      zabbixBtn.innerHTML = '<span>⚡ Injection de Charge Trafic Réseau...</span>';

      // Step 1: Spike CPU to High Trigger
      cpuVal.textContent = '89.4%';
      cpuVal.style.color = '#ef4444';
      if (cpuTrigger) {
        cpuTrigger.className = 'trigger-item high';
        cpuTrigger.innerHTML = '<span>🔥 [Core-Router-01] CRITICAL: CPU Overload > 85% (Correlated with eth0 spike)</span><span class="trigger-badge">HIGH</span>';
      }
      showToast('🚨 Trigger Zabbix Déclenché : Saturation CPU détectée sur Core-Router-01 (89.4%) !', 'error');

      // Step 2: Correlate and cool down
      setTimeout(() => {
        cpuVal.textContent = '54.2%';
        cpuVal.style.color = '#f59e0b';
        if (cpuTrigger) {
          cpuTrigger.className = 'trigger-item warning';
          cpuTrigger.innerHTML = '<span>⚠️ [Core-Router-01] CPU Stabilizing (54.2%)</span><span class="trigger-badge">WARNING</span>';
        }
      }, 2500);

      // Step 3: Resolved
      setTimeout(() => {
        cpuVal.textContent = '31.8%';
        cpuVal.style.color = '#00f2fe';
        if (cpuTrigger) {
          cpuTrigger.className = 'trigger-item ok';
          cpuTrigger.innerHTML = '<span>✓ [Core-Router-01] CPU Load Normalized (31.8%)</span><span class="trigger-badge">RESOLVED</span>';
        }
        showToast('✅ Corrélation résolue : Trafic stabilisé et CPU normalisé.', 'success');
        zabbixBtn.disabled = false;
        zabbixBtn.innerHTML = '<span>⚡ Simuler Corrélation Charge CPU</span>';
      }, 4500);
    });
  }
}
