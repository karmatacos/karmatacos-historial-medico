import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sesionMedico } from '../patterns/SesionMedicoSingleton.js';
import { clinica } from '../data/datosSimulados.js';
import Logo from '../components/Logo.jsx';

export default function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const ingresar = async (e) => {
    e.preventDefault();

    if (!usuario.trim() || !password.trim()) {
      setError('Ingrese usuario y contraseña para continuar.');
      return;
    }

    try {
      setCargando(true);
      setError('');

      const respuesta = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario: usuario,
          password: password
        })
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        setError(data.mensaje || 'Usuario o contraseña incorrectos.');
        return;
      }

      // Singleton: se guarda una única sesión del médico autenticado desde MySQL.
      sesionMedico.iniciarSesion(data.medico, clinica);

      navigate('/agenda');
    } catch (error) {
      console.error(error);
      setError('No se pudo conectar con el backend.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="login-page">
      <div className="bg-doctor"></div>

      <form className="login-card" onSubmit={ingresar}>
        <Logo />

        <h1>Iniciar Sesión</h1>

        <label>Usuario</label>
        <input
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
          placeholder="Ingrese su usuario"
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
        />

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" disabled={cargando}>
          {cargando ? 'VALIDANDO...' : 'INICIAR SESIÓN'}
        </button>

        <small>Demo: usuario doctor01 / contraseña 123456.</small>
      </form>
    </main>
  );
}