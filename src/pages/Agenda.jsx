import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Search, FileText, PlayCircle, Users } from 'lucide-react';
import SidebarMedico from '../components/SidebarMedico.jsx';
import EstadoBadge from '../components/EstadoBadge.jsx';
import { citas, pacientes, consultasPrevias } from '../data/datosSimulados.js';
import { obtenerHistorialCompleto } from '../services/ConsultaStorageService.js';

export default function Agenda() {
  const [busqueda, setBusqueda] = useState('');
  const [fecha, setFecha] = useState('2024-07-10');
  const [seleccion, setSeleccion] = useState(citas[0]);
  const navigate = useNavigate();

  const filas = useMemo(() => {
    return citas.map(cita => ({ ...cita, paciente: pacientes.find(p => p.dni === cita.dni) }))
      .filter(item => {
        const texto = `${item.dni} ${item.paciente?.nombres}`.toLowerCase();
        return texto.includes(busqueda.toLowerCase());
      });
  }, [busqueda]);

  const pacienteSeleccionado = pacientes.find(p => p.dni === seleccion.dni);
  const previas = obtenerHistorialCompleto(seleccion.dni, consultasPrevias[seleccion.dni] || []);

  const iniciarConsulta = () => navigate(`/historial/${seleccion.dni}`, { state: { cita: seleccion } });

  return (
    <div className="app-layout">
      <SidebarMedico />
      <main className="main-panel">
        <header className="page-header">
          <div className="title-block">
            <CalendarDays size={38}/>
            <div><h1>Agenda de citas del día</h1><p>Miércoles, 10 de julio de 2024</p></div>
          </div>
          <div className="counter"><Users size={26}/><span>Consultas del día:<b>9</b></span></div>
        </header>

        <section className="agenda-grid">
          <div className="content-card agenda-list">
            <div className="filters clean">
              <div className="searchbox"><Search size={21}/><input value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Buscar por nombre o DNI" /></div>
              <div className="datebox"><CalendarDays size={18}/><input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} /></div>
            </div>
            <h2>Citas programadas ({filas.length})</h2>
            <table className="medical-table">
              <thead><tr><th>Hora</th><th>DNI</th><th>Paciente</th><th>Motivo</th><th>Estado</th><th>Acciones</th></tr></thead>
              <tbody>
                {filas.map((item, idx) => (
                  <tr key={`${item.dni}-${item.hora}`} onClick={()=>setSeleccion(item)} className={seleccion.hora===item.hora && seleccion.dni===item.dni ? 'selected-row' : ''}>
                    <td>{item.hora}</td><td>{item.dni}</td><td>{item.paciente?.nombres}</td><td>{item.motivo}</td><td><EstadoBadge estado={item.estado}/></td>
                    <td className="actions"><button title="Ver historial" onClick={(e)=>{e.stopPropagation(); navigate(`/historial/${item.dni}`, { state: { cita: item, soloVer: true } });}}><FileText size={17}/></button><button className="primary-small" onClick={(e)=>{e.stopPropagation(); navigate(`/historial/${item.dni}`, { state: { cita: item } });}}>Atender</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="table-footer"><span>Mostrando {filas.length} citas programadas para el día 10/07/2024</span><span>Página 1 de 1</span></div>
          </div>

          <aside className="content-card patient-summary">
            <h2>Paciente seleccionado</h2>
            <div className="patient-name"><div className="initials">{pacienteSeleccionado?.nombres.split(' ').map(n=>n[0]).slice(0,2).join('')}</div><div><h3>{pacienteSeleccionado?.nombres}</h3><p>DNI: {pacienteSeleccionado?.dni} · Edad: {pacienteSeleccionado?.edad} años · {pacienteSeleccionado?.sexo}</p></div></div>
            <div className="summary-box"><h4>Resumen clínico</h4><p><b>Última consulta:</b> {previas[0]?.fecha || '-'}</p><p><b>Diagnóstico previo:</b> {previas[0]?.diagnostico || '-'}</p><p><b>Alergias:</b> {pacienteSeleccionado?.alergias}</p><p><b>Medicamentos actuales:</b> {pacienteSeleccionado?.medicamentosActuales}</p></div>
            <button className="link-button" onClick={()=>navigate(`/historial/${seleccion.dni}`, { state: { cita: seleccion, soloVer: true } })}>Ver historial completo →</button>
            <div className="selected-box"><h4>Cita seleccionada</h4><p><b>Fecha:</b> 10/07/2024</p><p><b>Hora:</b> {seleccion.hora}</p><p><b>Motivo:</b> {seleccion.motivo}</p><p><b>Estado:</b> <EstadoBadge estado={seleccion.estado}/></p></div>
            <button className="big-primary" onClick={iniciarConsulta}><PlayCircle size={21}/> Iniciar consulta</button>
            <p className="hint">Al iniciar la consulta podrás registrar el diagnóstico y generar la receta.</p>
          </aside>
        </section>
      </main>
    </div>
  );
}
