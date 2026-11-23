# Skript na vygenerovanie js/data.js s kompletnou štruktúrou vrátane 'about' (manažment, história, partneri)

$extracted = Get-Content 'extracted_data_full.json' -Raw -Encoding utf8 | ConvertFrom-Json

# Načítanie custom klubových dát (vedenie klubu, sponzori, história, články, galéria)
$customFile = Join-Path $PSScriptRoot "club_custom_data.json"
$custom = $null
if (Test-Path $customFile) {
    try {
        $custom = Get-Content $customFile -Raw -Encoding utf8 | ConvertFrom-Json
        Write-Output "Uspesne nacitany subor club_custom_data.json"
    } catch {
        Write-Warning "Chyba pri citani club_custom_data.json: $_"
    }
}

function ToCleanJson($obj) {
    if ($null -eq $obj) { return "null" }
    return ($obj | ConvertTo-Json -Depth 10) -replace '\\u0026', '&'
}

$clubInfoJs = if ($custom -and $custom.clubInfo) { ToCleanJson $custom.clubInfo } else {
@'
{
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
      facebook: "https://www.facebook.com/people/%C5%A0K-Junior-Ivanka-pri-Nitre/100063708424617/#",
      instagram: "https://www.instagram.com/skjunior_ivanka/",
      youtube: "https://youtube.com"
    },
    socials: {
      facebook: "https://www.facebook.com/people/%C5%A0K-Junior-Ivanka-pri-Nitre/100063708424617/#",
      instagram: "https://www.instagram.com/skjunior_ivanka/"
    },
    billing: {
      ico: "53316711",
      dic: "2121345678",
      bank: "Všeobecná úverová banka, a.s.",
      iban: "SK31 0200 0000 0043 6564 7155"
    }
  }
'@
}

$managementJs = if ($custom -and $custom.management) { ToCleanJson $custom.management } else {
@'
[
    { name: "Ing. Marián Varga", role: "Prezident klubu", phone: "+421 910 907 795", email: "prezident@skjuniorivanka.sk", bio: "Zakladateľ a štatutárny zástupca klubu, zodpovedný za strategický rozvoj, infraštruktúru a partnerstvá." },
    { name: "Mgr. Peter Novák", role: "Športový riaditeľ", phone: "+421 905 123 456", email: "sport@skjuniorivanka.sk", bio: "Zodpovedný za športovú koncepciu, metodiku tréningového procesu a prestupy hráčov." },
    { name: "Jozef Kováč", role: "Koordinátor mládeže", phone: "+421 903 987 654", email: "mladez@skjuniorivanka.sk", bio: "Dohliada na fungovanie mládežníckych kategórií U7 až U15 a komunikáciu s rodičmi." },
    { name: "František Tóth", role: "Hospodár & správca areálu", phone: "+421 911 234 567", email: "areal@skjuniorivanka.sk", bio: "Zabezpečuje technický stav ihrísk, zázemie pre zápasy a materiálne vybavenie tímov." }
  ]
'@
}

$historyJs = if ($custom -and $custom.historyTimeline) { ToCleanJson $custom.historyTimeline } else {
@'
[
    { year: "2020", title: "Založenie ŠK Junior Ivanka pri Nitre", text: "Vznik futbalového klubu so zameraním na systematickú výchovu mladých talentov a vytvorenie moderného športového zázemia." },
    { year: "2021", title: "Otvorenie futbalovej školičky a prípraviek", text: "Prvý nábor detí a prihlásenie prvých mládežníckych tímov do oficiálnych súťaží ObFZ Nitra." },
    { year: "2023", title: "Postup žiakov do krajskej súťaže ZsFZ", text: "Kategórie U15 a U13 postúpili do III. ligy ZsFZ a zaradili sa medzi popredné mládežnícke akadémie v regióne." },
    { year: "2025", title: "Vytvorenie seniorského tímu a modernizácia areálu", text: "Klub zastrešil kompletnú pyramídu tímov od školičky až po dospelých s cieľom dať odchovancom priestor v domácom klube." }
  ]
'@
}

