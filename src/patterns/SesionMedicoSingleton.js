// PATRÓN SINGLETON
// Mantiene una única sesión del médico y una única configuración de la clínica.
class SesionMedicoSingleton {
  static instancia = null;

  constructor() {
    if (SesionMedicoSingleton.instancia) return SesionMedicoSingleton.instancia;
    this.medico = null;
    this.configuracionClinica = null;
    SesionMedicoSingleton.instancia = this;
  }

  iniciarSesion(medico, configuracionClinica) {
    this.medico = medico;
    this.configuracionClinica = configuracionClinica;
  }

  obtenerMedico() {
    return this.medico;
  }

  obtenerConfiguracion() {
    return this.configuracionClinica;
  }

  cerrarSesion() {
    this.medico = null;
    this.configuracionClinica = null;
  }
}

export const sesionMedico = new SesionMedicoSingleton();
