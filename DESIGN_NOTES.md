# Notas de Diseno Tecnico

Durante el desarrollo de esta suite encontre decisiones que vale la pena documentar, porque no siempre la solucion obvia fue la correcta. Esto es un resumen de lo que aprendi y lo que haria diferente.

---

## 1. Decisiones Clave de Diseno

**POM separado del cliente de API**

La primera decision fue no mezclar las llamadas HTTP con las interacciones de interfaz. Cada cosa vive en su lugar: las paginas de UI en `/pages`, y el cliente REST en `/api/BankApiClient.js`. Cuando algo falla, sabes exactamente donde buscar sin tener que rastrear el problema entre capas.

**Fixtures de Playwright en lugar de instancias manuales**

En vez de hacer `new LoginPage()` dentro de cada test, movimos toda esa logica a `testFixtures.js`. El resultado es que los tests quedaron mucho mas limpios: solo describen el comportamiento esperado, no como configurar el entorno. Hace una diferencia enorme cuando el numero de specs crece.

**Datos generados en ejecucion, no fijos en JSON**

Al principio usabamos datos estaticos para el registro de usuarios y los tests empezaron a chocar entre si cuando corrian en paralelo. Parabank tiene una limitacion rara: trunca los nombres de usuario a 20 caracteres y los considera duplicados. Tuvimos que generar nombres cortos tipo `usr_[random]` en tiempo real para que cada ejecucion fuera completamente independiente.

---

## 2. Como Prevenimos Inestabilidad (Flakiness)

El mayor problema de esta suite es el servidor publico de Parabank: es lento, se congela y a veces simplemente no responde. Estas son las formas en que el framework lo maneja:

**Esperas por estado, no por tiempo**

Nunca usamos `sleep()` o `waitForTimeout()`. En su lugar, esperamos que los elementos esten visibles antes de interactuar con ellos (`waitFor({ state: 'visible' })`). Si la pagina tarda, la prueba espera. Si nunca llega, la prueba falla con un mensaje claro.

**Generacion de datos unicos por ejecucion**

El SSN, el telefono y el nombre de usuario se generan con numeros aleatorios en cada corrida. Esto nos salvo de una clase entera de problemas donde Parabank rechazaba registros porque ya existian datos similares de una ejecucion anterior.

**Aserciones con reintentos nativos**

Las aserciones de Playwright como `expect(locator).toBeVisible()` no verifican una sola vez y fallan: reintentan por varios segundos antes de darse por vencidas. Eso absorbe los pequeños retrasos de red sin agregar logica extra al test.

---

## 3. Si el Equipo Creciera a 500 Tests

Lo primero que cambiaria no es el codigo, sino la organizacion:

**Tags por tipo de prueba**

Necesitariamos poder correr `@smoke` en 2 minutos y `@regression` completo de noche. Sin etiquetas, el pipeline se convierte en un cuello de botella y los devs dejan de confiar en el.

**Ambiente dedicado o instancia local de Parabank**

El servidor publico no aguanta carga paralela. Con 500 tests corriendo, seria inutilizable. La prioridad seria levantar una instancia propia de Parabank con Docker o usar mocking a nivel de red para no depender de un servidor externo.

**Setup global de datos**

Ahora cada test de registro crea su propio usuario. Con 500 tests, eso es demasiado trabajo repetido. Un `globalSetup` que prepare el estado inicial una sola vez reduciria el tiempo de ejecucion significativamente.

---

## 4. Con Dos Semanas Mas

**Mocking de la API de Parabank**

Es lo que mas falta hace. Con `page.route()` de Playwright podemos interceptar y simular respuestas del backend sin tocar el servidor real. Los tests de UI serian mucho mas rapidos y completamente estables sin importar si el servidor esta caido o no.

**Credenciales fuera del repositorio**

Los usuarios y contrasenas de prueba estan en archivos JSON dentro del repo. No es ideal. Con mas tiempo, moveria eso a variables de entorno y usaria GitHub Secrets para que no queden expuestos en el historial de commits.

**Reportes con historial**

El reporte HTML de Playwright es bueno para una sola ejecucion, pero no te dice si un test lleva 3 dias fallando o si empeoro despues de un cambio. Integraria Allure o algo similar para tener una vista de tendencias a lo largo del tiempo.
