import { useLocation, useNavigate } from 'react-router-dom';
import SidebarMedico from '../components/SidebarMedico.jsx';
import { clinica, medico, pacientes } from '../data/datosSimulados.js';
import { generarRecetaDesdePlantilla } from '../services/GeneradorReceta.js';

export default function RecetaPreview() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const receta = state?.receta || generarRecetaDesdePlantilla({
    clinica,
    medico,
    historia: {
      paciente: pacientes[0],
      diagnostico: 'Hipertensión arterial esencial no controlada.',
      tratamiento: 'Losartán 50 mg diario. Control en 4 semanas.',
      fechaAtencion: '10/07/2024'
    }
  });

  const imprimirDeshabilitado = () => {
    alert('La impresión está deshabilitada para esta versión. Solo se muestra la vista previa.');
  };

  return (
    <div className="app-layout receta-bg">
      <SidebarMedico />
      <main className="main-panel receta-panel">
        <div className="modal-overlay-soft">
          <section className="receta-card">
            <header className="receta-header">
              <strong>{receta.clinica.logo}</strong>
              <h1>{receta.titulo}</h1>
            </header>
            <div className="receta-top">
              <div><p><b>RUC:</b> {receta.clinica.ruc}</p><p><b>DIRECCIÓN:</b> {receta.clinica.direccion}</p></div>
              <div><p><b>RECETA MÉDICA:</b> N° {receta.numero}</p></div>
            </div>
            <div className="receta-body">
              <div><p><b>PACIENTE:</b> {receta.historia.paciente.nombres}</p><p><b>DNI:</b> {receta.historia.paciente.dni}</p></div>
              <div><p><b>FECHA:</b> {receta.historia.fechaAtencion || '10/07/2024'}</p><p><b>MÉDICO:</b> {receta.medico.nombre}</p></div>
              <div><h3>DIAGNÓSTICO CLÍNICO:</h3><p>{receta.historia.diagnostico}</p></div>
              <div><h3>TRATAMIENTO Y PRESCRIPCIÓN:</h3><p>{receta.historia.tratamiento}</p></div>
            </div>
            <footer className="receta-footer">
              <p>“{receta.pie}”</p>
              <div className="firma"><b>Firma digital</b><span>{receta.clinica.firmaDigital}</span><small>{receta.medico.nombre} · CMP {receta.medico.cmp}</small></div>
            </footer>
            <div className="receta-actions"><button onClick={()=>navigate('/historial/71234567')}>CANCELAR</button><button onClick={imprimirDeshabilitado}>IMPRIMIR</button></div>
          </section>
        </div>
      </main>
    </div>
  );
}
