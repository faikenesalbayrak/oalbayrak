#!/bin/bash

# Port 3000'de çalışan eski bir süreç varsa kapatır
lsof -ti:3000 | xargs kill -9 2>/dev/null

# Node.js ve paket yollarını ekler
export PATH="/Users/orhanalbayrak/.local/node/bin:/Users/orhanalbayrak/.local/bin:$PATH"

# Proje dizinine gider
cd /Users/orhanalbayrak/Documents/orhanalbayrakcom/oalbayrak

echo "========================================="
echo "  Orhan Albayrak Web Sitesi Başlatılıyor "
echo "========================================="
echo "Adres: http://localhost:3000"
echo "Kapatmak için bu pencereyi kapatabilirsiniz."
echo "-----------------------------------------"

# Tarayıcıda 2 saniye sonra otomatik açar
(sleep 2 && open "http://localhost:3000") &

# Sunucuyu başlatır
pnpm dev
