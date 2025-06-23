import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import readline from 'readline';
import mssql from 'mssql';
import sqlConfig from './config/sqlConfig';
import isValidDate from './helpers/dateHelper';

const BATCH_SIZE = 50;

async function processFile(filePath: string) {
  let error = 0;

  const connection = await mssql.connect(sqlConfig);
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: fileStream });

  let batch: any[] = [];
  let lineNumber = 0;

  const sendBatch = async () => {
    if (batch.length === 0) return;

    const table = new mssql.Table('Clientes');
    table.create = false;
    table.columns.add('NombreCompleto', mssql.NVarChar(100), { nullable: false });
    table.columns.add('DNI', mssql.BigInt, { nullable: false });
    table.columns.add('Estado', mssql.VarChar(10), { nullable: false });
    table.columns.add('FechaIngreso', mssql.Date, { nullable: false });
    table.columns.add('EsPEP', mssql.Bit, { nullable: false });
    table.columns.add('EsSujetoObligado', mssql.Bit, { nullable: true });
    table.columns.add('FechaCreacion', mssql.DateTime, { nullable: false });

    for (const row of batch) {
      table.rows.add(...row);
    }

    try {
      await connection.request().bulk(table);
    } catch (err) {
      console.error('Error al hacer bulk insert:', err);
    }

    batch = [];
  };

  for await (const line of rl) {
    lineNumber++;
    const [nombre, apellido, dni, estado, fechaIngreso, esPep, esSujetoObligado] = line.split('|');
    const fullName = `${nombre?.trim()} ${apellido?.trim()}`.trim();
    if (fullName.length > 100) {
      error++;
      console.error(`Línea ${lineNumber}: Nombre demasiado largo, saltando`);
      continue;
    }
    let validDate = isValidDate(fechaIngreso);
    if(!validDate){
      error++;
      console.warn(`Línea ${lineNumber}: Fecha no valida`);
      continue;
    }
    const parsedRow = [
      fullName,
      dni,
      estado,
      fechaIngreso,
      esPep,
      esSujetoObligado,
      new Date()
    ];

    batch.push(parsedRow);
    if (batch.length >= BATCH_SIZE) {
      await sendBatch();
    }
    await sendBatch();
  }

  await connection.close();
  console.log("Las lineas con error fueron: ", error);
  console.log('Procesamiento finalizado');
}

export default processFile;