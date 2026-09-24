# 📱 Red Social Interactiva - React & Vite

Trabajo académico para el programa Técnico Laboral en el CESDE.
El objetivo principal de este proyecto es la reconstrucción de la plantilla estática "Social Media" de W3.CSS, transformándola en una Aplicación de Página Única (SPA) dinámica utilizando React. Se aplicaron buenas prácticas de modularización de componentes y el uso de Hooks fundamentales (`useState`, `useEffect`, `useContext`).

## 🚀 Funcionalidades Implementadas

*   **Publicación de Estados:** Los usuarios pueden crear nuevas publicaciones de texto y adjuntar imágenes locales desde su dispositivo.
*   **Sistema de Interacciones:** Funcionalidad para dar y quitar "Me gusta" en cada publicación, con contadores dinámicos e independientes.
*   **Comentarios y Respuestas Anidadas:** Sistema modular de comentarios que permite responder a opiniones específicas, manteniendo un hilo de conversación encapsulado.
*   **Persistencia de Datos:** Los comentarios de cada publicación se guardan y recuperan automáticamente usando el `localStorage` del navegador mediante `useEffect`.
*   **Identificadores Únicos y Seguros:** Implementación de la API moderna `crypto.randomUUID()` para la generación de IDs en posts y comentarios, resolviendo problemas de renderizado de listas en React.
*   **Perfil de Usuario Centralizado:** Los datos del usuario en sesión se distribuyen en la aplicación utilizando `useContext`, evitando el paso excesivo de props (Prop Drilling).

## 🛠️ Tecnologías Utilizadas

*   **React 18/19:** Librería principal para la construcción de interfaces.
*   **Vite:** Herramienta de construcción y servidor de desarrollo ultrarrápido.
*   **W3.CSS y Font Awesome 4.7:** Cargados vía CDN para mantener la fidelidad del diseño original.
*   **LocalStorage API:** Para la persistencia de datos en el cliente.

## 📁 Estructura del Proyecto

El código está refactorizado respetando la semántica de la plantilla original para facilitar su evaluación:

```text
red-social/
├── index.html                 # HTML base: carga de W3.CSS y Font Awesome
├── package.json               # Dependencias y scripts de Node
├── vite.config.js             # Configuración de Vite
└── src/
    ├── main.jsx               # Punto de entrada de la aplicación
    ├── App.jsx                # Layout principal de la red social
    └── components/
        ├── UserContext.jsx    # Contexto global: provee los datos del perfil de usuario
        ├── Navbar.jsx         # Barra de navegación superior
        ├── LeftColumn.jsx     # Columna izquierda: perfil (conectado al Contexto), grupos e intereses
        ├── MiddleColumn.jsx   # Columna central: caja de publicación, subida de fotos y lista de Posts
        ├── Post.jsx           # Lógica de cada publicación: maneja likes y guarda comentarios (useEffect)
        ├── Comment.jsx        # Lógica individual de comentarios: maneja su propia caja de respuestas
        └── RightColumn.jsx    # Columna derecha: eventos y solicitudes de amistad

         🧠 Arquitectura y Flujo de Datos
A diferencia de un estado global monolítico, este proyecto aplica una arquitectura basada en la encapsulación de componentes:

UserContext.jsx actúa como un micro-estado global que provee únicamente la información del perfil logueado a toda la aplicación.

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