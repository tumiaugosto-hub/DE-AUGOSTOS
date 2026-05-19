# PowerShell script to convert the HTML report to DOCX
# Run this script on your Windows machine:
#   1. Right-click this file and select "Run with PowerShell"
#   OR
#   1. Open PowerShell as Administrator
#   2. Navigate to this folder: cd "C:\path\to\documentation"
#   3. Run: .\convert-to-docx.ps1

$htmlFile = Join-Path $PSScriptRoot "report.html"
$docxFile = Join-Path $PSScriptRoot "DE_AUGOSTOS_Website_Report.docx"

# Check if Word is installed
$word = $null
try {
    $word = New-Object -ComObject Word.Application
} catch {
    Write-Host "ERROR: Microsoft Word is not installed on this computer." -ForegroundColor Red
    Write-Host ""
    Write-Host "Alternative method to create DOCX:"
    Write-Host "  1. Open 'report.html' in your web browser"
    Write-Host "  2. Press Ctrl+A (Select All), then Ctrl+C (Copy)"
    Write-Host "  3. Open Microsoft Word and press Ctrl+V (Paste)"
    Write-Host "  4. Save the document as a .docx file"
    exit 1
}

Write-Host "Converting HTML report to DOCX..." -ForegroundColor Green

try {
    # Make Word visible (optional - set to $false to run in background)
    $word.Visible = $false
    
    # Open the HTML file
    $doc = $word.Documents.Open($htmlFile)
    
    # Save as DOCX
    $doc.SaveAs([ref] $docxFile, [ref] 16)  # 16 = wdFormatDocumentDefault
    
    # Close the document
    $doc.Close()
    
    Write-Host "SUCCESS: Report saved to:" -ForegroundColor Green
    Write-Host "  $docxFile" -ForegroundColor Cyan
} catch {
    Write-Host "ERROR: Failed to convert file." -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
} finally {
    # Quit Word
    if ($word) { $word.Quit() }
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
}

# Pause so user can see the result
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
