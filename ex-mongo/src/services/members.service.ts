import { Member } from '@/interfaces/members.interface';
import { MemberModel } from '@/models/members.model';
import { Service } from 'typedi';

@Service()
export class MemberService {
  public async findAllMembers(): Promise<Member[]> {
    const members = await MemberModel.find().exec();

    return members;
  }
}
