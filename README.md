# TunariDeploy

**TunariDeploy** es una aplicación web desarrollada con [Angular](https://angular.io/) para la Corporación Tunari. El proyecto incluye un sitio web informativo con distintas secciones como cursos, actividades, contacto, etc., y se encuentra desplegado con Firebase Hosting bajo el dominio personalizado:

👉 [https://corporaciontunari.edu.bo](https://corporaciontunari.edu.bo)

---

## 🧰 Requisitos previos

* Node.js (recomendado: v18+)
* Angular CLI (`npm install -g @angular/cli`)
* Firebase CLI (`npm install -g firebase-tools`)
* Cuenta de Firebase y proyecto configurado
* Cuenta en Cloudflare (para gestión de DNS del dominio)

---

## ⚙️ Instalación

Clona el repositorio y entra a la carpeta del proyecto:

```bash
git clone https://github.com/cctp-tunari/Tunari-v2.git
cd Tunari-v2
npm install
```

---

## 🥪 Modo desarrollo

Para iniciar el servidor de desarrollo:

```bash
ng serve
```

Luego abre tu navegador en:
[http://localhost:4200](http://localhost:4200)

La aplicación se recarga automáticamente al detectar cambios en los archivos fuente.

---

## 🛠️ Build de producción

Para compilar la app de forma optimizada:

```bash
ng build --configuration production
```

Los archivos compilados se generan en:

```
dist/tunari-deploy/browser
```

---

## 🚀 Deploy en Firebase

### 1. Autenticarse en Firebase:

```bash
firebase login
```

### 2. Compilar la app:

```bash
ng build --configuration production
```

### 3. Desplegar:

```bash
firebase deploy
```

Esto subirá el contenido a Firebase Hosting, usando la configuración definida en `firebase.json`, incluyendo:

* Carpeta pública: `dist/tunari-deploy/browser`
* Reescritura de rutas Angular (`"source": "**", "destination": "/index.html"`)

---

## 🌐 Dominio personalizado con Cloudflare

Este proyecto está conectado a un dominio `.edu.bo` mediante Cloudflare:

1. Se actualizaron los **nameservers** en NIC Bolivia para usar los de Cloudflare.
2. Se añadieron los registros **A** y **TXT** que Firebase requiere para verificar el dominio.
3. Se desactivó DNSSEC.
4. Cloudflare proxyea el tráfico y permite HTTPS y protección.

👉 Dominio final: [https://corporaciontunari.edu.bo](https://corporaciontunari.edu.bo)

---

## 📂 Estructura principal

* `src/app/website/`: Componentes públicos del sitio
* `src/app/admin/`: Componentes para administración (con AuthGuard)
* `src/environments/`: Configuraciones de entorno
* `firebase.json`: Configuración de hosting y rutas
* `angular.json`: Configuración del build

---

## 🔭 Recursos útiles

* [Angular Docs](https://angular.dev)
* [Firebase Hosting](https://firebase.google.com/docs/hosting)
* [Cloudflare DNS](https://developers.cloudflare.com/dns/)
