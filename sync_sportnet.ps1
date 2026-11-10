param(
  [string]$OutputPath = "js/data.js"
)

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$teamsMeta = @(
  @{ key = 'a-tim'; slug = 'dospeli-m-a'; name = 'A-tím (Muži)'; badge = 'VIII. A liga Macron (ObFZ Nitra)' },
  @{ key = 'u19'; slug = 'u19-m-a'; name = 'Starší dorast U19'; badge = 'IV. liga U19 (ZsFZ)' },
  @{ key = 'u15'; slug = 'u15-m-a'; name = 'Starší žiaci U15'; badge = 'III. liga U15 Macron (ZsFZ)' },
  @{ key = 'u13'; slug = 'u13-m-a'; name = 'Mladší žiaci U13'; badge = 'III. liga U13 Macron (ZsFZ)' },
  @{ key = 'u11'; slug = 'u11-m-a'; name = 'Staršia prípravka U11'; badge = 'Liga prípraviek U11 (ObFZ Nitra)' },
  @{ key = 'u9'; slug = 'u09-m-a'; name = 'Mladšia prípravka U9'; badge = 'Liga prípraviek U09 (ObFZ Nitra)' }
)

$wc = New-Object System.Net.WebClient
$wc.Encoding = [System.Text.Encoding]::UTF8
$wc.Headers.Add('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')

function ExtractArrayJson($rawHtml, $keyword) {
  $clean = $rawHtml -replace '\\\\"', "'"
  $clean = $clean -replace '\\"', '"'

  $idx = $clean.IndexOf($keyword)
  if ($idx -lt 0) { return $null }
  $start = $idx + $keyword.Length - 1
  $bracketCount = 0
  $end = -1
  for ($i = $start; $i -lt $clean.Length; $i++) {
    if ($clean[$i] -eq '[') { $bracketCount++ }
    elseif ($clean[$i] -eq ']') {
      $bracketCount--
      if ($bracketCount -eq 0) { $end = $i; break }
    }
  }
  if ($end -gt $start) {
    $sub = $clean.Substring($start, $end - $start + 1)
    return $sub | ConvertFrom-Json
  }
  return $null
}

$extractedData = @{}

foreach ($tm in $teamsMeta) {
  $k = $tm.key
  $slug = $tm.slug
  Write-Output "Sťahujem $k ($slug)..."
  
  # 1. Tabuľka súťaže
  $tabUrl = "https://sportnet.sme.sk/futbalnet/k/sk-junior-ivanka-pri-nitre/tim/$slug/tabulky/"
  $parsedTable = @()
  try {
    $tabHtml = $wc.DownloadString($tabUrl)
    $arrTab = ExtractArrayJson $tabHtml '"results":['
    if ($arrTab) {
      $pos = 1
      foreach ($row in $arrTab) {
        $teamName = $row.name
        $logoSrc = if ($row.logo -and $row.logo.src) { $row.logo.src } else { "SK_Junior_logo.jpg" }
        $isJunior = $teamName.ToLower().Contains("junior") -or $teamName.ToLower().Contains("ivanka")
        $parsedTable += @{
          pos = $pos++
          team = $teamName
          logo = $logoSrc
          p = [int]$row.played
          w = [int]$row.won
          d = [int]$row.draw
          l = [int]$row.lost
          score = $row.score
          pts = [int]$row.points
          isCurrent = $isJunior
        }
      }
    }
  } catch {
    Write-Output "Chyba tabuľky pre $k`: $($_.Exception.Message)"
  }

  # 2. Program zápasov
  $progUrl = "https://sportnet.sme.sk/futbalnet/k/sk-junior-ivanka-pri-nitre/tim/$slug/program/"
  $parsedMatches = @()
  try {
    $progHtml = $wc.DownloadString($progUrl)
    $arrMatches = ExtractArrayJson $progHtml '"matches":['
    if ($arrMatches) {
      foreach ($m in $arrMatches) {
        $rawDate = $m.date -replace '^\$D', ''
        $dtStr = $rawDate
        $timeStr = "14:00"
        try {
          $dt = [DateTime]::Parse($rawDate)
          $dtStr = $dt.ToString("dd.MM.yyyy")
          $timeStr = $dt.ToString("HH:mm")
        } catch {}

        $hName = $m.homeTeam.name
        $aName = $m.awayTeam.name
        $hLogo = if ($m.homeTeam.logo -and $m.homeTeam.logo.src) { $m.homeTeam.logo.src } else { "SK_Junior_logo.jpg" }
        $aLogo = if ($m.awayTeam.logo -and $m.awayTeam.logo.src) { $m.awayTeam.logo.src } else { "SK_Junior_logo.jpg" }
        $isHome = $hName.ToLower().Contains("junior") -or $hName.ToLower().Contains("ivanka")
        
        $scoreStr = ""
        if ($m.homeTeam.score -and $m.homeTeam.score -ne "-" -and $m.awayTeam.score -and $m.awayTeam.score -ne "-") {
          $scoreStr = "$($m.homeTeam.score) : $($m.awayTeam.score)"
        }

        $roundName = if ($m.meta -and $m.meta.round -and $m.meta.round.name) { $m.meta.round.name } else { "Ligový zápas" }
        $venue = if ($isHome) { "Futbalový areál ŠK Junior Ivanka pri Nitre" } else { "Ihrisko $hName" }

        $parsedMatches += @{
          id = "m-$($k)-" + $m.id.Substring([Math]::Max(0, $m.id.Length - 8))
          round = $roundName
          date = $dtStr
          time = $timeStr
          homeTeam = $hName
          homeLogo = $hLogo
          awayTeam = $aName
          awayLogo = $aLogo
          score = $scoreStr
          isHome = $isHome
          venue = $venue
          status = if ($scoreStr) { "finished" } else { "scheduled" }
        }
      }
    }
  } catch {
    Write-Output "Chyba programu pre $k`: $($_.Exception.Message)"
  }
  
  $extractedData[$k] = @{
    table = $parsedTable
    matches = $parsedMatches
  }
  Write-Output "-> $k`: Tabuľka $($parsedTable.Count) tímov, Zápasy $($parsedMatches.Count)"
}

$fullExtracted = @{
  tables = @{}
  matches = @{}
}
foreach ($k in $extractedData.Keys) {
  $fullExtracted.tables[$k] = $extractedData[$k].table
  $fullExtracted.matches[$k] = $extractedData[$k].matches
}

$jsonText = $fullExtracted | ConvertTo-Json -Depth 6
[System.IO.File]::WriteAllText("$PSScriptRoot/extracted_data_full.json", $jsonText, [System.Text.Encoding]::UTF8)

# Automaticky vygenerujeme data.js s novými stiahnutými údajmi
powershell -ExecutionPolicy Bypass -File "$PSScriptRoot/build_clean_data_js.ps1"
Write-Output "HOTOVO: Týždenná synchronizácia prebehla úspešne a js/data.js bol aktualizovaný!"
