# Flocam Transportes

Sitio web institucional de **Flocam Transportes**, empresa de transporte especializado en camiones cama baja y transporte de batea en la V Región (Valparaíso, ConCon) y todo Chile.

🔗 Producción: [flocamtransportes.cl](https://flocamtransportes.cl)

## Descripción

Landing page estática multi-sección orientada a SEO local, con foco en tres servicios principales:

- **Cama baja traslados** — transporte de maquinaria pesada y equipos industriales.
- **Transporte de batea** — traslado de áridos, arena y materiales de construcción.
- **Logística de camiones** — coordinación de rutas y logística de transportes en general.

Incluye datos estructurados (Schema.org `TransportationBusiness`), metadatos Open Graph/Twitter Card, sitemap y robots.txt orientados a posicionamiento en buscadores.

## Stack técnico

Sitio 100% estático, sin frameworks ni build tools:

- **HTML5** — páginas independientes por servicio (sin router ni SPA).
- **CSS3** — hoja de estilos única (`styles.css`), sin preprocesadores.
- **JavaScript vanilla** — interactividad (carrusel de imágenes, menú, formularios) en `script.js`, sin dependencias de bundlers.
- **[SweetAlert2](https://sweetalert2.github.io/)** (vía CDN `cdn.jsdelivr.net`) — alertas y modales.
- **Google Fonts** — tipografía Montserrat, cargada de forma asíncrona.
- **GitHub Pages** — hosting, con dominio personalizado configurado en `CNAME`.

No requiere `package.json`, gestor de paquetes ni proceso de compilación: los archivos se sirven tal cual.

## Estructura del proyecto

```
├── index.html                  # Página principal (home)
├── styles.css                  # Estilos globales
├── script.js                   # Lógica de interacción (carrusel, UI)
├── CNAME                       # Dominio personalizado para GitHub Pages
├── robots.txt                  # Reglas de rastreo para buscadores
├── sitemap.xml                 # Mapa del sitio para SEO
├── batea-traslados/
│   └── index.html              # Página del servicio de transporte de batea
├── cama-baja-traslados/
│   └── index.html              # Página del servicio de cama baja
├── logistica-camiones/
│   └── index.html              # Página del servicio de logística de camiones
├── icons/                      # Iconos SVG (WhatsApp, Instagram, ubicación)
└── imgs/                       # Imágenes, logos y galería de fotos
```

## Desarrollo local

No hay dependencias que instalar. Basta con servir los archivos estáticos, por ejemplo:

```bash
# Con Python
python -m http.server 8000

# O con la extensión Live Server de VS Code
```

Luego abrir `http://localhost:8000` en el navegador.

## Despliegue

El sitio se publica automáticamente vía **GitHub Pages** al hacer push a la rama `main`. El archivo `CNAME` mantiene el dominio personalizado `flocamtransportes.cl`.

## Contacto

- **Email:** tsolucionesflocam@gmail.com
- **Teléfono:** +56 9 8221 8804
- **Ubicación:** ConCon, Región de Valparaíso, Chile
