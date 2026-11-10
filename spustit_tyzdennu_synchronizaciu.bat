@echo off
chcp 65001 > nul
echo ====================================================================
echo  ŠK JUNIOR IVANKA PRI NITRE - TÝŽDENNÁ SYNCHRONIZÁCIA DÁT
echo  Sťahujem aktuálne tabuľky a zápasy všetkých kategórií z Futbalnetu...
echo ====================================================================
powershell -ExecutionPolicy Bypass -File "%~dp0sync_sportnet.ps1"
echo.
echo [OK] Synchronizácia dokončená. Údaje boli zapísané do js/data.js!
pause
