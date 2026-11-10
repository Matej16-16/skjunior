// ==============================================================
// ŠK JUNIOR - JAVASCRIPT PRE VIZUÁLNU ADMINISTRÁCIU (ADMIN-PAGE.JS)
// ==============================================================

let currentData = getClubData();
let activeTeamKey = "a-tim";

// --------------------------------------------------------------
// AUTENTIFIKÁCIA & PRIHLÁSENIE DO ADMINISTRÁCIE
// Meno: admin | Heslo: admin123
// --------------------------------------------------------------
function checkAdminAuth() {
  const isAuth = sessionStorage.getItem("sk_junior_admin_auth") === "true";
  const loginScreen = document.getElementById("admin-login-screen");
  const adminApp = document.getElementById("admin-app");

  if (isAuth) {
    if (loginScreen) loginScreen.classList.add("hidden");
    if (adminApp) adminApp.classList.remove("hidden");
    return true;
  } else {
    if (loginScreen) loginScreen.classList.remove("hidden");
    if (adminApp) adminApp.classList.add("hidden");
    return false;
  }
}

function handleAdminLogin(event) {
  if (event) event.preventDefault();
  const userInput = document.getElementById("login-username");
  const passInput = document.getElementById("login-password");
  const errorBox = document.getElementById("login-error-msg");

  const user = userInput ? userInput.value.trim() : "";
  const pass = passInput ? passInput.value.trim() : "";

  if (user === "admin" && pass === "admin123") {
    sessionStorage.setItem("sk_junior_admin_auth", "true");
    if (errorBox) errorBox.classList.add("hidden");
    checkAdminAuth();
    initAdminData();
  } else {
    if (errorBox) errorBox.classList.remove("hidden");
    if (passInput) {
      passInput.value = "";
      passInput.focus();
    }
  }
}

function logoutAdmin() {
  sessionStorage.removeItem("sk_junior_admin_auth");
  location.reload();
}

function togglePasswordVisibility() {
  const passInput = document.getElementById("login-password");
  const icon = document.getElementById("password-toggle-icon");
  if (!passInput || !icon) return;

  if (passInput.type === "password") {
    passInput.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    passInput.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

function initAdminData() {
  initAdminTabs();
  loadClubInfoForm();
  loadAdminTeamData(activeTeamKey);
  loadMatchesCenterForm();
  renderAdminMatchesList();
  renderAdminArticlesList();
  renderAdminGalleryList();
  renderAdminPartnersList();
  renderAdminManagementList();
  renderAdminHistoryList();
  initImageUploaders();
}

document.addEventListener("DOMContentLoaded", () => {
  if (checkAdminAuth()) {
    initAdminData();
  }
});

// --------------------------------------------------------------
// SPRÁVA NAHRÁVANIA OBRÁZKOV (SÚBORY & NÁHĽADY)
// --------------------------------------------------------------
function setupImageUploader(fileInputId, textInputId, previewBoxId, previewImgId, fileNameId) {
  const fileInput = document.getElementById(fileInputId);
  const textInput = document.getElementById(textInputId);
  const previewBox = document.getElementById(previewBoxId);
  const previewImg = document.getElementById(previewImgId);
  const fileNameSpan = document.getElementById(fileNameId);

  if (!fileInput || !textInput) return;

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Vyberte prosím platný súbor obrázka (PNG, JPG, SVG, WEBP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const dataUrl = loadEvent.target.result;
      textInput.value = dataUrl;
      if (previewImg) previewImg.src = dataUrl;
      if (fileNameSpan) fileNameSpan.textContent = file.name;
      if (previewBox) previewBox.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  });

  textInput.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    if (val && (val.startsWith("http://") || val.startsWith("https://") || val.startsWith("data:image/"))) {
      if (previewImg) previewImg.src = val;
      if (fileNameSpan) fileNameSpan.textContent = "URL obrázka";
      if (previewBox) previewBox.classList.remove("hidden");
    } else if (!val) {
      if (previewBox) previewBox.classList.add("hidden");
    }
  });
}

function clearImageUploader(fileInputId, textInputId, previewBoxId, previewImgId) {
  const fileInput = document.getElementById(fileInputId);
  const textInput = document.getElementById(textInputId);
  const previewBox = document.getElementById(previewBoxId);
  const previewImg = document.getElementById(previewImgId);

  if (fileInput) fileInput.value = "";
  if (textInput) textInput.value = "";
  if (previewImg) previewImg.src = "";
  if (previewBox) previewBox.classList.add("hidden");
}

function clearPartnerLogoInput() {
  clearImageUploader("part-logo-file", "part-logo", "part-logo-preview-box", "part-logo-preview-img");
}

function clearArticleImageInput() {
  clearImageUploader("art-image-file", "art-image", "art-image-preview-box", "art-image-preview-img");
}

function clearGalleryImageInput() {
  clearImageUploader("gal-file", "gal-url", "gal-preview-box", "gal-preview-img");
}

function initImageUploaders() {
  setupImageUploader("part-logo-file", "part-logo", "part-logo-preview-box", "part-logo-preview-img", "part-logo-file-name");
  setupImageUploader("art-image-file", "art-image", "art-image-preview-box", "art-image-preview-img", "art-image-file-name");
  setupImageUploader("gal-file", "gal-url", "gal-preview-box", "gal-preview-img", "gal-file-name");
}

