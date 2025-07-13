# Search for all available Bhagavad Gita chapters in Telugu

Write-Host "Searching for all available Bhagavad Gita chapters in Telugu..." -ForegroundColor Green

# Search for all 18 chapters
$chapters = @(
    "Telugu Bhagavad Gita Chapter 1",
    "Telugu Bhagavad Gita Chapter 2", 
    "Telugu Bhagavad Gita Chapter 3",
    "Telugu Bhagavad Gita Chapter 4",
    "Telugu Bhagavad Gita Chapter 5",
    "Telugu Bhagavad Gita Chapter 6",
    "Telugu Bhagavad Gita Chapter 7",
    "Telugu Bhagavad Gita Chapter 8",
    "Telugu Bhagavad Gita Chapter 9",
    "Telugu Bhagavad Gita Chapter 10",
    "Telugu Bhagavad Gita Chapter 11",
    "Telugu Bhagavad Gita Chapter 12",
    "Telugu Bhagavad Gita Chapter 13",
    "Telugu Bhagavad Gita Chapter 14",
    "Telugu Bhagavad Gita Chapter 15",
    "Telugu Bhagavad Gita Chapter 16",
    "Telugu Bhagavad Gita Chapter 17",
    "Telugu Bhagavad Gita Chapter 18"
)

$availableChapters = @()

foreach($chapter in $chapters) {
    Write-Host "`nSearching: $chapter" -ForegroundColor Yellow
    
    $encoded = $chapter -replace ' ', '+'
    $url = "https://www.youtube.com/results?search_query=$encoded"
    
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing
        $content = $response.Content
        $matches = [regex]::Matches($content, 'watch\?v=([a-zA-Z0-9_-]{11})')
        
        if($matches.Count -gt 0) {
            $videoId = $matches[0].Groups[1].Value
            Write-Host "Found: $videoId" -ForegroundColor Green
            
            # Extract chapter number
            $chapterNum = $chapter -replace '.*Chapter (\d+).*', '$1'
            $availableChapters += [PSCustomObject]@{
                Chapter = $chapterNum
                VideoId = $videoId
                Title = $chapter
            }
        } else {
            Write-Host "No video found" -ForegroundColor Red
        }
    }
    catch {
        Write-Host "Error searching for: $chapter" -ForegroundColor Red
    }
}

Write-Host "`n=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "Available chapters: $($availableChapters.Count)" -ForegroundColor Yellow
Write-Host "Total Bhagavad Gita chapters: 18" -ForegroundColor Yellow

foreach($chapter in $availableChapters) {
    Write-Host "Chapter $($chapter.Chapter): $($chapter.VideoId)" -ForegroundColor Green
}

Write-Host "`nScript completed!" -ForegroundColor Green 