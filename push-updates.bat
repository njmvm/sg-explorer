@echo off
set GIT="C:\Program Files\Git\bin\git.exe"
cd /d C:\Users\mouge\sg-explorer
%GIT% add data/content.js app/activities/page.js app/events/page.js app/trips/page.js components/MapView.js components/CalendarView.js components/ActivityModal.js components/EventModal.js components/TripModal.js
%GIT% commit -m "Add map, calendar, website links, fix images and event dates (2026)"
%GIT% push origin main
echo Done! Check https://sg-explorer.vercel.app in a minute.
pause
