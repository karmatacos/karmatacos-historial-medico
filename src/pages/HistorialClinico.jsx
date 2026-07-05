import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, Save, FileText, UserRound, RotateCcw } from 'lucide-react';
import SidebarMedico from '../components/SidebarMedico.jsx';
import { pacientes, consultasPrevias, clinica, medico } from '../data/datosSimulados.js';
import { HistoriaClinicaBuilder } from '../patterns/HistoriaClinicaBuilder.js';
import { generarRecetaDesdePlantilla } from '../services/GeneradorReceta.js';
import { guardarConsultaPaciente, obtenerHistorialCompleto } from '../services/ConsultaStorageService.js';

const consultaInicial = {
  motivo: 'Control de presión',
  sintomas: 'Paciente refiere sentirse bien en general. Niega cefalea, visión borrosa, dolor torácico, disnea o palpitaciones. Refiere adherencia al tratamiento indicado.',
  presion: '150/95 mmHg',
  temperatura: '36.7 °C',
  frecuencia: '82 lpm',
  saturacion: '98%',
  peso: '78 kg',
  diagnostico: 'Hipertensión arterial esencial no controlada. Paciente con cifras tensionales elevadas a pesar del tratamiento actual. Sin signos de daño a órgano blanco.',
  tratamiento: 'Ajustar tratamiento antihipertensivo. Reforzar medidas higiénico-dietéticas. Control en 4 semanas.',
  observaciones: 'Se recomienda monitoreo domiciliario de presión arterial y llevar registro. Acudir de inmediato si presenta síntomas de alarma.',
  proximaFecha: '2024-08-07',
  proximaHora: '08:30'
};

function obtenerCampoConsulta(consulta, campo, alternativa = '-') {
  if (!consulta) return alternativa;
  if (campo === 'presion') return consulta.signosVitales?.presion || consulta.presion || alternativa;
  if (campo === 'temperatura') return consulta.signosVitales?.temperatura || consulta.temperatura || alternativa;
  if (campo === 'frecuencia') return consulta.signosVitales?.frecuencia || consulta.frecuencia || alternativa;
  if (campo === 'saturacion') return consulta.signosVitales?.saturacion || consulta.saturacion || alternativa;
  if (campo === 'peso') return consulta.signosVitales?.peso || consulta.peso || alternativa;
  return consulta[campo] || alternativa;
}

function CampoLectura({ titulo, children }) {
  return (
    <div className="read-field">
      <span>{titulo}</span>
      <p>{children || '-'}</p>
    </div>
  );
}

