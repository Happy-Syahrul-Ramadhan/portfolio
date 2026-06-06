@echo off
echo ============================================
echo  Stopping Node processes...
echo ============================================
taskkill /F /IM node.exe /T 2>nul
timeout /t 2 /nobreak >nul

echo ============================================
echo  Cleaning Next.js cache...
echo ============================================
if exist ".next" rmdir /s /q ".next"
echo Cache cleared.

echo ============================================
echo  Regenerating Prisma client...
echo ============================================
call npx prisma generate
echo Prisma client regenerated.

echo ============================================
echo  Starting dev server...
echo ============================================
npm run dev
