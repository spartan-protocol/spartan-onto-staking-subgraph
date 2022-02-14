import { Member } from "../generated/schema";

export function checkMember(memberAddr: string): void {
  let member = Member.load(memberAddr);
  if (!member) {
    member = new Member(memberAddr);
    member.save();
  }
}
