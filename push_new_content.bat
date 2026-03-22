@echo off
set GIT="C:\Program Files\Git\bin\git.exe"
cd /d C:\Users\mouge\sg-explorer
%GIT% add data/content.js
%GIT% diff --cached --stat
%GIT% commit -m "Add 27 new items: 12 activities, 10 events, 5 weekend trips"
%GIT% push origin main
echo DONE
