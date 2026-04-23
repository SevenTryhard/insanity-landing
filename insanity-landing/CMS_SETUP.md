# 🔐 INSTRUCCIONES: Configurar GitHub OAuth para Decap CMS

## Paso 1: Crear OAuth App en GitHub

1. Ve a GitHub → Settings → Developer settings → OAuth Apps
   - URL: https://github.com/settings/developers

2. Haz clic en **"New OAuth App"**

3. Completa los datos:
   ```
   Application name: Insanity CMS
   Homepage URL: https://seventryhard.github.io/insanity-landing/
   Authorization callback URL: https://api.netlify.com/auth/done
   ```

4. Haz clic en **"Register application"**

5. Copia el **Client ID** y genera un **Client Secret**

## Paso 2: Configurar en el sitio

1. Abre el archivo `admin/config.yml`

2. Actualiza la sección `backend`:
   ```yaml
   backend:
     name: github
     repo: SevenTryhard/insanity-landing
     branch: main
     base_url: https://api.netlify.com
     auth_endpoint: https://github.com/login/oauth/authorize
     # Opcional: usar OAuth directo
   ```

## Paso 3: Acceder al CMS

1. Ve a: `https://seventryhard.github.io/insanity-landing/admin/`
   (o tu dominio de Cloudflare)

2. Haz clic en **"Login with GitHub"**

3. Autoriza la aplicación

4. ¡Listo! Verás el panel de administración

---

## 📁 Estructura del CMS

```
admin/                      # Panel de control
├── index.html             # Login del CMS
└── config.yml             # Configuración

data/                       # Base de datos JSON
├── products/              # 12 productos individuales
│   ├── phoenix-v3-rotary.json
│   ├── cyber-coil-pro.json
│   └── ...
├── categories/            # 6 categorías
│   ├── machines.json
│   ├── inks.json
│   └── ...
├── promotions.json        # Promociones activas
└── config.json            # Configuración general

js/
└── cms-loader.js          # Carga datos en el sitio
```

---

## ✏️ Cómo usar el CMS

### Editar un producto:
1. Entra a `/admin/`
2. Ve a **"📦 Productos"**
3. Selecciona un producto
4. Edita precio, nombre, badge, etc.
5. Guarda cambios → Publica

### Agregar un producto nuevo:
1. Ve a **"📦 Productos"**
2. Haz clic en **"New Producto"**
3. Completa todos los campos
4. Guarda y publica

### Cambiar promoción activa:
1. Ve a **"🎁 Promociones"**
2. Edita el campo `activePromo`
3. Guarda cambios

---

## 🚀 Flujo de publicación

```
Tú editas en CMS
       ↓
Decap CMS hace commit a GitHub
       ↓
GitHub Actions / Cloudflare Pages
       ↓
Sitio actualizado (1-2 minutos)
```

---

## ⚠️ Notas importantes

- Los cambios pueden tardar **1-2 minutos** en verse en el sitio
- Si ves un error 404 en `/admin/`, espera a que el deploy termine
- Para imágenes: súbelas a `images/uploads/` desde el CMS
- Haz siempre **"Publish"** después de guardar para aplicar cambios

---

## 🆘 Solución de problemas

**Error: "Failed to load config.yml"**
- Verifica que el archivo existe en `admin/config.yml`
- Asegúrate de usar la ruta correcta en `base_url`

**Error: "Authentication failed"**
- Verifica el Client ID en GitHub OAuth App
- La callback URL debe ser exacta: `https://api.netlify.com/auth/done`

**Cambios no aparecen:**
- Espera 1-2 minutos para el redeploy
- Verifica en GitHub que el commit se hizo
- Limpiar caché del navegador (Ctrl+F5)

---

## 📞 Soporte

- Decap CMS Docs: https://decapcms.org/docs/
- GitHub OAuth: https://docs.github.com/en/developers/apps

---

✅ **CONFIGURACIÓN COMPLETA**

Tu CMS está listo para usar. Accede a `/admin/` en tu sitio publicado.