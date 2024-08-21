#!/bin/sh

x() {
  sed '/<content\/>/ {
        r '"$1"'
        d
    }' "template.html" > "dist/${1##*/}"
}

for file in pages/*; do
  if [ -f "$file" ]; then
    # Hier den Befehl ausführen, z.B. echo
    x "$file"
  fi
done

for file in src/*.js; do
  if [ -f "$file" ]; then
    cp "$file" "dist/${file##*/}"
  fi
done

cp "styles.css" dist/styles.css
