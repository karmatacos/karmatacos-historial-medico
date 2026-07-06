# SIGHC - Sistema de Historias Clinicas

Este proyecto es una aplicacion web para una clinica.  
El sistema esta enfocado en el trabajo del medico durante una atencion.

## Flujo principal

El sistema tiene estas pantallas:

1. Login del medico
2. Agenda medica
3. Historial clinico / Consulta activa
4. Vista previa de receta

El medico inicia sesion, revisa su agenda, atiende a un paciente, guarda la consulta y puede ver la receta generada.

## Tecnologias usadas

### Frontend

- React
- Vite
- Bootstrap
- React Router

### Backend

- Node.js
- Express
- MySQL2
- CORS
- Dotenv

### Base de datos

- MySQL

## Estructura del proyecto

```text
SIGHC_Corregido_Historial_Detalle/
├── backend/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── src/
│   ├── pages/
│   ├── patterns/
│   ├── components/
│   └── data/
│
├── package.json
└── README.md
```

## Patrones de diseño usados

### Singleton

Se usa para manejar una sola sesion del medico dentro del sistema.

Ejemplo:

```text
SesionMedicoSingleton
```

Sirve para guardar los datos del medico que inicio sesion.

### Builder

Se usa para construir la consulta medica paso a paso.

Ejemplo:

```text
HistoriaClinicaBuilder
```

Sirve para armar la consulta con motivo, sintomas, diagnostico, tratamiento y observaciones.

### Prototype

Se usa para generar una receta a partir de una plantilla base.

Ejemplo:

```text
PlantillaRecetaPrototype
```

Sirve para reutilizar una plantilla de receta y completar los datos del paciente.

## Principios SOLID usados

### SRP - Responsabilidad Unica

Cada parte del sistema tiene una funcion clara.

Ejemplos:

- Login: permite iniciar sesion.
- Agenda: muestra las citas.
- Historial clinico: muestra y guarda la consulta.
- Receta: muestra la receta generada.

### OCP - Abierto/Cerrado

El sistema puede crecer sin cambiar todo el codigo.

Ejemplos:

- Se pueden agregar nuevas secciones al historial.
- Se pueden agregar nuevos formatos de receta.
- Se pueden agregar mas filtros a la agenda.

## Conexion con MySQL

El sistema tiene una conexion basica a MySQL.

React no se conecta directamente a MySQL.  
La comunicacion funciona asi:

```text
React -> Backend Node.js/Express -> MySQL
```

Actualmente, el login del medico valida los datos desde MySQL.

## Crear la base de datos

En MySQL Workbench, ejecutar este codigo:

```sql
CREATE DATABASE IF NOT EXISTS sighc;
USE sighc;

CREATE TABLE IF NOT EXISTS medicos (
  id_medico INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  especialidad VARCHAR(100),
  cmp VARCHAR(20),
  usuario VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);

INSERT INTO medicos (nombre, especialidad, cmp, usuario, password)
VALUES ('Carlos Mendoza', 'Cardiologia', 'CMP 74582', 'doctor01', '123456');
```

Si aparece un error diciendo que el usuario ya existe, no hay problema.  
Eso significa que el registro ya fue creado antes.

## Configurar el backend

Dentro de la carpeta `backend`, crear un archivo llamado `.env`.

Debe tener esta estructura:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contrasena_de_mysql
DB_NAME=sighc
DB_PORT=3306
PORT=3001
```

El archivo `.env` no se sube a GitHub porque contiene datos privados.

## Ejecutar el backend

Abrir una terminal y entrar a la carpeta `backend`:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el servidor:

```bash
node server.js
```

El backend se abrira en:

```text
http://localhost:3001
```

Rutas para probar:

```text
http://localhost:3001/
http://localhost:3001/api/probar-db
http://localhost:3001/api/medicos
```

## Ejecutar el frontend

Abrir otra terminal en la carpeta principal del proyecto.

Instalar dependencias:

```bash
npm install
```

Ejecutar el frontend:

```bash
npm run dev
```

El frontend se abrira en una direccion parecida a:

```text
http://localhost:5173
```

## Usuario de prueba

Para iniciar sesion:

```text
Usuario: doctor01
Contraseña: 123456
```

## Estado del proyecto

El proyecto tiene:

- Frontend en React + Vite
- Backend en Node.js + Express
- Conexion basica a MySQL
- Login conectado a la base de datos
- Patrones Singleton, Builder y Prototype
- Principios SOLID SRP y OCP

## Nota

La conexion a MySQL se usa principalmente para validar el login del medico.  
Las demas pantallas siguen mostrando datos de prueba para demostrar el flujo del sistema.
