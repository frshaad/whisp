import mongoose from 'mongoose';

import log from './logger';

const dbUri = process.env.DB_URI;

if (!dbUri) {
  throw new Error('DB_URI is not defined in the environment variables');
}

const connect = async () => {
  try {
    await mongoose.connect(dbUri);
    log.info('Connected to DB');
  } catch (err) {
    log.error("Couldn't connect to DB", err);
    process.exit(1);
  }
};

export default connect;