export default function HistorialClinico() {
  const { dni } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const paciente = pacientes.find(p => p.dni === dni) || pacientes[0];
  const cita = state?.cita || { motivo: 'Control de presión', hora: '08:30 am' };

  const [historial, setHistorial] = useState(() => obtenerHistorialCompleto(dni, consultasPrevias[dni] || []));
  const [consultaSeleccionada, setConsultaSeleccionada] = useState(null);
  const [modoVista, setModoVista] = useState('actual');
  const [mensajeGuardado, setMensajeGuardado] = useState('');

  const [form, setForm] = useState({
    ...consultaInicial,
    motivo: cita.motivo || consultaInicial.motivo
  });

  useEffect(() => {
    const completo = obtenerHistorialCompleto(dni, consultasPrevias[dni] || []);
    setHistorial(completo);
    setConsultaSeleccionada(null);
    setModoVista('actual');
  }, [dni]);

  const cambiar = (campo, valor) => {
    setMensajeGuardado('');
    setModoVista('actual');
    setConsultaSeleccionada(null);
    setForm(prev => ({ ...prev, [campo]: valor }));
  };

  const historiaConstruida = useMemo(() => {
    return new HistoriaClinicaBuilder()
      .conPaciente(paciente)
      .conMotivo(form.motivo)
      .conSintomas(form.sintomas)
      .conSignosVitales({
        presion: form.presion,
        temperatura: form.temperatura,
        frecuencia: form.frecuencia,
        saturacion: form.saturacion,
        peso: form.peso
      })
      .conDiagnostico(form.diagnostico)
      .conTratamiento(form.tratamiento)
      .conObservaciones(form.observaciones)
      .conProximaCita({ fecha: form.proximaFecha, hora: form.proximaHora })
      .construir();
  }, [form, paciente]);

  const guardarConsulta = () => {
    const nuevaConsulta = {
      id: Date.now(),
      fecha: historiaConstruida.fechaAtencion,
      hora: historiaConstruida.horaAtencion,
      motivo: historiaConstruida.motivo,
      sintomas: historiaConstruida.sintomas,
      diagnostico: historiaConstruida.diagnostico,
      tratamiento: historiaConstruida.tratamiento,
      receta: historiaConstruida.tratamiento,
      observaciones: historiaConstruida.observaciones,
      signosVitales: historiaConstruida.signosVitales,
      proximaCita: historiaConstruida.proximaCita,
      origen: 'Consulta guardada'
    };

    guardarConsultaPaciente(paciente.dni, nuevaConsulta);
    const completo = obtenerHistorialCompleto(paciente.dni, consultasPrevias[paciente.dni] || []);
    setHistorial(completo);
    setConsultaSeleccionada(nuevaConsulta);
    setModoVista('anterior');
    setMensajeGuardado('Consulta guardada. Se agregó al historial y puedes verla como consulta anterior.');
  };

  const generarReceta = () => {
    const receta = generarRecetaDesdePlantilla({ clinica, medico, historia: historiaConstruida });
    navigate('/receta', { state: { receta } });
  };

  const verConsultaAnterior = (consulta) => {
    setMensajeGuardado('');
    setConsultaSeleccionada(consulta);
    setModoVista('anterior');
  };

  const volverConsultaActual = () => {
    setConsultaSeleccionada(null);
    setModoVista('actual');
  };

  const esVistaAnterior = modoVista === 'anterior' && consultaSeleccionada;

  return (
    <div className="app-layout">
      <SidebarMedico />
      <main className="main-panel">
        <header className="page-title-simple">
          <h1>Historial clínico del paciente</h1>
          <p>{esVistaAnterior ? `Consulta anterior · ${consultaSeleccionada.fecha}` : 'Consulta médica activa · Miércoles, 10 de julio de 2024'}</p>
        </header>

        <section className="historial-grid">
          <div className="historial-main">
            <div className="content-card patient-data-card">
              <div className="patient-icon"><UserRound size={32}/></div>
              <div className="patient-data-grid">
                <div><span>Paciente</span><b>{paciente.nombres}</b></div>
                <div><span>DNI</span><b>{paciente.dni}</b></div>
                <div><span>Edad</span><b>{paciente.edad} años</b></div>
                <div><span>Sexo</span><b>{paciente.sexo}</b></div>
                <div><span>Fecha de nacimiento</span><b>{paciente.fechaNacimiento}</b></div>
                <div><span>Grupo sanguíneo</span><b>{paciente.grupoSanguineo}</b></div>
                <div><span>Teléfono</span><b>{paciente.telefono}</b></div>
              </div>
              <div className="alerts-row">
                <strong>Alertas médicas</strong>
                <span className="medical-alert danger"><AlertTriangle size={17}/> Alergia: {paciente.alergias}</span>
                <span className="medical-alert warning"><AlertTriangle size={17}/> Antecedente: {paciente.antecedentes}</span>
              </div>
            </div>

            <div className="content-card form-card">
              {mensajeGuardado && <div className="save-banner"><Save size={17}/> {mensajeGuardado}</div>}

              {esVistaAnterior ? (
                <div className="consulta-anterior-view">
                  <div className="read-mode-header">
                    <div>
                      <h2>Detalle de consulta anterior</h2>
                      <p>Vista de solo lectura. No modifica la consulta actual.</p>
                    </div>
                    <button className="secondary" onClick={volverConsultaActual}>
                      <RotateCcw size={17}/> Volver a consulta actual
                    </button>
                  </div>

                  <div className="read-grid">
                    <CampoLectura titulo="Fecha">{consultaSeleccionada.fecha}</CampoLectura>
                    <CampoLectura titulo="Hora">{consultaSeleccionada.hora}</CampoLectura>
                    <CampoLectura titulo="Motivo de consulta">{consultaSeleccionada.motivo}</CampoLectura>
                    <CampoLectura titulo="Síntomas">{consultaSeleccionada.sintomas || 'No registrado en esta consulta anterior.'}</CampoLectura>
                  </div>

                  <h3>Signos vitales registrados</h3>
                  <div className="read-vitals-grid">
                    <CampoLectura titulo="Presión arterial">{obtenerCampoConsulta(consultaSeleccionada, 'presion')}</CampoLectura>
                    <CampoLectura titulo="Temperatura">{obtenerCampoConsulta(consultaSeleccionada, 'temperatura')}</CampoLectura>
                    <CampoLectura titulo="Frecuencia cardiaca">{obtenerCampoConsulta(consultaSeleccionada, 'frecuencia')}</CampoLectura>
                    <CampoLectura titulo="Saturación">{obtenerCampoConsulta(consultaSeleccionada, 'saturacion')}</CampoLectura>
                    <CampoLectura titulo="Peso">{obtenerCampoConsulta(consultaSeleccionada, 'peso')}</CampoLectura>
                  </div>

                  <div className="read-grid">
                    <CampoLectura titulo="Diagnóstico">{consultaSeleccionada.diagnostico}</CampoLectura>
                    <CampoLectura titulo="Tratamiento / Receta">{consultaSeleccionada.tratamiento || consultaSeleccionada.receta}</CampoLectura>
                    <CampoLectura titulo="Observaciones médicas">{consultaSeleccionada.observaciones || 'Sin observaciones registradas.'}</CampoLectura>
                    <CampoLectura titulo="Próxima cita">
                      {consultaSeleccionada.proximaCita?.fecha
                        ? `${consultaSeleccionada.proximaCita.fecha} · ${consultaSeleccionada.proximaCita.hora || ''}`
                        : 'No registrada'}
                    </CampoLectura>
                  </div>
                </div>
              ) : (
                <>
                  <div className="form-two">
                    <label>Motivo de consulta<textarea value={form.motivo} onChange={e=>cambiar('motivo', e.target.value)} /></label>
                    <label>Síntomas<textarea value={form.sintomas} onChange={e=>cambiar('sintomas', e.target.value)} /></label>
                  </div>
                  <h3>Signos vitales</h3>
                  <div className="vitals-grid">
                    <label>Presión arterial<input value={form.presion} onChange={e=>cambiar('presion', e.target.value)} /></label>
                    <label>Temperatura<input value={form.temperatura} onChange={e=>cambiar('temperatura', e.target.value)} /></label>
                    <label>Frecuencia cardiaca<input value={form.frecuencia} onChange={e=>cambiar('frecuencia', e.target.value)} /></label>
                    <label>Saturación<input value={form.saturacion} onChange={e=>cambiar('saturacion', e.target.value)} /></label>
                    <label>Peso<input value={form.peso} onChange={e=>cambiar('peso', e.target.value)} /></label>
                  </div>
                  <div className="form-two">
                    <label>Diagnóstico<textarea value={form.diagnostico} onChange={e=>cambiar('diagnostico', e.target.value)} /></label>
                    <label>Tratamiento / Receta<textarea value={form.tratamiento} onChange={e=>cambiar('tratamiento', e.target.value)} /></label>
                  </div>
                  <div className="form-two bottom">
                    <label>Observaciones médicas<textarea value={form.observaciones} onChange={e=>cambiar('observaciones', e.target.value)} /></label>
                    <div className="next-appointment">
                      <label>Próxima cita<input type="date" value={form.proximaFecha} onChange={e=>cambiar('proximaFecha', e.target.value)} /></label>
                      <label>Hora<input type="time" value={form.proximaHora} onChange={e=>cambiar('proximaHora', e.target.value)} /></label>
                    </div>
                  </div>
                  <div className="form-actions">
                    <button className="secondary" onClick={()=>navigate('/agenda')}>Cancelar</button>
                    <button className="primary" onClick={guardarConsulta}><Save size={18}/> Guardar consulta</button>
                    <button className="primary" onClick={generarReceta}><FileText size={18}/> Generar receta</button>
                  </div>
                </>
              )}
            </div>
          </div>

          <aside className="content-card history-summary">
            <h2>Resumen del historial</h2>
            <h4>Consultas anteriores</h4>
            <p className="history-note">Haz clic en una consulta para cargar su detalle en la pantalla principal.</p>
            <div className="timeline">
              {historial.map((c) => {
                const seleccionado = consultaSeleccionada === c || (consultaSeleccionada?.id && consultaSeleccionada.id === c.id);
                return (
                  <button
                    className={`timeline-item timeline-button ${seleccionado ? 'selected-timeline' : ''}`}
                    key={`${c.id || c.fecha}-${c.motivo}`}
                    onClick={() => verConsultaAnterior(c)}
                  >
                    <span></span>
                    <div><b>{c.fecha}</b><p>{c.motivo}</p></div>
                    <FileText size={18}/>
                  </button>
                );
              })}
            </div>

            {esVistaAnterior && (
              <button className="link-button back-current" onClick={volverConsultaActual}>
                Volver a consulta actual →
              </button>
            )}

            <hr />
            <h4>Última receta</h4>
            <div className="last-prescription detail-box">
              {historial[0] ? (
                <>
                  <p><b>Fecha:</b> {historial[0].fecha}</p>
                  <p><b>Motivo:</b> {historial[0].motivo}</p>
                  <p><b>Tratamiento:</b> {historial[0].tratamiento || historial[0].receta || '-'}</p>
                </>
              ) : <p>No hay recetas anteriores.</p>}
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
