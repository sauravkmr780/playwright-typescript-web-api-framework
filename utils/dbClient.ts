import mysql from 'mysql2/promise'
import dotenv from 'dotenv';
dotenv.config();

//In case of DB performance not needed to take care as less data in DB
export async function executeQuery(sql: string, params?: any[] ): Promise<any> {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3307,
  });
  const [rows] = await connection.execute(sql, params);
  await connection.end();
  return rows;
}


/* --In case of DB performance needed when data is huge , pool is faster than connection
async function executeQuery2(sql: string, params: any[] = []): Promise<any> {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
  });
  const [rows] = await pool.execute(sql, params);
  await pool.end();
  return rows;
}
*/