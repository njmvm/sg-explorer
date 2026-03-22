@echo off
set GIT="C:\Program Files\Git\bin\git.exe"
cd /d C:\Users\mouge\sg-explorer
%GIT% add data/content.js
%GIT% diff --cached --stat
%GIT% commit -m "Fix website links: correct URLs for KF1, ARTBOX, Heritage Festival, Lost SG, meetup groups; replace non-existent Laneway SG event with IVE World Tour; update trip links to official tourism offices (Batam, Bintan, Lombok)"
%GIT% push origin main
echo DONE
