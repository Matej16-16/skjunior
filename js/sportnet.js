// ==============================================================
// ŠK JUNIOR - SPORTNET FUTBALNET INTEGRÁCIA (SPORTNET.JS)
// Modul na párovanie, živý import a zobrazovanie dát z Futbalnetu
// v krásnom klubovom formáte ŠK Junior Ivanka pri Nitre.
// ==============================================================

const SportnetService = {
  // 1. Získanie konfigurácie pre tím
  getConfig(teamKey) {
    const data = getClubData();
    return (data.teams[teamKey] && data.teams[teamKey].sportnetConfig) || {};
  },

  // 2. Uloženie konfigurácie pre tím
  saveConfig(teamKey, newConfig) {
    const data = getClubData();
    if (data.teams[teamKey]) {
      data.teams[teamKey].sportnetConfig = {
        ...data.teams[teamKey].sportnetConfig,
        ...newConfig
      };
      saveClubData(data);
      currentData = data;
    }
  },

  // 3. INTELIGENTNÝ PARSER TABUĽKY ZO SPORTNETU
  // Zvládne skopírovaný text z ľubovoľnej tabuľky na sportnet.sme.sk/futbalnet
  parseSportnetTableText(rawText) {
    const lines = rawText.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    const parsedTable = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Formát na jednom riadku: "1. ŠK Junior 11 8 2 1 28:10 26"
      const singleLineMatch = line.match(/^(\d+)\.?\s+([A-Za-zÀ-ž0-9\s\.\-]+?)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+:\d+)\s+(\d+)/);
      if (singleLineMatch) {
        const teamName = singleLineMatch[2].trim();
        parsedTable.push({
          pos: parseInt(singleLineMatch[1]),
          team: teamName,
          p: parseInt(singleLineMatch[3]),
          w: parseInt(singleLineMatch[4]),
          d: parseInt(singleLineMatch[5]),
          l: parseInt(singleLineMatch[6]),
          score: singleLineMatch[7],
          pts: parseInt(singleLineMatch[8]),
          isCurrent: teamName.toLowerCase().includes("junior") || teamName.toLowerCase().includes("ivanka")
        });
        continue;
      }

      // Viacriadkový formát (keď prehliadač skopíruje bunky na samostatné riadky)
      if (/^\d+\.?$/.test(line) && i + 7 < lines.length) {
        const pos = parseInt(line.replace(".", ""));
        const team = lines[i + 1];
        const p = parseInt(lines[i + 2]);
        const w = parseInt(lines[i + 3]);
        const d = parseInt(lines[i + 4]);
        const l = parseInt(lines[i + 5]);
        const score = lines[i + 6];
        const pts = parseInt(lines[i + 7]);

        if (!isNaN(p) && !isNaN(pts) && score && score.includes(":")) {
          parsedTable.push({
            pos,
            team,
            p,
            w,
            d,
            l,
            score,
            pts,
            isCurrent: team.toLowerCase().includes("junior") || team.toLowerCase().includes("ivanka")
          });
          i += 7;
        }
      }
    }

    return parsedTable;
  },

  // 4. INTELIGENTNÝ PARSER ZÁPASOV ZO SPORTNETU
  // Zvládne skopírovaný rozpis a výsledky zápasov zo Sportnetu
  parseSportnetMatchesText(rawText) {
    const lines = rawText.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    const parsedMatches = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Formát: "12. kolo | 08.11.2026 14:00 | ŠK Junior - FK Slovan | 2:1"
      // alebo "Dátum Čas Domáci Hostia Skóre"
      const matchLine = line.match(/(?:(\d+\.\s*kolo)\s*[-|•]?\s*)?(\d{1,2}\.\d{1,2}\.?\d{0,4})\s+(\d{1,2}:\d{2})\s+([A-Za-zÀ-ž0-9\s\.\-]+?)\s+(?:-|vs\.?|:)\s+([A-Za-zÀ-ž0-9\s\.\-]+?)(?:\s+(\d+:\d+|\-:\-))?$/i);
      
      if (matchLine) {
        const round = matchLine[1] || "Ligový zápas";
        const date = matchLine[2];
        const time = matchLine[3];
        const homeTeam = matchLine[4].trim();
        const awayTeam = matchLine[5].trim();
        const score = matchLine[6] || "";

        parsedMatches.push({
          id: "m-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
          round,
          date,
          time,
          homeTeam,
          awayTeam,
          score,
          isHome: homeTeam.toLowerCase().includes("junior") || homeTeam.toLowerCase().includes("ivanka"),
          venue: homeTeam.toLowerCase().includes("junior") ? "Areál ŠK Junior Ivanka pri Nitre" : `Ihrisko ${homeTeam}`,
          status: score && score.includes(":") && !score.includes("-:-") ? "finished" : "scheduled"
        });
      }
    }

    return parsedMatches;
  },

  // 5. Automatické stiahnutie cez CORS Proxy
  async fetchLiveTableFromUrl(url) {
    if (!url || !url.startsWith("http")) {
      throw new Error("Zadajte prosím platnú URL adresu zo sportnet.sme.sk/futbalnet.");
    }

    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error("Nepodarilo sa spojiť so Sportnet serverom.");
    
    const data = await response.json();
    const html = data.contents;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const rows = doc.querySelectorAll("table tr");

    const tableData = [];
    rows.forEach((tr, index) => {
      const cells = Array.from(tr.querySelectorAll("td")).map(td => td.innerText.trim());
      if (cells.length >= 7) {
        const pos = parseInt(cells[0]) || index;
        const team = cells[1];
        const p = parseInt(cells[2]) || 0;
        const w = parseInt(cells[3]) || 0;
        const d = parseInt(cells[4]) || 0;
        const l = parseInt(cells[5]) || 0;
        const score = cells[6] || "-";
        const pts = parseInt(cells[7]) || 0;

        if (team && team.length > 1) {
          tableData.push({
            pos,
            team,
            p,
            w,
            d,
            l,
            score,
            pts,
            isCurrent: team.toLowerCase().includes("junior") || team.toLowerCase().includes("ivanka")
          });
        }
      }
    });

    if (tableData.length > 0) {
      return tableData;
    } else {
      throw new Error("Na zadanej adrese sa nepodarilo nájsť štruktúrovanú tabuľku. Odporúčame využiť 'Rýchly import skopírovanej tabuľky'.");
    }
  }
};
