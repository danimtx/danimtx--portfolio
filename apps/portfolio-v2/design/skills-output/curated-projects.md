# 🚀 Fichas Técnicas Reales de los 5 Proyectos Seleccionados

Documento de verdad técnica y narrativa profesional para **Portfolio V2**, basado en la información verificada directamente con el desarrollador y las especificaciones de arquitectura del sistema.

---

## 1. 📱 Lugares Ocultos de Tarija
*Aplicación Móvil Offline-First de Turismo Rural, Rutas y Aventura*

- **Categoría**: Mobile Engineering · Geospatial · Offline-First
- **Rol**: Creador & Arquitecto Fullstack Mobile
- **Estado**: En desarrollo activo para publicación gratuita en Google Play Store
- **Stack Tecnológico**:
  - **Mobile**: React Native, Expo SDK 54, Expo Router, React Native New Architecture
  - **Mapas & Geo**: MapLibre GL (`@maplibre/maplibre-react-native`), CartoDB & OpenStreetMap Vector Tiles
  - **Backend & Datos**: Supabase, PostgreSQL con extensiones espaciales (PostGIS), AsyncStorage
  - **Arquitectura**: Feature-Sliced Design (FSD) + Atomic Design (Atoms, Molecules, Features)
- **Problema que Resuelve**:
  - Google Maps carece de cobertura de senderos montañosos, cascadas, pozas naturales, miradores y gastronomía tradicional rural.
  - Los visitantes no tienen señal de telefonía en zonas de senderismo, perdiéndose o desistiendo de explorar.
- **Solución & Aporte Técnico**:
  - Motor de navegación y descarga de mapas de rutas **100% offline** mediante caching local.
  - Módulo de emergencias con botón SOS y hojas de advertencias ecológicas comunitarias.
  - Gamificación cultural: *"Pasaporte Chapaco"*, donde los exploradores desbloquean insignias, niveles y estadísticas conforme visitan destinos.
  - Escalabilidad planificada para expandirse de Tarija a nivel nacional en Bolivia.

---

## 2. 🏢 Cybercorp Task & Field Operations Management
*Plataforma de Coordinación de Cuadrillas Técnicas & Gestión de Servicios*

- **Categoría**: Field Operations · Web Application · Real-Time Tracking
- **Rol**: Desarrollador Fullstack / Prácticas Profesionales en Cybercorp
- **Stack Tecnológico**:
  - **Frontend**: React, TypeScript, Tailwind CSS, Componentes Modulares
  - **Backend Serverless**: Firebase (Firestore para base de datos NoSQL en tiempo real, Firebase Authentication, Storage)
  - **Integraciones**: APIs de Mapas & Geolocalización para asignación territorial
- **Problema que Resuelve**:
  - La coordinación de instalaciones de videovigilancia CCTV y redes corporativas se gestionaba de forma dispersa y en papel, generando cuellos de botella en la atención y pérdida de trazabilidad de presupuestos.
- **Solución & Aporte Técnico**:
  - Panel operativo centralizado para crear, despachar y monitorear tickets de servicio técnico con estados en vivo (*Pendiente*, *En Ruta*, *En Progreso*, *Completado*).
  - Geolocalización de técnicos y clientes sobre mapa interactivo para optimizar rutas de despacho en Tarija.
  - Búsqueda unificada de clientes con acceso inmediato a su historial de visitas, cotizaciones y presupuestos asociados.
- **Impacto**: Eliminó el registro manual en papel, otorgó trazabilidad inmediata a los directores de operaciones y redujo sustancialmente los tiempos de respuesta.

---

## 3. 🏗️ Construction Cost & Resource ERP ("Personal Ecosystem")
*Arquitectura de Microservicios para Presupuestación Paramétrica y Gestión de Obras*

