# Dirección de Arte & Desglose de Diseño (Portfolio V2)

Basado en la referencia visual `diseno-portfolio-v2.webp` y optimizado con las directrices de la skill **Impeccable** (modo *Experience & Persuade*).

---

## 1. Identidad Visual & Paleta de Color

- **Fondo General del Sitio**: Blanco roto cálido / off-white (`#F8F8F6` o `#FFFFFF`). Genera un contraste editorial limpio y de alto valor percibido.
- **Contenedores de Énfasis (Hero & Footer)**: Slate ultra-oscuro / negro grafito (`#101010` o `#121214`).
- **Color de Acento Principal**: Lima eléctrico / Chartreuse (`#D4F014` / `#CCFF00`).
  - *Uso*: Botones de acción primaria ("Hire Me", "Contáctame"), píldora activa de navegación, indicadores de estado.
- **Colores Secundarios & Texto**:
  - Títulos oscuros: `#111111`
  - Texto de apoyo / secundario: `#6E6E73` y `#8E8E93`
  - Bordes y divisores: `#E5E5EA` en zona clara, `rgba(255,255,255,0.1)` en zona oscura.
  - Insignia de saludo: Ámbar suave o blanco sobre fondo oscuro.

---

## 2. Tipografía & Ritmo Visual

- **Familia Tipográfica Principal**: Neo-Grotesque contemporánea (Satoshi, Plus Jakarta Sans, o Inter Display).
- **Jerarquía**:
  - `Hero Display`: ExtraBold (700/800), tracking ajustado (`-0.03em`), tamaño display grande.
  - `Intro Lead`: Texto bicolor (frases clave en `#111111` bold, texto secundario en `#8E8E93` medium).
  - `Badges / Chips`: Semibold, uppercase sutil o capitalize, tracking espaciado (`+0.02em`).

---

## 3. Anatomía de Componentes

### A. Navbar Flotante
- Monograma / isotipo a la izquierda en píldora o círculo.
- Menú central en píldora redondeada (`rounded-full`) con efecto glassmorphism suave (`backdrop-blur-md bg-white/70`).
- Botón derecho *"Let's talk"* con micro-interacción e icono de flecha `↗`.

### B. Hero Card (El componente estrella)
- Tarjeta gigante con bordes muy redondeados (`rounded-[32px]`).
- **Retrato del Desarrollador**: Ubicado en el centro-derecha, integrado con el fondo oscuro mediante viñeta suave.
- **Contenido Izquierdo**:
  - Saludo: *"Hey 👋 I'm Dani"*
  - Título Display: *"Designer & Developer"* (o *"Full-Stack & Creative Developer"*)
  - CTA Lima: *"Hire Me"* / *"Ver Proyectos"*
  - Métricas / Credenciales al pie de la tarjeta:
    - *"3+ Años de experiencia"*
    - *"15+ Proyectos completados"*
    - *"ICPC Regional Finalist"* (o métricas clave reales de tu perfil)
- **Floating Badge Superior**:
  - Píldora translúcida: *"EXP in: [React, Three.js, TypeScript, Tailwind]"*.

### C. Bloque de Introducción Editorial
- Indicador en vivo: `(Available for Work)` con pulso verde esmeralda.
- Declaración de posicionamiento con tipografía de alto impacto.

### D. Showcase de Servicios ("The coolest Services I provide!")
- Lista interactiva tipo acordeón / cards expansivas:
  1. **Frontend & UI/UX Engineering** (con vista previa del producto activo)
  2. **3D Web & Interactive Experiences**
  3. **Backend & Architecture**
  4. **Performance & Creative Tech**

### E. Showcase de Proyectos Destacados
- Tarjetas con gran escala visual, mockup de alta resolución, tags de tecnologías y llamada a la acción.

### F. Proceso de Trabajo & Certificados / Testimonios
- Pasos numerados con micro-ilustraciones minimalistas.
- Carrusel o grid de certificados ICPC, Google I/O, etc. (aprovechando los que ya tienes en `packages/shared-data`).

### G. Footer con Cierre de Alto Impacto
- Contenedor oscuro que cierra armónicamente con el Hero.
