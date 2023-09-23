import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import { App } from '@/app';
import { CreateUserDto } from '@dtos/users.dto';
import { AuthRoute } from '@routes/auth.route';
import { UserModel } from '@/models/users.model';

const authRoute = new AuthRoute();

const app = new App([authRoute]);

const userInput: CreateUserDto = {
  email: "test@example.com",
  name: "Jane Doe",
  password: "Password123",
};

afterAll(async () => {
  await UserModel.deleteMany({}).exec();
  await mongoose.disconnect();
});

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    test('response should have the Create userData', (done) => {
      request(app.getServer()).post(`${authRoute.path}signup`).send(userInput)
        .then(res => {
          expect(res.statusCode).toEqual(201);
          expect(res.body.data.email).toEqual(userInput.email);
          done();
        });
    });
  });

  //   describe('[POST] /login', () => {
  //     it('response should have the Set-Cookie header with the Authorization token', async () => {
  //       const userData: CreateUserDto = {
  //         email: 'test@email.com',
  //         password: 'q1w2e3r4!',
  //       };

  //       const authRoute = new AuthRoute();
  //       const users = authRoute.authController.authService.users;

  //       users.findOne = jest.fn().mockReturnValue({
  //         _id: '60706478aad6c9ad19a31c84',
  //         email: userData.email,
  //         password: await bcrypt.hash(userData.password, 10),
  //       });

  //       (mongoose as any).connect = jest.fn();
  //       const app = new App([authRoute]);
  //       return request(app.getServer())
  //         .post(`${authRoute.path}login`)
  //         .send(userData)
  //         .expect('Set-Cookie', /^Authorization=.+/);
  //     });
  //   });

  //   // describe('[POST] /logout', () => {
  //   //   it('logout Set-Cookie Authorization=; Max-age=0', async () => {
  //   //     const userData: User = {
  //   //       _id: '60706478aad6c9ad19a31c84',
  //   //       email: 'test@email.com',
  //   //       password: await bcrypt.hash('q1w2e3r4!', 10),
  //   //     };

  //   //     const authRoute = new AuthRoute();
  //   //     const users = authRoute.authController.authService.users;

  //   //     users.findOne = jest.fn().mockReturnValue(userData);

  //   //     (mongoose as any).connect = jest.fn();
  //   //     const app = new App([authRoute]);
  //   //     return request(app.getServer())
  //   //       .post(`${authRoute.path}logout`)
  //   //       .send(userData)
  //   //       .set('Set-Cookie', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ')
  //   //       .expect('Set-Cookie', /^Authorization=\; Max-age=0/);
  //   //   });
  //   // });
});
