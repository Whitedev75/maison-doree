/* ==========================================================================
   MAISON DORÉE — SCRIPT PRINCIPAL (JavaScript vanilla, sans dépendance)
   --------------------------------------------------------------------------
   Ce fichier n'a normalement pas besoin d'être modifié pour un nouveau
   client : les contenus viennent de js/config.js (objet SITE_CONFIG).

   Sommaire
     1. Initialisation
     2. Injection des informations (nom, téléphone, adresse…)
     3. Produits (cartes + filtres)
     4. Galerie + visionneuse
     5. Horaires + statut « ouvert / fermé »
     6. Carte & itinéraire
     7. Réseaux sociaux
     8. En-tête (défilement) & menu mobile
     9. Lien actif dans la navigation
     10. Apparition au défilement
     11. Formulaire de contact (sans backend)
   ========================================================================== */

(() => {
  "use strict";

  /* ------------------------------------------------------------------------
     1. INITIALISATION
     ------------------------------------------------------------------------ */
  const CONFIG = window.SITE_CONFIG || (typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : null);
  const root = document.documentElement;
  root.classList.add("js");

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Échappe le texte injecté dans du HTML (sécurité) */
  const escapeHTML = (str = "") =>
    String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* Si une photo ne se charge pas, on affiche un fond élégant avec son nom */
  const attachImageFallback = (img, label) => {
    const showFallback = () => {
      const holder = img.parentElement;
      if (!holder || holder.querySelector(".img-fallback")) return;
      img.style.visibility = "hidden";
      const fb = document.createElement("span");
      fb.className = "img-fallback";
      fb.textContent = label || "";
      holder.appendChild(fb);
    };
    // Image déjà en échec avant que l'écouteur soit posé
    if (img.complete && img.naturalWidth === 0 && img.currentSrc) showFallback();
    else img.addEventListener("error", showFallback, { once: true });
  };

  if (!CONFIG) {
    console.warn("[Maison Dorée] js/config.js introuvable : contenu par défaut affiché.");
  }

  /* ------------------------------------------------------------------------
     2. INJECTION DES INFORMATIONS GÉNÉRALES
     ------------------------------------------------------------------------ */
  function bindSiteInfo() {
    if (!CONFIG) return;
    const c = CONFIG.contact || {};
    const values = {
      name: CONFIG.name,
      slogan: CONFIG.slogan,
      shortDescription: CONFIG.shortDescription,
      priceNote: CONFIG.priceNote,
      phoneDisplay: c.phoneDisplay,
      email: c.email,
      address: [c.street, [c.postalCode, c.city].filter(Boolean).join(" ")].filter(Boolean).join(", "),
    };

    $$("[data-bind]").forEach((el) => {
      const v = values[el.dataset.bind];
      if (v) el.textContent = v;
    });

    const links = {
      tel: c.phoneLink ? `tel:${c.phoneLink}` : null,
      mailto: c.email ? `mailto:${c.email}` : null,
      directions: buildDirectionsUrl(),
    };
    $$("[data-href]").forEach((el) => {
      const href = links[el.dataset.href];
      if (href) el.setAttribute("href", href);
    });

    // Mode « vrai client » : on masque toutes les mentions de démonstration
    if (CONFIG.isDemo === false) root.classList.add("is-live");

    const year = $("[data-year]");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------------
     3. PRODUITS
     ------------------------------------------------------------------------ */
  function renderProducts() {
    const grid = $("[data-product-grid]");
    const tabs = $("[data-product-tabs]");
    if (!grid || !CONFIG || !Array.isArray(CONFIG.products)) return;

    const catLabel = Object.fromEntries((CONFIG.categories || []).map((c) => [c.id, c.label]));

    // Boutons de filtre
    (CONFIG.categories || []).forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tabs__btn";
      btn.dataset.filter = cat.id;
      btn.setAttribute("aria-pressed", "false");
      btn.textContent = cat.label;
      tabs.appendChild(btn);
    });

    // Cartes produits
    grid.innerHTML = CONFIG.products.map((p) => `
      <article class="product-card" data-category="${escapeHTML(p.category)}">
        <div class="product-card__media">
          <img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.alt || p.name)}"
               width="900" height="675" loading="lazy" decoding="async">
          ${p.tag ? `<span class="product-card__tag">${escapeHTML(p.tag)}</span>` : ""}
        </div>
        <div class="product-card__body">
          <p class="product-card__cat">${escapeHTML((catLabel[p.category] || "").replace(/^Nos\s+/i, ""))}</p>
          <h3 class="product-card__name">${escapeHTML(p.name)}</h3>
          <p class="product-card__desc">${escapeHTML(p.description)}</p>
          ${p.price ? `
          <div class="product-card__foot">
            <span class="product-card__price-label">Prix indicatif</span>
            <span class="product-card__price">${escapeHTML(p.price)}</span>
          </div>` : ""}
        </div>
      </article>`).join("");

    $$("img", grid).forEach((img) => attachImageFallback(img, img.closest(".product-card").querySelector(".product-card__name").textContent));

    // Filtrage
    tabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".tabs__btn");
      if (!btn) return;
      const filter = btn.dataset.filter;

      $$(".tabs__btn", tabs).forEach((b) => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });

      $$(".product-card", grid).forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.hidden = !show;
        if (show) { // relance la petite animation d'apparition
          card.style.animation = "none";
          void card.offsetWidth;
          card.style.animation = "";
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. GALERIE + VISIONNEUSE
     ------------------------------------------------------------------------ */
  function renderGallery() {
    const grid = $("[data-gallery-grid]");
    if (!grid || !CONFIG || !Array.isArray(CONFIG.gallery)) return;

    const items = CONFIG.gallery;
    grid.innerHTML = items.map((g, i) => `
      <li class="gallery__item${g.size ? ` gallery__item--${escapeHTML(g.size)}` : ""} reveal" style="--delay:${(i % 4) * 0.07}s">
        <button class="gallery__btn" type="button" data-index="${i}" aria-label="Agrandir la photo : ${escapeHTML(g.caption || g.alt)}">
          <img src="${escapeHTML(g.image)}" alt="${escapeHTML(g.alt)}" loading="lazy" decoding="async" width="900" height="900">
        </button>
        ${g.caption ? `<span class="gallery__caption" aria-hidden="true">${escapeHTML(g.caption)}</span>` : ""}
      </li>`).join("");

    $$("img", grid).forEach((img, i) => attachImageFallback(img, items[i].caption));

    // Visionneuse (élément <dialog> natif : gestion du focus et de la touche Échap incluses)
    const dialog = $("#lightbox");
    if (!dialog || typeof dialog.showModal !== "function") return;
    const img = $("[data-lightbox-img]", dialog);
    const caption = $("[data-lightbox-caption]", dialog);
    let current = 0;
    let opener = null;

    const show = (i) => {
      current = (i + items.length) % items.length;
      const g = items[current];
      img.src = g.image.replace(/w=\d+/, "w=1600");
      img.alt = g.alt;
      caption.textContent = g.caption || "";
    };

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".gallery__btn");
      if (!btn) return;
      opener = btn;
      show(Number(btn.dataset.index));
      dialog.showModal();
      document.body.style.overflow = "hidden";
    });

    $("[data-lightbox-close]", dialog).addEventListener("click", () => dialog.close());
    $("[data-lightbox-prev]", dialog).addEventListener("click", () => show(current - 1));
    $("[data-lightbox-next]", dialog).addEventListener("click", () => show(current + 1));
    dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); }); // clic hors de la photo
    dialog.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
    dialog.addEventListener("close", () => {
      document.body.style.overflow = "";
      if (opener) opener.focus();
    });

    // Balayage tactile (swipe) sur mobile
    let startX = null;
    dialog.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
    dialog.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    });
  }

  /* ------------------------------------------------------------------------
     5. HORAIRES + STATUT « OUVERT / FERMÉ »
     ------------------------------------------------------------------------ */
  const formatTime = (hhmm) => {
    const [h, m] = hhmm.split(":");
    return `${Number(h)}h${m}`;
  };
  const toMinutes = (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };

  /* Jour et heure actuels dans le fuseau de la boulangerie (et non du visiteur) */
  function nowInShopTimezone() {
    try {
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: CONFIG.timezone || "Europe/Paris",
        weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
      }).formatToParts(new Date());
      const get = (t) => parts.find((p) => p.type === t).value;
      const days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return { day: days[get("weekday")], minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute")) };
    } catch {
      const d = new Date();
      return { day: d.getDay(), minutes: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function renderHours() {
    if (!CONFIG || !Array.isArray(CONFIG.hours)) return;
    const { day, minutes } = nowInShopTimezone();

    // Tableau détaillé
    const tbody = $("[data-hours-table] tbody");
    if (tbody) {
      tbody.innerHTML = CONFIG.hours.map((h) => {
        const closed = !h.slots.length;
        const value = closed ? "Fermé" : h.slots.map(([a, b]) => `${formatTime(a)} – ${formatTime(b)}`).join(" / ");
        const cls = [closed ? "is-closed" : "", h.day === day ? "is-today" : ""].filter(Boolean).join(" ");
        return `<tr${cls ? ` class="${cls}"` : ""}><th scope="row">${escapeHTML(h.label)}</th><td>${value}</td></tr>`;
      }).join("");
    }

    // Résumés (footer + contact)
    if (Array.isArray(CONFIG.hoursSummary)) {
      const footer = $("[data-hours-footer]");
      if (footer) {
        footer.innerHTML = CONFIG.hoursSummary
          .map(([d, t]) => `<li><span>${escapeHTML(d)}</span><span>${escapeHTML(t)}</span></li>`).join("");
      }
      const summary = $("[data-hours-summary]");
      if (summary) summary.textContent = CONFIG.hoursSummary.map(([d, t]) => `${d} : ${t}`).join(" · ");
    }

    // Statut en direct
    const today = CONFIG.hours.find((h) => h.day === day);
    const openSlot = today && today.slots.find(([a, b]) => minutes >= toMinutes(a) && minutes < toMinutes(b));
    let text;
    if (openSlot) {
      text = `Ouvert aujourd'hui jusqu'à ${formatTime(openSlot[1])}`;
    } else {
      text = `Fermé actuellement · ${nextOpening(day, minutes)}`;
    }
    $$("[data-open-status]").forEach((el) => {
      el.classList.toggle("is-open", Boolean(openSlot));
      el.classList.toggle("is-closed", !openSlot);
      $(".status__text", el).textContent = text;
    });
  }

  /* Trouve la prochaine ouverture (aujourd'hui plus tard, ou un jour suivant) */
  function nextOpening(day, minutes) {
    for (let offset = 0; offset < 8; offset++) {
      const d = (day + offset) % 7;
      const entry = CONFIG.hours.find((h) => h.day === d);
      if (!entry || !entry.slots.length) continue;
      const slot = entry.slots.find(([a]) => offset > 0 || toMinutes(a) > minutes);
      if (!slot) continue;
      if (offset === 0) return `ouvre à ${formatTime(slot[0])}`;
      if (offset === 1) return `ouvre demain à ${formatTime(slot[0])}`;
      return `ouvre ${entry.label.toLowerCase()} à ${formatTime(slot[0])}`;
    }
    return "horaires ci-dessous";
  }

  /* ------------------------------------------------------------------------
     6. CARTE & ITINÉRAIRE
     ------------------------------------------------------------------------ */
  function buildDirectionsUrl() {
    if (!CONFIG || !CONFIG.map) return null;
    const { lat, lng, showMarker } = CONFIG.map;
    const c = CONFIG.contact || {};
    // Vrai client : on peut viser l'adresse exacte ; démonstration : point générique
    const destination = showMarker && c.street
      ? encodeURIComponent(`${c.street}, ${c.postalCode} ${c.city}`)
      : `${lat},${lng}`;
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  }

  function setupMap() {
    const frame = $("[data-map-frame]");
    if (!frame || !CONFIG || !CONFIG.map) return;
    const { lat, lng, zoom = 14, showMarker } = CONFIG.map;
    // Calcul d'une zone (bbox) approximative autour du point selon le zoom
    const span = 360 / Math.pow(2, zoom) * 0.9;
    const bbox = [lng - span, lat - span / 2.2, lng + span, lat + span / 2.2].map((n) => n.toFixed(4)).join("%2C");
    const marker = showMarker ? `&marker=${lat}%2C${lng}` : "";
    frame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik${marker}`;
    if (!CONFIG.isDemo) frame.title = `Carte de localisation de ${CONFIG.name}`;
  }

  /* ------------------------------------------------------------------------
     7. RÉSEAUX SOCIAUX
     ------------------------------------------------------------------------ */
  function renderSocials() {
    const list = $("[data-socials]");
    if (!list || !CONFIG || !Array.isArray(CONFIG.socials)) return;
    const demo = CONFIG.isDemo !== false;
    list.innerHTML = CONFIG.socials.map((s) => `
      <li>
        <a href="${escapeHTML(s.url)}" target="_blank" rel="noopener"
           aria-label="${escapeHTML(s.label)}${demo ? " (lien de démonstration)" : ""} — nouvel onglet"
           title="${escapeHTML(s.label)}${demo ? " — lien de démonstration" : ""}">
          <svg aria-hidden="true"><use href="#icon-${escapeHTML(s.network)}"/></svg>
        </a>
      </li>`).join("");
  }

  /* ------------------------------------------------------------------------
     8. EN-TÊTE & MENU MOBILE
     ------------------------------------------------------------------------ */
  function setupHeader() {
    const header = $("#header");
    const burger = $("#burger");
    const nav = $("#nav");
    if (!header) return;

    // Fond clair dès que l'on quitte le haut de page
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!burger || !nav) return;

    const setOpen = (open) => {
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      if (open) $("a", nav).focus();
    };

    burger.addEventListener("click", () => setOpen(burger.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); burger.focus(); }
    });
    // Si l'on repasse en affichage large, on referme le menu
    window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
  }

  /* ------------------------------------------------------------------------
     9. LIEN ACTIF DANS LA NAVIGATION
     ------------------------------------------------------------------------ */
  function setupActiveLink() {
    const links = $$(".nav__link");
    const sections = links.map((l) => $(l.getAttribute("href"))).filter(Boolean);
    if (!("IntersectionObserver" in window) || !sections.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => {
          const active = l.getAttribute("href") === `#${entry.target.id}`;
          l.classList.toggle("is-active", active);
          if (active) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
  }

  /* ------------------------------------------------------------------------
     10. APPARITION PROGRESSIVE AU DÉFILEMENT
     ------------------------------------------------------------------------ */
  function setupReveal() {
    const items = $$(".reveal");
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    // Léger décalage pour les éléments d'une même grille
    $$(".commitments__grid .reveal").forEach((el, i) => el.style.setProperty("--delay", `${i * 0.1}s`));
    $$(".hero .reveal").forEach((el, i) => el.style.setProperty("--delay", `${0.15 + i * 0.12}s`));

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach((el) => io.observe(el));
  }

  /* ------------------------------------------------------------------------
     11. FORMULAIRE DE CONTACT
     Pas de serveur : après vérification, on ouvre la messagerie du visiteur
     avec un e-mail pré-rempli (lien mailto:). Pour un envoi direct, branchez
     un service comme Formspree ou Web3Forms (voir README).
     ------------------------------------------------------------------------ */
  function setupContactForm() {
    const form = $("#contact-form");
    if (!form) return;
    const status = $("[data-form-status]", form);

    const rules = {
      name: (v) => (v.trim().length >= 2 ? "" : "Merci d'indiquer votre nom."),
      email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Merci d'indiquer une adresse e-mail valide."),
      message: (v) => (v.trim().length >= 10 ? "" : "Votre message doit contenir au moins 10 caractères."),
    };

    const validateField = (field) => {
      const rule = rules[field.name];
      if (!rule) return true;
      const msg = rule(field.value);
      const wrapper = field.closest(".field");
      const error = $(`#${field.id}-error`);
      wrapper.classList.toggle("has-error", Boolean(msg));
      field.setAttribute("aria-invalid", msg ? "true" : "false");
      if (msg) field.setAttribute("aria-describedby", error.id); else field.removeAttribute("aria-describedby");
      error.textContent = msg;
      return !msg;
    };

    // Validation à la sortie du champ, puis en direct une fois l'erreur affichée
    $$("input, textarea", form).forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => { if (field.getAttribute("aria-invalid") === "true") validateField(field); });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fields = $$("input[required], textarea[required]", form);
      const results = fields.map(validateField);
      if (results.includes(false)) {
        fields[results.indexOf(false)].focus();
        status.textContent = "";
        return;
      }

      const data = Object.fromEntries(new FormData(form));
      const to = (CONFIG && CONFIG.contact && CONFIG.contact.email) || "";
      const subject = `[Site web] ${data.subject} — ${data.name}`;
      const body = `${data.message}\n\n— \n${data.name}\n${data.email}`;
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      status.textContent = CONFIG && CONFIG.isDemo !== false
        ? "Votre messagerie s'ouvre avec le message pré-rempli. (Démonstration : l'adresse de destination est fictive.)"
        : "Votre messagerie s'ouvre avec le message pré-rempli : il ne vous reste qu'à l'envoyer.";
    });
  }

  /* ------------------------------------------------------------------------
     Lancement
     ------------------------------------------------------------------------ */
  bindSiteInfo();
  renderProducts();
  renderGallery();
  renderHours();
  setupMap();
  renderSocials();
  setupHeader();
  setupActiveLink();
  setupReveal();
  setupContactForm();

  // Mise à jour du statut d'ouverture chaque minute
  if (CONFIG) setInterval(renderHours, 60 * 1000);

  // Photos fixes du HTML (hero, histoire) : fallback si indisponibles
  $$(".hero__img, .story__media img").forEach((img) => attachImageFallback(img, ""));
})();