$partnersJs = if ($custom -and $custom.partners) { ToCleanJson $custom.partners } elseif ($custom -and $custom.sponsors) { ToCleanJson $custom.sponsors } else {
@'
[
    { tier: "Generálny partner", name: "Obec Ivanka pri Nitre", logo: "SK_Junior_logo.jpg", desc: "Podpora športovania detí a rozvoja futbalového areálu" },
    { tier: "Hlavný športový partner", name: "Macron Slovensko", logo: "SK_Junior_logo.jpg", desc: "Oficiálny dodávateľ dresov a športového vybavenia" },
    { tier: "Partner mládeže", name: "Nitriansky samosprávny kraj", logo: "SK_Junior_logo.jpg", desc: "Podpora mládežníckych projektov a turnajov" },
    { tier: "Oficiálny partner", name: "Západoslovenský futbalový zväz", logo: "SK_Junior_logo.jpg", desc: "Zastrešenie krajských majstrovských súťaží" }
  ]
'@
}

$sponsorsJs = if ($custom -and $custom.sponsors) { ToCleanJson $custom.sponsors } else {
@'
[
    { name: "Obec Ivanka pri Nitre", logo: "SK_Junior_logo.jpg", tier: "Generálny partner", url: "https://ivankaprinitre.sk" },
    { name: "Macron Slovensko", logo: "SK_Junior_logo.jpg", tier: "Hlavný športový partner", url: "https://macron.sk" },
    { name: "Nitriansky samosprávny kraj", logo: "SK_Junior_logo.jpg", tier: "Partner mládeže", url: "https://unsk.sk" },
    { name: "Západoslovenský futbalový zväz", logo: "SK_Junior_logo.jpg", tier: "Oficiálny partner", url: "https://zsfz.sk" }
  ]
'@
}

$articlesJs = if ($custom -and $custom.articles) { ToCleanJson $custom.articles } else {
@'
[
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
      content: "Starší žiaci U15 pod vedením Jozefa Kováča predviedli dominantnú hru založenú na presnej kombinácií a vysokej aktivite bez lopty. Mladší žiaci U13 nadviazali skvelým tímovým výkonom. Akadémia tak pokračuje v napĺňaní svojej vízie rozvoja moderného a dynamického futbalu."
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
  ]
'@
}

$galleryJs = if ($custom -and $custom.gallery) { ToCleanJson $custom.gallery } else {
@'
[
    {
      id: "alb-01",
      title: "Jesenný turnaj prípraviek U11 a U9 v Ivanke pri Nitre",
      category: "Mládež",
      date: "24.10.2026",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
      description: "Kompletný fotoreport z vydareného turnaja našich nádejí.",
      photos: [
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200",
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200",
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200",
        "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=1200",
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200",
        "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200"
      ]
    },
    {
      id: "alb-02",
      title: "Zápas dorastu U19 a ligové momenty",
      category: "Zápasy",
      date: "15.11.2026",
      image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800",
      description: "Zábery z ligového zápasu a tímových akcií.",
      photos: [
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200",
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200",
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200"
      ]
    },
    {
      id: "alb-03",
      title: "Tréningový kemp a areál ŠK Junior",
      category: "Klub",
      date: "15.09.2026",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
      description: "Tréningy všetkých kategórií a život v areáli klubu.",
      photos: [
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200",
        "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200"
      ]
    }
  ]
'@
}

function FormatTableJs($rows) {
  $sb = New-Object System.Text.StringBuilder
  $sb.AppendLine("      table: [") | Out-Null
  if ($rows) {
    for ($i = 0; $i -lt $rows.Count; $i++) {
      $r = $rows[$i]
      $isCur = if ($r.isCurrent) { "true" } else { "false" }
      $comma = if ($i -lt $rows.Count - 1) { "," } else { "" }
      $teamEsc = $r.team -replace '"', '\"'
      $logoEsc = $r.logo -replace '"', '\"'
      $sb.AppendLine("        { pos: $($r.pos), team: `"$teamEsc`", logo: `"$logoEsc`", p: $($r.p), w: $($r.w), d: $($r.d), l: $($r.l), score: `"$($r.score)`", pts: $($r.pts), isCurrent: $isCur }$comma") | Out-Null
    }
  }
  $sb.Append("      ],") | Out-Null
  return $sb.ToString()
}

