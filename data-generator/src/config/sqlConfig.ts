import mssql from 'mssql';
const sqlConfig: mssql.config = {
    user: process.env.SQL_USER!,
    password: process.env.SQL_PASSWORD!,
    server: process.env.SQL_SERVER!,
    database: process.env.SQL_DATABASE!,
    port: Number(process.env.SQL_PORT) || 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};
export default sqlConfig;