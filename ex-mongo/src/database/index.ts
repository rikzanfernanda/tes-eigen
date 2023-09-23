import mongoose, { ConnectOptions, connect, set } from 'mongoose';
import { NODE_ENV, DB_HOST, DB_PORT, DB_DATABASE } from '@config';
import { logger } from '@/utils/logger';

export const dbConnection = async () => {
  const dbConfig = {
    url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions,
  };

  if (NODE_ENV !== 'production') {
    set('debug', true);
  }

  await connect(dbConfig.url, dbConfig.options);

  const db: mongoose.Connection = mongoose.connection;

  db.on('error', (error: any): void => {
    console.log(`MongoDB connection error: ${error}`);
  });

  db.once('open', (): void => {
    console.log('Connected to MongoDB');
  });
};
