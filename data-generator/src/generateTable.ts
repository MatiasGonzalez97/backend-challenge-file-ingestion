import dotenv from 'dotenv';
dotenv.config();

import mssql from 'mssql';
import sqlConfig from './config/sqlConfig';

const createTableQuery = `
IF NOT EXISTS (
  SELECT * FROM sysobjects WHERE name='Clientes' AND xtype='U'
)
BEGIN
  CREATE TABLE Clientes (
    NombreCompleto       NVARCHAR(100) NOT NULL,
    DNI                  BIGINT        NOT NULL,
    Estado               VARCHAR(10)   NOT NULL,
    FechaIngreso         DATE          NOT NULL,
    EsPEP                BIT           NOT NULL,
    EsSujetoObligado     BIT           NULL,
    FechaCreacion        DATETIME      NOT NULL
  );
END
`;

async function createClientesTable() {
  try {
    const pool = await mssql.connect(sqlConfig);
    await pool.request().query(createTableQuery);
    console.log('Tabla Clientes creada');
    await pool.close();
  } catch (err) {
    console.error('Error creando la tabla:', err);
  }
}

export default createClientesTable;