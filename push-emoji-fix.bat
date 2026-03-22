@echo off
set GIT="C:\Program Files\Git\bin\git.exe"
cd /d C:\Users\mouge\sg-explorer
%GIT% add app/trips/page.js components/ActivityCard.js components/ActivityModal.js components/EventRow.js components/EventModal.js components/TripModal.js
%GIT% commit -m "Fix emoji encoding: replace raw emoji with Unicode escape sequences"
%GIT% push origin main
echo Done! Check https://sg-explorer.vercel.app in a minute.
pause
