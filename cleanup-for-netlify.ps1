# PowerShell script to clean up project for Netlify deployment
# This script removes any potential Android/React Native files and ensures clean deployment

Write-Host "Cleaning up project for Netlify deployment..." -ForegroundColor Green

# Remove node_modules and package-lock.json
Write-Host "Removing node_modules and package-lock.json..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
    Write-Host "Removed node_modules" -ForegroundColor Green
}

if (Test-Path "package-lock.json") {
    Remove-Item -Force "package-lock.json" -ErrorAction SilentlyContinue
    Write-Host "Removed package-lock.json" -ForegroundColor Green
}

# Remove build directory
Write-Host "Removing build directory..." -ForegroundColor Yellow
if (Test-Path "build") {
    Remove-Item -Recurse -Force "build" -ErrorAction SilentlyContinue
    Write-Host "Removed build directory" -ForegroundColor Green
}

# Remove any native files that might exist
Write-Host "Checking for native files..." -ForegroundColor Yellow
$nativeFiles = Get-ChildItem -Recurse -Include "*.h", "*.cpp", "*.java", "*.kt", "*.swift" -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notlike "*node_modules*" }
if ($nativeFiles) {
    Write-Host "Found native files outside node_modules:" -ForegroundColor Red
    $nativeFiles | ForEach-Object { Write-Host "  - $($_.FullName)" -ForegroundColor Red }
    Write-Host "These files should not be in a web project!" -ForegroundColor Red
} else {
    Write-Host "No native files found in source code" -ForegroundColor Green
}

# Remove Android/iOS directories if they exist
Write-Host "Checking for mobile directories..." -ForegroundColor Yellow
if (Test-Path "android") {
    Remove-Item -Recurse -Force "android" -ErrorAction SilentlyContinue
    Write-Host "Removed android directory" -ForegroundColor Green
}
if (Test-Path "ios") {
    Remove-Item -Recurse -Force "ios" -ErrorAction SilentlyContinue
    Write-Host "Removed ios directory" -ForegroundColor Green
}

# Clear npm cache
Write-Host "Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force 2>$null
Write-Host "Cleared npm cache" -ForegroundColor Green

# Reinstall dependencies
Write-Host "Reinstalling dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Build the project
Write-Host "Building project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "Build completed successfully" -ForegroundColor Green
} else {
    Write-Host "Build failed" -ForegroundColor Red
    exit 1
}

# Check for any remaining native files in build
Write-Host "Checking build directory for native files..." -ForegroundColor Yellow
$buildNativeFiles = Get-ChildItem -Recurse -Path "build" -Include "*.h", "*.cpp", "*.java", "*.kt", "*.swift" -ErrorAction SilentlyContinue
if ($buildNativeFiles) {
    Write-Host "Found native files in build directory:" -ForegroundColor Red
    $buildNativeFiles | ForEach-Object { Write-Host "  - $($_.FullName)" -ForegroundColor Red }
} else {
    Write-Host "No native files in build directory" -ForegroundColor Green
}

Write-Host "Project cleaned and ready for Netlify deployment!" -ForegroundColor Green
Write-Host "Build directory: ./build" -ForegroundColor Cyan
Write-Host "You can now deploy to Netlify!" -ForegroundColor Cyan