function FormatMatchesJs($matches) {
  $sb = New-Object System.Text.StringBuilder
  $sb.AppendLine("      matches: [") | Out-Null
  if ($matches) {
    for ($i = 0; $i -lt $matches.Count; $i++) {
      $m = $matches[$i]
      $isH = if ($m.isHome) { "true" } else { "false" }
      $comma = if ($i -lt $matches.Count - 1) { "," } else { "" }
      $hName = $m.homeTeam -replace '"', '\"'
      $aName = $m.awayTeam -replace '"', '\"'
      $hLogo = $m.homeLogo -replace '"', '\"'
      $aLogo = $m.awayLogo -replace '"', '\"'
      $venue = "Futbalový areál ŠK Junior Ivanka pri Nitre"
      if (-not $isH) {
        $venue = "Ihrisko " + $hName
      }
      $round = $m.round -replace '"', '\"'
      $score = $m.score -replace '"', '\"'
      $sb.AppendLine("        { id: `"$($m.id)`", round: `"$round`", date: `"$($m.date)`", time: `"$($m.time)`", homeTeam: `"$hName`", homeLogo: `"$hLogo`", awayTeam: `"$aName`", awayLogo: `"$aLogo`", score: `"$score`", isHome: $isH, venue: `"$venue`", status: `"$($m.status)`" }$comma") | Out-Null
    }
  }
  $sb.Append("      ]") | Out-Null
  return $sb.ToString()
}

$tableAtim = FormatTableJs $extracted.tables.'a-tim'
$matchesAtim = FormatMatchesJs $extracted.matches.'a-tim'

$tableU19 = FormatTableJs $extracted.tables.'u19'
$matchesU19 = FormatMatchesJs $extracted.matches.'u19'

$tableU15 = FormatTableJs $extracted.tables.'u15'
$matchesU15 = FormatMatchesJs $extracted.matches.'u15'

$tableU13 = FormatTableJs $extracted.tables.'u13'
$matchesU13 = FormatMatchesJs $extracted.matches.'u13'

$tableU11 = FormatTableJs $extracted.tables.'u11'
$matchesU11 = FormatMatchesJs $extracted.matches.'u11'

$tableU9 = FormatTableJs $extracted.tables.'u9'
$matchesU9 = FormatMatchesJs $extracted.matches.'u9'

$code = @"
// ==============================================================
// ŠK JUNIOR IVANKA PRI NITRE - CENTRÁLNE DÁTOVÉ CENTRUM
// Oficiálne klubové dáta, kontakty, aktuality a kategórie tímov.
// Dizajn podľa moderného vzoru FC Nitra.
// ==============================================================

