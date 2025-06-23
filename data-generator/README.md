
Hola! bienvenidos a la resolución del challenge, paso a enumerar los pasos para levantar el proyecto y las caracteristicas del mismo.
1) Para correr el proyecto con docker lo que se debe hacer es construir el proyecto con "docker build ."
2) Luego se debe correr docker-compose up app y esto levantará el proyecto
3) Para poder correr el procesamiento de archivos se debe generar el archivo con el comando 
```bash

npx ts-node src/generateFile.ts

```
con la cantidad de registros y fallos aproximados con los que se quiera hacer la prueba
4) Para efectivamente correr el procesamiento del archivo se le debe pegar a la URL: POST = localhost:3000/process, de este modo se empezará a procesar el archivo

5) Por consola se pueden ver los logs de las lineas con error que hubo mientras se procesa el archivo y la cantidad de memoria utilizada, al finalizar el procesado también muestra las lineas con error encontradas

6) Se expuso un EP en la URL: GET = localhost:3000/health para poder verificar el funcionamiento del sistema mientras se procesa el archivo
 