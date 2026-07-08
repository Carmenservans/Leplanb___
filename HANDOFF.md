# leplanb — Documento de Traspaso Completo
> Pega este documento entero al inicio de tu sesión de Claude y di: *"Tengo este contexto de proyecto, ¿puedes leerlo antes de que empecemos?"*

---

## ¿Qué es este proyecto?

**leplanb** es una marca de moda emergente basada en **Ericeira, Portugal** (Instagram: [@leplanb___](https://www.instagram.com/leplanb___/)). Lanzamos una **página optin/waitlist** para la colección SS26 (primavera-verano 2026). La página recoge emails y nombres de personas interesadas antes del lanzamiento.

---

## Links activos

| Qué | URL |
|-----|-----|
| **Página live (Netlify)** | https://leplanb.netlify.app/ |
| **Google Sheet (waitlist)** | https://docs.google.com/spreadsheets/d/1-1YgPHOq7q_PyeIrOrBUbk66ljuwCZ0OL1uC6J2vWrw |
| **Google Apps Script (backend)** | https://script.google.com/macros/s/AKfycbzen8QnHBog-rjBCJtFDhvRO09mXyfmCMATGnXleAf-9UdjLZU8Yvm11_f7SOpkGvnoBA/exec |
| **Netlify Drop (para subir cambios)** | https://app.netlify.com/drop |
| **Instagram de la marca** | https://www.instagram.com/leplanb___ |

---

## Archivos del proyecto

Todos los archivos están en la carpeta `/Users/jaimep/Desktop/leplanb/`

```
leplanb/
├── index.html          ← LA PÁGINA PRINCIPAL (optin/waitlist) — esta es la que está live
├── landing.html        ← Página de aterrizaje completa (no está live aún)
├── appsscript.gs       ← Código del backend de Google Sheets (ya está desplegado)
├── HANDOFF.md          ← Este documento
└── img/
    ├── DSC03896.jpg    ← Foto hero de la página (chica, fondo oscuro)
    ├── logo.png        ← Logo circular LeplanB (fondo transparente)
    ├── logo-white.png  ← Logo todo blanco
    ├── campaign.gif    ← GIF de campaña (2.5MB)
    └── [14 fotos más del catálogo SS26]
```

---

## Cómo funciona la página (index.html)

1. El usuario ve una **hero section** fullscreen con foto de campaña y el texto "For people / off script"
2. Pulsa el botón **"View Collection →"**
3. Aparece un **modal** (popup) con un formulario: nombre + email
4. Al enviar, los datos van a **Google Sheets** vía Google Apps Script
5. El usuario ve un mensaje de confirmación: "You're in. 🖤"

### Flujo de datos:
```
Usuario rellena form → JavaScript → Google Apps Script (web app) → Google Sheet
```

---

## Credenciales y accesos importantes

### Google Apps Script (backend)
- **URL del endpoint:** `https://script.google.com/macros/s/AKfycbzen8QnHBog-rjBCJtFDhvRO09mXyfmCMATGnXleAf-9UdjLZU8Yvm11_f7SOpkGvnoBA/exec`
- **Sheet ID:** `1-1YgPHOq7q_PyeIrOrBUbk66ljuwCZ0OL1uC6J2vWrw`
- **Columnas en el Sheet:** Timestamp | Name | Email | Source
- El script está desplegado como "Web App" con acceso "Anyone"
- Si hay que editar el script: Google Sheet → Extensions → Apps Script

### Netlify
- La web está en **Netlify Drop** (deploy manual, sin cuenta)
- Para actualizar la web: arrastra la carpeta `leplanb/` a https://app.netlify.com/drop
- **IMPORTANTE:** Siempre sube la carpeta completa (no solo index.html) porque Netlify necesita también la carpeta `img/`

---

## Identidad visual / Brand Guidelines

### Colores
| Variable | Hex | Uso |
|----------|-----|-----|
| `--rust` | `#C05A28` | Acentos, hover, texto de urgencia |
| `--black` | `#100D0A` | Fondo principal, texto |
| `--sand` | `#EDE6DA` | Fondo del modal |

### Tipografías
| Fuente | Uso |
|--------|-----|
| **Bebas Neue** | Titulares grandes (hero, modal title) |
| **Cormorant Garamond** Italic | Subtítulos en cursiva (la palabra "off script", "first.") |
| **DM Sans** | Texto de cuerpo, botones, labels |
| **Helvetica Bold** (sistema) | Nombre de marca "LeplanB" en el topbar — es la misma fuente del logo real |

### Voz de marca
- **Tono:** minimalista, editorial, cool sin esfuerzo
- **Idioma:** inglés
- **Copy clave:** "For people off script" (sin punto al final, sin "s" en script)
- **Nombre correcto:** `LeplanB` — con L mayúscula, p minúscula, B mayúscula al final

### Textos actuales en la página
```
Topbar desktop:  "Collection SS26 · Coming Soon · Ericeira"
Topbar mobile:   "Collection SS26 · Ericeira"
Hero headline:   "For people / off script"
CTA button:      "View Collection →"
Modal eyebrow:   "leplanb · SS26"
Modal title:     "Be first."
Modal subtext:   "The collection drops soon. Get early access — be the first to view the collection."
Scarcity line:   "⚡ Limited pieces only"
Submit button:   "Get Early Access →"
Disclaimer:      "No spam. Just the drop, when it's ready."
Success title:   "You're in."
Success text:    "We'll reach out when the collection drops. Stay close — it's coming."
```

---

## Detalles técnicos importantes

### Fix del viewport en móvil (MUY IMPORTANTE)
Chrome en iPhone recorta el 100vh porque cuenta la barra de navegación. Se soluciona con:
```javascript
function setVH() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
setVH();
window.addEventListener('resize', setVH);
```
Y en CSS la hero usa `height: calc(var(--vh) * 100)` en lugar de `100vh`.

### iOS no hace zoom en inputs
Los inputs tienen `font-size: 16px` — si lo bajas de 16px, iOS Safari hace zoom automático al hacer foco. No cambiar.

### Padding-bottom en móvil
El hero tiene `padding-bottom: 160px` en móvil (≤480px) para que el botón "View Collection" no quede tapado por la barra de Chrome en iPhone.

### Logo en el topbar
Se usa texto `LeplanB` en `font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 700` — esto reproduce exactamente la tipografía del logo real (confirmado por análisis del PDF del logo).

---

## Qué hay en landing.html (no está live)

Es una landing page completa con:
- Nav con logo
- Hero section
- Marquee de texto animado
- 3 productos
- Sección de valores de marca
- Manifesto
- Lookbook (17 fotos)
- Video/GIF de campaña
- Waitlist section
- Strip de Instagram
- Footer

Si en algún momento se quiere lanzar la landing completa, se puede subir `landing.html` a Netlify renombrado como `index.html` (y el optin actual como `optin.html`).

---

## Estado actual del proyecto (30 junio 2026)

✅ Página optin live en https://leplanb.netlify.app/  
✅ Google Sheets recibiendo leads  
✅ Funciona en desktop y móvil (iPhone 16 probado)  
✅ Modal con scarcity text ("⚡ Limited pieces only")  
✅ Fix del viewport para Chrome/Safari en iOS  

⏳ **Pendiente / próximos pasos sugeridos:**
- Poner el link en la bio de Instagram
- Comprar dominio `leplanb.com` y conectarlo a Netlify
- Cuando se acumulen leads, enviar email de lanzamiento (exportar Sheet a Klaviyo/Mailchimp)
- Decidir si lanzar la `landing.html` completa o mantener solo el optin

---

## Cómo hacer cambios y subir a Netlify

1. Edita el archivo en `/Users/jaimep/Desktop/leplanb/index.html`
2. Guarda el archivo
3. Ve a https://app.netlify.com/drop
4. Arrastra la **carpeta completa** `leplanb` (no el archivo, la carpeta)
5. Espera ~10 segundos → la web está actualizada en https://leplanb.netlify.app/

---

## Estructura del Google Apps Script (appsscript.gs)

```javascript
// Cuando el form se envía, llega aquí
function doPost(e) {
    const data = JSON.parse(e.postData.contents);
    // data.name, data.email, data.timestamp, data.source
    sheet.appendRow([timestamp, name, email, source]);
}
```

Si el script deja de funcionar (p.ej. caducó el deploy), hay que:
1. Abrir el Google Sheet
2. Extensions → Apps Script
3. Deploy → Manage deployments → el deploy activo
4. O crear nuevo deploy con los mismos ajustes (Web app, Anyone, Execute as Me)
5. Actualizar la `SCRIPT_URL` en `index.html` con la nueva URL

---

## Contexto adicional

- Las fotos del catálogo fueron comprimidas de ~10MB a ~100-500KB con Python/Pillow (reducción del 96%)
- El GIF de campaña fue creado desde un video de WhatsApp: 30 frames, 360px, 128 colores → 2.5MB
- La marca también tiene integración GHL (GoHighLevel) + Typeform en otra subcuenta para captura de leads más avanzada — pero eso es un sistema separado, no conectado a esta landing page

---

*Documento generado el 30 de junio de 2026 · Proyecto leplanb SS26*