// --------------------------------------------------------------
// 1. PREPÍNANIE ZÁLOŽIEK
// --------------------------------------------------------------
function switchTab(tabId) {
  document.querySelectorAll(".admin-panel").forEach(panel => {
    panel.classList.add("hidden");
  });
  const targetPanel = document.getElementById(`panel-${tabId}`);
  if (targetPanel) {
    targetPanel.classList.remove("hidden");
  }

  document.querySelectorAll("#admin-nav-tabs .nav-tab").forEach(tab => {
    tab.classList.remove("nav-tab-active");
  });
  const targetTab = document.getElementById(`nav-tab-${tabId}`);
  if (targetTab) {
    targetTab.classList.add("nav-tab-active");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initAdminTabs() {
  const hash = window.location.hash.replace("#", "");
  if (hash && document.getElementById(`panel-${hash}`)) {
    switchTab(hash);
  }
}

// --------------------------------------------------------------
// 2. KLUBOVÉ ÚDAJE
// --------------------------------------------------------------
function loadClubInfoForm() {
  const ci = currentData.clubInfo || {};
  const addr = ci.address || {};
  const cont = ci.contact || {};
  const bill = ci.billing || {};
  const soc = ci.socials || {};

  document.getElementById("ci-name").value = ci.name || "ŠK Junior";
  document.getElementById("ci-fullname").value = ci.fullName || "ŠK Junior Ivanka pri Nitre";
  document.getElementById("ci-founded").value = ci.founded || 2020;
  document.getElementById("ci-motto").value = ci.motto || "";

  document.getElementById("ci-street").value = addr.street || "";
  document.getElementById("ci-city").value = addr.city || "";
  document.getElementById("ci-stadium").value = addr.stadium || "";

  document.getElementById("ci-phone").value = cont.phone || "";
  document.getElementById("ci-email").value = cont.email || "";
  document.getElementById("ci-facebook").value = soc.facebook || "";
  document.getElementById("ci-instagram").value = soc.instagram || "";

  document.getElementById("ci-ico").value = bill.ico || "";
  document.getElementById("ci-bank").value = bill.bank || "";
  document.getElementById("ci-iban").value = bill.iban || "";
}

function saveClubInfoForm() {
  if (!currentData.clubInfo) currentData.clubInfo = {};
  if (!currentData.clubInfo.address) currentData.clubInfo.address = {};
  if (!currentData.clubInfo.contact) currentData.clubInfo.contact = {};
  if (!currentData.clubInfo.billing) currentData.clubInfo.billing = {};
  if (!currentData.clubInfo.socials) currentData.clubInfo.socials = {};

  currentData.clubInfo.name = document.getElementById("ci-name").value.trim();
  currentData.clubInfo.fullName = document.getElementById("ci-fullname").value.trim();
  currentData.clubInfo.founded = parseInt(document.getElementById("ci-founded").value) || 2020;
  currentData.clubInfo.motto = document.getElementById("ci-motto").value.trim();

  currentData.clubInfo.address.street = document.getElementById("ci-street").value.trim();
  currentData.clubInfo.address.city = document.getElementById("ci-city").value.trim();
  currentData.clubInfo.address.stadium = document.getElementById("ci-stadium").value.trim();

  currentData.clubInfo.contact.phone = document.getElementById("ci-phone").value.trim();
  currentData.clubInfo.contact.email = document.getElementById("ci-email").value.trim();
  currentData.clubInfo.socials.facebook = document.getElementById("ci-facebook").value.trim();
  currentData.clubInfo.socials.instagram = document.getElementById("ci-instagram").value.trim();

  currentData.clubInfo.billing.ico = document.getElementById("ci-ico").value.trim();
  currentData.clubInfo.billing.bank = document.getElementById("ci-bank").value.trim();
  currentData.clubInfo.billing.iban = document.getElementById("ci-iban").value.trim();

  saveClubData(currentData);
  alert("Klubové údaje a kontakty boli úspešne uložené a okamžite sa prejavili na webovej stránke!");
}

// --------------------------------------------------------------
// 3. TÍMY & FUTBALNET PÁROVANIE & SÚPISKY
// --------------------------------------------------------------
function loadAdminTeamData(teamKey) {
  activeTeamKey = teamKey;
  const team = currentData.teams[teamKey];
  if (!team) return;

  const sp = team.sportnetConfig || {};
  document.getElementById("team-sportnet-url").value = sp.teamUrl || "";
  document.getElementById("team-competition-url").value = sp.competitionUrl || "";

  const linkBtn = document.getElementById("team-futbalnet-link-btn");
  if (linkBtn) linkBtn.href = sp.teamUrl || "https://sportnet.sme.sk/futbalnet/k/sk-junior-ivanka-pri-nitre/";

  const infoBadge = document.getElementById("team-info-badge");
  if (infoBadge) {
    infoBadge.innerText = team.badge || team.name;
    infoBadge.classList.remove("hidden");
  }

  renderAdminTeamTablePreview(team);
  renderAdminTeamMatchesPreview(team);
  renderAdminTeamRoster(team);
}

function saveTeamFutbalnetUrls() {
  const team = currentData.teams[activeTeamKey];
  if (!team) return;
  if (!team.sportnetConfig) team.sportnetConfig = {};

  team.sportnetConfig.teamUrl = document.getElementById("team-sportnet-url").value.trim();
  team.sportnetConfig.competitionUrl = document.getElementById("team-competition-url").value.trim();

  saveClubData(currentData);
  alert(`Futbalnet URL pre kategóriu ${team.name} boli úspešne uložené!`);
}

function parseAndSaveTableForCurrentTeam() {
  const rawText = document.getElementById("team-import-table-text").value.trim();
  if (!rawText) {
    alert("Vložte prosím skopírovaný text tabuľky z Futbalnetu.");
    return;
  }

  const parsed = SportnetService.parseSportnetTableText(rawText);
  if (parsed.length > 0) {
    const team = currentData.teams[activeTeamKey];
    team.table = parsed;
    saveClubData(currentData);
    renderAdminTeamTablePreview(team);
    document.getElementById("team-import-table-text").value = "";
    alert(`Úspech! Z Futbalnetu bolo naformátovaných ${parsed.length} tímov v našom klubovom dizajne pre ${team.name}!`);
  } else {
    alert("Nepodarilo sa rozpoznať tabuľku. Skontrolujte či ste skopírovali celý riadok tabuľky s poradím, tímom, skóre a bodmi.");
  }
}

function parseAndSaveMatchesForCurrentTeam() {
  const rawText = document.getElementById("team-import-matches-text").value.trim();
  if (!rawText) {
    alert("Vložte prosím skopírovaný rozpis zápasov zo Sportnetu.");
    return;
  }

  const parsed = SportnetService.parseSportnetMatchesText(rawText);
  if (parsed.length > 0) {
    const team = currentData.teams[activeTeamKey];
    team.matches = parsed;
    saveClubData(currentData);
    renderAdminTeamMatchesPreview(team);
    document.getElementById("team-import-matches-text").value = "";
    alert(`Úspech! Z Futbalnetu bolo naformátovaných ${parsed.length} zápasov pre kategóriu ${team.name}!`);
  } else {
    alert("Nepodarilo sa rozpoznať zápasy. Skontrolujte formát skopírovaného textu.");
  }
}

function renderAdminTeamMatchesPreview(team) {
  const container = document.getElementById("admin-team-matches-list");
  const countSpan = document.getElementById("admin-team-matches-count");
  if (!container) return;

  const matches = team.matches || [];
  if (countSpan) countSpan.innerText = `${matches.length} zápasov`;

  if (matches.length === 0) {
    container.innerHTML = `<div class="text-center py-6 text-slate-400 text-xs">Pre tento tím zatiaľ nie je nahraný rozpis zápasov. Môžete vložiť viacero zápasov cez import zo Sportnetu vyššie, alebo pridať jednotlivý zápas ručne.</div>`;
    return;
  }

  container.innerHTML = matches.map((m, idx) => `
    <div class="bg-white p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-pink-300 transition">
      <div class="flex items-center gap-2">
        <span class="text-[10px] font-bold uppercase bg-[#0F172A] text-pink-400 px-2 py-0.5 rounded">
          ${m.round || 'Zápas'}
        </span>
        <span class="text-xs text-slate-500 font-medium">
          <i class="fa-regular fa-calendar text-pink-500 mr-1"></i> ${m.date || ''} ${m.time ? `o ${m.time}` : ''}
        </span>
      </div>

      <div class="flex items-center gap-2 font-bold text-xs text-slate-800">
        <span class="${(m.homeTeam || '').toLowerCase().includes('junior') ? 'text-pink-600' : ''}">${m.homeTeam}</span>
        <span class="px-2 py-0.5 bg-slate-100 rounded border border-slate-300 font-black text-pink-600">
          ${m.score ? m.score : 'VS'}
        </span>
        <span class="${(m.awayTeam || '').toLowerCase().includes('junior') ? 'text-pink-600' : ''}">${m.awayTeam}</span>
      </div>

      <div class="flex items-center gap-3">
        <span class="text-[11px] text-slate-500 truncate max-w-[150px]" title="${m.venue || ''}">
          <i class="fa-solid fa-location-dot text-pink-500 mr-1"></i> ${m.venue || 'Futbalové ihrisko'}
        </span>
        <button onclick="deleteMatchFromCurrentTeam(${idx})" class="text-slate-400 hover:text-red-600 p-1.5 transition" title="Zmazať zápas">
          <i class="fa-solid fa-trash-can text-xs"></i>
        </button>
      </div>
    </div>
  `).join("");
}

function addMatchToCurrentTeam() {
  const round = document.getElementById("tm-new-round").value.trim() || "Zápas";
  const date = document.getElementById("tm-new-date").value.trim();
  const time = document.getElementById("tm-new-time").value.trim();
  const homeTeam = document.getElementById("tm-new-home").value.trim();
  const awayTeam = document.getElementById("tm-new-away").value.trim();
  const score = document.getElementById("tm-new-score").value.trim();
  const venue = document.getElementById("tm-new-venue").value.trim();

  if (!homeTeam || !awayTeam) {
    alert("Zadajte prosím domáci aj hosťujúci tím.");
    return;
  }

  const team = currentData.teams[activeTeamKey];
  if (!team.matches) team.matches = [];

  const newMatch = {
    id: "m-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
    round,
    date: date || new Date().toLocaleDateString("sk-SK"),
    time: time || "14:00",
    homeTeam,
    awayTeam,
    score: score || "",
    isHome: homeTeam.toLowerCase().includes("junior") || homeTeam.toLowerCase().includes("ivanka"),
    venue: venue || (homeTeam.toLowerCase().includes("junior") ? "Futbalový areál ŠK Junior" : `Ihrisko ${homeTeam}`),
    status: score && score.includes(":") && !score.includes("-:-") ? "finished" : "scheduled"
  };

  team.matches.push(newMatch);
  saveClubData(currentData);
  renderAdminTeamMatchesPreview(team);

  document.getElementById("tm-new-round").value = "";
  document.getElementById("tm-new-date").value = "";
  document.getElementById("tm-new-time").value = "";
  document.getElementById("tm-new-home").value = "";
  document.getElementById("tm-new-away").value = "";
  document.getElementById("tm-new-score").value = "";
  document.getElementById("tm-new-venue").value = "";

  alert(`Zápas ${homeTeam} vs ${awayTeam} bol úspešne pridaný pre kategóriu ${team.name}!`);
}

function deleteMatchFromCurrentTeam(index) {
  const team = currentData.teams[activeTeamKey];
  if (!team || !team.matches || !team.matches[index]) return;

  const m = team.matches[index];
  if (confirm(`Naozaj chcete vymazať zápas ${m.homeTeam} vs ${m.awayTeam}?`)) {
    team.matches.splice(index, 1);
    saveClubData(currentData);
    renderAdminTeamMatchesPreview(team);
  }
}

function renderAdminTeamTablePreview(team) {
  const container = document.getElementById("admin-team-table-preview");
  if (!container) return;

  const table = team.table || [];
  if (table.length === 0) {
    container.innerHTML = `<tr><td class="p-4 text-center text-slate-400">Pre tento tím zatiaľ nie je nahraná tabuľka. Vložte ju vyššie cez import.</td></tr>`;
    return;
  }

  container.innerHTML = `
    <thead>
      <tr class="bg-[#0F172A] text-white">
        <th class="p-2 text-center">#</th>
        <th class="p-2">Klub</th>
        <th class="p-2 text-center">Z</th>
        <th class="p-2 text-center text-green-400">V</th>
        <th class="p-2 text-center text-amber-400">R</th>
        <th class="p-2 text-center text-red-400">P</th>
        <th class="p-2 text-center">Skóre</th>
        <th class="p-2 text-center text-pink-400 font-bold">Body</th>
      </tr>
    </thead>
    <tbody>
      ${table.map(row => `
        <tr class="border-b border-slate-100 ${row.isCurrent ? 'bg-pink-50 font-bold text-pink-900' : ''}">
          <td class="p-2 text-center">${row.pos}.</td>
          <td class="p-2 flex items-center gap-1.5">
            ${row.isCurrent ? '<i class="fa-solid fa-shield text-pink-600 text-[10px]"></i>' : ''}
            <span>${row.team}</span>
          </td>
          <td class="p-2 text-center text-slate-500">${row.p}</td>
          <td class="p-2 text-center text-green-600 font-semibold">${row.w}</td>
          <td class="p-2 text-center text-amber-600">${row.d}</td>
          <td class="p-2 text-center text-red-600">${row.l}</td>
          <td class="p-2 text-center text-slate-600 font-mono">${row.score}</td>
          <td class="p-2 text-center font-black ${row.isCurrent ? 'text-pink-600' : 'text-slate-800'}">${row.pts}</td>
        </tr>
      `).join("")}
    </tbody>
  `;
}

function renderAdminTeamRoster(team) {
  const container = document.getElementById("admin-roster-list");
  const countSpan = document.getElementById("admin-roster-count");
  if (!container) return;

  const roster = team.roster || [];
  if (countSpan) countSpan.innerText = `${roster.length} hráčov`;

  if (roster.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-6 text-slate-400">Na súpiske zatiaľ nie sú hráči. Pridajte hráča cez formulár vyššie.</div>`;
    return;
  }

  container.innerHTML = roster.map((player, idx) => `
    <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="w-8 h-8 rounded bg-[#0F172A] text-pink-400 font-bold flex items-center justify-center text-xs">
          #${player.number || '-'}
        </span>
        <div>
          <div class="font-bold text-slate-900 text-xs">${player.name}</div>
          <div class="text-[10px] text-slate-500">${player.pos} ${player.year ? `• Nar. ${player.year}` : ''}</div>
        </div>
      </div>
      <button onclick="deletePlayerFromCurrentTeam(${idx})" class="text-slate-400 hover:text-red-600 p-1.5 transition" title="Zmazať hráča">
        <i class="fa-solid fa-trash-can text-xs"></i>
      </button>
    </div>
  `).join("");
}

function addPlayerToCurrentTeam() {
  const number = parseInt(document.getElementById("new-player-number").value) || null;
  const name = document.getElementById("new-player-name").value.trim();
  const pos = document.getElementById("new-player-pos").value;
  const year = parseInt(document.getElementById("new-player-year").value) || null;

  if (!name) {
    alert("Zadajte prosím meno a priezvisko hráča.");
    return;
  }

  const team = currentData.teams[activeTeamKey];
  if (!team.roster) team.roster = [];

  team.roster.push({ number, name, pos, year });
  saveClubData(currentData);
  renderAdminTeamRoster(team);

  document.getElementById("new-player-number").value = "";
  document.getElementById("new-player-name").value = "";
  document.getElementById("new-player-year").value = "";
}

function deletePlayerFromCurrentTeam(index) {
  const team = currentData.teams[activeTeamKey];
  if (!team || !team.roster) return;

  if (confirm(`Naozaj chcete odstrániť hráča ${team.roster[index].name} zo súpisky?`)) {
    team.roster.splice(index, 1);
    saveClubData(currentData);
    renderAdminTeamRoster(team);
  }
}

// --------------------------------------------------------------
// 4. ZÁPASOVÉ CENTRUM & KALENDÁR
// --------------------------------------------------------------
function loadMatchesCenterForm() {
  const lm = currentData.lastMatch || {};
  document.getElementById("lm-comp").value = lm.competition || "";
  document.getElementById("lm-home-team").value = lm.homeTeam || "";
  document.getElementById("lm-home-score").value = lm.homeScore ?? 0;
  document.getElementById("lm-away-team").value = lm.awayTeam || "";
  document.getElementById("lm-away-score").value = lm.awayScore ?? 0;
  document.getElementById("lm-scorers").value = lm.scorers || "";
  document.getElementById("lm-date").value = lm.dateFormatted || "";

  const nm = currentData.nextMatch || {};
  document.getElementById("nm-comp").value = nm.competition || "";
  document.getElementById("nm-home-team").value = nm.homeTeam || "";
  document.getElementById("nm-away-team").value = nm.awayTeam || "";
  document.getElementById("nm-date").value = nm.dateFormatted || "";
  document.getElementById("nm-time").value = nm.time || "";
  document.getElementById("nm-venue").value = nm.venue || "";
}

function saveLastMatchData() {
  if (!currentData.lastMatch) currentData.lastMatch = {};
  currentData.lastMatch.competition = document.getElementById("lm-comp").value.trim();
  currentData.lastMatch.homeTeam = document.getElementById("lm-home-team").value.trim();
  currentData.lastMatch.homeScore = parseInt(document.getElementById("lm-home-score").value) || 0;
  currentData.lastMatch.awayTeam = document.getElementById("lm-away-team").value.trim();
  currentData.lastMatch.awayScore = parseInt(document.getElementById("lm-away-score").value) || 0;
  currentData.lastMatch.scorers = document.getElementById("lm-scorers").value.trim();
  currentData.lastMatch.dateFormatted = document.getElementById("lm-date").value.trim();

  saveClubData(currentData);
  alert("Výsledok posledného zápasu bol úspešne uložený!");
}

function saveNextMatchData() {
  if (!currentData.nextMatch) currentData.nextMatch = {};
  currentData.nextMatch.competition = document.getElementById("nm-comp").value.trim();
  currentData.nextMatch.homeTeam = document.getElementById("nm-home-team").value.trim();
  currentData.nextMatch.awayTeam = document.getElementById("nm-away-team").value.trim();
  currentData.nextMatch.dateFormatted = document.getElementById("nm-date").value.trim();
  currentData.nextMatch.time = document.getElementById("nm-time").value.trim();
  currentData.nextMatch.venue = document.getElementById("nm-venue").value.trim();

  saveClubData(currentData);
  alert("Upútavka najbližšieho zápasu bola úspešne uložená!");
}

function renderAdminMatchesList() {
  const container = document.getElementById("admin-matches-list");
  if (!container) return;

  const matches = currentData.upcomingMatches || [];
  if (matches.length === 0) {
    container.innerHTML = `<div class="text-center py-6 text-slate-400">Žiadne naplánované zápasy v týždennom kalendári.</div>`;
    return;
  }

  container.innerHTML = matches.map((m, idx) => `
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-bold uppercase bg-pink-100 text-pink-600 px-2 py-0.5 rounded">${m.competition}</span>
          <span class="text-xs font-semibold text-slate-500">${m.teamName}</span>
          <span class="text-xs font-bold text-slate-700">• ${m.date} o ${m.time}</span>
        </div>
        <div class="text-sm font-bold text-slate-900">${m.homeTeam} VS ${m.awayTeam}</div>
        <div class="text-xs text-slate-500"><i class="fa-solid fa-location-dot text-pink-500 mr-1"></i> ${m.venue}</div>
      </div>
      <button onclick="deleteMatchFromAdmin(${idx})" class="text-slate-400 hover:text-red-600 p-2" title="Odstrániť zápas">
        <i class="fa-solid fa-trash-can text-sm"></i>
      </button>
    </div>
  `).join("");
}

function deleteMatchFromAdmin(index) {
  if (confirm("Naozaj chcete zmazať tento zápas z kalendára?")) {
    currentData.upcomingMatches.splice(index, 1);
    saveClubData(currentData);
    renderAdminMatchesList();
  }
}

// --------------------------------------------------------------
// 5. AKTUALITY & ČLÁNKY
// --------------------------------------------------------------
function renderAdminArticlesList() {
  const container = document.getElementById("admin-articles-list");
  if (!container) return;

  const articles = currentData.articles || [];
  if (articles.length === 0) {
    container.innerHTML = `<div class="text-center py-8 text-slate-400">Zatiaľ nie sú publikované žiadne články.</div>`;
    return;
  }

  container.innerHTML = articles.map((art, idx) => `
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
      <div class="flex items-center gap-4 min-w-0">
        <img src="${art.image}" alt="${art.title}" class="w-16 h-12 object-cover rounded shrink-0 bg-slate-900" onerror="this.onerror=null; this.src='SK_Junior_logo.jpg'">
        <div class="min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <span class="text-[10px] font-bold uppercase text-pink-600">${art.category}</span>
            <span class="text-xs text-slate-400">• ${art.date}</span>
          </div>
          <h4 class="font-bold text-sm text-slate-900 truncate">${art.title}</h4>
        </div>
      </div>
      <button onclick="deleteArticleFromAdmin(${idx})" class="text-slate-400 hover:text-red-600 p-2 shrink-0" title="Zmazať článok">
        <i class="fa-solid fa-trash-can text-sm"></i>
      </button>
    </div>
  `).join("");
}

function publishArticleFromAdmin() {
  const title = document.getElementById("art-title").value.trim();
  const category = document.getElementById("art-category").value;
  const author = document.getElementById("art-author").value.trim() || "Redakcia ŠK Junior";
  const image = document.getElementById("art-image").value.trim() || "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800";
  const excerpt = document.getElementById("art-excerpt").value.trim();
  const content = document.getElementById("art-content").value.trim();

  if (!title || !excerpt || !content) {
    alert("Vyplňte prosím názov, úvod a obsah článku.");
    return;
  }

  const newArticle = {
    id: "art-" + Date.now(),
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    category,
    date: new Date().toISOString().split("T")[0],
    author,
    image,
    excerpt,
    content: `<p>${content.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>")}</p>`
  };

  if (!currentData.articles) currentData.articles = [];
  currentData.articles.unshift(newArticle);

  saveClubData(currentData);
  renderAdminArticlesList();

  document.getElementById("art-title").value = "";
  document.getElementById("art-excerpt").value = "";
  document.getElementById("art-content").value = "";
  clearArticleImageInput();
  alert("Článok bol úspešne publikovaný a je okamžite viditeľný na webe!");
}

function deleteArticleFromAdmin(index) {
  if (confirm("Naozaj chcete zmazať tento článok?")) {
    currentData.articles.splice(index, 1);
    saveClubData(currentData);
    renderAdminArticlesList();
  }
}

// --------------------------------------------------------------
// 6. FOTOGALÉRIA
// --------------------------------------------------------------
function renderAdminGalleryList() {
  const container = document.getElementById("admin-gallery-list");
  if (!container) return;

  const gallery = currentData.gallery || [];
  container.innerHTML = gallery.map((item, idx) => `
    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm relative group">
      <img src="${item.url}" alt="${item.title}" class="w-full h-36 object-cover" onerror="this.onerror=null; this.src='SK_Junior_logo.jpg'">
      <div class="p-3">
        <span class="text-[10px] font-bold text-pink-600 uppercase">${item.category}</span>
        <h5 class="font-bold text-xs text-slate-800 truncate">${item.title}</h5>
      </div>
      <button onclick="deletePhotoFromAdmin(${idx})" class="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center transition" title="Zmazať fotku">
        <i class="fa-solid fa-trash-can text-xs"></i>
      </button>
    </div>
  `).join("");
}

function addPhotoFromAdmin() {
  const title = document.getElementById("gal-title").value.trim();
  const category = document.getElementById("gal-category").value;
  const url = document.getElementById("gal-url").value.trim();
  const date = document.getElementById("gal-date").value.trim() || "Aktuálne";

  if (!title || !url) {
    alert("Vyplňte prosím názov a URL adresu fotografie.");
    return;
  }

  if (!currentData.gallery) currentData.gallery = [];
  currentData.gallery.unshift({
    id: "gal-" + Date.now(),
    title,
    category,
    url,
    date
  });

  saveClubData(currentData);
  renderAdminGalleryList();

  document.getElementById("gal-title").value = "";
  clearGalleryImageInput();
  alert("Fotografia bola úspešne pridaná do galérie!");
}

function deletePhotoFromAdmin(index) {
  if (confirm("Naozaj chcete odstrániť túto fotografiu?")) {
    currentData.gallery.splice(index, 1);
    saveClubData(currentData);
    renderAdminGalleryList();
  }
}

// --------------------------------------------------------------
// 7. SPONZORI & PARTNERI
// --------------------------------------------------------------
function renderAdminPartnersList() {
  const container = document.getElementById("admin-partners-list");
  if (!container) return;

  const partners = currentData.about?.partners || [];
  container.innerHTML = partners.map((p, idx) => `
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img src="${p.logo}" alt="${p.name}" class="w-16 h-10 object-contain bg-slate-50 p-1 rounded" onerror="this.onerror=null; this.src='SK_Junior_logo.jpg'">
        <div>
          <span class="text-[10px] font-bold text-pink-600 uppercase">${p.tier}</span>
          <h5 class="font-bold text-xs text-slate-800">${p.name}</h5>
        </div>
      </div>
      <button onclick="deletePartnerFromAdmin(${idx})" class="text-slate-400 hover:text-red-600 p-2" title="Odstrániť partnera">
        <i class="fa-solid fa-trash-can text-sm"></i>
      </button>
    </div>
  `).join("");
}

function addPartnerFromAdmin() {
  const name = document.getElementById("part-name").value.trim();
  const tier = document.getElementById("part-tier").value;
  const logo = document.getElementById("part-logo").value.trim() || "SK_Junior_logo.jpg";
  const desc = document.getElementById("part-desc").value.trim();

  if (!name) {
    alert("Zadajte prosím názov partnera.");
    return;
  }

  if (!currentData.about) currentData.about = {};
  if (!currentData.about.partners) currentData.about.partners = [];

  currentData.about.partners.push({ tier, name, logo, desc });
  saveClubData(currentData);
  renderAdminPartnersList();

  document.getElementById("part-name").value = "";
  document.getElementById("part-desc").value = "";
  clearPartnerLogoInput();
  alert("Nový partner bol úspešne pridaný!");
}

function deletePartnerFromAdmin(index) {
  if (confirm("Naozaj chcete zmazať tohto partnera?")) {
    currentData.about.partners.splice(index, 1);
    saveClubData(currentData);
    renderAdminPartnersList();
  }
}

// --------------------------------------------------------------
// 8. MANAŽMENT & HISTÓRIA
// --------------------------------------------------------------
function renderAdminManagementList() {
  const container = document.getElementById("admin-management-list");
  if (!container) return;

  const mgmt = currentData.about?.management || [];
  if (mgmt.length === 0) {
    container.innerHTML = `<div class="text-center py-6 text-slate-400">Zatiaľ nie sú zadaní žiadni členovia vedenia. Pridajte člena cez formulár vyššie.</div>`;
    return;
  }

  container.innerHTML = mgmt.map((m, idx) => `
    <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 relative group space-y-3">
      <div class="flex items-center justify-between pb-2 border-b border-slate-200">
        <span class="text-xs font-bold text-pink-600 uppercase flex items-center gap-1.5">
          <i class="fa-solid fa-user-tie"></i> Funkcionár #${idx + 1}
        </span>
        <button onclick="deleteMgmtMemberFromAdmin(${idx})" class="text-slate-400 hover:text-red-600 p-1 transition" title="Odstrániť člena">
          <i class="fa-solid fa-trash-can text-sm"></i> Zmazať
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label class="block text-[10px] font-bold text-slate-500 mb-1">Meno a priezvisko</label>
          <input type="text" value="${m.name || ''}" onchange="updateMgmtMember(${idx}, 'name', this.value)" class="w-full bg-white border border-slate-300 rounded p-1.5 text-xs font-bold">
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-500 mb-1">Rola / Funkcia</label>
          <input type="text" value="${m.role || ''}" onchange="updateMgmtMember(${idx}, 'role', this.value)" class="w-full bg-white border border-slate-300 rounded p-1.5 text-xs font-semibold">
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-500 mb-1">Telefón</label>
          <input type="text" value="${m.phone || ''}" onchange="updateMgmtMember(${idx}, 'phone', this.value)" class="w-full bg-white border border-slate-300 rounded p-1.5 text-xs">
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-500 mb-1">Email</label>
          <input type="email" value="${m.email || ''}" onchange="updateMgmtMember(${idx}, 'email', this.value)" class="w-full bg-white border border-slate-300 rounded p-1.5 text-xs">
        </div>
      </div>
      <div>
        <label class="block text-[10px] font-bold text-slate-500 mb-1">Pôsobnosť / Bio</label>
        <input type="text" value="${m.bio || ''}" onchange="updateMgmtMember(${idx}, 'bio', this.value)" class="w-full bg-white border border-slate-300 rounded p-1.5 text-xs" placeholder="Popis pôsobnosti...">
      </div>
    </div>
  `).join("");
}

function addMgmtMemberFromAdmin() {
  const name = document.getElementById("mgmt-new-name").value.trim();
  const role = document.getElementById("mgmt-new-role").value.trim();
  const phone = document.getElementById("mgmt-new-phone").value.trim();
  const email = document.getElementById("mgmt-new-email").value.trim();
  const bio = document.getElementById("mgmt-new-bio").value.trim();

  if (!name || !role) {
    alert("Vyplňte prosím meno a rolu člena vedenia.");
    return;
  }

  if (!currentData.about) currentData.about = {};
  if (!currentData.about.management) currentData.about.management = [];

  currentData.about.management.push({ name, role, phone, email, bio });
  saveClubData(currentData);
  renderAdminManagementList();

  document.getElementById("mgmt-new-name").value = "";
  document.getElementById("mgmt-new-role").value = "";
  document.getElementById("mgmt-new-phone").value = "";
  document.getElementById("mgmt-new-email").value = "";
  document.getElementById("mgmt-new-bio").value = "";
  alert(`Nový člen vedenia (${name}) bol úspešne pridaný!`);
}

function deleteMgmtMemberFromAdmin(index) {
  const member = currentData.about?.management?.[index];
  const name = member ? member.name : "tohto člena";
  if (confirm(`Naozaj chcete odstrániť ${name} z vedenia klubu?`)) {
    currentData.about.management.splice(index, 1);
    saveClubData(currentData);
    renderAdminManagementList();
  }
}

function updateMgmtMember(index, field, value) {
  if (currentData.about?.management?.[index]) {
    currentData.about.management[index][field] = value.trim();
    saveClubData(currentData);
  }
}

function renderAdminHistoryList() {
  const container = document.getElementById("admin-history-list");
  if (!container) return;

  const history = currentData.about?.historyTimeline || [];
  if (history.length === 0) {
    container.innerHTML = `<div class="text-center py-6 text-slate-400">Zatiaľ nie sú zaznamenané žiadne míľniky histórie. Pridajte míľnik cez formulár vyššie.</div>`;
    return;
  }

  container.innerHTML = history.map((item, idx) => `
    <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 relative group space-y-2">
      <div class="flex items-center justify-between pb-2 border-b border-slate-200">
        <span class="text-xs font-bold text-pink-600 uppercase flex items-center gap-1.5">
          <i class="fa-solid fa-flag"></i> Míľnik #${idx + 1}
        </span>
        <button onclick="deleteHistoryItemFromAdmin(${idx})" class="text-slate-400 hover:text-red-600 p-1 transition" title="Odstrániť míľnik">
          <i class="fa-solid fa-trash-can text-sm"></i> Zmazať
        </button>
      </div>
      <div class="flex flex-col sm:flex-row items-start gap-3">
        <div class="w-full sm:w-28 shrink-0">
          <label class="block text-[10px] font-bold text-slate-500 mb-1">Rok</label>
          <input type="text" value="${item.year}" onchange="updateHistoryItem(${idx}, 'year', this.value)" class="w-full bg-white border border-slate-300 rounded p-1.5 text-xs font-bold text-center">
        </div>
        <div class="w-full flex-grow">
          <label class="block text-[10px] font-bold text-slate-500 mb-1">Názov udalosti</label>
          <input type="text" value="${item.title}" onchange="updateHistoryItem(${idx}, 'title', this.value)" class="w-full bg-white border border-slate-300 rounded p-1.5 text-xs font-bold">
        </div>
      </div>
      <div>
        <label class="block text-[10px] font-bold text-slate-500 mb-1">Podrobný popis míľnika</label>
        <textarea onchange="updateHistoryItem(${idx}, 'text', this.value)" class="w-full bg-white border border-slate-300 rounded p-1.5 text-xs" rows="2">${item.text}</textarea>
      </div>
    </div>
  `).join("");
}

function addHistoryItemFromAdmin() {
  const year = document.getElementById("hist-new-year").value.trim();
  const title = document.getElementById("hist-new-title").value.trim();
  const text = document.getElementById("hist-new-text").value.trim();

  if (!year || !title || !text) {
    alert("Vyplňte prosím rok, názov a popis míľnika.");
    return;
  }

  if (!currentData.about) currentData.about = {};
  if (!currentData.about.historyTimeline) currentData.about.historyTimeline = [];

  currentData.about.historyTimeline.push({ year, title, text });
  saveClubData(currentData);
  renderAdminHistoryList();

  document.getElementById("hist-new-year").value = "";
  document.getElementById("hist-new-title").value = "";
  document.getElementById("hist-new-text").value = "";
  alert(`Nový míľnik z roku ${year} bol úspešne pridaný!`);
}

function deleteHistoryItemFromAdmin(index) {
  const item = currentData.about?.historyTimeline?.[index];
  const year = item ? item.year : "tento míľnik";
  if (confirm(`Naozaj chcete odstrániť míľnik z roku ${year}?`)) {
    currentData.about.historyTimeline.splice(index, 1);
    saveClubData(currentData);
    renderAdminHistoryList();
  }
}

function updateHistoryItem(index, field, value) {
  if (currentData.about?.historyTimeline?.[index]) {
    currentData.about.historyTimeline[index][field] = value.trim();
    saveClubData(currentData);
  }
}

// --------------------------------------------------------------
// 9. EXPORT & ZÁLOHOVANIE DATA.JS
// --------------------------------------------------------------
function generateDataJsContent() {
  return `// ==============================================================
// ŠK JUNIOR IVANKA PRI NITRE - DÁTOVÁ ŠTRUKTÚRA KLUBU
// Tento súbor bol automaticky vygenerovaný z Administrácie.
// ==============================================================

const CLUB_DATA = ${JSON.stringify(currentData, null, 2)};

// Pomocná funkcia na načítanie dát
function getClubData() {
  const saved = localStorage.getItem("sk_junior_club_data");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (!parsed.dataVersion || parsed.dataVersion < (CLUB_DATA.dataVersion || 2) || parsed.clubInfo?.city !== CLUB_DATA.clubInfo?.city) {
        const merged = {
          ...CLUB_DATA,
          ...parsed,
          clubInfo: CLUB_DATA.clubInfo,
          dataVersion: CLUB_DATA.dataVersion || 2
        };
        localStorage.setItem("sk_junior_club_data", JSON.stringify(merged));
        return merged;
      }
      return parsed;
    } catch (e) {
      console.warn("Chyba:", e);
    }
  }
  localStorage.setItem("sk_junior_club_data", JSON.stringify(CLUB_DATA));
  return CLUB_DATA;
}

function saveClubData(data) {
  data.dataVersion = (data.dataVersion || 2) + 1;
  localStorage.setItem("sk_junior_club_data", JSON.stringify(data));
}
`;
}

function downloadUpdatedDataJs() {
  const content = generateDataJsContent();
  const blob = new Blob([content], { type: "application/javascript;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.js";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  alert("Súbor data.js bol úspešne stiahnutý! Nahrajte ho do priečinka 'js/' na vašom hostingu pre trvalé uloženie.");
}

function copyDataJsCode() {
  const content = generateDataJsContent();
  navigator.clipboard.writeText(content).then(() => {
    alert("Kompletný kód bol skopírovaný do schránky! Môžete ho vložiť do súboru js/data.js.");
  });
}

function resetToInitialData() {
  if (confirm("Naozaj chcete zosúladiť pamäť prehliadača s aktuálnym súborom js/data.js? Všetky staré alebo neaktuálne záznamy v pamäti sa prepíšu dátami zo súboru data.js.")) {
    localStorage.removeItem("sk_junior_club_data");
    if (typeof forceSyncWithDataJs === "function") {
      forceSyncWithDataJs();
    }
    alert("Pamäť prehliadača bola úspešne zosúladená so súborom data.js!");
    window.location.reload();
  }
}
