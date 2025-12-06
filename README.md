# 70 Días Cumpliendo 70 ❤️

Un calendario de adviento especial para celebrar los 70 años de mamá. Cada día durante 70 días, se desbloquea una nueva pista que la guía hacia su regalo diario.

## 🎯 Características

- **Calendario interactivo de 70 días**: Comienza el 9 de diciembre de 2025 (su cumpleaños)
- **Sistema de desbloqueo diario**: Los días se desbloquean automáticamente según la fecha actual
- **Pistas personalizadas**: Cada día revela una pista sobre dónde encontrar el regalo
- **Diseño cálido y familiar**: Colores acogedores que transmiten amor y familia
- **Responsive**: Funciona perfectamente en móviles, tablets y ordenadores

## 🚀 Instalación y Uso

### Desarrollo Local

1. Las dependencias ya están instaladas. Para iniciar el servidor de desarrollo:
```bash
npm run dev
```

2. Abre tu navegador en `http://localhost:5173`

### Construcción para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

## 📝 Personalización

### Añadir los 70 días

El archivo `src/data/calendar.json` contiene actualmente solo 10 días de ejemplo. Necesitas completar los 70 días siguiendo esta estructura:

```json
{
  "day": 11,
  "date": "2025-12-19",
  "title": "Título del día",
  "clue": "La pista que indica dónde encontrar el regalo de hoy.",
  "image": null
}
```

**Importante**:
- Los días empiezan el 9 de diciembre de 2025
- Las fechas deben seguir el formato: "YYYY-MM-DD"
- Puedes añadir una imagen opcional poniendo la ruta en el campo `image` (ej: `"/images/day11.jpg"`)

### Añadir Imágenes

1. Crea una carpeta `public/images/` en la raíz del proyecto
2. Coloca tus imágenes allí (ej: `day3.jpg`, `day15.jpg`, etc.)
3. Referéncialas en el JSON como: `"/images/day3.jpg"`

### Cambiar Textos Principales

Edita el archivo `src/data/calendar.json`:

```json
{
  "title": "70 Días Cumpliendo 70",
  "subtitle": "Para la mejor mamá del mundo",
  "startDate": "2025-12-09",
  ...
}
```

### Modo de Prueba (Testing)

Para probar días futuros sin esperar, edita `src/App.jsx` y descomenta la línea 14:

```javascript
// Cambia esta línea (alrededor de la línea 14):
// setCurrentDate('2025-12-15');

// Por ejemplo, para probar el día 15:
setCurrentDate('2025-12-22'); // Esto desbloqueará los días 1-14
```

Recuerda comentarla de nuevo antes de publicar la aplicación.

## 🎨 Paleta de Colores

El diseño usa una paleta cálida y acogedora:
- **Rosa**: `from-rose-400` to `to-pink-500`
- **Naranja**: `from-orange-50`
- **Ámbar**: `via-amber-50`
- **Fondos claros**: Gradientes suaves de rosa, ámbar y naranja

## 📱 Estructura del Proyecto

```
aniversari70/
├── src/
│   ├── components/
│   │   ├── WelcomeScreen.jsx    # Pantalla de bienvenida
│   │   ├── CalendarGrid.jsx     # Cuadrícula del calendario
│   │   └── DayDetail.jsx        # Vista detalle de cada día
│   ├── data/
│   │   └── calendar.json        # Datos de los 70 días
│   ├── App.jsx                  # Componente principal
│   └── index.css                # Estilos globales
├── public/
│   └── images/                  # (crear) Carpeta para imágenes
└── index.html
```

## 💡 Consejos

1. **Completa los 70 días antes del 9 de diciembre**: Asegúrate de tener todas las pistas listas
2. **Prueba en diferentes dispositivos**: El calendario es responsive, pero es bueno verificar
3. **Guarda fotos familiares**: Puedes añadir fotos especiales para días importantes
4. **Personaliza las pistas**: Hazlas específicas y significativas para tu madre

## 🎁 Ideas de Regalo

Cada día puede incluir:
- Objetos pequeños (chocolates, notas, joyas)
- Experiencias (cupones para café juntos, paseo, cena)
- Recuerdos (fotos, cartas, objetos significativos)
- Detalles prácticos (productos de belleza, libros, plantas)

## 📦 Tecnologías Usadas

- **React**: Biblioteca de UI
- **Vite**: Build tool y dev server
- **Tailwind CSS 4**: Framework de estilos
- **Google Fonts**: Quicksand y Caveat para tipografía cálida

---

**Hecho con ❤️ para la mejor mamá del mundo**
