import { IsNotEmpty, IsString } from "class-validator";

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  public code: string;

  @IsString()
  @IsNotEmpty()
  public name: string;
}
