$ErrorActionPreference = 'Stop'

function Invoke-Compose {
    & docker compose @args
    if ($LASTEXITCODE -ne 0) {
        throw "Docker Compose failed: $($args[0])"
    }
}

Push-Location $PSScriptRoot
try {
    foreach ($file in @('private/site.sql', 'private/wp-content.tar.gz')) {
        if (!(Test-Path -LiteralPath $file -PathType Leaf)) {
            throw "Missing snapshot file: $file"
        }
    }

    Invoke-Compose up -d --wait db web
    $binding = Invoke-Compose port web 80
    $localUrl = "http://$binding"
    $existingTables = Invoke-Compose exec -T db sh /snapshot.sh tables
    if ($existingTables) {
        throw 'The local database already contains tables. Restore requires an empty database.'
    }

    Invoke-Compose exec -T web sh /snapshot.sh content
    Invoke-Compose exec -T db sh /snapshot.sh database
    foreach ($sourceUrl in @('https://test.izoralitmash.ru', 'http://test.izoralitmash.ru')) {
        Invoke-Compose run --rm -T cli search-replace $sourceUrl $localUrl --all-tables-with-prefix --skip-columns=guid --precise --skip-plugins --skip-themes
    }
    Invoke-Compose run --rm -T cli option get home
    Write-Output $localUrl
} finally {
    Pop-Location
}
