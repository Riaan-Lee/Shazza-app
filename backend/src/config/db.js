import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3307, // default to 3307
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'shazza123',
  database: process.env.DB_NAME || 'shazza_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// 🔥 TEST DB CONNECTION AT STARTUP
async function testConnection() {
  try {
    const connection = await pool.getConnection()
    console.log('✅ MySQL Connected Successfully!')
    connection.release()
  } catch (error) {
    console.error('❌ MySQL Connection Failed:', error.message)
  }
}

testConnection()

export default pool
