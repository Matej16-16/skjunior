// ==============================================================
// ŠK JUNIOR - APLIKÁCIA (APP.JS) V ŠTÝLE FC NITRA (fcnitra.sk)
// S PLNÝM PÁROVANÍM A IMPORTOM ZO SPORTNET FUTBALNET
// ==============================================================

let currentData = getClubData();
let activeTeamKey = "a-tim";
let activeGalleryCategory = "all";
let activeNewsCategory = "all";
let activeTableMode = "custom"; // "custom" (Klubový dizajn) alebo "widget" (Oficiálny Sportnet)

document.addEventListener("DOMContentLoaded", () => {
  currentData = getClubData();
  initClubInfo();
  initNavigation();
  initHomeMatchCenter();
  initHomeNewsMagazine();
  initArticles();
  initTeams();
  initGallery();
  initAbout();
  initEshopModal();
  initLightbox();
  initSportnetModalLogic();

  handleHashChange();
  window.addEventListener("hashchange", handleHashChange);
});

// Automatická synchronizácia pri zmene v administrácii alebo prepnutí tabu
window.addEventListener("storage", (e) => {
  if (e.key === "sk_junior_club_data") {
    refreshAllClubViews();
  }
});

window.addEventListener("focus", () => {
  refreshAllClubViews();
});

function refreshAllClubViews() {
  currentData = getClubData();
  initClubInfo();
  initHomeMatchCenter();
  initHomeNewsMagazine();
  initArticles();
  initTeams();
  initGallery();
  initAbout();
}

// --------------------------------------------------------------
// 0. DYNAMICKÉ PREPOJENIE KLUBOVÝCH ÚDAJOV & KONTAKTOV
// --------------------------------------------------------------
function initClubInfo() {
  const ci = currentData?.clubInfo || {};
  const addr = ci.address || {};
  const cont = ci.contact || {};
  const bill = ci.billing || {};
  const soc = ci.socials || {};

  // Topbar
  const topAddress = document.getElementById("topbar-address");
  if (topAddress) topAddress.innerText = `${addr.stadium || 'Futbalový areál ŠK Junior'}, ${addr.street || 'Novozámocká'}, ${addr.city || 'Ivanka pri Nitre'}`;

  const topPhone = document.getElementById("topbar-phone");
  const topPhoneLink = document.getElementById("topbar-phone-link");
  if (topPhone) topPhone.innerText = cont.phone || "+421 910 907 795";
  if (topPhoneLink && cont.phone) topPhoneLink.href = `tel:${cont.phone.replace(/\s+/g, '')}`;

  const topEmail = document.getElementById("topbar-email");
  const topEmailLink = document.getElementById("topbar-email-link");
  if (topEmail) topEmail.innerText = cont.email || "skjuniorivanka@gmail.com";
  if (topEmailLink && cont.email) topEmailLink.href = `mailto:${cont.email}`;

  const topFb = document.getElementById("topbar-facebook");
  if (topFb && soc.facebook) topFb.href = soc.facebook;

  const topIg = document.getElementById("topbar-instagram");
  if (topIg && soc.instagram) topIg.href = soc.instagram;

  // Kontakt sekcia (#oklube)
  const cFullname = document.getElementById("contact-club-fullname");
  if (cFullname) cFullname.innerText = ci.fullName || "ŠK Junior Ivanka pri Nitre";

  const cAddress = document.getElementById("contact-club-address");
  if (cAddress) cAddress.innerText = `${addr.street || 'Novozámocká'}, ${addr.city || '951 12 Ivanka pri Nitre'}`;

  const cStadium = document.getElementById("contact-club-stadium");
  if (cStadium) cStadium.innerText = addr.stadium || "Futbalový areál ŠK Junior";

  const cPhone = document.getElementById("contact-club-phone");
  const cPhoneLink = document.getElementById("contact-club-phone-link");
  if (cPhone) cPhone.innerText = cont.phone || "+421 910 907 795";
  if (cPhoneLink && cont.phone) cPhoneLink.href = `tel:${cont.phone.replace(/\s+/g, '')}`;

  const cEmail = document.getElementById("contact-club-email");
  const cEmailLink = document.getElementById("contact-club-email-link");
  if (cEmail) cEmail.innerText = cont.email || "skjuniorivanka@gmail.com";
  if (cEmailLink && cont.email) cEmailLink.href = `mailto:${cont.email}`;

  const cIco = document.getElementById("contact-club-ico");
  if (cIco) cIco.innerText = bill.ico || "53316711";

  const cBank = document.getElementById("contact-club-bank");
  if (cBank) cBank.innerText = bill.bank || "Všeobecná úverová banka, a.s.";

  const cIban = document.getElementById("contact-club-iban");
  if (cIban) cIban.innerText = bill.iban || "SK31 0200 0000 0043 6564 7155";

  // Pätička (Footer)
  const fAddress = document.getElementById("footer-address");
  if (fAddress) fAddress.innerText = `${addr.stadium || 'Futbalový areál ŠK Junior'}, ${addr.street || 'Novozámocká'}, ${addr.city || 'Ivanka pri Nitre'}`;

  const fPhone = document.getElementById("footer-phone");
  const fPhoneLink = document.getElementById("footer-phone-link");
  if (fPhone) fPhone.innerText = cont.phone || "+421 910 907 795";
  if (fPhoneLink && cont.phone) fPhoneLink.href = `tel:${cont.phone.replace(/\s+/g, '')}`;

  const fEmail = document.getElementById("footer-email");
  const fEmailLink = document.getElementById("footer-email-link");
  if (fEmail) fEmail.innerText = cont.email || "skjuniorivanka@gmail.com";
  if (fEmailLink && cont.email) fEmailLink.href = `mailto:${cont.email}`;

  const fCopyright = document.getElementById("footer-copyright");
  if (fCopyright) fCopyright.innerText = `© ${new Date().getFullYear()} ${ci.fullName || 'ŠK Junior Ivanka pri Nitre'}. Všetky práva vyhradené.`;
}

// --------------------------------------------------------------
// 1. NAVIGÁCIA
// --------------------------------------------------------------
function initNavigation() {
  // Navigačné odkazy s data-section
  const navLinks = document.querySelectorAll("[data-section]");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute("data-section");
      if (sectionId) {
        switchSection(sectionId);
        window.location.hash = sectionId;
      }

      const mobileMenu = document.getElementById("mobile-menu");
      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }
    });
  });

  // Všetky kotvy href="#..." (napr. v pätičke)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const targetHash = anchor.getAttribute("href").replace("#", "");
      if (targetHash && document.getElementById(targetHash)) {
        e.preventDefault();
        switchSection(targetHash);
        window.location.hash = targetHash;
      }
    });
  });

  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}

function handleHashChange() {
  const hash = window.location.hash.replace("#", "") || "uvod";
  switchSection(hash);
}

