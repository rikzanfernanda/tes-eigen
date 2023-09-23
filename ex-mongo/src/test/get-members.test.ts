import { App } from "@/app";
import { MemberModel } from "@/models/members.model";
import { MemberRoute } from "@/routes/members.route";
import mongoose from "mongoose";
import request from "supertest";

beforeAll(async () => {
  await MemberModel.create({
    code: 'M-0001',
    name: 'test-member',
  })
})

afterAll(async () => {
  await MemberModel.deleteMany({}).exec();
  await mongoose.disconnect();
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing get all members', () => {
  const route = new MemberRoute();
  const app = new App([route]);

  test('should return all member data', (done) => {
    request(app.getServer()).get(`${route.path}`)
      .expect(200)
      .expect((res) => {
        res.body.data[0].code = 'M-0001';
      })
      .end(done);
  })
})
