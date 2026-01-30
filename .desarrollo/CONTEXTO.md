# BruxGuard-Web - Contexto de Desarrollo

## Información General

| Campo | Valor |
|-------|-------|
| **Proyecto** | Landing page para BruxControl |
| **Tipo** | Web estática |
| **Stack** | HTML/CSS/JS + Docker + nginx:alpine |
| **Dominio** | bruxcontrol.com |
| **Servidor** | OVH 51.83.42.164 (ubuntu) |
| **Repo** | git@github.com:felixvela/bruxcontrol.git |
| **App relacionada** | /Users/felixvela/Documents/Proyectos/BruxGuard |

## Arquitectura de Producción

```
Usuario → bruxcontrol.com (HTTPS/443)
           ↓
       Nginx (reverse proxy + SSL)
           ↓
       Docker container (puerto 8080)
           ↓
       nginx:alpine sirviendo estáticos
```

## Estructura del Proyecto

```
BruxGuard-Web/
├── index.html          # Landing principal
├── css/                # Estilos
├── js/                 # JavaScript
├── images/             # Assets gráficos
├── locales/            # Traducciones (i18n)
├── privacy.html        # Política de privacidad
├── terms.html          # Términos de uso
├── llms.txt            # Info para LLMs
├── robots.txt          # SEO
├── sitemap.xml         # SEO
├── Dockerfile          # Build de imagen
├── docker-compose.yml  # Orquestación
├── deploy.sh           # Script despliegue
└── nginx.conf          # Config del servidor
```

## Comandos Útiles

### Deploy rápido
```bash
ssh ubuntu@51.83.42.164 "/home/ubuntu/bruxcontrol-web/deploy.sh"
```

### Verificar estado
```bash
ssh ubuntu@51.83.42.164 "docker ps | grep bruxcontrol"
```

---

## Historial de Trabajo

### 2025-01-30 - Sistema /desarrollo
#### Qué hice
- Inicializado archivo CONTEXTO.md para tracking de desarrollo

#### Archivos modificados
- `.desarrollo/CONTEXTO.md` (nuevo)

---

### 2025-01-30 - QA: Sincronización Web ↔ App
#### Qué hice
- Revisé la app de iPhone para verificar características reales
- Identifiqué inconsistencias entre web y app
- Corregí todos los números y características

#### Inconsistencias corregidas

| Aspecto | Antes (web) | Después (correcto) |
|---------|-------------|-------------------|
| Ejercicios | 15+ | 6 (3 gratis + 3 premium) |
| Masajes | 5 completas | 5 (2 gratis + 3 premium) |
| HealthKit | Mencionado en privacy | Eliminado |
| Analíticas avanzadas | Listado | Eliminado (no existe en app) |

#### Archivos modificados
- `index.html` - Stats bar, pricing section, schema.org
- `privacy.html` - Eliminada sección HealthKit
- `locales/es.json` - Actualizado pricing
- `locales/en.json` - Actualizado pricing
- `locales/fr.json` - Actualizado pricing
- `locales/de.json` - Actualizado pricing
- `locales/it.json` - Actualizado pricing
- `locales/pt.json` - Actualizado pricing
- `locales/ja.json` - Actualizado pricing

#### Datos reales de la app (verificados)

**Ejercicios (ExerciseType.swift)**:
| Ejercicio | Tipo |
|-----------|------|
| Nasal Breathing (4-7-8) | Gratis |
| Goldfish | Gratis |
| Tongue Posture | Gratis |
| Controlled Chewing | Premium |
| Neck Stretches | Premium |
| Progressive Relaxation | Premium |

**Masajes (MassageExercisesView.swift)**:
| Masaje | Tipo |
|--------|------|
| Masetero | Gratis |
| Temporal | Gratis |
| Cuello (SCM) | Premium |
| Suboccipital | Premium |
| Trigger Point | Premium |

---

### 2025-01-30 - Correcciones UI Hero
#### Qué hice
- Corregido link App Store: `https://apps.apple.com/us/app/bruxcontrol/id6758412940`
- Cambiado botón "Descargar Gratis" a `btn-white` para visibilidad
- Creado nuevo estilo `btn-outline-light` para "Ver cómo funciona"
- Botón "Descargar" ahora enlaza directo a App Store
- Actualizado llms.txt con datos correctos

#### Archivos modificados
- `index.html` - Links y clases de botones hero
- `css/styles.css` - Nuevo estilo btn-outline-light
- `llms.txt` - Link y características corregidas

#### Siguiente paso recomendado
- Deploy a producción para sincronizar cambios
- Verificar que privacy.html cumple requisitos Apple