function switchSection(sectionId) {
  const sections = document.querySelectorAll("main > section");
  let found = false;

  sections.forEach(sec => {
    if (sec.id === sectionId) {
      sec.classList.remove("hidden");
      found = true;
    } else {
      sec.classList.add("hidden");
    }
  });

  if (!found && sections.length > 0) {
    const uvod = document.getElementById("uvod");
    if (uvod) uvod.classList.remove("hidden");
    sectionId = "uvod";
  }

  document.querySelectorAll(".fcn-nav-link").forEach(link => {
    if (link.getAttribute("data-section") === sectionId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Globálna dostupnosť pre inline volania v HTML
window.switchSection = switchSection;
window.navigateToTeam = navigateToTeam;
window.navigateToAboutSubSection = navigateToAboutSubSection;

// --------------------------------------------------------------
// 2. MATCH CENTER (ZÁPASOVÉ CENTRUM V ŠTÝLE FC NITRA)
// --------------------------------------------------------------
function initHomeMatchCenter() {
  renderLastMatch();
  renderNextMatch();
  renderMiniLeagueTable();
  renderHomeMatchesGrid();

  // Filter týždenného kalendára zápasov
  const matchFilterButtons = document.querySelectorAll("[data-match-filter]");
  matchFilterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      matchFilterButtons.forEach(b => {
        b.classList.remove("btn-fcn-primary", "text-white");
        b.classList.add("bg-gray-100", "text-slate-700");
      });
      btn.classList.add("btn-fcn-primary", "text-white");
      btn.classList.remove("bg-gray-100", "text-slate-700");

      const filter = btn.getAttribute("data-match-filter");
      renderHomeMatchesGrid(filter);
    });
  });
}

function renderLastMatch() {
  const container = document.getElementById("last-match-card");
  if (!container) return;

  const m = currentData.lastMatch;
  if (!m) return;

  container.innerHTML = `
    <div class="bg-[#0F172A] text-white p-3.5 flex items-center justify-between border-b border-gray-700">
      <span class="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
        <i class="fa-solid fa-flag-checkered"></i> Posledný zápas A-tímu
      </span>
      <span class="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">${m.competition}</span>
    </div>
    
    <div class="p-6">
      <div class="flex items-center justify-between gap-4">
        <div class="flex-1 text-center">
          <img src="${m.homeLogo}" alt="${m.homeTeam}" class="w-16 h-16 mx-auto object-contain p-1 bg-white rounded-full shadow border border-slate-200 mb-2" onerror="this.onerror=null; this.src='SK_Junior_logo.jpg'">
          <div class="font-bold text-sm text-slate-800 leading-tight">${m.homeTeam}</div>
        </div>

        <div class="flex flex-col items-center px-3">
          <div class="flex items-center gap-2 text-4xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight">
            <span>${m.homeScore}</span>
            <span class="text-pink-500">:</span>
            <span>${m.awayScore}</span>
          </div>
          <span class="text-[11px] font-bold uppercase tracking-wider bg-green-100 text-green-700 px-2 py-0.5 rounded mt-1">Koniec zápasu</span>
        </div>

        <div class="flex-1 text-center">
          <img src="${m.awayLogo}" alt="${m.awayTeam}" class="w-16 h-16 mx-auto object-contain p-1 bg-white rounded-full shadow border border-slate-200 mb-2" onerror="this.onerror=null; this.src='SK_Junior_logo.jpg'">
          <div class="font-bold text-sm text-slate-800 leading-tight">${m.awayTeam}</div>
        </div>
      </div>

      <div class="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-1.5 text-xs text-slate-500">
        <div class="flex items-center justify-between">
          <span><i class="fa-regular fa-calendar text-pink-500 mr-1.5"></i> ${m.dateFormatted}</span>
          <span class="font-semibold text-slate-700">${m.attendance || ''}</span>
        </div>
        <div class="text-[11px] text-slate-600 bg-slate-50 p-2 rounded mt-1">
          <strong class="text-slate-800">Góly:</strong> ${m.scorers || 'Bez strelcov'}
        </div>
      </div>
    </div>
  `;
}

