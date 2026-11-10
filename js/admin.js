// ==============================================================
// ŠK JUNIOR - ADMIN PANEL & SPRÁVA OBSAHU (ADMIN.JS)
// Umožňuje jednoducho priamo vo webovom prehliadači:
// 1. Pridávať nové články (Aktuality)
// 2. Pridávať fotky do galérie
// 3. Pridávať / upravovať zápasy
// 4. Nastavovať prepojenie na Sportnet Futbalnet
// 5. Exportovať / Importovať dáta do data.json alebo skopírovať do js/data.js
// ==============================================================

document.addEventListener("DOMContentLoaded", () => {
  initAdminUI();
});

function initAdminUI() {
  const adminToggleBtn = document.getElementById("admin-toggle-btn");
  const adminModal = document.getElementById("admin-modal");
  const adminCloseBtn = document.getElementById("admin-close-btn");

  if (adminToggleBtn && adminModal) {
    adminToggleBtn.addEventListener("click", () => {
      adminModal.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
      switchAdminTab("articles");
    });
  }

  if (adminCloseBtn && adminModal) {
    adminCloseBtn.addEventListener("click", () => {
      adminModal.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    });
  }

  initArticleForm();
  initGalleryForm();
  initMatchForm();
  initDataExportImport();
}

function switchAdminTab(tab) {
  document.querySelectorAll(".admin-tab-btn").forEach(btn => {
    btn.classList.remove("bg-pink-600", "text-white");
    btn.classList.add("bg-gray-800", "text-gray-400");
  });
  document.querySelectorAll(".admin-tab-panel").forEach(p => p.classList.add("hidden"));

  const activeBtn = document.getElementById(`admin-tab-btn-${tab}`);
  const activePanel = document.getElementById(`admin-tab-${tab}`);

  if (activeBtn) {
    activeBtn.classList.add("bg-pink-600", "text-white");
    activeBtn.classList.remove("bg-gray-800", "text-gray-400");
  }
  if (activePanel) {
    activePanel.classList.remove("hidden");
  }
}

// --------------------------------------------------------------
// 1. FORMULÁR: PRIDAŤ ČLÁNOK (AKTUALITU)
// --------------------------------------------------------------
function initArticleForm() {
  const form = document.getElementById("admin-add-article-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("new-art-title").value.trim();
    const category = document.getElementById("new-art-category").value;
    const author = document.getElementById("new-art-author").value.trim() || "Redakcia ŠK Junior";
    const image = document.getElementById("new-art-image").value.trim() || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800";
    const excerpt = document.getElementById("new-art-excerpt").value.trim();
    const content = document.getElementById("new-art-content").value.trim();

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

    // Refresh v zobrazení
    if (typeof initHomeNewsMagazine === "function") initHomeNewsMagazine();
    if (typeof renderArticles === "function") renderArticles();

    form.reset();
    alert("Nový článok bol úspešne publikovaný a pridaný na web!");
  });
}

// --------------------------------------------------------------
// 2. FORMULÁR: PRIDAŤ FOTKU DO GALÉRIE
// --------------------------------------------------------------
function initGalleryForm() {
  const form = document.getElementById("admin-add-gallery-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("new-gal-title").value.trim();
    const category = document.getElementById("new-gal-category").value;
    const url = document.getElementById("new-gal-url").value.trim();
    const date = document.getElementById("new-gal-date").value.trim() || "Aktuálne";
    const description = document.getElementById("new-gal-desc").value.trim();

    const newPhoto = {
      id: "gal-" + Date.now(),
      title,
      category,
      date,
      url,
      description
    };

    if (!currentData.gallery) currentData.gallery = [];
    currentData.gallery.unshift(newPhoto);

    saveClubData(currentData);
    renderGallery();

    form.reset();
    alert("Nová fotografia bola úspešne pridaná do galérie!");
  });
}

// --------------------------------------------------------------
// 3. FORMULÁR: PRIDAŤ ZÁPAS NA TÝŽDEŇ
// --------------------------------------------------------------
function initMatchForm() {
  const form = document.getElementById("admin-add-match-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const teamKey = document.getElementById("new-match-team").value;
    const teamObj = currentData.teams[teamKey];
    const competition = document.getElementById("new-match-comp").value.trim();
    const opponent = document.getElementById("new-match-opponent").value.trim();
    const isHome = document.getElementById("new-match-ishome").value === "true";
    const date = document.getElementById("new-match-date").value;
    const time = document.getElementById("new-match-time").value;
    const venue = document.getElementById("new-match-venue").value.trim() || (isHome ? "Domáce ihrisko - Areál ŠK Junior" : `Ihrisko súpera (${opponent})`);
    const round = document.getElementById("new-match-round").value.trim() || "Ligové kolo";

    const homeTeam = isHome ? "ŠK Junior" : opponent;
    const awayTeam = isHome ? opponent : "ŠK Junior";
    const homeLogo = isHome ? "SK_Junior_logo.jpg" : "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100";
    const awayLogo = isHome ? "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100" : "SK_Junior_logo.jpg";

    const newMatch = {
      id: "m-" + Date.now(),
      teamKey,
      teamName: teamObj ? teamObj.name : "ŠK Junior",
      category: teamObj ? teamObj.category : "Klub",
      competition,
      homeTeam,
      awayTeam,
      homeLogo,
      awayLogo,
      date,
      time,
      venue,
      isHome,
      round,
      status: "scheduled"
    };

    if (!currentData.upcomingMatches) currentData.upcomingMatches = [];
    currentData.upcomingMatches.push(newMatch);

    saveClubData(currentData);
    if (typeof renderHomeMatchesGrid === "function") renderHomeMatchesGrid();

    form.reset();
    alert("Zápas bol úspešne pridaný do týždenného rozpisu!");
  });
}

// --------------------------------------------------------------
// 4. EXPORT & IMPORT DÁT
// --------------------------------------------------------------
function initDataExportImport() {
  const exportBtn = document.getElementById("admin-export-btn");
  const copyBtn = document.getElementById("admin-copy-js-btn");
  const resetBtn = document.getElementById("admin-reset-btn");
  const fileInput = document.getElementById("admin-import-file");

  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentData, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `sk_junior_data_${new Date().toISOString().split("T")[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const jsCode = `const CLUB_DATA = ${JSON.stringify(currentData, null, 2)};\n\nfunction getClubData() {\n  const saved = localStorage.getItem("sk_junior_club_data");\n  if (saved) {\n    try {\n      return JSON.parse(saved);\n    } catch (e) {\n      console.warn("Chyba:", e);\n    }\n  }\n  return CLUB_DATA;\n}\n\nfunction saveClubData(data) {\n  localStorage.setItem("sk_junior_club_data", JSON.stringify(data));\n}`;
      navigator.clipboard.writeText(jsCode).then(() => {
        alert("Kompletné dáta boli skopírované do schránky! Môžete ich vložiť do súboru js/data.js pre trvalé uloženie.");
      });
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Naozaj chcete resetovať všetky zmeny a vrátiť počiatočné klubové dáta?")) {
        localStorage.removeItem("sk_junior_club_data");
        window.location.reload();
      }
    });
  }

  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const imported = JSON.parse(evt.target.result);
          if (imported.teams && imported.articles) {
            currentData = imported;
            saveClubData(currentData);
            alert("Dáta boli úspešne importované!");
            window.location.reload();
          } else {
            alert("Neplatný formát dátového súboru JSON!");
          }
        } catch (err) {
          alert("Chyba pri spracovaní JSON súboru: " + err.message);
        }
      };
      reader.readAsText(file);
    });
  }
}
