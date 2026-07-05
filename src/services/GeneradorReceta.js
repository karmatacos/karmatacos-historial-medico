// SRP: este servicio solo se encarga de generar recetas.
// OCP: para agregar nuevos formatos, se puede crear otra plantilla sin modificar este generador.
import { PlantillaRecetaPrototype } from '../patterns/PlantillaRecetaPrototype.js';

export function generarRecetaDesdePlantilla(datos) {
  const plantilla = new PlantillaRecetaPrototype();
  return plantilla.generarConDatos(datos);
}
