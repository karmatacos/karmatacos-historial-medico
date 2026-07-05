import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sesionMedico } from '../patterns/SesionMedicoSingleton.js';
import { medico, clinica } from '../data/datosSimulados.js';
import Logo from '../components/Logo.jsx';

export default function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const ingresar = (e) => {
    e.preventDefault();
    if (!usuario.trim() || !password.trim()) {
      setError('Ingrese usuario y contraseña para continuar.');
      return;
    }
    // Singleton: se crea/carga una única sesión del médico.
    sesionMedico.iniciarSesion(medico, clinica);
    navigate('/agenda');
  };

  return (
    <main className="login-page">
      <div className="bg-doctor"></div>
      <form className="login-card" onSubmit={ingresar}>
        <Logo />
        <h1>Iniciar Sesión</h1>
        <label>Usuario</label>
        <input value={usuario} onChange={e=>setUsuario(e.target.value)} placeholder="Ingrese su DNI" />
        <label>Contraseña</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Ingrese su contraseña" />
        {error && <p className="error-msg">{error}</p>}
        <button type="submit">INICIAR SESIÓN</button>
        <small>Demo: escriba cualquier usuario y contraseña.</small>
      </form>
    </main>
  );
}
