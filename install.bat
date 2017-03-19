cd %~dp0
del /s /q "node_modules\*"
rmdir /s /q "node_modules\"
call npm install
