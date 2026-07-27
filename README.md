# Parabank Test Automation Suite

Este proyecto es una suite de pruebas automatizadas para la plataforma bancaria **Parabank**, cubriendo tanto la interfaz de usuario (UI) como servicios web (API). Está desarrollado utilizando **Playwright** y **JavaScript**, implementando patrones de diseño avanzados como Page Object Model (POM) para UI y API Clients para servicios.

---

## Estructura del Proyecto

*   `.github/workflows/`: Configuración de GitHub Actions para el pipeline de CI.
*   `api/`: Cliente HTTP (`BankApiClient.js`) para peticiones directas al backend.
*   `data/`: Archivos JSON con los datos de las pruebas (usuarios, montos, etc.).
*   `fixtures/`: Inicialización de páginas y setup global de Playwright.
*   `pages/`: Clases POM (Page Object Model) con selectores y acciones de la UI.
*   `tests/`: Casos de prueba ordenados en carpetas `api/` y `ui/`.

---

## Justificación de Tecnologías

*   **Playwright:** Elegido debido a su velocidad de ejecución natively paralela, auto-waiting integrado, soporte multiplataforma listo para usar y herramientas de trace debugging.
*   **JavaScript:** Compatibilidad nativa con la infraestructura moderna de desarrollo de software.
*   **Page Object Model (POM):** Implementado para desacoplar la estructura HTML de la lógica de los tests, garantizando alta mantenibilidad y reduciendo la duplicidad de selectores.
*   **API Client Pattern:** Centraliza las peticiones de servicios REST para simplificar los flujos encadenados y el manejo de cabeceras.

---

## Configuración y Requisitos

### Requisitos Previos
*   [Node.js](versión 18 o superior recomendada)
*   npm (incluido por defecto con Node.js)

### Instalación
Clona o descarga este repositorio y ejecuta el siguiente comando en la terminal de la raíz para instalar las dependencias y los navegadores necesarios:

```bash
# Instalar dependencias del proyecto
npm install

# Instalar navegadores de Playwright con dependencias del sistema
npx playwright install --with-deps
```

---

## Ejecución de Pruebas

### 1. Ejecutar toda la suite de pruebas (UI y API)
```bash
npx playwright test
```

### 2. Ejecutar pruebas en un navegador específico (ej. Chromium)
```bash
npx playwright test --project=chromium
```

### 3. Ejecutar subconjuntos de pruebas (por archivo o tags)
*   **Solo pruebas de UI:**
    ```bash
    npx playwright test tests/ui/
    ```
*   **Solo pruebas de API:**
    ```bash
    npx playwright test tests/api/
    ```
*   **Correr una prueba específica por título:**
    ```bash
    npx playwright test -g "TC-06"
    ```

### 4. Modo Interactivo (UI Mode)
Para abrir el panel interactivo visual de Playwright y ver trazas, grabaciones y llamadas de red en tiempo real:
```bash
npx playwright test --ui
```

---

## Configuración Dinámica de Entornos

Las URLs base son dinámicas y se configuran mediante variables de entorno en lugar de estar harcodeadas en las clases. Puedes cambiarlas antes de la ejecución:

```bash
# Cambiar el servidor de pruebas para UI y API en Windows (PowerShell)
$env:BASE_URL="https://mi-servidor-staging.com/parabank/index.htm"
$env:API_BASE_URL="https://mi-servidor-staging.com/parabank/services/bank"
npx playwright test
```

---

## Estrategia de Datos de Prueba

Los datos se manejan mediante JSONs estructurados en la carpeta `data/` (`users.json`, `registerData.json`, `transferData.json`, `billPayData.json`). El framework implementa una estrategia mixta:
1.  **Datos estáticos centralizados:** Para credenciales constantes y configuraciones conocidas.
2.  **Datos dinámicos en tiempo de ejecución:** Campos críticos como nombres de usuario, números de Seguro Social (SSN), teléfonos e identificadores de cuentas se generan o se recuperan en tiempo real a través de APIs/UI para garantizar que las ejecuciones en paralelo e independientes no colisionen ni requieran limpiezas de base de datos manuales.

---

## Integración Continua (CI)

El proyecto incluye un pipeline listo para producción utilizando **GitHub Actions** en `.github/workflows/playwright.yml`. Este pipeline:
*   Se ejecuta automáticamente en cada `push` o `pull_request` hacia las ramas principales (`main` o `master`).
*   Instala de manera limpia todas las dependencias y binarios de los navegadores.
*   Ejecuta la suite completa de pruebas.
*   Publica el reporte interactivo HTML de Playwright como un artefacto descargable.

---

## Casos de Prueba

Antes de escribir una sola linea de codigo, se diseno el conjunto completo de casos de prueba. El archivo `Blossom_QE_Test_Cases - Test Cases.csv` (en la raiz del proyecto) contiene los 15 casos cubiertos por la suite, organizados con su ID, titulo, tipo (UI o API), tag de categoria, prioridad, pasos y resultado esperado.

Es el punto de partida: si quieres entender que se esta probando y por que, empieza ahi antes de revisar el codigo.

---

## Reporte de Resultados y Evidencia Visual

Al finalizar cada ejecucion, Playwright genera un reporte interactivo en HTML. Para verlo:

1. Ve a la pestana **Actions** en el repositorio de GitHub.
2. Abre la ultima ejecucion completada.
3. En la seccion **Artifacts** al final de la pagina, descarga el archivo `playwright-report`.
4. Descomprimelo y abre el archivo `index.html` en tu navegador.

Dentro del reporte podras ver el resultado de cada caso de prueba. Para los tests de interfaz de usuario que fallan, Playwright captura automaticamente:
*   Una **captura de pantalla** del momento exacto del fallo.
*   Un **video** completo de la navegacion desde el inicio del test.
*   Una **traza interactiva** que permite reproducir paso a paso lo que hizo el test.

Todo esto queda embebido directamente en el reporte, sin necesidad de configuracion adicional.

