# 📱 Red Social Interactiva - React & Vite

Trabajo académico para el programa Técnico Laboral en el CESDE.
El objetivo principal de este proyecto es la reconstrucción de la plantilla estática "Social Media" de W3.CSS, transformándola en una Aplicación de Página Única (SPA) dinámica utilizando React. Se aplicaron buenas prácticas de modularización de componentes, enrutamiento y el uso de Hooks fundamentales (`useState`, `useEffect`, `useContext`).

## 🚀 Funcionalidades Implementadas

* **Sistema de Rutas y Autenticación:** Navegación fluida entre pantallas de Inicio de Sesión, Registro, Muro principal, Perfil, Mensajes y Grupos utilizando `react-router-dom`. Las rutas internas están protegidas para usuarios autenticados.
* **Recuperación de Contraseña Avanzada:** Integración de un cuadro Modal (diseñado con W3.CSS) con un flujo de 3 pasos. Valida la existencia del correo, solicita la respuesta a una pregunta de seguridad profesional y revela la credencial, mitigando vulnerabilidades de ingeniería social.
* **Publicación de Estados:** Los usuarios logueados pueden crear nuevas publicaciones de texto y adjuntar imágenes locales desde su dispositivo.
* **Sistema de Interacciones:** Funcionalidad para dar y quitar "Me gusta" en cada publicación, con contadores dinámicos e independientes que ocultan el valor numérico cuando están en cero para mayor limpieza visual.
* **Comentarios y Respuestas Anidadas:** Sistema modular de comentarios que permite responder a opiniones específicas, firmadas automáticamente con el nombre del usuario en sesión, manteniendo un hilo de conversación encapsulado.
* **Persistencia de Datos Global:** Sesiones de usuario, perfiles registrados y comentarios de publicaciones se guardan y recuperan automáticamente usando el `localStorage` del navegador, simulando el comportamiento de una base de datos real.
* **Identificadores Únicos y Seguros:** Implementación de la API moderna `crypto.randomUUID()` para la generación de IDs en posts y comentarios.

## 👥 Perfiles de Prueba (Hardcodeados)

Para facilitar la revisión y pruebas del proyecto sin necesidad de registrar un usuario desde cero, el sistema cuenta con perfiles preconfigurados. 
*(Si los perfiles no cargan, ejecuta `localStorage.clear()` en la consola del navegador y presiona F5).*

* **Admin (Andrés Esteban):** `admin@redsocial.com` | Clave: `admin` | Respuesta de seguridad: `medellin`
* **Usuario 1:** `ana@test.com` | Clave: `123` | Respuesta de seguridad: `carlos`
* **Usuario 2:** `carlos@test.com` | Clave: `abc` | Respuesta de seguridad: `marta`

## 🛠️ Tecnologías Utilizadas

* **React 18/19:** Librería principal para la construcción de interfaces.
* **Vite:** Herramienta de construcción y servidor de desarrollo ultrarrápido.
* **React Router DOM:** Para la gestión de rutas y navegación SPA.
* **W3.CSS y Font Awesome 4.7:** Cargados vía CDN para mantener la fidelidad del diseño original.
* **LocalStorage API:** Para la persistencia de datos en el cliente.

## 📁 Estructura del Proyecto

El código está refactorizado respetando la semántica de la plantilla original y separando la lógica de vistas y componentes:

```text
red-social/
├── index.html                 # HTML base: carga de W3.CSS y Font Awesome
├── package.json               # Dependencias y scripts de Node
├── vite.config.js             # Configuración de Vite
└── src/
    ├── main.jsx               # Punto de entrada de la aplicación y Router Provider
    ├── App.jsx                # Layout principal de la red social (Muro)
    ├── pages/
    │   ├── Login.jsx          # Vista de inicio de sesión con Modal de recuperación
    │   ├── Register.jsx       # Vista de registro con selección de pregunta de seguridad
    │   ├── Perfil.jsx         # Vista detallada de la información del usuario
    │   ├── Mensajes.jsx       # Bandeja de entrada y chat
    │   └── Grupos.jsx         # Exploración y gestión de comunidades
    └── components/
        ├── UserContext.jsx    # Contexto global: provee autenticación,

        🧠 Arquitectura y Flujo de Datos
A diferencia de un estado global monolítico, este proyecto aplica una arquitectura basada en la encapsulación de componentes:

UserContext.jsx actúa como un micro-estado global y base de datos simulada. Centraliza la lógica de login, registro, recuperación de contraseña y distribuye la sesión activa evitando el paso excesivo de props (Prop Drilling).

MiddleColumn.jsx es el contenedor inteligente que maneja el estado del muro (creación de posts y subida de imágenes).

Post.jsx y Comment.jsx son componentes autónomos; cada uno es responsable de su propio estado local (sus likes, sus cajas de texto y el guardado en localStorage). Esto facilita la escalabilidad y limpieza del código.

⚙️ Cómo ejecutar el proyecto localmente
Requisitos: Node.js instalado en tu equipo.

Clona el repositorio y entra a la carpeta:

Bash
git clone <url-del-repositorio>
cd red-social
Instala las dependencias necesarias:

Bash
npm install
Levanta el servidor de desarrollo:

Bash
npm run dev
Abre tu navegador en la dirección indicada en la terminal (usualmente http://localhost:5173).