function renderNextMatch() {
  const container = document.getElementById("next-match-card");
  if (!container) return;

  const m = currentData.nextMatch;
  if (!m) return;

  container.innerHTML = `
    <div class="bg-[#0F172A] text-white p-3.5 flex items-center justify-between border-b border-gray-700">
      <span class="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
        <i class="fa-regular fa-clock"></i> Najbližší zápas A-tímu
      </span>
      <span class="text-[11px] bg-pink-600 text-white px-2 py-0.5 rounded font-bold">${m.competition}</span>
    </div>

    <div class="p-6">
      <div class="flex items-center justify-between gap-4">
        <div class="flex-1 text-center">
          <img src="${m.homeLogo}" alt="${m.homeTeam}" class="w-16 h-16 mx-auto object-contain p-1 bg-white rounded-full shadow border border-slate-200 mb-2" onerror="this.onerror=null; this.src='SK_Junior_logo.jpg'">
          <div class="font-bold text-sm text-slate-800 leading-tight">${m.homeTeam}</div>
        </div>

        <div class="flex flex-col items-center px-3">
          <div class="text-xs font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-md mb-1 border border-pink-200">
            ${m.time || '15:00'}
          </div>
          <span class="text-3xl font-heading font-black text-slate-400">VS</span>
          <span class="text-[11px] text-slate-500 font-semibold mt-1">${m.dateFormatted || m.date || '21.03.2027'}</span>
        </div>

        <div class="flex-1 text-center">
          <img src="${m.awayLogo}" alt="${m.awayTeam}" class="w-16 h-16 mx-auto object-contain p-1 bg-white rounded-full shadow border border-slate-200 mb-2" onerror="this.onerror=null; this.src='SK_Junior_logo.jpg'">
          <div class="font-bold text-sm text-slate-800 leading-tight">${m.awayTeam}</div>
        </div>
      </div>

      <div class="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-1.5 text-xs text-slate-500">
        <div class="flex items-center gap-1.5 text-slate-600">
          <i class="fa-solid fa-location-dot text-pink-500"></i>
          <span>${m.venue}</span>
        </div>
        <div class="flex items-center justify-between pt-1">
          <span class="text-[11px] text-slate-500">${m.ticketInfo || 'Vstup voľný'}</span>
          <button onclick="navigateToTeam('a-tim')" class="text-xs font-bold text-pink-600 hover:text-pink-700">
            Detail zápasu & Tím <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderMiniLeagueTable() {
  const container = document.getElementById("home-mini-table");
  if (!container) return;

  const aTeam = currentData?.teams?.["a-tim"];
  if (!aTeam || !aTeam.table) return;

  const topTable = aTeam.table.slice(0, 5);

  container.innerHTML = `
    <div class="bg-[#0F172A] text-white p-3.5 flex items-center justify-between">
      <span class="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1.5 truncate">
        <i class="fa-solid fa-trophy"></i> Tabuľka ${aTeam.league || 'VIII. A liga'}
      </span>
      <button onclick="navigateToTeam('a-tim')" class="text-[11px] text-slate-300 hover:text-white underline">
        Celá tabuľka
      </button>
    </div>
    
    <div class="overflow-x-auto">
      <table class="fcn-table">
        <thead>
          <tr>
            <th class="w-10 text-center">#</th>
            <th>Klub</th>
            <th class="text-center">Z</th>
            <th class="text-center font-bold text-pink-400">B</th>
          </tr>
        </thead>
        <tbody>
          ${topTable.map(row => `
            <tr class="${row.isCurrent ? 'highlight-junior' : ''}">
              <td class="text-center font-bold">${row.pos}.</td>
              <td class="font-semibold flex items-center gap-1.5">
                ${row.isCurrent ? '<i class="fa-solid fa-shield text-pink-600 text-xs"></i>' : ''}
                <span class="${row.isCurrent ? 'text-pink-600' : ''}">${row.team}</span>
              </td>
              <td class="text-center text-slate-500">${row.p}</td>
              <td class="text-center font-black ${row.isCurrent ? 'text-pink-600' : 'text-slate-800'}">${row.pts}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderHomeMatchesGrid(filter = "all") {
  const container = document.getElementById("home-matches-grid");
  if (!container) return;

  let matches = currentData.upcomingMatches || [];
  if (filter !== "all") {
    matches = matches.filter(m => {
      if (filter === "a-tim") return m.teamKey === "a-tim";
      if (filter === "mladez") return m.teamKey !== "a-tim";
      return true;
    });
  }

  if (matches.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-8 text-slate-400">
        Pre vybranú kategóriu nie sú na najbližší týždeň naplánované žiadne zápasy.
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="col-span-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100">
      ${matches.map((m, idx) => {
        const rowBgClass = idx % 2 === 1 ? 'fcn-match-row-even' : 'fcn-match-row-odd';
        const isJuniorHome = (m.homeTeam || '').toLowerCase().includes('junior');
        const isJuniorAway = (m.awayTeam || '').toLowerCase().includes('junior');

        return `
          <div class="fcn-match-row flex items-center justify-between py-3.5 px-3 sm:px-6 ${rowBgClass} transition-colors">
            <!-- Dátum, čas a kategória -->
            <div class="w-32 sm:w-48 shrink-0">
              <span class="block text-[10px] font-bold uppercase text-pink-600 tracking-wider truncate">${m.teamName || m.competition || ''}</span>
              <span class="font-bold text-slate-800 text-xs sm:text-sm">${m.date} ${m.time || ''}</span>
            </div>

            <!-- Domáci tím (zarovnaný doprava) -->
            <div class="flex-1 text-right font-bold text-xs sm:text-sm truncate pr-2 sm:pr-4 ${isJuniorHome ? 'text-pink-600 font-black' : 'text-slate-900'}">
              ${m.homeTeam}
            </div>

            <!-- Logo domáci -->
            <img src="${m.homeLogo || 'SK_Junior_logo.jpg'}" alt="${m.homeTeam}" class="w-6 h-6 sm:w-7 sm:h-7 object-contain shrink-0 mx-1" onerror="this.onerror=null; this.src='SK_Junior_logo.jpg'">

            <!-- Skóre / pomlčka -->
            <div class="w-8 sm:w-12 text-center font-bold text-slate-700 text-xs sm:text-sm shrink-0">
              ${m.score ? m.score : '-'}
            </div>

            <!-- Logo hostia -->
            <img src="${m.awayLogo || 'SK_Junior_logo.jpg'}" alt="${m.awayTeam}" class="w-6 h-6 sm:w-7 sm:h-7 object-contain shrink-0 mx-1" onerror="this.onerror=null; this.src='SK_Junior_logo.jpg'">

            <!-- Hostia tím (zarovnaný doľava) -->
            <div class="flex-1 text-left font-bold text-xs sm:text-sm truncate pl-2 sm:pl-4 ${isJuniorAway ? 'text-pink-600 font-black' : 'text-slate-900'}">
              ${m.awayTeam}
            </div>

            <!-- Tlačidlo Detail kategórie -->
            <div class="pl-2 sm:pl-4 shrink-0 hidden md:block">
              <button onclick="navigateToTeam('${m.teamKey}')" class="text-xs font-bold text-pink-600 hover:text-pink-700 uppercase tracking-wider inline-flex items-center gap-1">
                <span>Detail</span> <i class="fa-solid fa-angle-right text-[10px]"></i>
              </button>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

// --------------------------------------------------------------
// 3. MAGAZÍNOVÝ LAYOUT AKTUALÍT
// --------------------------------------------------------------
function initHomeNewsMagazine() {
  const container = document.getElementById("home-news-magazine");
  if (!container) return;

  const articles = currentData.articles || [];
  if (articles.length === 0) return;

  const heroArt = articles[0];
  const sideArticles = articles.slice(1, 4);
  const heroDate = new Date(heroArt.date).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" });

  container.innerHTML = `
    <div class="lg:col-span-7">
      <div class="news-hero-card h-full min-h-[380px] lg:min-h-[460px] flex flex-col justify-end p-6 sm:p-8 relative group cursor-pointer" onclick="openArticleModal('${heroArt.id}')">
        <img src="${heroArt.image}" alt="${heroArt.title}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60" onerror="this.onerror=null; this.src='SK_Junior_logo.jpg'">
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        
        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-3">
            <span class="bg-pink-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
              ${heroArt.category}
            </span>
            <span class="text-xs text-slate-300 font-medium">
              <i class="fa-regular fa-calendar mr-1"></i> ${heroDate}
            </span>
          </div>
          <h3 class="text-3xl sm:text-4xl font-heading font-black text-white group-hover:text-pink-400 transition-colors leading-tight mb-3">
            ${heroArt.title}
          </h3>
          <p class="text-sm text-slate-300 line-clamp-2 max-w-2xl leading-relaxed mb-4">
            ${heroArt.excerpt}
          </p>
          <span class="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-pink-400">
            Čítať celý článok <i class="fa-solid fa-arrow-right"></i>
          </span>
        </div>
      </div>
    </div>

    <div class="lg:col-span-5 flex flex-col justify-between gap-4">
      ${sideArticles.map(art => {
        const d = new Date(art.date).toLocaleDateString("sk-SK", { day: "numeric", month: "numeric", year: "numeric" });
        return `
          <div class="news-card-white p-4 flex gap-4 cursor-pointer group" onclick="openArticleModal('${art.id}')">
            <div class="w-28 sm:w-36 h-24 rounded-lg overflow-hidden shrink-0 bg-slate-900">
              <img src="${art.image}" alt="${art.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.onerror=null; this.src='SK_Junior_logo.jpg'">
            </div>
            <div class="flex flex-col justify-between min-w-0">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[10px] font-bold uppercase text-pink-600">${art.category}</span>
                  <span class="text-[11px] text-slate-400">• ${d}</span>
                </div>
                <h4 class="font-bold text-sm text-slate-800 group-hover:text-pink-600 transition-colors line-clamp-2 leading-snug">
                  ${art.title}
                </h4>
              </div>
              <span class="text-[11px] font-semibold text-slate-500 group-hover:text-pink-600 inline-flex items-center gap-1">
                Zobraziť <i class="fa-solid fa-angle-right text-[9px]"></i>
              </span>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

// --------------------------------------------------------------
// 4. SEKCOIA AKTUALITY
// --------------------------------------------------------------
function initArticles() {
  renderArticles();

  const categoryButtons = document.querySelectorAll("[data-news-category]");
  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach(b => {
        b.classList.remove("btn-fcn-primary", "text-white");
        b.classList.add("bg-white", "text-slate-700");
      });
      btn.classList.add("btn-fcn-primary", "text-white");
      btn.classList.remove("bg-white", "text-slate-700");

      activeNewsCategory = btn.getAttribute("data-news-category");
      renderArticles();
    });
  });

  const searchInput = document.getElementById("news-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderArticles(e.target.value.toLowerCase().trim());
    });
  }
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return '';
  if (typeof dateStr === 'string' && dateStr.includes('.')) return dateStr;
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("sk-SK", { day: "numeric", month: "numeric", year: "numeric" });
    }
  } catch (e) {}
  return dateStr;
}