- **Categoría**: Enterprise Backend Architecture · Cloud Microservices
- **Rol**: Arquitecto Backend & Líder Técnico
- **Stack Tecnológico**:
  - **Backend**: .NET 10 (C# / ASP.NET Core Web API), Clean Architecture (Dominio, Aplicación, Infraestructura)
  - **Patrones & Arquitectura**: Arquitectura de Microservicios, API Gateway, CQRS, RESTful APIs, Swagger/OpenAPI
  - **Seguridad**: Autenticación centralizada JWT con Control de Acceso Basado en Roles (RBAC)
  - **Frontend**: React (desarrollado por integrante de equipo coordinado)
- **Problema que Resuelve**:
  - Las constructoras sufren desviaciones presupuestarias por la complejidad de calcular dinámicamente precios unitarios desglosados en materiales (cemento, ladrillos, fierro), mano de obra calificada, impuestos y márgenes de ganancia.
- **Solución & Aporte Técnico**:
  - Motor de cotización paramétrica capaz de presupuestar elementos constructivos (columnas, losas, muros) hasta viviendas y obras completas.
  - Diseño desacoplado en microservicios independientes:
    1. `API Gateway`: Enrutamiento y control perimetral.
    2. `User & Organization API`: Gestión de identidades, permisos corporativos y tenencia.
    3. `Construction Management API`: Catálogo de recursos, fórmulas de rendimiento, insumos y reportes ejecutivos.
  - Liderazgo técnico: Definición de contratos de API, especificaciones OpenAPI/Swagger y coordinación del backlog técnico con el equipo.

---

## 4. 🎮 Dino Juego ("Di No")
*Videojuego Educativo y Cultural para Concurso Nacional Juvenil*

- **Categoría**: Game Development · Mobile Optimization · Cultural EdTech
- **Rol**: Desarrollador de Videojuegos & Lógica de Física/Render (Equipo EZ)
- **Stack Tecnológico**:
  - **Motor**: Unity Engine
  - **Lenguaje**: C#
  - **Principios**: Programación Orientada a Objetos, Arquitectura Modular SOLID
  - **Plataforma**: Android (APK ejecutable y optimizado)
- **Propósito & Concurso**:
  - Desarrollado para un concurso nacional enfocado en la prevención social, la no discriminación y la lucha contra las adicciones (jugando con la dualidad *"Dino"* = *"Di No a lo malo"*).
  - Recorrido geográfico y cultural: Niveles ambientados en los departamentos de Bolivia (Tarija, Potosí, La Paz, Cochabamba, Pando), integrando aprendizaje regional con mecánicas interactivas.
- **Aporte Técnico**:
  - Optimización de draw calls, compresión de texturas y gestión de memoria para asegurar rendimiento fluido a **60 FPS** estables en teléfonos Android gama media/baja.
- **Logro**: Clasificación exitosa a la segunda fase nacional eliminatoria del certamen.

---

## 5. ⚖️ JuezSinga
*Infraestructura de Juez Virtual Cerrado para Universidades & Simulación ICPC*

- **Categoría**: Competitive Programming Systems · Sandboxed Execution · Backend
- **Rol**: Creador & Arquitecto de Infraestructura
- **Inspiración**: Trayectoria como doble finalista regional sudamericano del ACM-ICPC (2024 y 2025)
- **Stack Tecnológico**:
  - **Backend**: C# / .NET 9 (migración planificada a .NET 10), ASP.NET Core Web API
  - **Motor de Evaluación**: **Judge0 CE** (motor robusto de sandboxing y ejecución de código en contenedores aislados)
  - **Base de Datos**: PostgreSQL
  - **Frontend (en camino)**: React + Tailwind CSS
- **Problema que Resuelve**:
  - Plataformas públicas como Codeforces o LeetCode no permiten a universidades o clubes locales gestionar bancos de problemas privados, torneos cerrados por equipos con reglas ICPC o laboratorios universitarios con servidores propios.
- **Solución & Aporte Técnico**:
  - Plataforma de juez en línea para competencias cerradas: creación de cuentas por equipos, simulación de scoreboard en vivo con tiempo de congelamiento (*freeze*) y control de penalizaciones.
  - Evaluación aislada de envíos en C++, Python y Java a través de Judge0 CE, controlando estrictamente Time Limit Exceeded (TLE), Memory Limit Exceeded (MLE) y Runtime Errors.
  - Diseñado para desplegarse como un ecosistema local universitario o para entrenamiento de equipos competitivos.
