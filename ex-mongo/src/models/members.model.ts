import { Member } from '@/interfaces/members.interface';
import { Document, Schema, model } from 'mongoose';

const MemberSchema: Schema = new Schema<Member>({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export const MemberModel = model<Member & Document>('Member', MemberSchema);
