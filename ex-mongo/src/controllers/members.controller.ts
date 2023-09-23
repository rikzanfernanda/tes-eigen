import { Member } from "@/interfaces/members.interface";
import { MemberService } from "@/services/members.service";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";

export class MemberController {
  public member = Container.get(MemberService);

  public getMembers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllMembersData: Member[] = await this.member.findAllMembers();

      res.status(200).json({
        status: 200,
        message: 'Successfully get all members',
        data: findAllMembersData
      })
    } catch (error) {
      next(error);
    }
  }
}
