import request from 'supertest';
import { App } from '@/app';
import { IndexRoute } from '@routes/index.route';
import mongoose from 'mongoose';
import { dbConnection } from '@/database';

afterAll(async () => {
  await mongoose.disconnect();
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Index', () => {
  describe('[GET] /', () => {
    test('should connect to mongodb', async () => {
      await dbConnection();

      const db = mongoose.connection;
      expect(db.readyState).toBe(1);
    });

    test('response statusCode 200', done => {
      const indexRoute = new IndexRoute();
      const app = new App([indexRoute]);

      request(app.getServer()).get(`${indexRoute.path}`).expect(200).end(done);
    });
  });
});