function renderArticles(searchQuery = "") {
  const container = document.getElementById("articles-grid");
  if (!container) return;

  let articles = currentData.articles || [];

  if (activeNewsCategory !== "all") {
    articles = articles.filter(a => (a.category || '').toLowerCase() === activeNewsCategory.toLowerCase());
  }

  if (searchQuery) {
    articles = articles.filter(a =>
      (a.title || '').toLowerCase().includes(searchQuery) ||
      (a.excerpt || a.summary || '').toLowerCase().includes(searchQuery) ||
      (a.content || '').toLowerCase().includes(searchQuery)
    );
  }

  if (articles.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 text-slate-400">
        <i class="fa-regular fa-newspaper text-5xl mb-3 text-slate-300 block"></i>
        Nenašli sa žiadne články zodpovedajúce kritériám.
      </div>
    `;
    return;
  }

  container.innerHTML = articles.map(art => {
    const d = formatDateDisplay(art.date);
    return `
      <article class="news-card-white overflow-hidden flex flex-col justify-between group cursor-pointer" onclick="openArticleModal('${art.id}')">
        <div>
          <div class="relative h-48 overflow-hidden bg-slate-900">
            <img src="${art.image}" alt="${art.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.onerror=null; this.src='SK_Junior_logo.jpg'">
            <span class="absolute top-3 left-3 bg-[#FF3388] text-white text-[11px] font-bold px-2.5 py-1 rounded shadow">
              ${art.category}
            </span>
          </div>
          <div class="p-5">
            <span class="text-xs text-slate-400 block mb-1.5"><i class="fa-regular fa-calendar mr-1"></i> ${d}</span>
            <h3 class="text-lg font-bold text-slate-900 group-hover:text-[#FF3388] transition-colors line-clamp-2 mb-2">
              ${art.title}
            </h3>
            <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
              ${art.summary || art.excerpt || art.content || ''}
            </p>
          </div>
        </div>
        <div class="px-5 pb-5 pt-0 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
          <span><i class="fa-solid fa-pen-nib text-[#FF3388] mr-1"></i> ${art.author || 'Redakcia ŠK Junior'}</span>
          <span class="text-[#FF3388] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            Čítať viac <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </span>
        </div>
      </article>
    `;
  }).join("");
}

function openArticleModal(articleId) {
  const art = (currentData.articles || []).find(a => a.id === articleId);
  if (!art) return;

  const modal = document.getElementById("article-modal");
  const modalContent = document.getElementById("article-modal-content");
  if (!modal || !modalContent) return;

  const d = new Date(art.date).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" });

  modalContent.innerHTML = `
    <div class="relative">
      <img src="${art.image}" alt="${art.title}" class="w-full h-64 md:h-80 object-cover">
      <span class="absolute top-4 left-4 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded shadow">
        ${art.category}
      </span>
    </div>
    <div class="p-6 md:p-8 bg-white">
      <div class="flex items-center gap-4 text-xs text-slate-400 mb-3">
        <span><i class="fa-regular fa-calendar text-pink-600 mr-1"></i> ${d}</span>
        <span><i class="fa-solid fa-user text-pink-600 mr-1"></i> ${art.author || 'Redakcia'}</span>
      </div>
      <h2 class="text-3xl md:text-4xl font-heading font-black text-slate-900 mb-4 leading-tight">
        ${art.title}
      </h2>
      <div class="prose max-w-none text-slate-700 space-y-4 leading-relaxed border-t border-slate-100 pt-5 text-sm">
        ${art.content}
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeArticleModal() {
  const modal = document.getElementById("article-modal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }
}

// --------------------------------------------------------------
// 5. TÍMY (A-tím & Mládež U7-U19)
// --------------------------------------------------------------
function initTeams() {
  renderTeamButtons();
  renderTeamDetail(activeTeamKey);
}

function renderTeamButtons() {
  const container = document.getElementById("team-selector-buttons");
  if (!container) return;

  const teamKeys = Object.keys(currentData?.teams || {});

  container.innerHTML = `
    <div class="flex flex-wrap gap-2 justify-center">
      ${teamKeys.map(key => {
        const team = currentData.teams[key];
        const isActive = key === activeTeamKey;
        return `
          <button 
            onclick="switchTeam('${key}')"
            class="px-4 py-2.5 rounded-md font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              isActive 
                ? 'bg-pink-600 text-white shadow-md' 
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }">
            <span>${team.name}</span>
          </button>
        `;
      }).join("")}
    </div>
  `;
}

function switchTeam(teamKey) {
  activeTeamKey = teamKey;
  renderTeamButtons();
  renderTeamDetail(teamKey);
}

function navigateToTeam(teamKey) {
  switchSection("timy");
  window.location.hash = "timy";
  switchTeam(teamKey);
}

function navigateToAboutSubSection(subSectionId) {
  switchSection("oklube");
  window.location.hash = "oklube";
  setTimeout(() => {
    const targetEl = document.getElementById(`oklube-${subSectionId}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 100);
}

function renderTeamDetail(teamKey) {
  const team = currentData.teams[teamKey];
  const container = document.getElementById("team-detail-container");
  if (!team || !container) return;

  container.innerHTML = `
    <!-- Hlavička tímu (FC Nitra moderný štýl v klubových farbách) -->
    <div class="bg-[#0F172A] text-white rounded-xl p-6 sm:p-8 mb-8 border-b-4 border-[#FF3388] shadow-md">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span class="inline-block px-3 py-1 rounded bg-[#FF3388]/20 text-[#FF3388] text-xs font-bold uppercase tracking-wider mb-2">
            ${team.badge || team.category}
          </span>
          <h2 class="text-4xl sm:text-5xl font-heading font-black text-white tracking-wide">
            ${team.name}
          </h2>
          <p class="text-slate-300 text-sm max-w-2xl mt-1 leading-relaxed">
            ${team.description || 'Oficiálna kategória klubu ŠK Junior Ivanka pri Nitre.'}
          </p>
        </div>

        <div class="flex flex-wrap gap-2.5">
          <span class="bg-slate-800 text-white px-4 py-2 rounded text-xs font-bold inline-flex items-center gap-1.5 shadow-sm border border-slate-700">
            <i class="fa-solid fa-trophy text-[#FF3388]"></i> ${team.league}
          </span>
          <span class="bg-slate-800 text-slate-200 px-4 py-2 rounded text-xs font-semibold inline-flex items-center gap-1.5 border border-slate-700">
            <i class="fa-solid fa-user-tie text-[#FF3388]"></i> Tréner: ${team.coach || 'Vedenie tímu'}
          </span>
        </div>
      </div>
    </div>

    <!-- Záložky tímu -->
    <div class="flex border-b border-slate-200 mb-8 gap-2 overflow-x-auto pb-1">
      <button onclick="setTeamTab('table')" id="tab-btn-table" class="team-tab-btn px-6 py-3 rounded-t-lg text-xs font-bold uppercase tracking-wider transition-colors bg-[#FF3388] text-white">
        <i class="fa-solid fa-table mr-1.5"></i> Ligová tabuľka
      </button>
      <button onclick="setTeamTab('matches')" id="tab-btn-matches" class="team-tab-btn px-6 py-3 rounded-t-lg text-xs font-bold uppercase tracking-wider transition-colors bg-white text-slate-600 hover:text-slate-900">
        <i class="fa-solid fa-calendar-days mr-1.5"></i> Najbližšie zápasy (${(team.matches || []).length})
      </button>
      <button onclick="setTeamTab('roster')" id="tab-btn-roster" class="team-tab-btn px-6 py-3 rounded-t-lg text-xs font-bold uppercase tracking-wider transition-colors bg-white text-slate-600 hover:text-slate-900">
        <i class="fa-solid fa-users mr-1.5"></i> Hráčska súpiska (${(team.roster || []).length})
      </button>
      <button onclick="setTeamTab('staff')" id="tab-btn-staff" class="team-tab-btn px-6 py-3 rounded-t-lg text-xs font-bold uppercase tracking-wider transition-colors bg-white text-slate-600 hover:text-slate-900">
        <i class="fa-solid fa-clipboard-user mr-1.5"></i> Realizačný tím (${(team.staff || []).length})
      </button>
    </div>

    <!-- 1. Obsah: Ligová tabuľka (Vzor fcnitra.sk) -->
    <div id="team-content-table" class="team-tab-content">
      ${renderTeamTableLayout(team)}
    </div>

    <!-- 2. Obsah: Najbližšie zápasy (Vzor fcnitra.sk) -->
    <div id="team-content-matches" class="team-tab-content hidden">
      ${renderTeamMatchesLayout(team)}
    </div>

    <!-- 3. Obsah: Súpiska -->
    <div id="team-content-roster" class="team-tab-content hidden">
      ${renderRosterCards(team.roster)}
    </div>

    <!-- 4. Obsah: Realizačný tím -->
    <div id="team-content-staff" class="team-tab-content hidden">
      ${renderStaffCards(team.staff)}
    </div>
  `;
}

function setTeamTab(tabName) {
  document.querySelectorAll(".team-tab-btn").forEach(btn => {
    btn.classList.remove("bg-[#FF3388]", "text-white");
    btn.classList.add("bg-white", "text-slate-600");
  });
  document.querySelectorAll(".team-tab-content").forEach(content => {
    content.classList.add("hidden");
  });

  const activeBtn = document.getElementById(`tab-btn-${tabName}`);
  const activeContent = document.getElementById(`team-content-${tabName}`);

  if (activeBtn) {
    activeBtn.classList.add("bg-[#FF3388]", "text-white");
    activeBtn.classList.remove("bg-white", "text-slate-600");
  }
  if (activeContent) {
    activeContent.classList.remove("hidden");
  }
}

function renderRosterCards(roster = []) {
  if (roster.length === 0) {
    return `<div class="text-center py-10 text-slate-400 bg-white rounded-xl p-8 border border-slate-200">Súpiska pre túto kategóriu sa momentálne dopĺňa.</div>`;
  }

  const grouped = {};
  roster.forEach(player => {
    const pos = player.pos || "Hráč v poli";
    if (!grouped[pos]) grouped[pos] = [];
    grouped[pos].push(player);
  });

  return `
    <div class="space-y-6">
      ${Object.keys(grouped).map(posName => `
        <div>
          <h4 class="text-xl font-heading font-black text-slate-900 mb-3 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-[#FF3388]"></span> ${posName}
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            ${grouped[posName].map(player => `
              <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-[#FF3388] transition-colors">
                <div class="w-12 h-12 rounded-lg bg-[#0F172A] text-[#FF3388] font-heading text-2xl font-black flex items-center justify-center shrink-0">
                  #${player.number || '-'}
                </div>
                <div class="min-w-0">
                  <div class="font-bold text-slate-900 text-sm truncate">${player.name}</div>
                  <div class="text-xs text-slate-500 mt-0.5">
                    <span>${player.pos}</span>
                    ${player.year ? `<span class="text-slate-400">• ${player.year}</span>` : ''}
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderStaffCards(staff = []) {
  if (staff.length === 0) {
    return `<div class="text-center py-10 text-slate-400 bg-white rounded-xl p-8 border border-slate-200">Informácie o realizačnom tíme sa pripravujú.</div>`;
  }

  return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${staff.map(person => `
        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-full bg-pink-50 text-[#FF3388] flex items-center justify-center text-xl mb-4">
              <i class="fa-solid fa-user-tie"></i>
            </div>
            <span class="text-[11px] font-bold uppercase tracking-wider text-[#FF3388] block mb-1">
              ${person.role}
            </span>
            <h4 class="text-xl font-bold text-slate-900 mb-1">${person.name}</h4>
            <div class="text-xs text-slate-500 mb-4 inline-block bg-slate-100 px-2.5 py-1 rounded">
              <i class="fa-solid fa-certificate text-[#FF3388] mr-1"></i> ${person.license || 'Licencovaný tréner'}
            </div>
          </div>
          <div class="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-600">
            ${person.phone ? `
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-phone text-[#FF3388] w-4"></i>
                <a href="tel:${person.phone}" class="hover:text-[#FF3388] font-semibold">${person.phone}</a>
              </div>
            ` : ''}
            ${person.email ? `
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-envelope text-[#FF3388] w-4"></i>
                <a href="mailto:${person.email}" class="hover:text-[#FF3388] truncate">${person.email}</a>
              </div>
            ` : ''}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// --------------------------------------------------------------
// LIGOVÁ TABUĽKA (PRESNÝ FORMÁT PODĽA VZORU FC NITRA)
// --------------------------------------------------------------
function renderTeamTableLayout(team) {
  const tableRows = team.table || [];

  if (tableRows.length === 0) {
    return `
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center space-y-4">
        <h3 class="text-3xl sm:text-4xl font-heading font-black tracking-tight">
          <span class="text-[#0F172A]">LIGOVÁ</span> <span class="text-[#FF3388]">TABUĽKA</span>
        </h3>
        <p class="text-sm text-slate-500 max-w-lg mx-auto">
          Pre kategóriu ${team.name} sa v tejto súťaži oficiálna tabuľka nevedie (prípravné zápasy a miniturnaje).
        </p>
        <button onclick="setTeamTab('matches')" class="bg-[#FF3388] hover:bg-[#FF559E] text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded transition">
          ZOBRAZIŤ ROZPIS ZÁPASOV
        </button>
      </div>
    `;
  }

  return `
    <div class="space-y-6">
      <!-- Nadpis sekcie + Tlačidlo Najbližšie zápasy v štýle FC Nitra -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <h3 class="text-3xl sm:text-5xl font-heading font-black tracking-tight">
          <span class="text-[#0F172A]">LIGOVÁ</span> <span class="text-[#FF3388]">TABUĽKA</span>
        </h3>
        <button onclick="setTeamTab('matches')" class="bg-[#FF3388] hover:bg-[#FF559E] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded transition shadow-sm inline-flex items-center gap-2 self-start sm:self-auto">
          <span>NAJBLIŽŠIE ZÁPASY</span>
          <span class="text-base leading-none">↗</span>
        </button>
      </div>

      <!-- Tabuľka s klubovou hlavičkou -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="fcn-league-table-header text-xs sm:text-sm font-bold uppercase tracking-wider">
                <th class="py-3.5 pl-4 sm:pl-6 text-left">DRUŽSTVO</th>
                <th class="py-3.5 px-2 sm:px-3 text-center w-12 sm:w-16">Z</th>
                <th class="py-3.5 px-2 sm:px-3 text-center w-12 sm:w-16">V</th>
                <th class="py-3.5 px-2 sm:px-3 text-center w-12 sm:w-16">R</th>
                <th class="py-3.5 px-2 sm:px-3 text-center w-12 sm:w-16">P</th>
                <th class="py-3.5 px-2 sm:px-4 text-center w-20 sm:w-28">SKÓRE</th>
                <th class="py-3.5 pr-4 sm:pr-6 text-center w-14 sm:w-20">B</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-xs sm:text-sm">
              ${tableRows.map(row => {
                const isJunior = row.isCurrent || (row.team || '').toLowerCase().includes('junior');
                return `
                  <tr class="${isJunior ? 'bg-pink-50/70 font-semibold' : 'bg-white'} hover:bg-slate-50 transition-colors">
                    <td class="py-3.5 pl-4 sm:pl-6 text-slate-900">
                      <div class="flex items-center gap-3 sm:gap-4">
                        <span class="w-5 text-center font-bold ${isJunior ? 'text-[#FF3388]' : 'text-slate-500'}">${row.pos}</span>
                        ${row.logo ? `<img src="${row.logo}" alt="${row.team}" class="w-6 h-6 object-contain shrink-0" onerror="this.onerror=null; this.src='SK_Junior_logo.jpg'">` : ''}
                        <span class="truncate ${isJunior ? 'font-black text-[#FF3388]' : 'font-semibold text-slate-900'}">${row.team}</span>
                      </div>
                    </td>
                    <td class="py-3.5 px-2 sm:px-3 text-center text-slate-700">${row.p}</td>
                    <td class="py-3.5 px-2 sm:px-3 text-center text-slate-700">${row.w}</td>
                    <td class="py-3.5 px-2 sm:px-3 text-center text-slate-700">${row.d}</td>
                    <td class="py-3.5 px-2 sm:px-3 text-center text-slate-700">${row.l}</td>
                    <td class="py-3.5 px-2 sm:px-4 text-center font-mono text-slate-700">${row.score}</td>
                    <td class="py-3.5 pr-4 sm:pr-6 text-center font-black ${isJunior ? 'text-[#FF3388] text-base' : 'text-slate-900'}">${row.pts}</td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------
// NAJBLIŽŠIE ZÁPASY (PRESNÝ FORMÁT PODĽA VZORU FC NITRA)
// --------------------------------------------------------------
function renderTeamMatchesLayout(team) {
  const matches = team.matches || [];

  if (matches.length === 0) {
    return `
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center space-y-4">
        <h3 class="text-3xl sm:text-4xl font-heading font-black tracking-tight">
          <span class="text-[#0F172A]">NAJBLIŽŠIE</span> <span class="text-[#FF3388]">ZÁPASY</span>
        </h3>
        <p class="text-sm text-slate-400">Pre tento tím nie sú na najbližšie obdobie naplánované žiadne zápasy.</p>
      </div>
    `;
  }

  return `
    <div class="space-y-6">
      <!-- Nadpis sekcie podľa FC Nitra -->
      <h3 class="text-3xl sm:text-5xl font-heading font-black tracking-tight">
        <span class="text-[#0F172A]">NAJBLIŽŠIE</span> <span class="text-[#FF3388]">ZÁPASY</span>
      </h3>

      <!-- Zoznam zápasov s pruhovaným pozadím -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100">
        ${matches.map((m, idx) => {
          const rowBgClass = idx % 2 === 1 ? 'fcn-match-row-even' : 'fcn-match-row-odd';
          const isJuniorHome = (m.homeTeam || '').toLowerCase().includes('junior');
          const isJuniorAway = (m.awayTeam || '').toLowerCase().includes('junior');

          return `
            <div class="fcn-match-row flex items-center justify-between py-3.5 px-3 sm:px-6 ${rowBgClass} transition-colors">
              <!-- Dátum a čas -->
              <div class="w-28 sm:w-44 font-bold text-slate-800 text-xs sm:text-sm shrink-0">
                ${m.date} ${m.time || ''}
              </div>

              <!-- Domáci tím (zarovnaný doprava) -->
              <div class="flex-1 text-right font-bold text-xs sm:text-sm truncate pr-2 sm:pr-4 ${isJuniorHome ? 'text-[#FF3388] font-black' : 'text-slate-900'}">
                ${m.homeTeam}
              </div>

              <!-- Logo domáci -->
              <img src="${m.homeLogo || 'SK_Junior_logo.jpg'}" alt="${m.homeTeam}" class="w-6 h-6 sm:w-7 sm:h-7 object-contain shrink-0 mx-1" onerror="this.onerror=null; this.src='SK_Junior_logo.jpg'">

              <!-- Skóre / pomlčka -->
              <div class="w-8 sm:w-12 text-center font-bold text-slate-700 text-xs sm:text-sm shrink-0">
                ${m.score ? m.score : '-'}
              </div>

              <!-- Logo hostia -->
              <img src="${m.awayLogo || 'SK_Junior_logo.jpg'}" alt="${m.awayTeam}" class="w-6 h-6 sm:w-7 sm:h-7 object-contain shrink-0 mx-1" onerror="this.onerror=null; this.src='SK_Junior_logo.jpg'">

              <!-- Hostia tím (zarovnaný doľava) -->
              <div class="flex-1 text-left font-bold text-xs sm:text-sm truncate pl-2 sm:pl-4 ${isJuniorAway ? 'text-[#FF3388] font-black' : 'text-slate-900'}">
                ${m.awayTeam}
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <!-- Tlačidlo ZOBRAZIŤ TABUĽKU v klubovej ružovej farbe -->
      <div class="text-center pt-4">
        <button onclick="setTeamTab('table')" class="bg-[#FF3388] hover:bg-[#FF559E] text-white font-bold text-xs uppercase tracking-wider px-8 py-3 rounded shadow transition">
          ZOBRAZIŤ TABUĽKU SÚŤAŽE
        </button>
      </div>
    </div>
  `;
}


function setTableDisplayMode(mode) {
  activeTableMode = mode;
  const customView = document.getElementById("table-view-custom");
  const widgetView = document.getElementById("table-view-widget");
  const btnCustom = document.getElementById("btn-mode-custom");
  const btnWidget = document.getElementById("btn-mode-widget");

  if (mode === "custom") {
    if (customView) customView.classList.remove("hidden");
    if (widgetView) widgetView.classList.add("hidden");
    if (btnCustom) {
      btnCustom.className = "px-3 py-1.5 rounded-md transition-all bg-pink-600 text-white shadow";
    }
    if (btnWidget) {
      btnWidget.className = "px-3 py-1.5 rounded-md transition-all text-slate-600 hover:text-slate-900";
    }
  } else {
    if (customView) customView.classList.add("hidden");
    if (widgetView) widgetView.classList.remove("hidden");
    if (btnCustom) {
      btnCustom.className = "px-3 py-1.5 rounded-md transition-all text-slate-600 hover:text-slate-900";
    }
    if (btnWidget) {
      btnWidget.className = "px-3 py-1.5 rounded-md transition-all bg-[#0F172A] text-white shadow";
    }
  }
}

// --------------------------------------------------------------
// MODÁL: PÁROVANIE SO SPORTNETOM & INTELIGENTNÝ IMPORTÉR
// --------------------------------------------------------------
let currentSportnetEditingTeamKey = "a-tim";

function openSportnetModal(teamKey) {
  currentSportnetEditingTeamKey = teamKey || activeTeamKey;
  const team = currentData.teams[currentSportnetEditingTeamKey];
  if (!team) return;

  const modal = document.getElementById("sportnet-modal");
  if (!modal) return;

  document.getElementById("sportnet-team-title").innerText = `${team.name} - Prepojenie so Sportnet Futbalnet`;
  document.getElementById("sportnet-team-url-input").value = team.sportnetConfig.teamUrl || "";
  document.getElementById("sportnet-comp-url-input").value = team.sportnetConfig.competitionUrl || "";
  document.getElementById("sportnet-raw-text-input").value = "";

  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeSportnetModal() {
  const modal = document.getElementById("sportnet-modal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }
}

function initSportnetModalLogic() {
  const form = document.getElementById("sportnet-form");
  const parseBtn = document.getElementById("sportnet-parse-btn");
  const autoFetchBtn = document.getElementById("sportnet-autofetch-btn");

  // 1. Štandardné uloženie URL odkazov
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const team = currentData.teams[currentSportnetEditingTeamKey];
      if (!team) return;

      team.sportnetConfig.teamUrl = document.getElementById("sportnet-team-url-input").value.trim();
      team.sportnetConfig.competitionUrl = document.getElementById("sportnet-comp-url-input").value.trim();

      saveClubData(currentData);
      closeSportnetModal();
      renderTeamDetail(currentSportnetEditingTeamKey);
      alert(`Prepojenie pre ${team.name} bolo úspešne uložené!`);
    };
  }

  // 2. Rýchly import skopírovaného textu zo Sportnetu
  if (parseBtn) {
    parseBtn.addEventListener("click", () => {
      const rawText = document.getElementById("sportnet-raw-text-input").value.trim();
      if (!rawText) {
        alert("Prosím vložte do poľa text skopírovanej tabuľky zo Sportnetu.");
        return;
      }

      const parsed = SportnetService.parseSportnetTableText(rawText);
      if (parsed.length > 0) {
        const team = currentData.teams[currentSportnetEditingTeamKey];
        team.table = parsed;
        saveClubData(currentData);
        closeSportnetModal();
        renderTeamDetail(currentSportnetEditingTeamKey);
        renderMiniLeagueTable();
        alert(`Skvelé! Úspešne sme importovali ${parsed.length} tímov do tabuľky pre kategóriu ${team.name}!`);
      } else {
        alert("Nepodarilo sa automaticky rozpoznať riadky tabuľky. Skontrolujte, či ste skopírovali celý blok s poradím, tímom a bodmi.");
      }
    });
  }

  // 3. Automatické načítanie cez Live URL
  if (autoFetchBtn) {
    autoFetchBtn.addEventListener("click", async () => {
      const url = document.getElementById("sportnet-comp-url-input").value.trim() || document.getElementById("sportnet-team-url-input").value.trim();
      if (!url) {
        alert("Zadajte prosím platnú URL adresu súťaže zo sportnet.sme.sk/futbalnet.");
        return;
      }

      autoFetchBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sťahujem dáta...';
      try {
        const table = await SportnetService.fetchLiveTableFromUrl(url);
        const team = currentData.teams[currentSportnetEditingTeamKey];
        team.table = table;
        saveClubData(currentData);
        closeSportnetModal();
        renderTeamDetail(currentSportnetEditingTeamKey);
        renderMiniLeagueTable();
        alert(`Úspech! Z adresy Sportnetu bolo stiahnutých a preformátovaných ${table.length} tímov!`);
      } catch (err) {
        alert(`Upozornenie: ${err.message}\nTip: Využite záložku „Rýchly import skopírovanej tabuľky“, kde stačí označiť a vložiť text priamo z webu Sportnetu.`);
      } finally {
        autoFetchBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down mr-1"></i> Automaticky stiahnuť tabuľku z URL';
      }
    });
  }
}

// --------------------------------------------------------------
// 6. GALÉRIA & LIGHTBOX
// --------------------------------------------------------------
function initGallery() {
  renderGallery();

  const filterButtons = document.querySelectorAll("[data-gallery-filter]");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => {
        b.classList.remove("btn-fcn-primary", "text-white");
        b.classList.add("bg-white", "text-slate-700");
      });
      btn.classList.add("btn-fcn-primary", "text-white");
      btn.classList.remove("bg-white", "text-slate-700");

      activeGalleryCategory = btn.getAttribute("data-gallery-filter");
      renderGallery();
    });
  });
}

function renderGallery() {
  const container = document.getElementById("gallery-grid");
  if (!container) return;

  let items = currentData.gallery || [];
  if (activeGalleryCategory !== "all") {
    items = items.filter(g => (g.category || '').toLowerCase() === activeGalleryCategory.toLowerCase());
  }

  container.innerHTML = items.map(photo => {
    const photoSrc = photo.url || photo.image || 'SK_Junior_logo.jpg';
    return `
      <div class="news-card-white overflow-hidden group relative cursor-pointer" onclick="openLightbox('${photoSrc}', '${photo.title || ''}', '${photo.category || ''}', '${photo.date || ''}')">
        <div class="h-64 overflow-hidden bg-slate-900">
          <img src="${photoSrc}" alt="${photo.title || 'Fotografia'}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.onerror=null; this.src='SK_Junior_logo.jpg'">
        </div>
        <div class="p-4 bg-white">
          <span class="text-[11px] font-bold text-[#FF3388] uppercase block mb-1">${photo.category || 'Klub'} • ${photo.date || ''}</span>
          <h4 class="font-bold text-sm text-slate-800 group-hover:text-[#FF3388] transition-colors">${photo.title || ''}</h4>
        </div>
      </div>
    `;
  }).join("");
}

function initLightbox() {
  const modal = document.getElementById("lightbox-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.closest("#lightbox-close")) {
        closeLightbox();
      }
    });
  }
}

function openLightbox(url, title, category, date) {
  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  if (!modal || !img) return;

  img.src = url;
  if (caption) {
    caption.innerHTML = `<span class="text-pink-400 font-bold">${category}</span> — ${title} ${date ? `(${date})` : ''}`;
  }

  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeLightbox() {
  const modal = document.getElementById("lightbox-modal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }
}

// --------------------------------------------------------------
// 7. O KLUBE
// --------------------------------------------------------------
function initAbout() {
  renderAboutTimeline();
  renderAboutManagement();
  renderAboutPartners();
}

function renderAboutTimeline() {
  const container = document.getElementById("history-timeline-container");
  if (!container) return;

  const timeline = currentData?.about?.historyTimeline || [];
  if (timeline.length === 0) {
    const defaultHist = currentData?.clubInfo?.history;
    if (defaultHist) {
      container.innerHTML = `
        <div class="text-sm text-slate-700 leading-relaxed space-y-3">
          <p>${defaultHist}</p>
        </div>
      `;
      return;
    }
    container.innerHTML = `<div class="text-center py-6 text-slate-400">Informácie o histórii klubu sa pripravujú.</div>`;
    return;
  }

  container.innerHTML = timeline.map(item => `
    <div class="relative pl-8 pb-8 border-l-2 border-[#FF3388] last:border-l-0 last:pb-0">
      <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#FF3388] ring-4 ring-pink-100"></div>
      <span class="inline-block text-xs font-bold text-[#FF3388] bg-pink-50 px-2.5 py-0.5 rounded border border-pink-200 mb-1">
        ${item.year}
      </span>
      <h4 class="text-lg font-bold text-slate-900 mb-1">${item.title}</h4>
      <p class="text-xs text-slate-600 leading-relaxed">${item.text}</p>
    </div>
  `).join("");
}

function renderAboutManagement() {
  const container = document.getElementById("management-grid");
  if (!container) return;

  const mgmt = currentData?.about?.management || currentData?.clubInfo?.board || [];
  if (mgmt.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-6 text-slate-400">Informácie o vedení klubu sa pripravujú.</div>`;
    return;
  }

  container.innerHTML = mgmt.map(m => {
    const initials = (m.name || 'ŠK').split(" ").filter(Boolean).map(n => n[0]).join("").toUpperCase();
    return `
    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
      <div>
        <div class="w-14 h-14 rounded-full bg-[#0F172A] text-[#FF3388] flex items-center justify-center text-xl font-black mb-4">
          ${initials}
        </div>
        <span class="text-[11px] font-bold text-[#FF3388] uppercase block mb-1">${m.role}</span>
        <h4 class="text-xl font-bold text-slate-900 mb-2">${m.name}</h4>
        <p class="text-xs text-slate-500 mb-4 leading-relaxed">${m.bio || ''}</p>
      </div>
      <div class="border-t border-slate-100 pt-3 space-y-1 text-xs text-slate-600">
        ${m.phone ? `<div class="flex items-center gap-2"><i class="fa-solid fa-phone text-[#FF3388] w-4"></i> <a href="tel:${m.phone}" class="hover:text-[#FF3388] font-semibold">${m.phone}</a></div>` : ''}
        ${m.email ? `<div class="flex items-center gap-2"><i class="fa-solid fa-envelope text-[#FF3388] w-4"></i> <a href="mailto:${m.email}" class="hover:text-[#FF3388] truncate">${m.email}</a></div>` : ''}
      </div>
    </div>
  `;
  }).join("");
}

function renderAboutPartners() {
  const container = document.getElementById("partners-grid");
  if (!container) return;

  const partners = currentData?.about?.partners || currentData?.sponsors || [];
  if (partners.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-6 text-slate-400">Zoznam partnerov sa pripravuje.</div>`;
    return;
  }

  container.innerHTML = partners.map(p => `
    <div class="bg-white p-6 rounded-xl border border-slate-200 text-center flex flex-col items-center justify-between shadow-sm">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-wider text-[#FF3388] mb-3 block">${p.tier}</span>
        <div class="h-16 flex items-center justify-center mb-3">
          <img src="${p.logo || 'SK_Junior_logo.jpg'}" alt="${p.name}" class="max-h-12 max-w-full object-contain" onerror="this.onerror=null; this.src='SK_Junior_logo.jpg'">
        </div>
        <h4 class="text-sm font-bold text-slate-800">${p.name}</h4>
      </div>
      <p class="text-[11px] text-slate-500 mt-2">${p.desc || ''}</p>
    </div>
  `).join("");
}

// --------------------------------------------------------------
// 8. E-SHOP & MODALS
// --------------------------------------------------------------
function initEshopModal() {
  const triggers = document.querySelectorAll(".eshop-trigger");
  const modal = document.getElementById("eshop-modal");
  const closeBtn = document.getElementById("eshop-close-btn");

  triggers.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.remove("hidden");
        document.body.classList.add("overflow-hidden");
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    });
  }
}