const CLUB_DATA = {
  // 1. ZÁKLADNÉ ÚDAJE O KLUBE
  clubInfo: $clubInfoJs,

  // 2. SEKCOIA O KLUBE (MANAŽMENT, HISTÓRIA, PARTNERI)
  about: {
    management: $managementJs,
    historyTimeline: $historyJs,
    partners: $partnersJs
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

  // 5. NAJBLIŽŠIE A POSLEDNÉ ZÁPASY VŠETKÝCH KATEGÓRIÍ
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
      score: "2 : 1",
      date: "15.11.2026",
      time: "09:00",
      venue: "Ihrisko FK Veča",
      isHome: false,
      status: "finished"
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
      score: "11 : 0",
      date: "15.11.2026",
      time: "10:30",
      venue: "Ihrisko FK Veča",
      isHome: false,
      status: "finished"
    },
    {
      id: "m-u19-1511",
      teamKey: "u19",
      teamCategory: "Starší dorast U19",
      teamName: "Starší dorast U19",
      competition: "IV. liga U19 ZsFZ",
      round: "15. kolo",
      homeTeam: "ŠK Junior Ivanka pri Nitre",
      homeLogo: "https://api.sportnet.online/data/ppo/issf_club_11050/logo",
      awayTeam: "FC Jelenec",
      awayLogo: "https://api.sportnet.online/data/ppo/fc-jelenec.futbalnet.sk/logo",
      score: "0 : 11",
      date: "15.11.2026",
      time: "10:00",
      venue: "Futbalový areál ŠK Junior Ivanka pri Nitre",
      isHome: true,
      status: "finished"
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
$tableAtim
$matchesAtim,
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
$tableU19
$matchesU19,
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
$tableU15
$matchesU15,
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
$tableU13
$matchesU13,
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
$tableU11
$matchesU11,
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
$tableU9
$matchesU9,
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
  articles: $articlesJs,

  // 8. FOTOGALÉRIA (S PODPOROU CELÝCH ALBUMOV A 30+ FOTOGRAFIÍ)
  gallery: $galleryJs,

  // 9. SPONZORI A PARTNERI
  sponsors: $sponsorsJs,

  // 10. METADÁTA PRE AUTOMATICKÚ SYNCHRONIZÁCIU
  dataVersion: 80,
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
      if (parsed) {
        // SMART MERGE: Športové dáta zo Sportnetu berieme vždy z najnovšieho CLUB_DATA,
        // zatiaľ čo klubové úpravy (vedenie, sponzori, články, galéria, súpisky) zachovávame z lokálnych úprav.
        const merged = { ...CLUB_DATA, ...parsed };

        // 1. Zaručíme najnovšie športové dáta (tabuľky, zápasy) pre všetky tímy zo Sportnetu
        if (CLUB_DATA.teams) {
          merged.teams = merged.teams || {};
          for (const key in CLUB_DATA.teams) {
            if (!merged.teams[key]) {
              merged.teams[key] = CLUB_DATA.teams[key];
            } else {
              merged.teams[key].table = CLUB_DATA.teams[key].table;
              merged.teams[key].matches = CLUB_DATA.teams[key].matches;
              merged.teams[key].lastMatch = CLUB_DATA.teams[key].lastMatch;
              merged.teams[key].nextMatch = CLUB_DATA.teams[key].nextMatch;
              if (parsed.teams && parsed.teams[key]) {
                if (parsed.teams[key].roster && parsed.teams[key].roster.length > 0) {
                  merged.teams[key].roster = parsed.teams[key].roster;
                }
                if (parsed.teams[key].staff && parsed.teams[key].staff.length > 0) {
                  merged.teams[key].staff = parsed.teams[key].staff;
                }
              }
            }
          }
        }

        // 2. Widgety zápasov na úvodnej stránke
        if (CLUB_DATA.lastMatch) merged.lastMatch = CLUB_DATA.lastMatch;
        if (CLUB_DATA.nextMatch) merged.nextMatch = CLUB_DATA.nextMatch;
        if (CLUB_DATA.upcomingMatches) merged.upcomingMatches = CLUB_DATA.upcomingMatches;

        // 3. Vedenie klubu, história, partneri a sponzori:
        // Ak má používateľ vlastné úpravy, zachováme ich, inak použijeme CLUB_DATA
        if (parsed.about && parsed.about.management && parsed.about.management.length > 0) {
          merged.about = merged.about || {};
          merged.about.management = parsed.about.management;
        }
        if (parsed.about && parsed.about.historyTimeline && parsed.about.historyTimeline.length > 0) {
          merged.about = merged.about || {};
          merged.about.historyTimeline = parsed.about.historyTimeline;
        }
        if (parsed.about && parsed.about.partners && parsed.about.partners.length > 0) {
          merged.about = merged.about || {};
          merged.about.partners = parsed.about.partners;
        }
        if (parsed.sponsors && parsed.sponsors.length > 0) {
          merged.sponsors = parsed.sponsors;
        }
        if (parsed.articles && parsed.articles.length > 0) {
          merged.articles = parsed.articles;
        }
        if (parsed.gallery && parsed.gallery.length > 0) {
          merged.gallery = parsed.gallery;
        }

        return merged;
      }
    } catch (e) {
      console.warn("Chyba načítania údajov z localStorage, použijú sa východzie:", e);
    }
  }
  return CLUB_DATA;
}

function saveClubData(data) {
  data.dataVersion = (data.dataVersion || 80) + 1;
  data.lastSyncTimestamp = Date.now();
  localStorage.setItem("sk_junior_club_data", JSON.stringify(data));

  // Ak bežíme na webhostingu s PHP, odošleme zmeny na trvalé uloženie do club_custom_data.json na serveri
  try {
    const payload = {
      clubInfo: data.clubInfo,
      management: data.about?.management || [],
      historyTimeline: data.about?.historyTimeline || [],
      partners: data.about?.partners || [],
      sponsors: data.sponsors || [],
      articles: data.articles || [],
      gallery: data.gallery || []
    };
    fetch("api/save_club_content.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(function() {});
  } catch (e) {}
}

function forceSyncWithDataJs() {
  const current = getClubData();
  localStorage.setItem("sk_junior_club_data", JSON.stringify(current));
  return current;
}
"@

$utf8WithBom = New-Object System.Text.UTF8Encoding($true)
[System.IO.File]::WriteAllText("$PSScriptRoot/js/data.js", $code, $utf8WithBom)
Write-Output "js/data.js bol USPESNE prepisany!"
