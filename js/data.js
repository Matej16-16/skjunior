// ==============================================================
// ŠK JUNIOR IVANKA PRI NITRE - CENTRÁLNE DÁTOVÉ CENTRUM
// Oficiálne klubové dáta, kontakty, aktuality a kategórie tímov.
// Dizajn podľa moderného vzoru FC Nitra.
// ==============================================================

const CLUB_DATA = {
  // 1. ZÁKLADNÉ ÚDAJE O KLUBE
  clubInfo: {
    fullName: "ŠK Junior Ivanka pri Nitre",
    name: "ŠK Junior Ivanka pri Nitre",
    shortName: "ŠK Junior",
    code: "JUN",
    founded: 2020,
    motto: "Výchova talentov, športový duch a radosť z futbalu",
    address: {
      street: "Novozámocká (Futbalový areál)",
      city: "951 12 Ivanka pri Nitre",
      stadium: "Futbalový areál ŠK Junior, Ivanka pri Nitre",
      capacity: 500
    },
    contact: {
      email: "skjuniorivanka@gmail.com",
      phone: "+421 910 907 795"
    },
    contacts: {
      email: "skjuniorivanka@gmail.com",
      phone: "+421 910 907 795",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com"
    },
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com"
    },
    billing: {
      ico: "53316711",
      dic: "2121345678",
      bank: "Všeobecná úverová banka, a.s.",
      iban: "SK31 0200 0000 0043 6564 7155"
    }
  },

  // 2. SEKCOIA O KLUBE (MANAŽMENT, HISTÓRIA, PARTNERI)
  about: {
    management: [
      { name: "Ing. Marián Varga", role: "Prezident klubu", phone: "+421 910 907 795", email: "prezident@skjuniorivanka.sk", bio: "Zakladateľ a štatutárny zástupca klubu, zodpovedný za strategický rozvoj, infraštruktúru a partnerstvá." },
      { name: "Mgr. Peter Novák", role: "Športový riaditeľ", phone: "+421 905 123 456", email: "sport@skjuniorivanka.sk", bio: "Zodpovedný za športovú koncepciu, metodiku tréningového procesu a prestupy hráčov." },
      { name: "Jozef Kováč", role: "Koordinátor mládeže", phone: "+421 903 987 654", email: "mladez@skjuniorivanka.sk", bio: "Dohliada na fungovanie mládežníckych kategórií U7 až U15 a komunikáciu s rodičmi." },
      { name: "František Tóth", role: "Hospodár & správca areálu", phone: "+421 911 234 567", email: "areal@skjuniorivanka.sk", bio: "Zabezpečuje technický stav ihrísk, zázemie pre zápasy a materiálne vybavenie tímov." }
    ],
    historyTimeline: [
      { year: "2020", title: "Založenie ŠK Junior Ivanka pri Nitre", text: "Vznik futbalového klubu so zameraním na systematickú výchovu mladých talentov a vytvorenie moderného športového zázemia." },
      { year: "2021", title: "Otvorenie futbalovej školičky a prípraviek", text: "Prvý nábor detí a prihlásenie prvých mládežníckych tímov do oficiálnych súťaží ObFZ Nitra." },
      { year: "2023", title: "Postup žiakov do krajskej súťaže ZsFZ", text: "Kategórie U15 a U13 postúpili do III. ligy ZsFZ a zaradili sa medzi popredné mládežnícke akadémie v regióne." },
      { year: "2025", title: "Vytvorenie seniorského tímu a modernizácia areálu", text: "Klub zastrešil kompletnú pyramídu tímov od školičky až po dospelých s cieľom dať odchovancom priestor v domácom klube." }
    ],
    partners: [
      { tier: "Generálny partner", name: "Obec Ivanka pri Nitre", logo: "SK_Junior_logo.jpg", desc: "Podpora športovania detí a rozvoja futbalového areálu" },
      { tier: "Hlavný športový partner", name: "Macron Slovensko", logo: "SK_Junior_logo.jpg", desc: "Oficiálny dodávateľ dresov a športového vybavenia" },
      { tier: "Partner mládeže", name: "Nitriansky samosprávny kraj", logo: "SK_Junior_logo.jpg", desc: "Podpora mládežníckych projektov a turnajov" },
      { tier: "Oficiálny partner", name: "Západoslovenský futbalový zväz", logo: "SK_Junior_logo.jpg", desc: "Zastrešenie krajských majstrovských súťaží" }
    ]
  },

  // 3. POSLEDNÝ ODOHRATÝ ZÁPAS
  lastMatch: {
    competition: "VIII. A liga Macron ObFZ Nitra",
    round: "13. kolo",
    homeTeam: "FC Cabaj-Čápor",
    homeLogo: "https://api.sportnet.online/data/ppo/fc-cabaj-capor.futbalnet.sk/logo",
    homeScore: 4,
    awayTeam: "ŠK Junior Ivanka pri Nitre",
    awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo",
    awayScore: 1,
    dateFormatted: "01.11.2026",
    attendance: "120 divákov",
    scorers: "35' Tkáčik, 43' Lenický, 50' Laca, 66' Kompas - 54' Baník"
  },

  // 4. NAJBLIŽŠÍ ZÁPAS
  nextMatch: {
    competition: "VIII. A liga Macron ObFZ Nitra",
    homeTeam: "MFK Pohranice",
    homeLogo: "https://api.sportnet.online/data/ppo/mfk-pohranice.futbalnet.sk/logo",
    awayTeam: "ŠK Junior Ivanka pri Nitre",
    awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo",
    dateFormatted: "21.03.2027",
    time: "15:00",
    venue: "Ihrisko MFK Pohranice"
  },

  // 5. NAJBLIŽŠIE ZÁPASY VŠETKÝCH KATEGÓRIÍ
  upcomingMatches: [
    {
      id: "m-u15-01",
      teamKey: "u15",
      teamCategory: "Starší žiaci U15",
      teamName: "Starší žiaci U15",
      competition: "III. liga U15 Macron ZsFZ",
      round: "15. kolo",
      homeTeam: "FK Veča",
      homeLogo: "https://api.sportnet.online/data/ppo/fk-veca.futbalnet.sk/logo",
      awayTeam: "ŠK Junior Ivanka pri Nitre",
      awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo",
      score: "",
      date: "15.11.2026",
      time: "09:00",
      venue: "Ihrisko FK Veča",
      isHome: false,
      status: "scheduled"
    },
    {
      id: "m-u13-01",
      teamKey: "u13",
      teamCategory: "Mladší žiaci U13",
      teamName: "Mladší žiaci U13",
      competition: "III. liga U13 Macron ZsFZ",
      round: "15. kolo",
      homeTeam: "FK Veča",
      homeLogo: "https://api.sportnet.online/data/ppo/fk-veca.futbalnet.sk/logo",
      awayTeam: "ŠK Junior Ivanka pri Nitre",
      awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo",
      score: "",
      date: "15.11.2026",
      time: "10:30",
      venue: "Ihrisko FK Veča",
      isHome: false,
      status: "scheduled"
    },
    {
      id: "m-atim-01",
      teamKey: "a-tim",
      teamCategory: "A-tím (Muži)",
      teamName: "A-tím (Muži)",
      competition: "VIII. A liga Macron ObFZ Nitra",
      round: "16. kolo",
      homeTeam: "MFK Pohranice",
      homeLogo: "https://api.sportnet.online/data/ppo/mfk-pohranice.futbalnet.sk/logo",
      awayTeam: "ŠK Junior Ivanka pri Nitre",
      awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo",
      score: "",
      date: "21.03.2027",
      time: "15:00",
      venue: "Ihrisko MFK Pohranice",
      isHome: false,
      status: "scheduled"
    },
    {
      id: "m-u19-01",
      teamKey: "u19",
      teamCategory: "Starší dorast U19",
      teamName: "Starší dorast U19",
      competition: "IV. liga U19 ZsFZ",
      round: "10. kolo",
      homeTeam: "TJ Slovan Čeľadice",
      homeLogo: "https://api.sportnet.online/data/ppo/tj-slovan-celadice.futbalnet.sk/logo",
      awayTeam: "ŠK Junior Ivanka pri Nitre",
      awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo",
      score: "",
      date: "27.03.2027",
      time: "14:30",
      venue: "Ihrisko Čeľadice",
      isHome: false,
      status: "scheduled"
    },
    {
      id: "m-u11-01",
      teamKey: "u11",
      teamCategory: "Prípravka U11",
      teamName: "Prípravka U11",
      competition: "Liga prípraviek U11 ObFZ Nitra",
      round: "11. kolo",
      homeTeam: "OFK Golianovo",
      homeLogo: "https://api.sportnet.online/data/ppo/ofk-golianovo.futbalnet.sk/logo",
      awayTeam: "ŠK Junior Ivanka pri Nitre",
      awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo",
      score: "",
      date: "28.03.2027",
      time: "10:00",
      venue: "Ihrisko Golianovo",
      isHome: false,
      status: "scheduled"
    },
    {
      id: "m-u9-01",
      teamKey: "u9",
      teamCategory: "Predprípravka U9",
      teamName: "Predprípravka U9",
      competition: "Liga prípraviek U09 ObFZ Nitra",
      round: "10. kolo",
      homeTeam: "FK Mojmírovce",
      homeLogo: "https://api.sportnet.online/data/ppo/fk-mojmirovce.futbalnet.sk/logo",
      awayTeam: "ŠK Junior Ivanka pri Nitre",
      awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo",
      score: "",
      date: "04.04.2027",
      time: "10:30",
      venue: "Ihrisko Mojmírovce",
      isHome: false,
      status: "scheduled"
    }
  ],

  // 6. TÍMY KLUBU
  teams: {
    "a-tim": {
      key: "a-tim",
      name: "A-tím (Muži)",
      badge: "Seniori • VIII. liga",
      code: "A-TÍM",
      category: "Dospelí",
      league: "VIII. A liga Macron ObFZ Nitra",
      coach: "Marián Varga",
      description: "Hlavný reprezentant klubu ŠK Junior v kategórii dospelých pod hlavičkou ObFZ Nitra.",
      trainings: "Utorok a Štvrtok o 18:00 (Futbalový areál ŠK Junior Ivanka pri Nitre)",
      color: "#FF3388",
      sportnetSlug: "dospeli-m-a",
      table: [
        { pos: 1, team: "ŠK Rumanová", logo: "https://api.sportnet.online/data/ppo/sk-rumanova.futbalnet.sk/logo", p: 12, w: 9, d: 1, l: 2, score: "55:21", pts: 28, isCurrent: false },
        { pos: 2, team: "OFK 1948 Veľký Lapáš", logo: "https://api.sportnet.online/data/ppo/ofk-1948-velky-lapas.futbalnet.sk/logo", p: 12, w: 9, d: 1, l: 2, score: "33:13", pts: 28, isCurrent: false },
        { pos: 3, team: "FK Veča", logo: "https://api.sportnet.online/data/ppo/fk-veca.futbalnet.sk/logo", p: 12, w: 9, d: 0, l: 3, score: "46:21", pts: 27, isCurrent: false },
        { pos: 4, team: "Futbalový klub FC 31 Jarok", logo: "https://api.sportnet.online/data/ppo/fk-fc-31-jarok.futbalnet.sk/logo", p: 12, w: 8, d: 1, l: 3, score: "37:20", pts: 25, isCurrent: false },
        { pos: 5, team: "OFK Golianovo", logo: "https://api.sportnet.online/data/ppo/ofk-golianovo.futbalnet.sk/logo", p: 12, w: 7, d: 1, l: 4, score: "39:23", pts: 22, isCurrent: false },
        { pos: 6, team: "TJ Družstevník Ivanka pri Nitre", logo: "https://api.sportnet.online/data/ppo/tj-druzstevnik-ivanka-pri-nitre.futbalnet.sk/logo", p: 12, w: 6, d: 3, l: 3, score: "26:22", pts: 21, isCurrent: true },
        { pos: 7, team: "FC Cabaj-Čápor", logo: "https://api.sportnet.online/data/ppo/fc-cabaj-capor.futbalnet.sk/logo", p: 12, w: 5, d: 0, l: 7, score: "27:35", pts: 15, isCurrent: false },
        { pos: 8, team: "OFK Branč", logo: "https://api.sportnet.online/data/ppo/ofk-branc.futbalnet.sk/logo", p: 12, w: 4, d: 2, l: 6, score: "29:29", pts: 14, isCurrent: false },
        { pos: 9, team: "TJ Nové Sady", logo: "https://api.sportnet.online/data/ppo/tj-nove-sady.futbalnet.sk/logo", p: 12, w: 4, d: 2, l: 6, score: "27:39", pts: 14, isCurrent: false },
        { pos: 10, team: "OFK Lužianky", logo: "https://api.sportnet.online/data/ppo/ofk-luzianky.futbalnet.sk/logo", p: 12, w: 4, d: 0, l: 8, score: "23:56", pts: 12, isCurrent: false },
        { pos: 11, team: "FK DYNAMO Trnovec nad Váhom", logo: "https://api.sportnet.online/data/ppo/fk-dynamo-trnovec-nad-vahom.futbalnet.sk/logo", p: 12, w: 3, d: 1, l: 8, score: "19:25", pts: 10, isCurrent: false },
        { pos: 12, team: "ŠK Junior Ivanka pri Nitre", logo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", p: 12, w: 1, d: 5, l: 6, score: "23:35", pts: 8, isCurrent: true },
        { pos: 13, team: "MFK Pohranice", logo: "https://api.sportnet.online/data/ppo/mfk-pohranice.futbalnet.sk/logo", p: 12, w: 0, d: 1, l: 11, score: "7:52", pts: 1, isCurrent: false },
        { pos: 14, team: "FK Nitra", logo: "https://api.sportnet.online/data/ppo/cermansky-fk-nitra.futbalnet.sk/logo", p: 0, w: 0, d: 0, l: 0, score: "0:0", pts: 0, isCurrent: false }
      ],
      matches: [
        { id: "m-a-tim-49ff8af9", round: "14. kolo", date: "21.03.2027", time: "15:00", homeTeam: "MFK Pohranice", homeLogo: "https://api.sportnet.online/data/ppo/mfk-pohranice.futbalnet.sk/logo", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-a-tim-49ff8c4a", round: "15. kolo", date: "28.03.2027", time: "15:00", homeTeam: "ŠK Junior Ivanka pri Nitre", homeLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", awayTeam: "Futbalový klub FC 31 Jarok", awayLogo: "https://api.sportnet.online/data/ppo/fk-fc-31-jarok.futbalnet.sk/logo", score: "", isHome: true, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-a-tim-49ff8e24", round: "16. kolo", date: "04.04.2027", time: "15:30", homeTeam: "OFK 1948 Veľký Lapáš", homeLogo: "https://api.sportnet.online/data/ppo/ofk-1948-velky-lapas.futbalnet.sk/logo", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-a-tim-49ff8eb5", round: "17. kolo", date: "11.04.2027", time: "15:30", homeTeam: "ŠK Junior Ivanka pri Nitre", homeLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", awayTeam: "FK DYNAMO Trnovec nad Váhom", awayLogo: "https://api.sportnet.online/data/ppo/fk-dynamo-trnovec-nad-vahom.futbalnet.sk/logo", score: "", isHome: true, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-a-tim-49ff9214", round: "18. kolo", date: "18.04.2027", time: "16:00", homeTeam: "ŠK Rumanová", homeLogo: "https://api.sportnet.online/data/ppo/sk-rumanova.futbalnet.sk/logo", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-a-tim-49ff9271", round: "19. kolo", date: "25.04.2027", time: "16:00", homeTeam: "ŠK Junior Ivanka pri Nitre", homeLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", awayTeam: "OFK Lužianky", awayLogo: "https://api.sportnet.online/data/ppo/ofk-luzianky.futbalnet.sk/logo", score: "", isHome: true, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-a-tim-49ff9122", round: "20. kolo", date: "02.05.2027", time: "16:30", homeTeam: "TJ Družstevník Ivanka pri Nitre", homeLogo: "https://api.sportnet.online/data/ppo/tj-druzstevnik-ivanka-pri-nitre.futbalnet.sk/logo", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: true, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-a-tim-49ff9462", round: "21. kolo", date: "09.05.2027", time: "16:30", homeTeam: "TJ Nové Sady", homeLogo: "https://api.sportnet.online/data/ppo/tj-nove-sady.futbalnet.sk/logo", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" }
      ],
      roster: [
        { number: 1, name: "Patrik Holka", pos: "Brankár", year: 1996 },
        { number: 4, name: "Lukáš Varga", pos: "Obranca", year: 1998 },
        { number: 5, name: "Michal Kováč", pos: "Obranca", year: 1995 },
        { number: 3, name: "Tomáš Chňapek", pos: "Obranca", year: 2000 },
        { number: 13, name: "Adrián Balla", pos: "Obranca", year: 2001 },
        { number: 6, name: "Dávid Tóth", pos: "Záložník", year: 1999 },
        { number: 8, name: "Samuel Horváth", pos: "Záložník", year: 2002 },
        { number: 10, name: "Matej Franko", pos: "Záložník", year: 1997 },
        { number: 14, name: "Dominik Szabó", pos: "Záložník", year: 2003 },
        { number: 7, name: "Filip Štefanka", pos: "Útočník", year: 1999 },
        { number: 9, name: "Marek Jančo", pos: "Útočník", year: 1998 },
        { number: 11, name: "Adam Kertész", pos: "Útočník", year: 2004 }
      ],
      staff: [
        { role: "Hlavný tréner", name: "Marián Varga", license: "UEFA B licencia", phone: "+421 910 907 795", email: "marian.varga@skjuniorivanka.sk" },
        { role: "Asistent trénera", name: "Peter Novák", license: "UEFA Grassroots C", phone: "+421 905 123 456", email: "peter.novak@skjuniorivanka.sk" },
        { role: "Vedúci mužstva", name: "František Tóth", license: "Funkcionárska licencia SFZ", phone: "+421 911 234 567", email: "spravca@skjuniorivanka.sk" },
        { role: "Klubový lekár / Masér", name: "MUDr. Ján Blaško", license: "Zdravotná spôsobilosť", phone: "+421 903 555 777", email: "zdravotnik@skjuniorivanka.sk" }
      ]
    },

    "u19": {
      key: "u19",
      name: "Starší dorast U19",
      badge: "Dorast • IV. liga",
      code: "U19",
      category: "Dorast U19",
      league: "IV. liga U19 ZsFZ",
      coach: "Peter Novák",
      description: "Generálka pred vstupom do seniorského futbalu. Dôraz na taktickú vyspelosť a fyzickú kondíciu.",
      trainings: "Pondelok, Streda a Piatok o 17:30",
      color: "#FF3388",
      sportnetSlug: "u19-m-a",
      table: [
        { pos: 1, team: "TJ Slovan Čeľadice", logo: "https://api.sportnet.online/data/ppo/tj-slovan-celadice.futbalnet.sk/logo", p: 12, w: 10, d: 2, l: 0, score: "55:12", pts: 32, isCurrent: false },
        { pos: 2, team: "FC Jelenec", logo: "https://api.sportnet.online/data/ppo/fk-fc-jelenec.futbalnet.sk/logo", p: 11, w: 10, d: 1, l: 0, score: "102:10", pts: 31, isCurrent: false },
        { pos: 3, team: "OFK Hosťovce", logo: "https://api.sportnet.online/data/ppo/ofk-hostovce.futbalnet.sk/logo", p: 11, w: 7, d: 0, l: 4, score: "35:26", pts: 21, isCurrent: false },
        { pos: 4, team: "ŠK Nevidzany", logo: "https://api.sportnet.online/data/ppo/sk-nevidzany.futbalnet.sk/logo", p: 11, w: 7, d: 0, l: 4, score: "55:28", pts: 21, isCurrent: false },
        { pos: 5, team: "FK Janíkovce", logo: "https://api.sportnet.online/data/ppo/fk-janikovce.futbalnet.sk/logo", p: 11, w: 3, d: 1, l: 7, score: "17:35", pts: 10, isCurrent: false },
        { pos: 6, team: "ŠK Junior Ivanka pri Nitre", logo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", p: 10, w: 2, d: 0, l: 8, score: "13:44", pts: 6, isCurrent: true },
        { pos: 7, team: "OFK Sľažany", logo: "https://api.sportnet.online/data/ppo/ofk-slazany.futbalnet.sk/logo", p: 11, w: 2, d: 0, l: 9, score: "10:53", pts: 6, isCurrent: false },
        { pos: 8, team: "Obecný športový klub Lehota", logo: "https://api.sportnet.online/data/ppo/osk-lehota.futbalnet.sk/logo", p: 11, w: 1, d: 0, l: 10, score: "16:95", pts: 3, isCurrent: false },
        { pos: 9, team: "ŠK Nitra-Dolné Krškany B", logo: "https://api.sportnet.online/data/ppo/sk-nitra-dolne-krskany.futbalnet.sk/logo", p: 0, w: 0, d: 0, l: 0, score: "0:0", pts: 0, isCurrent: false }
      ],
      matches: [
        { id: "m-u19-03bd2acc", round: "15. kolo", date: "15.11.2026", time: "10:00", homeTeam: "ŠK Junior Ivanka pri Nitre", homeLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", awayTeam: "FC Jelenec", awayLogo: "https://api.sportnet.online/data/ppo/fk-fc-jelenec.futbalnet.sk/logo", score: "", isHome: true, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u19-03bd2b66", round: "16. kolo", date: "20.03.2027", time: "11:30", homeTeam: "FK Janíkovce", homeLogo: "https://api.sportnet.online/data/ppo/fk-janikovce.futbalnet.sk/logo", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u19-03bd2c40", round: "17. kolo", date: "28.03.2027", time: "10:30", homeTeam: "ŠK Junior Ivanka pri Nitre", homeLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", awayTeam: "OFK Hosťovce", awayLogo: "https://api.sportnet.online/data/ppo/ofk-hostovce.futbalnet.sk/logo", score: "", isHome: true, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u19-03bd2cbc", round: "18. kolo", date: "03.04.2027", time: "12:00", homeTeam: "OFK Sľažany", homeLogo: "https://api.sportnet.online/data/ppo/ofk-slazany.futbalnet.sk/logo", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" }
      ],
      roster: [
        { number: 1, name: "Kristián Bakoš", pos: "Brankár", year: 2008 },
        { number: 2, name: "Denis Varga", pos: "Obranca", year: 2007 },
        { number: 4, name: "Jakub Moravčík", pos: "Obranca", year: 2008 },
        { number: 5, name: "Richard Farkaš", pos: "Obranca", year: 2007 },
        { number: 6, name: "Alex Kováč", pos: "Záložník", year: 2008 },
        { number: 8, name: "Martin Szabó", pos: "Záložník", year: 2007 },
        { number: 10, name: "Filip Molnár", pos: "Záložník", year: 2008 },
        { number: 9, name: "Sebastián Tóth", pos: "Útočník", year: 2007 },
        { number: 11, name: "Oliver Chrenko", pos: "Útočník", year: 2008 }
      ],
      staff: [
        { role: "Hlavný tréner", name: "Peter Novák", license: "UEFA B licencia", phone: "+421 905 123 456", email: "peter.novak@skjuniorivanka.sk" },
        { role: "Asistent trénera", name: "Marek Jančo", license: "UEFA Grassroots C", phone: "+421 911 333 444", email: "marek.janco@skjuniorivanka.sk" },
        { role: "Vedúci mužstva", name: "Ladislav Moravčík", license: "Funkcionárska licencia SFZ", phone: "+421 902 444 666", email: "u19@skjuniorivanka.sk" }
      ]
    },

    "u15": {
      key: "u15",
      name: "Starší žiaci U15",
      badge: "Žiaci • III. liga",
      code: "U15",
      category: "Starší žiaci U15",
      league: "III. liga U15 Macron ZsFZ",
      coach: "Jozef Kováč",
      description: "Prechod na veľké ihrisko s plným počtom hráčov, komplexný herný rozvoj v krajskej súťaži.",
      trainings: "Utorok, Streda a Piatok o 16:30",
      color: "#FF3388",
      sportnetSlug: "u15-m-a",
      table: [
        { pos: 1, team: "FC Slovan Hlohovec", logo: "https://api.sportnet.online/data/ppo/fc-slovan-hlohovec.futbalnet.sk/logo", p: 13, w: 10, d: 0, l: 3, score: "50:15", pts: 30, isCurrent: false },
        { pos: 2, team: "ŠK Junior Ivanka pri Nitre", logo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", p: 13, w: 9, d: 2, l: 2, score: "30:15", pts: 29, isCurrent: true },
        { pos: 3, team: "Futbalový klub Holice", logo: "https://api.sportnet.online/data/ppo/tj-druzstevnik-holice-na-ostrove.futbalnet.sk/logo", p: 13, w: 8, d: 3, l: 2, score: "36:13", pts: 27, isCurrent: false },
        { pos: 4, team: "ŠK Šurany", logo: "https://api.sportnet.online/data/ppo/sk-surany.futbalnet.sk/logo", p: 13, w: 7, d: 1, l: 5, score: "34:31", pts: 22, isCurrent: false },
        { pos: 5, team: "SSC FÉNIX Nové Zámky", logo: "https://api.sportnet.online/data/ppo/issf_club_9093/logo", p: 13, w: 7, d: 1, l: 5, score: "47:19", pts: 22, isCurrent: false },
        { pos: 6, team: "FC Slovan Galanta", logo: "https://api.sportnet.online/data/ppo/fc-slovan-galanta.futbalnet.sk/logo", p: 14, w: 6, d: 3, l: 5, score: "31:30", pts: 21, isCurrent: false },
        { pos: 7, team: "FK Slovan Duslo Šaľa", logo: "https://api.sportnet.online/data/ppo/fk-slovan-duslo-sala.futbalnet.sk/logo", p: 13, w: 6, d: 2, l: 5, score: "33:24", pts: 20, isCurrent: false },
        { pos: 8, team: "TJ Dynamo Nová Stráž", logo: "https://api.sportnet.online/data/ppo/tj-dynamo-nova-straz.futbalnet.sk/logo", p: 13, w: 6, d: 2, l: 5, score: "43:48", pts: 20, isCurrent: false },
        { pos: 9, team: "FK Kolárovo", logo: "https://api.sportnet.online/data/ppo/fk-kolarovo.futbalnet.sk/logo", p: 13, w: 6, d: 1, l: 6, score: "52:41", pts: 19, isCurrent: false },
        { pos: 10, team: "MŠO Štúrovo", logo: "https://api.sportnet.online/data/ppo/mso-sturovo.futbalnet.sk/logo", p: 13, w: 5, d: 4, l: 4, score: "26:26", pts: 19, isCurrent: false },
        { pos: 11, team: "FK Veča", logo: "https://api.sportnet.online/data/ppo/fk-veca.futbalnet.sk/logo", p: 13, w: 4, d: 3, l: 6, score: "32:45", pts: 15, isCurrent: false },
        { pos: 12, team: "Malodvornícky FK Malé Dvorníky", logo: "https://api.sportnet.online/data/ppo/malodvornicky-fk-male-dvorniky.futbalnet.sk/logo", p: 13, w: 3, d: 3, l: 7, score: "18:35", pts: 12, isCurrent: false },
        { pos: 13, team: "Futbalový klub Slovan Šahy", logo: "https://api.sportnet.online/data/ppo/fk-slovan-sahy.futbalnet.sk/logo", p: 13, w: 3, d: 0, l: 10, score: "18:47", pts: 9, isCurrent: false },
        { pos: 14, team: "C&P Stars Academy - ZM", logo: "https://api.sportnet.online/data/ppo/issf_club_11675/logo", p: 13, w: 2, d: 2, l: 9, score: "10:34", pts: 8, isCurrent: false },
        { pos: 15, team: "MŠK Želiezovce", logo: "https://api.sportnet.online/data/ppo/msk-zeliezovce.futbalnet.sk/logo", p: 13, w: 2, d: 1, l: 10, score: "13:50", pts: 7, isCurrent: false }
      ],
      matches: [
        { id: "m-u15-f481b0c8", round: "15. kolo", date: "15.11.2026", time: "09:00", homeTeam: "FK Veča", homeLogo: "https://api.sportnet.online/data/ppo/fk-veca.futbalnet.sk/logo", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u15-f481aeaa", round: "16. kolo", date: "06.03.2027", time: "10:00", homeTeam: "TJ Dynamo Nová Stráž", homeLogo: "https://api.sportnet.online/data/ppo/tj-dynamo-nova-straz.futbalnet.sk/logo", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u15-f481b3fa", round: "17. kolo", date: "13.03.2027", time: "10:00", homeTeam: "ŠK Junior Ivanka pri Nitre", homeLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", awayTeam: "Malodvornícky FK Malé Dvorníky", awayLogo: "https://api.sportnet.online/data/ppo/malodvornicky-fk-male-dvorniky.futbalnet.sk/logo", score: "", isHome: true, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u15-f481b0e5", round: "18. kolo", date: "20.03.2027", time: "10:00", homeTeam: "FC Slovan Hlohovec", homeLogo: "https://api.sportnet.online/data/ppo/fc-slovan-hlohovec.futbalnet.sk/logo", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u15-f481b8c9", round: "19. kolo", date: "27.03.2027", time: "10:00", homeTeam: "ŠK Junior Ivanka pri Nitre", homeLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", awayTeam: "FK Slovan Duslo Šaľa", awayLogo: "https://api.sportnet.online/data/ppo/fk-slovan-duslo-sala.futbalnet.sk/logo", score: "", isHome: true, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u15-f481b293", round: "20. kolo", date: "03.04.2027", time: "10:00", homeTeam: "", homeLogo: "/futbalnet/img/club.svg", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u15-f481b49c", round: "21. kolo", date: "10.04.2027", time: "10:00", homeTeam: "SSC FÉNIX Nové Zámky", homeLogo: "https://api.sportnet.online/data/ppo/issf_club_9093/logo", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u15-f481bb31", round: "22. kolo", date: "17.04.2027", time: "10:00", homeTeam: "ŠK Junior Ivanka pri Nitre", homeLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", awayTeam: "MŠO Štúrovo", awayLogo: "https://api.sportnet.online/data/ppo/mso-sturovo.futbalnet.sk/logo", score: "", isHome: true, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" }
      ],
      roster: [
        { number: 1, name: "Adam Švec", pos: "Brankár", year: 2011 },
        { number: 3, name: "Matúš Balla", pos: "Obranca", year: 2011 },
        { number: 4, name: "Lukáš Halás", pos: "Obranca", year: 2012 },
        { number: 5, name: "Tobias Kováč", pos: "Obranca", year: 2011 },
        { number: 6, name: "Martin Tóth", pos: "Záložník", year: 2011 },
        { number: 8, name: "Šimon Horváth", pos: "Záložník", year: 2012 },
        { number: 10, name: "Dávid Chňapek", pos: "Záložník", year: 2011 },
        { number: 7, name: "Timotej Jančo", pos: "Útočník", year: 2011 },
        { number: 9, name: "Maximilian Varga", pos: "Útočník", year: 2012 },
        { number: 11, name: "Samuel Szabó", pos: "Útočník", year: 2011 }
      ],
      staff: [
        { role: "Hlavný tréner", name: "Jozef Kováč", license: "UEFA B licencia", phone: "+421 903 987 654", email: "jozef.kovac@skjuniorivanka.sk" },
        { role: "Asistent trénera", name: "Michal Tóth", license: "UEFA Grassroots C", phone: "+421 915 222 333", email: "michal.toth@skjuniorivanka.sk" },
        { role: "Vedúci mužstva", name: "Ivan Halás", license: "Funkcionárska licencia SFZ", phone: "+421 908 111 222", email: "u15@skjuniorivanka.sk" }
      ]
    },

    "u13": {
      key: "u13",
      name: "Mladší žiaci U13",
      badge: "Žiaci • III. liga",
      code: "U13",
      category: "Mladší žiaci U13",
      league: "III. liga U13 Macron ZsFZ",
      coach: "Michal Tóth",
      description: "Dynamický rozvoj herného sebavedomia, techniky v rýchlosti a tímovej spolupráce.",
      trainings: "Utorok, Štvrtok a Piatok o 16:30",
      color: "#FF3388",
      sportnetSlug: "u13-m-a",
      table: [
        { pos: 1, team: "FK Slovan Duslo Šaľa", logo: "https://api.sportnet.online/data/ppo/fk-slovan-duslo-sala.futbalnet.sk/logo", p: 13, w: 13, d: 0, l: 0, score: "56:9", pts: 39, isCurrent: false },
        { pos: 2, team: "Malodvornícky FK Malé Dvorníky", logo: "https://api.sportnet.online/data/ppo/malodvornicky-fk-male-dvorniky.futbalnet.sk/logo", p: 13, w: 11, d: 1, l: 1, score: "77:11", pts: 34, isCurrent: false },
        { pos: 3, team: "FC Slovan Hlohovec", logo: "https://api.sportnet.online/data/ppo/fc-slovan-hlohovec.futbalnet.sk/logo", p: 13, w: 11, d: 0, l: 2, score: "72:14", pts: 33, isCurrent: false },
        { pos: 4, team: "MŠK Želiezovce", logo: "https://api.sportnet.online/data/ppo/msk-zeliezovce.futbalnet.sk/logo", p: 13, w: 9, d: 2, l: 2, score: "68:23", pts: 29, isCurrent: false },
        { pos: 5, team: "MŠO Štúrovo", logo: "https://api.sportnet.online/data/ppo/mso-sturovo.futbalnet.sk/logo", p: 13, w: 8, d: 1, l: 4, score: "54:18", pts: 25, isCurrent: false },
        { pos: 6, team: "FK Veča", logo: "https://api.sportnet.online/data/ppo/fk-veca.futbalnet.sk/logo", p: 13, w: 8, d: 0, l: 5, score: "36:23", pts: 24, isCurrent: false },
        { pos: 7, team: "Futbalový klub Holice", logo: "https://api.sportnet.online/data/ppo/tj-druzstevnik-holice-na-ostrove.futbalnet.sk/logo", p: 13, w: 7, d: 1, l: 5, score: "37:34", pts: 22, isCurrent: false },
        { pos: 8, team: "FC Slovan Galanta", logo: "https://api.sportnet.online/data/ppo/fc-slovan-galanta.futbalnet.sk/logo", p: 14, w: 6, d: 2, l: 6, score: "43:34", pts: 20, isCurrent: false },
        { pos: 9, team: "TJ Dynamo Nová Stráž", logo: "https://api.sportnet.online/data/ppo/tj-dynamo-nova-straz.futbalnet.sk/logo", p: 13, w: 5, d: 0, l: 8, score: "26:41", pts: 15, isCurrent: false },
        { pos: 10, team: "FK Kolárovo", logo: "https://api.sportnet.online/data/ppo/fk-kolarovo.futbalnet.sk/logo", p: 13, w: 4, d: 2, l: 7, score: "26:36", pts: 14, isCurrent: false },
        { pos: 11, team: "Futbalový klub Slovan Šahy", logo: "https://api.sportnet.online/data/ppo/fk-slovan-sahy.futbalnet.sk/logo", p: 13, w: 4, d: 1, l: 8, score: "36:47", pts: 13, isCurrent: false },
        { pos: 12, team: "ŠK Šurany", logo: "https://api.sportnet.online/data/ppo/sk-surany.futbalnet.sk/logo", p: 13, w: 4, d: 0, l: 9, score: "40:58", pts: 12, isCurrent: false },
        { pos: 13, team: "ŠK Junior Ivanka pri Nitre", logo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", p: 13, w: 2, d: 0, l: 11, score: "17:78", pts: 6, isCurrent: true },
        { pos: 14, team: "C&P Stars Academy - ZM", logo: "https://api.sportnet.online/data/ppo/issf_club_11675/logo", p: 13, w: 1, d: 0, l: 12, score: "15:83", pts: 3, isCurrent: false },
        { pos: 15, team: "SSC FÉNIX Nové Zámky", logo: "https://api.sportnet.online/data/ppo/issf_club_9093/logo", p: 13, w: 0, d: 0, l: 13, score: "3:97", pts: 0, isCurrent: false }
      ],
      matches: [
        { id: "m-u13-f4820ec3", round: "15. kolo", date: "15.11.2026", time: "10:45", homeTeam: "FK Veča", homeLogo: "https://api.sportnet.online/data/ppo/fk-veca.futbalnet.sk/logo", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u13-f48215f8", round: "16. kolo", date: "06.03.2027", time: "11:45", homeTeam: "TJ Dynamo Nová Stráž", homeLogo: "https://api.sportnet.online/data/ppo/tj-dynamo-nova-straz.futbalnet.sk/logo", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u13-f48223dc", round: "17. kolo", date: "13.03.2027", time: "11:45", homeTeam: "ŠK Junior Ivanka pri Nitre", homeLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", awayTeam: "Malodvornícky FK Malé Dvorníky", awayLogo: "https://api.sportnet.online/data/ppo/malodvornicky-fk-male-dvorniky.futbalnet.sk/logo", score: "", isHome: true, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u13-f4822891", round: "18. kolo", date: "20.03.2027", time: "11:45", homeTeam: "FC Slovan Hlohovec", homeLogo: "https://api.sportnet.online/data/ppo/fc-slovan-hlohovec.futbalnet.sk/logo", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u13-f4824064", round: "19. kolo", date: "27.03.2027", time: "11:45", homeTeam: "ŠK Junior Ivanka pri Nitre", homeLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", awayTeam: "FK Slovan Duslo Šaľa", awayLogo: "https://api.sportnet.online/data/ppo/fk-slovan-duslo-sala.futbalnet.sk/logo", score: "", isHome: true, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u13-f48241a3", round: "20. kolo", date: "03.04.2027", time: "11:45", homeTeam: "", homeLogo: "/futbalnet/img/club.svg", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u13-f48254f6", round: "21. kolo", date: "10.04.2027", time: "11:45", homeTeam: "SSC FÉNIX Nové Zámky", homeLogo: "https://api.sportnet.online/data/ppo/issf_club_9093/logo", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u13-f4825783", round: "22. kolo", date: "17.04.2027", time: "11:45", homeTeam: "ŠK Junior Ivanka pri Nitre", homeLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", awayTeam: "MŠO Štúrovo", awayLogo: "https://api.sportnet.online/data/ppo/mso-sturovo.futbalnet.sk/logo", score: "", isHome: true, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" }
      ],
      roster: [
        { number: 1, name: "Tomáš Bielik", pos: "Brankár", year: 2013 },
        { number: 2, name: "Alex Kertész", pos: "Obranca", year: 2013 },
        { number: 4, name: "Filip Moravčík", pos: "Obranca", year: 2014 },
        { number: 7, name: "Jakub Varga", pos: "Záložník", year: 2013 },
        { number: 8, name: "Nikolas Tóth", pos: "Záložník", year: 2013 },
        { number: 10, name: "Richard Farkaš", pos: "Záložník", year: 2014 },
        { number: 9, name: "Samuel Balla", pos: "Útočník", year: 2013 },
        { number: 11, name: "Dávid Halás", pos: "Útočník", year: 2014 }
      ],
      staff: [
        { role: "Hlavný tréner", name: "Michal Tóth", license: "UEFA B licencia", phone: "+421 915 222 333", email: "michal.toth@skjuniorivanka.sk" },
        { role: "Asistent trénera", name: "Tomáš Horváth", license: "UEFA Grassroots C", phone: "+421 904 444 555", email: "tomas.horvath@skjuniorivanka.sk" }
      ]
    },

    "u11": {
      key: "u11",
      name: "Prípravka U11",
      badge: "Prípravka • ObFZ Nitra",
      code: "U11",
      category: "Prípravka U11",
      league: "Liga prípraviek U11 ObFZ Nitra",
      coach: "Tomáš Horváth",
      description: "Hra na menšom ihrisku, vysoká frekvencia kontaktov s loptou, radosť z hry a rozvoj obratnosti.",
      trainings: "Pondelok a Streda o 16:00",
      color: "#FF3388",
      sportnetSlug: "u11-m-a",
      table: [
        { pos: 1, team: "TJ Nové Sady", logo: "https://api.sportnet.online/data/ppo/tj-nove-sady.futbalnet.sk/logo", p: 20, w: 20, d: 0, l: 0, score: "136:7", pts: 60, isCurrent: false },
        { pos: 2, team: "ŠK Veľké Zálužie", logo: "https://api.sportnet.online/data/ppo/sk-velke-zaluzie.futbalnet.sk/logo", p: 20, w: 19, d: 1, l: 0, score: "118:9", pts: 58, isCurrent: false },
        { pos: 3, team: "FK Nitra B", logo: "https://api.sportnet.online/data/ppo/cermansky-fk-nitra.futbalnet.sk/logo", p: 19, w: 17, d: 1, l: 1, score: "112:9", pts: 52, isCurrent: false },
        { pos: 4, team: "FK Vlčany", logo: "https://api.sportnet.online/data/ppo/fk-vlcany.futbalnet.sk/logo", p: 16, w: 15, d: 1, l: 0, score: "136:10", pts: 46, isCurrent: false },
        { pos: 5, team: "FK Janíkovce", logo: "https://api.sportnet.online/data/ppo/fk-janikovce.futbalnet.sk/logo", p: 20, w: 14, d: 4, l: 2, score: "83:17", pts: 46, isCurrent: false },
        { pos: 6, team: "TJ Slovan Čeľadice", logo: "https://api.sportnet.online/data/ppo/tj-slovan-celadice.futbalnet.sk/logo", p: 16, w: 15, d: 0, l: 1, score: "101:8", pts: 45, isCurrent: false },
        { pos: 7, team: "OFK Golianovo", logo: "https://api.sportnet.online/data/ppo/ofk-golianovo.futbalnet.sk/logo", p: 20, w: 14, d: 3, l: 3, score: "59:21", pts: 45, isCurrent: false },
        { pos: 8, team: "ŠK Tesárske Mlyňany", logo: "https://api.sportnet.online/data/ppo/sk-tesarske-mlynany.futbalnet.sk/logo", p: 15, w: 14, d: 0, l: 1, score: "57:14", pts: 42, isCurrent: false },
        { pos: 9, team: "FK Močenok", logo: "https://api.sportnet.online/data/ppo/fk-mocenok.futbalnet.sk/logo", p: 15, w: 12, d: 2, l: 1, score: "67:19", pts: 38, isCurrent: false },
        { pos: 10, team: "FC Neded", logo: "https://api.sportnet.online/data/ppo/fc-neded.futbalnet.sk/logo", p: 16, w: 11, d: 1, l: 4, score: "57:39", pts: 34, isCurrent: false },
        { pos: 11, team: "OFK Branč", logo: "https://api.sportnet.online/data/ppo/ofk-branc.futbalnet.sk/logo", p: 16, w: 10, d: 1, l: 5, score: "53:22", pts: 31, isCurrent: false },
        { pos: 12, team: "OBECNÝ ŠPORTOVÝ KLUB KOLÍŇANY", logo: "https://api.sportnet.online/data/ppo/issf_club_10128/logo", p: 19, w: 10, d: 1, l: 8, score: "52:53", pts: 31, isCurrent: false },
        { pos: 13, team: "ŠK Junior Ivanka pri Nitre", logo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", p: 16, w: 10, d: 0, l: 6, score: "54:26", pts: 30, isCurrent: true },
        { pos: 14, team: "OFK Čakajovce", logo: "https://api.sportnet.online/data/ppo/ofk-cakajovce.futbalnet.sk/logo", p: 12, w: 9, d: 2, l: 1, score: "51:10", pts: 29, isCurrent: false },
        { pos: 15, team: "FK Mojmírovce", logo: "https://api.sportnet.online/data/ppo/fk-mojmirovce.futbalnet.sk/logo", p: 16, w: 9, d: 2, l: 5, score: "57:50", pts: 29, isCurrent: false },
        { pos: 16, team: "TJ AC NOVAN Nová Ves nad Žitavou", logo: "https://api.sportnet.online/data/ppo/tj-ac-novan-nova-ves-nad-zitavou.futbalnet.sk/logo", p: 19, w: 9, d: 2, l: 8, score: "45:32", pts: 29, isCurrent: false },
        { pos: 17, team: "FK Svätoplukovo", logo: "https://api.sportnet.online/data/ppo/tj-druzstevnik-svatoplukovo.futbalnet.sk/logo", p: 16, w: 9, d: 2, l: 5, score: "58:43", pts: 29, isCurrent: false },
        { pos: 18, team: "TJ Štart Nitrianske Hrnčiarovce", logo: "https://api.sportnet.online/data/ppo/tj-start-nitrianske-hrnciarovce.futbalnet.sk/logo", p: 16, w: 8, d: 2, l: 6, score: "47:39", pts: 26, isCurrent: false },
        { pos: 19, team: "ŠK Hájske", logo: "https://api.sportnet.online/data/ppo/sk-hajske.futbalnet.sk/logo", p: 16, w: 7, d: 4, l: 5, score: "35:28", pts: 25, isCurrent: false },
        { pos: 20, team: "FK Veľký Cetín", logo: "https://api.sportnet.online/data/ppo/fk-velky-cetin.futbalnet.sk/logo", p: 16, w: 8, d: 1, l: 7, score: "39:40", pts: 25, isCurrent: false },
        { pos: 21, team: "FC ViOn Zlaté Moravce - Vráble D", logo: "https://api.sportnet.online/data/ppo/fc-vion-zlate-moravce.futbalnet.sk/logo", p: 15, w: 8, d: 0, l: 7, score: "62:30", pts: 24, isCurrent: false },
        { pos: 22, team: "'Združenie FC Výčapy - Opatovce'", logo: "https://api.sportnet.online/data/ppo/zdruzenie-fc-vycapy-opatovce.futbalnet.sk/logo", p: 15, w: 8, d: 0, l: 7, score: "42:49", pts: 24, isCurrent: false },
        { pos: 23, team: "ŠK Báb", logo: "https://api.sportnet.online/data/ppo/sk-bab.futbalnet.sk/logo", p: 15, w: 7, d: 0, l: 8, score: "30:59", pts: 21, isCurrent: false },
        { pos: 24, team: "Futbalový klub FC 31 Jarok", logo: "https://api.sportnet.online/data/ppo/fk-fc-31-jarok.futbalnet.sk/logo", p: 18, w: 6, d: 2, l: 10, score: "27:68", pts: 20, isCurrent: false },
        { pos: 25, team: "Futbalový klub KFC HORNÁ KRÁĽOVÁ", logo: "https://api.sportnet.online/data/ppo/fk-kfc-tibi-horna-kralova.futbalnet.sk/logo", p: 16, w: 6, d: 1, l: 9, score: "45:57", pts: 19, isCurrent: false },
        { pos: 26, team: "FC Jelenec", logo: "https://api.sportnet.online/data/ppo/fk-fc-jelenec.futbalnet.sk/logo", p: 16, w: 6, d: 0, l: 10, score: "39:63", pts: 18, isCurrent: false },
        { pos: 27, team: "FK DYNAMO Trnovec nad Váhom", logo: "https://api.sportnet.online/data/ppo/fk-dynamo-trnovec-nad-vahom.futbalnet.sk/logo", p: 20, w: 5, d: 2, l: 13, score: "34:67", pts: 17, isCurrent: false },
        { pos: 28, team: "FC Čechynce", logo: "https://api.sportnet.online/data/ppo/fc-cechynce.futbalnet.sk/logo", p: 16, w: 5, d: 2, l: 9, score: "27:47", pts: 17, isCurrent: false },
        { pos: 29, team: "TJ Družstevník Rišňovce", logo: "https://api.sportnet.online/data/ppo/tj-druzstevnik-risnovce.futbalnet.sk/logo", p: 20, w: 5, d: 2, l: 13, score: "38:69", pts: 17, isCurrent: false },
        { pos: 30, team: "FC Cabaj-Čápor", logo: "https://api.sportnet.online/data/ppo/fc-cabaj-capor.futbalnet.sk/logo", p: 15, w: 4, d: 3, l: 8, score: "24:33", pts: 15, isCurrent: false },
        { pos: 31, team: "OŠK Beladice", logo: "https://api.sportnet.online/data/ppo/osk-beladice.futbalnet.sk/logo", p: 19, w: 4, d: 0, l: 15, score: "37:92", pts: 12, isCurrent: false },
        { pos: 32, team: "ŠK Nevidzany", logo: "https://api.sportnet.online/data/ppo/sk-nevidzany.futbalnet.sk/logo", p: 12, w: 3, d: 0, l: 9, score: "14:38", pts: 9, isCurrent: false },
        { pos: 33, team: "LATUS B", logo: "https://api.sportnet.online/data/ppo/issf_club_11373/logo", p: 18, w: 3, d: 0, l: 15, score: "25:85", pts: 9, isCurrent: false },
        { pos: 34, team: "TJ Slovan Čeľadice B", logo: "https://api.sportnet.online/data/ppo/tj-slovan-celadice.futbalnet.sk/logo", p: 16, w: 3, d: 0, l: 13, score: "28:92", pts: 9, isCurrent: false },
        { pos: 35, team: "MFK Pohranice", logo: "https://api.sportnet.online/data/ppo/mfk-pohranice.futbalnet.sk/logo", p: 19, w: 2, d: 0, l: 17, score: "25:86", pts: 6, isCurrent: false },
        { pos: 36, team: "'Združenie FC Výčapy - Opatovce' B", logo: "https://api.sportnet.online/data/ppo/zdruzenie-fc-vycapy-opatovce.futbalnet.sk/logo", p: 16, w: 2, d: 0, l: 14, score: "13:80", pts: 6, isCurrent: false },
        { pos: 37, team: "OFK Hosťovce", logo: "https://api.sportnet.online/data/ppo/ofk-hostovce.futbalnet.sk/logo", p: 16, w: 1, d: 2, l: 13, score: "15:88", pts: 5, isCurrent: false },
        { pos: 38, team: "ŠK Nitra-Dolné Krškany", logo: "https://api.sportnet.online/data/ppo/sk-nitra-dolne-krskany.futbalnet.sk/logo", p: 20, w: 1, d: 1, l: 18, score: "19:105", pts: 4, isCurrent: false },
        { pos: 39, team: "OFK Sľažany", logo: "https://api.sportnet.online/data/ppo/ofk-slazany.futbalnet.sk/logo", p: 20, w: 1, d: 1, l: 18, score: "11:103", pts: 4, isCurrent: false },
        { pos: 40, team: "TJ Družstevník Ivanka pri Nitre", logo: "https://api.sportnet.online/data/ppo/tj-druzstevnik-ivanka-pri-nitre.futbalnet.sk/logo", p: 16, w: 1, d: 0, l: 15, score: "9:75", pts: 3, isCurrent: true },
        { pos: 41, team: "OFK Lužianky", logo: "https://api.sportnet.online/data/ppo/ofk-luzianky.futbalnet.sk/logo", p: 0, w: 0, d: 0, l: 0, score: "0:0", pts: 0, isCurrent: false },
        { pos: 42, team: "OFK Čifáre", logo: "https://api.sportnet.online/data/ppo/ofk-cifare.futbalnet.sk/logo", p: 11, w: 0, d: 0, l: 11, score: "7:106", pts: 0, isCurrent: false }
      ],
      matches: [
        { id: "m-u11-85f62868", round: "5. turnaj", date: "20.03.2027", time: "09:00", homeTeam: "ŠK Junior Ivanka pri Nitre", homeLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", awayTeam: "TJ Slovan Čeľadice B", awayLogo: "https://api.sportnet.online/data/ppo/tj-slovan-celadice.futbalnet.sk/logo", score: "", isHome: true, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u11-85f62be3", round: "5. turnaj", date: "20.03.2027", time: "09:00", homeTeam: "OFK Hosťovce", homeLogo: "https://api.sportnet.online/data/ppo/ofk-hostovce.futbalnet.sk/logo", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u11-85f62ecc", round: "5. turnaj", date: "20.03.2027", time: "09:00", homeTeam: "FK Veľký Cetín", homeLogo: "https://api.sportnet.online/data/ppo/fk-velky-cetin.futbalnet.sk/logo", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u11-85f65478", round: "5. turnaj", date: "20.03.2027", time: "09:00", homeTeam: "FK Močenok", homeLogo: "https://api.sportnet.online/data/ppo/fk-mocenok.futbalnet.sk/logo", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" }
      ],
      roster: [
        { number: 1, name: "Matej Kováč", pos: "Brankár", year: 2015 },
        { number: 3, name: "Šimon Szabó", pos: "Hráč v poli", year: 2015 },
        { number: 5, name: "Lucas Tóth", pos: "Hráč v poli", year: 2016 },
        { number: 7, name: "Matúš Varga", pos: "Hráč v poli", year: 2015 },
        { number: 9, name: "Adam Chrenko", pos: "Hráč v poli", year: 2015 },
        { number: 10, name: "Leo Bakoš", pos: "Hráč v poli", year: 2016 }
      ],
      staff: [
        { role: "Hlavný tréner", name: "Tomáš Horváth", license: "UEFA B licencia", phone: "+421 904 444 555", email: "tomas.horvath@skjuniorivanka.sk" },
        { role: "Asistent trénera", name: "Jozef Kováč", license: "UEFA B licencia", phone: "+421 903 987 654", email: "jozef.kovac@skjuniorivanka.sk" }
      ]
    },

    "u9": {
      key: "u9",
      name: "Predprípravka U9",
      badge: "Predprípravka • ObFZ Nitra",
      code: "U9",
      category: "Predprípravka U9",
      league: "Liga prípraviek U09 ObFZ Nitra",
      coach: "Andrej Szabó",
      description: "Základy techniky, vedenie lopty a obchádzanie protihráča formou hravých cvičení.",
      trainings: "Utorok a Štvrtok o 16:00",
      color: "#FF3388",
      sportnetSlug: "u09-m-a",
      table: [
        { pos: 1, team: "OFK Golianovo", logo: "https://api.sportnet.online/data/ppo/ofk-golianovo.futbalnet.sk/logo", p: 18, w: 15, d: 0, l: 3, score: "75:14", pts: 45, isCurrent: false },
        { pos: 2, team: "FC Veľký Kýr", logo: "https://api.sportnet.online/data/ppo/fc-velky-kyr.futbalnet.sk/logo", p: 15, w: 14, d: 0, l: 1, score: "87:14", pts: 42, isCurrent: false },
        { pos: 3, team: "FK Mojmírovce", logo: "https://api.sportnet.online/data/ppo/fk-mojmirovce.futbalnet.sk/logo", p: 14, w: 13, d: 1, l: 0, score: "115:5", pts: 40, isCurrent: false },
        { pos: 4, team: "ŠK Veľké Zálužie", logo: "https://api.sportnet.online/data/ppo/sk-velke-zaluzie.futbalnet.sk/logo", p: 19, w: 12, d: 3, l: 4, score: "87:20", pts: 39, isCurrent: false },
        { pos: 5, team: "TJ Slovan Čeľadice", logo: "https://api.sportnet.online/data/ppo/tj-slovan-celadice.futbalnet.sk/logo", p: 14, w: 13, d: 0, l: 1, score: "67:15", pts: 39, isCurrent: false },
        { pos: 6, team: "ŠK Hájske", logo: "https://api.sportnet.online/data/ppo/sk-hajske.futbalnet.sk/logo", p: 14, w: 12, d: 1, l: 1, score: "67:12", pts: 37, isCurrent: false },
        { pos: 7, team: "FK Svätoplukovo", logo: "https://api.sportnet.online/data/ppo/tj-druzstevnik-svatoplukovo.futbalnet.sk/logo", p: 19, w: 12, d: 0, l: 7, score: "62:40", pts: 36, isCurrent: false },
        { pos: 8, team: "TJ Štart Nitrianske Hrnčiarovce", logo: "https://api.sportnet.online/data/ppo/tj-start-nitrianske-hrnciarovce.futbalnet.sk/logo", p: 14, w: 11, d: 2, l: 1, score: "59:14", pts: 35, isCurrent: false },
        { pos: 9, team: "FC Jelenec", logo: "https://api.sportnet.online/data/ppo/fk-fc-jelenec.futbalnet.sk/logo", p: 14, w: 11, d: 2, l: 1, score: "57:19", pts: 35, isCurrent: false },
        { pos: 10, team: "ŠK Nitra-Dolné Krškany", logo: "https://api.sportnet.online/data/ppo/sk-nitra-dolne-krskany.futbalnet.sk/logo", p: 17, w: 11, d: 1, l: 5, score: "84:41", pts: 34, isCurrent: false },
        { pos: 11, team: "ŠK Junior Ivanka pri Nitre", logo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", p: 13, w: 10, d: 1, l: 2, score: "64:21", pts: 31, isCurrent: true },
        { pos: 12, team: "Futbalový klub FC 31 Jarok", logo: "https://api.sportnet.online/data/ppo/fk-fc-31-jarok.futbalnet.sk/logo", p: 16, w: 10, d: 0, l: 6, score: "38:52", pts: 30, isCurrent: false },
        { pos: 13, team: "FK Janíkovce", logo: "https://api.sportnet.online/data/ppo/fk-janikovce.futbalnet.sk/logo", p: 18, w: 10, d: 0, l: 8, score: "55:32", pts: 30, isCurrent: false },
        { pos: 14, team: "OFK Čakajovce", logo: "https://api.sportnet.online/data/ppo/ofk-cakajovce.futbalnet.sk/logo", p: 15, w: 10, d: 0, l: 5, score: "43:29", pts: 30, isCurrent: false },
        { pos: 15, team: "FC ViOn Zlaté Moravce - Vráble D", logo: "https://api.sportnet.online/data/ppo/fc-vion-zlate-moravce.futbalnet.sk/logo", p: 19, w: 9, d: 1, l: 9, score: "60:52", pts: 28, isCurrent: false },
        { pos: 16, team: "TJ Nové Sady", logo: "https://api.sportnet.online/data/ppo/tj-nove-sady.futbalnet.sk/logo", p: 18, w: 8, d: 2, l: 8, score: "37:40", pts: 26, isCurrent: false },
        { pos: 17, team: "FC Čechynce", logo: "https://api.sportnet.online/data/ppo/fc-cechynce.futbalnet.sk/logo", p: 11, w: 8, d: 1, l: 2, score: "40:10", pts: 25, isCurrent: false },
        { pos: 18, team: "FC Cabaj-Čápor", logo: "https://api.sportnet.online/data/ppo/fc-cabaj-capor.futbalnet.sk/logo", p: 13, w: 7, d: 3, l: 3, score: "33:16", pts: 24, isCurrent: false },
        { pos: 19, team: "FK Močenok", logo: "https://api.sportnet.online/data/ppo/fk-mocenok.futbalnet.sk/logo", p: 14, w: 7, d: 1, l: 6, score: "29:33", pts: 22, isCurrent: false },
        { pos: 20, team: "FK Nitra B", logo: "https://api.sportnet.online/data/ppo/cermansky-fk-nitra.futbalnet.sk/logo", p: 18, w: 7, d: 0, l: 11, score: "44:61", pts: 21, isCurrent: false },
        { pos: 21, team: "Futbalový klub KFC HORNÁ KRÁĽOVÁ", logo: "https://api.sportnet.online/data/ppo/fk-kfc-tibi-horna-kralova.futbalnet.sk/logo", p: 19, w: 6, d: 3, l: 10, score: "29:49", pts: 21, isCurrent: false },
        { pos: 22, team: "TJ Družstevník Rišňovce", logo: "https://api.sportnet.online/data/ppo/tj-druzstevnik-risnovce.futbalnet.sk/logo", p: 18, w: 6, d: 0, l: 12, score: "41:38", pts: 18, isCurrent: false },
        { pos: 23, team: "OFK Sľažany", logo: "https://api.sportnet.online/data/ppo/ofk-slazany.futbalnet.sk/logo", p: 17, w: 5, d: 0, l: 12, score: "28:50", pts: 15, isCurrent: false },
        { pos: 24, team: "BFC - OÚ Dolné Obdokovce", logo: "https://api.sportnet.online/data/ppo/bfc-ou-dolne-obdokovce.futbalnet.sk/logo", p: 14, w: 4, d: 0, l: 10, score: "18:39", pts: 12, isCurrent: false },
        { pos: 25, team: "FK Vlčany", logo: "https://api.sportnet.online/data/ppo/fk-vlcany.futbalnet.sk/logo", p: 14, w: 3, d: 2, l: 9, score: "21:37", pts: 11, isCurrent: false },
        { pos: 26, team: "TJ Družstevník Vráble - Horný Ohaj", logo: "https://api.sportnet.online/data/ppo/tj-druzstevnik-vrable-horny-ohaj.futbalnet.sk/logo", p: 13, w: 3, d: 1, l: 9, score: "11:42", pts: 10, isCurrent: false },
        { pos: 27, team: "FK Slovan Duslo Šaľa B", logo: "https://api.sportnet.online/data/ppo/fk-slovan-duslo-sala.futbalnet.sk/logo", p: 14, w: 3, d: 1, l: 10, score: "26:77", pts: 10, isCurrent: false },
        { pos: 28, team: "'Združenie FC Výčapy - Opatovce'", logo: "https://api.sportnet.online/data/ppo/zdruzenie-fc-vycapy-opatovce.futbalnet.sk/logo", p: 14, w: 1, d: 2, l: 11, score: "5:76", pts: 5, isCurrent: false },
        { pos: 29, team: "TJ Slovan Zbehy", logo: "https://api.sportnet.online/data/ppo/tj-slovan-zbehy.futbalnet.sk/logo", p: 11, w: 1, d: 1, l: 9, score: "14:58", pts: 4, isCurrent: false },
        { pos: 30, team: "OFK Hosťová", logo: "https://api.sportnet.online/data/ppo/ofk-hostova.futbalnet.sk/logo", p: 14, w: 1, d: 1, l: 12, score: "9:55", pts: 4, isCurrent: false },
        { pos: 31, team: "FK DYNAMO Trnovec nad Váhom", logo: "https://api.sportnet.online/data/ppo/fk-dynamo-trnovec-nad-vahom.futbalnet.sk/logo", p: 11, w: 1, d: 0, l: 10, score: "5:87", pts: 3, isCurrent: false },
        { pos: 32, team: "ŠK Magnus (futbal)", logo: "https://api.sportnet.online/data/ppo/sk-magnus-futbal.futbalnet.sk/logo", p: 11, w: 0, d: 1, l: 10, score: "6:65", pts: 1, isCurrent: false },
        { pos: 33, team: "TJ Družstevník Šurianky", logo: "https://api.sportnet.online/data/ppo/tj-druzstevnik-surianky.futbalnet.sk/logo", p: 15, w: 0, d: 1, l: 14, score: "13:109", pts: 1, isCurrent: false },
        { pos: 34, team: "Futbalový klub FK Babindol", logo: "https://api.sportnet.online/data/ppo/issf_club_14227/logo", p: 8, w: 0, d: 0, l: 8, score: "0:24", pts: 0, isCurrent: false },
        { pos: 35, team: "FC Neded", logo: "https://api.sportnet.online/data/ppo/fc-neded.futbalnet.sk/logo", p: 14, w: 0, d: 0, l: 14, score: "3:86", pts: 0, isCurrent: false }
      ],
      matches: [
        { id: "m-u9-85f6ab1c", round: "5. turnaj", date: "20.03.2027", time: "09:00", homeTeam: "ŠK Junior Ivanka pri Nitre", homeLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", awayTeam: "BFC - OÚ Dolné Obdokovce", awayLogo: "https://api.sportnet.online/data/ppo/bfc-ou-dolne-obdokovce.futbalnet.sk/logo", score: "", isHome: true, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u9-85f6b598", round: "5. turnaj", date: "20.03.2027", time: "09:00", homeTeam: "FK Močenok", homeLogo: "https://api.sportnet.online/data/ppo/fk-mocenok.futbalnet.sk/logo", awayTeam: "ŠK Junior Ivanka pri Nitre", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", score: "", isHome: false, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" },
        { id: "m-u9-85f6c480", round: "5. turnaj", date: "20.03.2027", time: "09:00", homeTeam: "ŠK Junior Ivanka pri Nitre", homeLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", awayTeam: "OFK Hosťová", awayLogo: "https://api.sportnet.online/data/ppo/ofk-hostova.futbalnet.sk/logo", score: "", isHome: true, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" }
      ],
      roster: [
        { number: 1, name: "Viktor Halás", pos: "Brankár", year: 2017 },
        { number: 4, name: "Oliver Varga", pos: "Hráč v poli", year: 2017 },
        { number: 6, name: "Tomáš Balla", pos: "Hráč v poli", year: 2018 },
        { number: 8, name: "Dávid Tóth", pos: "Hráč v poli", year: 2017 },
        { number: 10, name: "Filip Kováč", pos: "Hráč v poli", year: 2018 }
      ],
      staff: [
        { role: "Hlavný tréner", name: "Andrej Szabó", license: "UEFA Grassroots C", phone: "+421 911 888 999", email: "andrej.szabo@skjuniorivanka.sk" }
      ]
    },

    "u7": {
      key: "u7",
      name: "Futbalová školička U7",
      badge: "Školička • Zábava a pohyb",
      code: "U7",
      category: "Futbalová školička U7",
      league: "Regionálne miniturnaje a prípravné zápasy",
      coach: "Marek Varga",
      description: "Prvé futbalové kroky pre najmenších chlapcov a dievčatá vo veku 4 až 6 rokov.",
      trainings: "Streda a Piatok o 15:30",
      color: "#FF3388",
      sportnetSlug: "",
      table: [],
      matches: [
        { id: "m-u7-01", round: "Priateľský turnaj", date: "18.04.2027", time: "10:00", homeTeam: "ŠK Junior Ivanka pri Nitre", homeLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo", awayTeam: "FC Nitra U7", awayLogo: "https://api.sportnet.online/data/ppo/issf_club_10103/logo", score: "", isHome: true, venue: "Futbalový areál ŠK Junior Ivanka pri Nitre", status: "scheduled" }
      ],
      roster: [
        { number: 1, name: "Maxim Balla", pos: "Hráč v poli", year: 2019 },
        { number: 2, name: "Sebastián Tóth", pos: "Hráč v poli", year: 2019 },
        { number: 3, name: "Lukáš Varga", pos: "Hráč v poli", year: 2020 },
        { number: 4, name: "Matej Horváth", pos: "Hráč v poli", year: 2020 }
      ],
      staff: [
        { role: "Hlavný tréner", name: "Marek Varga", license: "Pedagogické vzdelanie & Grassroots", phone: "+421 910 111 222", email: "skolicka@skjuniorivanka.sk" }
      ]
    }
  },

  // 7. ČLÁNKY A AKTUALITY
  articles: [
    {
      id: "art-01",
      title: "Zhodnotenie jesennej časti súťaží: Naše tímy bojovali v každom kole",
      summary: "A-tím aj mládežnícke kategórie ukončili jesennú časť sezóny 2026/2027. Pozrite si prehľad výsledkov a plán zimnej prípravy.",
      date: "05.11.2026",
      category: "A-tím",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
      content: "Jesenná časť priniesla množstvo napínavých stretnutí. A-tím dospelých absolvoval náročné ligové derby zápasy vo VIII. A lige ObFZ Nitra. Po jesennej časti sa sústredíme na kvalitnú zimnú prípravu s cieľom zlepšiť herný prejav a bodový zisk v jarnej časti."
    },
    {
      id: "art-02",
      title: "Mládežnícka akadémia ŠK Junior opäť potvrdila kvalitu v III. lige",
      summary: "Kategórie U15 a U13 zvládli náročné kolá krajskej súťaže a udržiavajú sa v popredí tabuľky.",
      date: "02.11.2026",
      category: "Mládež",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
      content: "Starší žiaci U15 pod vedením Jozefa Kováča predviedli dominantnú hru založenú na presnej kombinácii a vysokej aktivite bez lopty. Mladší žiaci U13 nadviazali skvelým tímovým výkonom. Akadémia tak pokračuje v napĺňaní svojej vízie rozvoja moderného a dynamického futbalu."
    },
    {
      id: "art-03",
      title: "Nábor do futbalovej školičky U7 a prípravky prebieha celoročne",
      summary: "Hľadáme nové talenty! Privítame chlapcov a dievčatá ročníkov 2018 až 2021 so záujmom o šport a pohyb.",
      date: "25.10.2026",
      category: "Klub",
      image: "SK_Junior_logo.jpg",
      content: "Futbalový klub ŠK Junior Ivanka pri Nitre srdečne pozýva všetky deti na ukážkové tréningy futbalovej školičky. Naším cieľom nie je len výchova futbalistov, ale predovšetkým budovanie lásky k pohybu, disciplíny a kamarátstiev na celý život. Tréningy prebiehajú pod vedením kvalifikovaných trénerov a pedagógov."
    }
  ],

  // 8. FOTOGALÉRIA
  gallery: [
    { title: "Jesenný turnaj prípraviek U11 a U9", category: "Turnaje", date: "24.10.2026", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800", url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200", caption: "Úspešné vystúpenie našich najmenších nádejí" },
    { title: "Tréningový kemp mládeže v areáli ŠK Junior", category: "Tréningy", date: "15.09.2026", image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800", url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200", caption: "Zlepšovanie herných činností jednotlivca" },
    { title: "Majstrovský zápas dorastu U19", category: "Zápasy", date: "18.10.2026", image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800", url: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200", caption: "Boj o dôležité body v IV. lige ZsFZ" }
  ],

  // 9. SPONZORI A PARTNERI
  sponsors: [
    { name: "Obec Ivanka pri Nitre", logo: "SK_Junior_logo.jpg", tier: "Generálny partner", url: "https://ivankaprinitre.sk" },
    { name: "Macron Slovensko", logo: "SK_Junior_logo.jpg", tier: "Hlavný športový partner", url: "https://macron.sk" },
    { name: "Nitriansky samosprávny kraj", logo: "SK_Junior_logo.jpg", tier: "Partner mládeže", url: "https://unsk.sk" },
    { name: "Západoslovenský futbalový zväz", logo: "SK_Junior_logo.jpg", tier: "Oficiálny partner", url: "https://zsfz.sk" }
  ],

  // 10. METADÁTA PRE AUTOMATICKÚ SYNCHRONIZÁCIU
  dataVersion: 50,
  lastSyncTimestamp: Date.now()
};

// Pomocné funkcie pre prácu s dátami a localStorage
function getClubData() {
  const stored = localStorage.getItem("sk_junior_club_data");
  if (stored) {
    try {
      if (stored.includes("Ĺ ") || stored.includes("ÄŤ") || stored.includes("Ă­") || stored.includes("ÄŚ")) {
        console.warn("Zistené staré poškodené kódovanie v localStorage, načítavam čisté dáta...");
        localStorage.setItem("sk_junior_club_data", JSON.stringify(CLUB_DATA));
        return CLUB_DATA;
      }
      const parsed = JSON.parse(stored);
      if (parsed && (parsed.dataVersion || 0) >= CLUB_DATA.dataVersion) {
        if (!parsed.about) parsed.about = CLUB_DATA.about;
        return parsed;
      }
    } catch (e) {
      console.warn("Chyba načítania údajov z localStorage, použijú sa východzie:", e);
    }
  }
  return CLUB_DATA;
}

function saveClubData(data) {
  data.dataVersion = (data.dataVersion || 35) + 1;
  data.lastSyncTimestamp = Date.now();
  localStorage.setItem("sk_junior_club_data", JSON.stringify(data));
}

function forceSyncWithDataJs() {
  localStorage.setItem("sk_junior_club_data", JSON.stringify(CLUB_DATA));
  return CLUB_DATA;
}