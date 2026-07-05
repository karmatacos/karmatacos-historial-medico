// Servicio de historial simulado
// SRP: este archivo solo se encarga de guardar y leer consultas en memoria local.
// Luego se puede reemplazar por Axios + Node + MySQL sin cambiar las pantallas.
const STORAGE_KEY = 'sighc_consultas_guardadas';

function leerTodo() {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function guardarTodo(data) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function obtenerConsultasGuardadas(dni) {
  const data = leerTodo();
  return data[dni] || [];
}

export function obtenerHistorialCompleto(dni, consultasBase = []) {
  const guardadas = obtenerConsultasGuardadas(dni);
  return [...guardadas, ...consultasBase];
}

export function guardarConsultaPaciente(dni, consulta) {
  const data = leerTodo();
  const consultas = data[dni] || [];
  data[dni] = [consulta, ...consultas];
  guardarTodo(data);
  return data[dni];
}
