export const medico = {
  id: 1,
  nombre: 'Dr. Carlos Mendoza',
  especialidad: 'Cardiología',
  cmp: '74582',
  sede: 'Central',
  estado: 'En línea'
};

export const clinica = {
  nombre: 'Clínica MundoSalud',
  ruc: '2060234567',
  direccion: 'Av. Salaverry 1450',
  logo: 'Clínica+ MundoSalud',
  firmaDigital: 'Firma digital autorizada por Clínica MundoSalud'
};

export const pacientes = [
  {
    dni: '71234567',
    nombres: 'Juan Carlos Pérez Quispe',
    edad: 45,
    sexo: 'Masculino',
    telefono: '987 654 321',
    direccion: 'Av. Los Olivos 123',
    fechaNacimiento: '14/03/1979',
    grupoSanguineo: 'O+',
    alergias: 'Penicilina',
    antecedentes: 'Hipertensión arterial',
    medicamentosActuales: 'Losartán 50 mg (diario)'
  },
  {
    dni: '45896321',
    nombres: 'María Elena Flores Ruiz',
    edad: 38,
    sexo: 'Femenino',
    telefono: '999 111 222',
    direccion: 'Jr. Los Sauces 240',
    fechaNacimiento: '01/09/1986',
    grupoSanguineo: 'A+',
    alergias: 'Ninguna conocida',
    antecedentes: 'Dolor torácico recurrente',
    medicamentosActuales: 'Ninguno'
  },
  {
    dni: '10235689',
    nombres: 'Ana Sofía Ramos Torres',
    edad: 29,
    sexo: 'Femenino',
    telefono: '988 223 114',
    direccion: 'Calle Los Pinos 450',
    fechaNacimiento: '22/01/1995',
    grupoSanguineo: 'B+',
    alergias: 'Ninguna conocida',
    antecedentes: 'Lectura de análisis',
    medicamentosActuales: 'Ninguno'
  },
  {
    dni: '75315986',
    nombres: 'Luis Alberto García Molina',
    edad: 52,
    sexo: 'Masculino',
    telefono: '955 444 333',
    direccion: 'Av. Brasil 780',
    fechaNacimiento: '17/07/1972',
    grupoSanguineo: 'AB+',
    alergias: 'Ninguna conocida',
    antecedentes: 'Control de presión',
    medicamentosActuales: 'Amlodipino 5 mg'
  }
];

export const citas = [
  { hora: '08:30 am', dni: '71234567', motivo: 'Control de presión', estado: 'En espera' },
  { hora: '09:30 am', dni: '45896321', motivo: 'Dolor torácico', estado: 'Confirmado' },
  { hora: '10:30 am', dni: '10235689', motivo: 'Lectura de análisis', estado: 'Confirmado' },
  { hora: '11:30 am', dni: '71234567', motivo: 'Chequeo general', estado: 'En espera' },
  { hora: '12:30 pm', dni: '75315986', motivo: 'Control de presión', estado: 'Confirmado' },
  { hora: '02:30 pm', dni: '45896321', motivo: 'Control de presión', estado: 'En espera' },
  { hora: '03:30 pm', dni: '71234567', motivo: 'Control de presión', estado: 'Confirmado' },
  { hora: '05:30 pm', dni: '71234567', motivo: 'Control de presión', estado: 'Confirmado' },
  { hora: '06:30 pm', dni: '71234567', motivo: 'Seguimiento', estado: 'En espera' }
];

export const consultasPrevias = {
  '71234567': [
    { fecha: '18/06/2024', motivo: 'Control de presión', diagnostico: 'Hipertensión arterial', receta: 'Losartán 50 mg (diario)' },
    { fecha: '02/05/2024', motivo: 'Dolor torácico', diagnostico: 'Dolor torácico no específico', receta: 'Reposo y control médico' },
    { fecha: '14/03/2024', motivo: 'Lectura de análisis', diagnostico: 'Resultados dentro de rango', receta: 'Continuar control' }
  ],
  '45896321': [
    { fecha: '20/06/2024', motivo: 'Dolor torácico', diagnostico: 'Evaluación cardiológica', receta: 'Control en 7 días' }
  ],
  '10235689': [
    { fecha: '10/06/2024', motivo: 'Lectura de análisis', diagnostico: 'Sin hallazgos de alarma', receta: 'Control preventivo' }
  ],
  '75315986': [
    { fecha: '05/06/2024', motivo: 'Control de presión', diagnostico: 'Presión controlada', receta: 'Continuar tratamiento' }
  ]
};
