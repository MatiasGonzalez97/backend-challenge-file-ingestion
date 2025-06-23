import express from 'express';
import processFile from './processFile';
import createClientesTable from './generateTable';

const app = express();
createClientesTable();
app.get('/health', (req, res) => {res.send('OK')});

app.post('/process', async (req, res) => {
  await processFile('./challenge/input/CLIENTES_IN_0425.dat');
  res.send('Archivo procesado');
});

app.listen(3000, () => console.log('Esuchando en port 3000'));