@echo off
set GIT="C:\Program Files\Git\bin\git.exe"
cd /d C:\Users\mouge\sg-explorer
%GIT% init
%GIT% remote add origin https://github.com/njmvm/sg-explorer.git
%GIT% fetch origin main
%GIT% checkout main
%GIT% add .
%GIT% commit -m "Add all project source files"
%GIT% push origin main
echo Done!
pause
