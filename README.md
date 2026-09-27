# Portafolio · Dereck Jara Núñez

Sitio estático (HTML + CSS + JavaScript, sin build) con selector de idioma ES/EN y tema claro/oscuro.

## Estructura

```
Portafolio/
├── index.html          # Contenido (el español vive aquí)
├── css/styles.css      # Estilos y tokens de color (claro/oscuro)
├── js/i18n.js          # Traducciones al inglés
├── js/main.js          # Idioma, tema, código de barras, gráfico, copiar correo
├── assets/
│   ├── favicon.svg
│   ├── CV_Dereck_Jara_Nunez_ES.pdf   # Se abre con el sitio en español
│   └── CV_Dereck_Jara_Nunez_EN.pdf   # Se abre con el sitio en inglés
└── .nojekyll           # Le dice a GitHub Pages que no procese el sitio con Jekyll
```

## Verlo en local

```bash
npx http-server -p 5173 -c-1 .
```

Luego abre http://127.0.0.1:5173

## Publicar en GitHub Pages

**Opción recomendada:** crea un repo llamado exactamente `DereckJN.github.io`. Así el sitio queda en `https://dereckjn.github.io/`.

```bash
git init
git add .
git commit -m "feat: portafolio inicial"
git branch -M main
git remote add origin https://github.com/DereckJN/DereckJN.github.io.git
git push -u origin main
```

Después, en GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**. En 1–2 minutos queda publicado.

Si usas otro nombre de repo (p. ej. `portafolio`), la URL será `https://dereckjn.github.io/portafolio/`. Funciona igual porque todas las rutas son relativas.

## Editar contenido

- **Texto en español:** directamente en `index.html`.
- **Texto en inglés:** en `js/i18n.js`, con la misma clave del atributo `data-i18n`.
- **Texto nuevo traducible:** agrega `data-i18n="seccion.clave"` al elemento en el HTML y la entrada `"seccion.clave": "..."` en `I18N.en`.
- **Colores:** en las variables al inicio de `css/styles.css` (bloque claro y bloques oscuros).
