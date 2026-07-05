# SIGHC - Clínica MundoSalud

Proyecto corregido según el alcance del profesor: flujo exclusivo del médico.

## Flujo implementado
1. Login del médico
2. Agenda de citas del día
3. Historial clínico / consulta médica activa
4. Vista previa de receta médica

## Patrones aplicados
- Singleton: sesión del médico y configuración de la clínica.
- Builder: construcción paso a paso de la consulta médica/historia clínica.
- Prototype: clonación de plantilla de receta médica.

## Principios SOLID aplicados
- SRP: cada componente o servicio tiene una única responsabilidad.
- OCP: los formatos de receta se pueden extender sin modificar la lógica principal.

## Importante
- No incluye recepción ni registro administrativo de pacientes.
- No incluye CRUD completo.
- El botón imprimir está deshabilitado: solo muestra la vista previa.

## Ejecutar
```bash
npm install
npm run dev
```


## Cambio adicional
- Se aplicó la imagen `public/assets/fondo-clinica.png` como fondo general en todas las pantallas.

## Función agregada: consultas anteriores
- El botón **Guardar consulta** ahora guarda la atención médica en `localStorage`.
- La nueva consulta aparece inmediatamente en **Consultas anteriores**.
- Al hacer clic en una consulta anterior se muestra su detalle: fecha, motivo, diagnóstico, tratamiento y observaciones.
- Esta parte sigue siendo simulada para la demostración; después puede cambiarse por Axios + Node.js + Express + MySQL sin modificar toda la pantalla.


## Corrección agregada: consultas anteriores
- Al seleccionar una consulta anterior desde el panel derecho, la pantalla principal cambia a modo **solo lectura**.
- Se muestran los datos de esa consulta anterior: fecha, hora, motivo, síntomas, signos vitales, diagnóstico, tratamiento, observaciones y próxima cita.
- Se agregó el botón **Volver a consulta actual** para regresar al formulario editable.
- Esta mejora mantiene SRP: el formulario actual registra la consulta y la vista de historial solo muestra datos anteriores.
