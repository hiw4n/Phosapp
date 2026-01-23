# PhosApp - Proyecto Final Desarrollo de Apps

## 📸 Sobre la Aplicación
**PhosApp** es una herramienta diseñada para entusiastas de la fotografía que buscan mejorar sus habilidades mediante retos específicos (como el "Motion Blur"). La app permite visualizar retos desde una base de datos, capturar la prueba con la cámara del dispositivo y gestionar una galería personal de logros de forma eficiente.

---

## 🛠️ Tecnologías Utilizadas
* **React Native & Expo (SDK 54):** Framework base para el desarrollo.
* **Firebase (Firestore):** Gestión y carga de los datos de los retos en tiempo real.
* **Expo Camera:** Acceso y control del hardware de la cámara.
* **Expo FileSystem (Nueva API):** Persistencia de imágenes en el almacenamiento local del dispositivo mediante las clases `Directory` y `File`.
* **React Navigation:** Navegación híbrida (Stack + Bottom Tabs) para una experiencia de usuario fluida.

---

## 🚀 Desafíos Técnicos y Decisiones de Arquitectura

Durante el desarrollo, surgieron varios obstáculos técnicos que requirieron soluciones creativas para asegurar la estabilidad de la app:

### 1. Persistencia Local vs. Cloud Storage
Debido a restricciones de región en la consola de Firebase que impedían la habilitación del Bucket de Storage en la capa gratuita, decidí pivotar hacia un **"Plan C" de almacenamiento local**.
* **Solución:** Implementé una lógica de guardado en el `Directory.document` del dispositivo. Esto no solo resolvió el problema de red, sino que hizo que la app sea mucho más rápida al cargar imágenes.

### 2. Adaptación a Expo SDK 54
Al trabajar con la versión más reciente de Expo, me encontré con que muchos métodos de manejo de archivos estaban marcados como *deprecated*.
* **Acción:** Refactoricé el código para utilizar la nueva API de FileSystem, eliminando advertencias y asegurando que la app siga funcionando en futuras actualizaciones de Android e iOS.

### 3. Interfaz Estilo Feed (Instagram)
Para mejorar la experiencia visual, transformé la galería convencional en un **Feed de una sola columna** con componentes reutilizables (`PhotoCard`). Esto permite apreciar mejor los detalles de cada captura y le da un acabado de aplicación comercial.

---

## 📱 Funcionalidades Principales

* **Home con Retos:** Conexión directa con Firestore para obtener los desafíos.
* **Cámara Personalizada:** Interfaz con posicionamiento absoluto para evitar bloqueos visuales y carga optimizada.
* **Galería Dual:** * **Feed:** Vista detallada de una columna.
    * **Mis Fotos:** Vista de cuadrícula de dos columnas para gestión rápida.
* **Gestión de Capturas:** Sistema de visor (Modal) para ver fotos a pantalla completa y posibilidad de eliminación física del archivo.

---