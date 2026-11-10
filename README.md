# ŠK Junior Ivanka pri Nitre - Oficiálny web & Vizuálna Administrácia

Moderná webová stránka futbalového klubu **ŠK Junior Ivanka pri Nitre** inšpirovaná športovým dizajnom **FC Nitra (fcnitra.sk)** s plnohodnotným **Vizuálnym Adminom** a prepojením na **Sportnet Futbalnet**.

---

## ❓ Prečo sa vám predtým neprejavili zmeny v `js/data.js`?

Prehliadač pri prvom spustení uložil počiatočné dáta do svojej vnútornej pamäte (`localStorage`). Pri ďalších načítaniach potom prednostne čítal túto uloženú pamäť namiesto súboru na disku.

✅ **Tento problém sme natrvalo vyriešili:**
1. V kóde `getClubData()` sme pridali automatickú detekciu verzie a zosúladenie klubových údajov (vaša obec **Ivanka pri Nitre**, Novozámocká, IČO 53316711, telefón +421 910 907 795, e-mail a IBAN sa teraz načítajú okamžite).
2. Vytvorili sme samostatnú vizuálnu stránku **`admin.html`**, kde môžete **všetky zmeny robiť priamo klikaním a písaním vo formulároch bez otvárania akéhokoľvek kódu!**

---

## 🛠️ VIZUÁLNA ADMIN STRÁNKA (`admin.html`)

Otvorte v prehliadači súbor **`admin.html`** (alebo na hlavnej stránke kliknite vpravo dole na tlačidlo **„Vizuálny Admin (/admin)“**).

V administrácii nájdete:
1. **🏢 Klubové údaje & Kontakty:**
   * Názov klubu, rok založenia, motto, areál a adresa.
   * Telefón, hlavný e-mail, Facebook a Instagram.
   * IČO, DIČ, IBAN a názov banky.
   * Kliknutím na *„Uložiť klubové údaje“* sa zmeny ihneď prejavia na webe.
2. **⚽ Tímy & Futbalnet Párovanie:**
   * Prepínanie medzi **A-tímom** a mládežou (**U19, U15, U13, U11, U9, U7**).
   * **Párovanie s Futbalnetom v našom dizajne:**
     * URL odkaz na tím na Futbalnete.
     * URL odkaz na tabuľku súťaže.
     * **Rýchly import skopírovanej tabuľky zo Sportnetu:** Skopírujte myšou riadky tabuľky z Futbalnetu, vložte ich a kliknite na *Preformátovať*. Systém tabuľku okamžite vykreslí v našom klubovom dizajne so zvýraznením ŠK Junior!
     * **Rýchly import rozpisu zápasov:** Skopírujte rozpis zápasov z Futbalnetu a kliknite na *Uložiť rozpis*. Zápasy sa zobrazia v klubovom dizajne.
   * **Hráčska súpiska:** Pridávanie hráčov (číslo dresu, meno, post, ročník) a ich mazanie.
3. **📅 Zápasové centrum:**
   * **Posledný zápas:** Výsledok, skóre, domáci/hostia, strelci gólov, návštevnosť.
   * **Najbližší zápas:** Súper, dátum, čas výkopu, štadión.
   * **Týždenný kalendár zápasov:** Pridávanie a mazanie zápasov pre všetky tímy.
4. **📰 Aktuality a Články:**
   * Písanie a publikovanie nových článkov (názov, kategória, fotka, úvod, text).
   * Prehľad a mazanie publikovaných článkov.
5. **📸 Fotogaléria:**
   * Pridávanie fotografií (názov, kategória, URL fotky, dátum).
   * Prehľad a mazanie fotografií.
6. **🤝 Sponzori a Partneri:**
   * Pridávanie partnerov (Generálny, Hlavný, Technický, Partner mládeže), logo, popis a ich mazanie.
7. **👥 Vedenie klubu:**
   * **Formulár na pridanie nového funkcionára** (Meno a priezvisko, Rola/Funkcia, Telefón, Email, Bio/Pôsobnosť).
   * Prehľad členov vedenia s možnosťou priamej editácie a tlačidlom **Zmazať**.
8. **⏳ História klubu:**
   * **Formulár na pridanie nového míľnika** (Rok, Názov udalosti, Podrobný popis).
   * Časová os míľnikov s možnosťou editácie a tlačidlom **Zmazať**.
9. **💾 Záloha & Uloženie:**
   * Tlačidlo **„Stiahnuť súbor data.js“** – vygeneruje a stiahne aktualizovaný súbor so všetkými vašimi zmenami pre trvalé nahratie na hosting.
   * Tlačidlo **„Zosúladiť s js/data.js (Resetovať pamäť)“** – jedným klikom zosúladí prehliadač s dátami na disku.

---

## ⚽ AKO NAPÁROVAŤ KAŽDÝ TÍM NA FUTBALNET V NAŠOM DIZAJNE?

1. Otvorte profil klubu na [Sportnet Futbalnet – ŠK Junior Ivanka pri Nitre](https://sportnet.sme.sk/futbalnet/k/sk-junior-ivanka-pri-nitre/).
2. Vyberte kategóriu (napr. Dospelí VIII. liga, U19, U15, U13...).
3. V **`admin.html`** prejdite do záložky **„Tímy & Futbalnet“**:
   * Zvoľte požadovaný tím.
   * Vložte URL adresu do poľa *URL adresa ligovej súťaže / tabuľky*.
   * Na stránke Futbalnetu označte myšou tabuľku (Ctrl+C), vložte ju do poľa *Rýchly import skopírovanej tabuľky* a kliknite na **„Preformátovať a uložiť tabuľku do nášho dizajnu“**.
   * Rovnako môžete skopírovať rozpis zápasov a kliknúť na **„Preformátovať a uložiť rozpis zápasov“**.
4. **Výsledok na webe:**
   * Návštevníci uvidia ligovú tabuľku aj rozpis zápasov **100% v našom čistom klubovom dizajne v štýle FC Nitra** (čitateľné poradie, farebné výhry/remízy/prehry, skóre, body, logá a zvýraznený ŠK Junior Ivanka pri Nitre), s možnosťou prekliknúť sa na oficiálny Futbalnet profil.

---

## 🚀 Súbory v projekte

* `index.html` – Hlavná klubová stránka pre návštevníkov.
* `admin.html` – Vizuálna administrácia pre správu všetkých údajov.
* `js/data.js` – Dátová základňa klubu.
* `js/app.js` – Logika hlavnej stránky.
* `js/admin-page.js` – Logika vizuálnej administrácie.
* `js/sportnet.js` – Prevodník a parser dát z Futbalnetu.
* `css/style.css` – Dizajn v štýle FC Nitra s klubovou neónovou ružovou ŠK Junior.
* `SK_Junior_logo.jpg` – Logo klubu.
