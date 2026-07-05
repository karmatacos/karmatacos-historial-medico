// PATRÓN BUILDER
// Construye la consulta médica/historia clínica paso a paso.
export class HistoriaClinicaBuilder {
  constructor() {
    this.historia = {};
  }

  conPaciente(paciente) {
    this.historia.paciente = paciente;
    return this;
  }

  conMotivo(motivo) {
    this.historia.motivo = motivo;
    return this;
  }

  conSintomas(sintomas) {
    this.historia.sintomas = sintomas;
    return this;
  }

  conSignosVitales(signosVitales) {
    this.historia.signosVitales = signosVitales;
    return this;
  }

  conDiagnostico(diagnostico) {
    this.historia.diagnostico = diagnostico;
    return this;
  }

  conTratamiento(tratamiento) {
    this.historia.tratamiento = tratamiento;
    return this;
  }

  conObservaciones(observaciones) {
    this.historia.observaciones = observaciones;
    return this;
  }

  conProximaCita(proximaCita) {
    this.historia.proximaCita = proximaCita;
    return this;
  }

  construir() {
    return {
      ...this.historia,
      fechaAtencion: new Date().toLocaleDateString('es-PE'),
      horaAtencion: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
    };
  }
}
