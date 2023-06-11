const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgres://qgohiqcm:e9GChquq5y3DOaaNXes2ofAeOqzwdcBp@rajje.db.elephantsql.com/qgohiqcm",
});

const pg = async (SQL, ...values) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(SQL, values.length ? values : null);
    return rows;
  } catch (error) {
    throw new Error(error.message)
  } finally {
    await client.release();
  }
};

module.exports = { pg };
