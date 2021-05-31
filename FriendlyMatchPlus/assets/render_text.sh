#!/usr/bin/env bash
convert -size 500x55 xc:none \
    -font "汉仪书魂体简" -interword-spacing 8 -pointsize 28 \
    -fill gradient: \
    -annotate +0+30 "$1" \
    \( +clone -background transparent -shadow 60x0+2+6 \) +swap \
    -background transparent -flatten -trim +repage \
    "$2"
