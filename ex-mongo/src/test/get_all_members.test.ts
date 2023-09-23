import { App } from "@/app";
import { CreateMemberDto } from "@/dtos/member.dto";
import { CreateUserDto } from "@/dtos/users.dto";
import { MemberModel } from "@/models/members.model";
import { UserModel } from "@/models/users.model";
import { AuthRoute } from "@/routes/auth.route";
import { MemberRoute } from "@/routes/members.route";
import { hash } from "bcrypt";
import mongoose from "mongoose";
import request from "supertest";

const memberRoute = new MemberRoute();
const authRoute = new AuthRoute();
const app = new App([authRoute, memberRoute]);

const user: CreateUserDto = {
  name: 'Test User',
  email: 'test@gmail.com',
  password: '12345'
}

const member: CreateMemberDto = {
  code: 'M-0001',
  name: 'test-member',
}

beforeAll(async () => {
  await MemberModel.create(member)

  const hashedPassword = await hash(user.password, 10);
  await UserModel.create({
    ...user,
    password: hashedPassword
  });
})

afterAll(async () => {
  await MemberModel.deleteMany({}).exec();
  await UserModel.deleteMany({}).exec();
  await mongoose.disconnect();
});

describe('Testing get all members', () => {
  test('should return unauthorized', (done) => {
    request(app.getServer()).get(`${memberRoute.path}`)
      .expect(401)
      .end(done);
  })

  test('should return all member data', (done) => {
    request(app.getServer()).post(`${authRoute.path}login`).send({
      email: user.email,
      password: user.password
    })
      .then(res => {
        let token: string = res.body.data.token;

        request(app.getServer()).get(`${memberRoute.path}`).set('Authorization', `Bearer ${token}`)
          .expect(200)
          .expect((res) => {
            res.body.data[0].code = 'M-0001';
          })
          .end(done);
      })
  })
})
