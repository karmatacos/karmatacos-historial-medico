// PATRÓN PROTOTYPE
// Clona una plantilla base de receta y solo reemplaza los datos dinámicos.
export class PlantillaRecetaPrototype {
  constructor() {
    this.titulo = 'Vista previa de la receta médica';
    this.formato = 'RECETA-MEDICA-ESTANDAR';
    this.pie = 'Este documento es una vista previa generada por el sistema MundoSalud.';
  }

  clonar() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  generarConDatos({ clinica, medico, historia }) {
    const receta = this.clonar();
    receta.clinica = clinica;
    receta.medico = medico;
    receta.historia = historia;
    receta.numero = `RE-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    return receta;
  }
}
