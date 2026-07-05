import { CalendarDays, ClipboardList, HeartPulse, IdCard, Building2, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';
import { sesionMedico } from '../patterns/SesionMedicoSingleton.js';
import { medico as medicoBase } from '../data/datosSimulados.js';

export default function SidebarMedico() {
  const location = useLocation();
  const navigate = useNavigate();
  const medico = sesionMedico.obtenerMedico() || medicoBase;

  const cerrarSesion = () => {
    sesionMedico.cerrarSesion();
    navigate('/');
  };

  return (
    <aside className="sidebar">
      <Logo />
      <div className="doctor-card">
        <div className="doctor-avatar">CM<span></span></div>
        <h3>{medico.nombre}</h3>
        <p>{medico.especialidad}</p>
        <small className="online">● {medico.estado || 'En línea'}</small>
      </div>

      <nav className="menu-simple">
        <Link className={location.pathname.includes('agenda') ? 'active' : ''} to="/agenda">
          <CalendarDays size={20}/> Agenda del día
        </Link>
        <Link className={location.pathname.includes('historial') ? 'active' : ''} to="/historial/71234567">
          <ClipboardList size={20}/> Historial clínico
        </Link>
      </nav>

      <div className="doctor-info-mini">
        <div><HeartPulse size={18}/><span>Especialidad:<b>{medico.especialidad}</b></span></div>
        <div><IdCard size={18}/><span>CMP:<b>{medico.cmp}</b></span></div>
        <div><Building2 size={18}/><span>Sede:<b>{medico.sede}</b></span></div>
      </div>

      <button className="logout" onClick={cerrarSesion}><LogOut size={18}/> Cerrar sesión</button>
    </aside>
  );
}
