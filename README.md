# Fabrizio Ortiz - Portfolio

Un portafolio profesional minimalista construido con Next.js 16, React 19 y TailwindCSS 4.

## 🚀 Características

- ✨ Diseño minimalista estilo Apple/Linear
- 🌍 Bilingüe (Español/Inglés)
- 🌓 Modo claro/oscuro
- 📱 Totalmente responsive
- ⚡ Animaciones fluidas con Framer Motion
- 📧 Formulario de contacto funcional con EmailJS
- 📄 Descarga de CV en PDF
- 🔒 SEO optimizado

## 📦 Instalación

```bash
npm install
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

## ⚙️ Configuración

### 1. Formulario de Contacto (EmailJS)

Para que el formulario de contacto funcione, necesitas configurar [EmailJS](https://www.emailjs.com/):

1. Crea una cuenta gratuita en [EmailJS](https://www.emailjs.com/)
2. Crea un "Email Service" (conecta tu Gmail, Outlook, etc.)
3. Crea un "Email Template" con estas variables:
   - `{{user_name}}` - Nombre del remitente
   - `{{user_email}}` - Email del remitente
   - `{{message}}` - Mensaje
4. Obtén tu Public Key en Account > API Keys

Luego edita `components/Contact.tsx` y reemplaza:

```typescript
await emailjs.sendForm(
  "YOUR_SERVICE_ID", // Tu Service ID
  "YOUR_TEMPLATE_ID", // Tu Template ID
  formRef.current!,
  "YOUR_PUBLIC_KEY" // Tu Public Key
);
```

### 2. CV en PDF

Coloca tu CV en la carpeta `public/` con el nombre `cv-fabrizio-ortiz.pdf`

### 3. Logo Personal

Reemplaza el placeholder del logo en `components/Navbar.tsx` con tu SVG.
Puedes colocarlo en `public/logo.svg` y usar:

```tsx
<Image src="/logo.svg" alt="Logo" width={32} height={32} />
```

### 4. Foto de Perfil (Opcional)

Si deseas agregar una foto de perfil, colócala en `public/profile.jpg` y actualiza `components/About.tsx` para mostrar la imagen en lugar del placeholder.

### 5. Screenshots/Videos de Proyectos

Para cada proyecto, puedes agregar:

**Imágenes estáticas:**

- Coloca las imágenes en `public/projects/`
- Actualiza `components/Projects.tsx` para usar las imágenes

**Videos/GIFs:**

- Graba un video de tu aplicación funcionando
- Conviértelo a GIF o WebM para mejor rendimiento
- Colócalo en `public/projects/`

### 6. Links de Redes Sociales

Actualiza los links en `components/Contact.tsx`:

```tsx
<a href="https://github.com/TU_USUARIO">...</a>
<a href="https://linkedin.com/in/TU_PERFIL">...</a>
```

## 📁 Estructura del Proyecto

```
portafolio-v3/
├── app/
│   ├── globals.css      # Estilos globales y sistema de diseño
│   ├── layout.tsx       # Layout principal con i18n
│   └── page.tsx         # Página principal
├── components/
│   ├── Navbar.tsx       # Navegación con toggle de tema/idioma
│   ├── Hero.tsx         # Sección principal
│   ├── About.tsx        # Sobre mí
│   ├── Projects.tsx     # Proyectos destacados
│   ├── Experience.tsx   # Timeline de experiencia
│   ├── Skills.tsx       # Habilidades técnicas
│   ├── Contact.tsx      # Formulario de contacto
│   └── Footer.tsx       # Pie de página
├── i18n/
│   └── request.ts       # Configuración de next-intl
├── messages/
│   ├── es.json          # Traducciones en español
│   └── en.json          # Traducciones en inglés
├── public/
│   ├── cv-fabrizio-ortiz.pdf  # Tu CV (agregar)
│   └── projects/              # Screenshots de proyectos (agregar)
└── middleware.ts        # Middleware para manejo de cookies
```

## 🎨 Personalización

### Colores

Edita las variables CSS en `app/globals.css`:

```css
:root {
  --color-accent: #0071e3; /* Color de acento */
  /* ... más variables */
}
```

### Traducciones

Edita los archivos en `messages/`:

- `messages/es.json` - Español
- `messages/en.json` - Inglés

## 📝 Notas

- El portafolio usa cookies para guardar la preferencia de idioma
- El tema (claro/oscuro) se guarda en localStorage
- Las animaciones se muestran solo una vez por sesión

## 🚀 Despliegue

El proyecto está optimizado para Vercel:

```bash
npm run build
```

O despliega directamente conectando tu repositorio de GitHub a Vercel.

---

Hecho con ❤️ por Fabrizio Ortiz
