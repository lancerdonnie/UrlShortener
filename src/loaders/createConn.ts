import { getConnection } from 'typeorm';

const { createConnection } = require('typeorm');

const createConn = async () => {
  try {
    await createConnection();
    console.log('Database Connected');
  } catch (error) {
    console.error(error);
    // throw error;
    process.exitCode = 1;
  }
};

const closeConn = async () => {
  try {
    await getConnection().close();
    console.log('Database Connection Closed');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { createConn, closeConn };
