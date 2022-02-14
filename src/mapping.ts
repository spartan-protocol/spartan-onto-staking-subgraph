import { MemberDeposits, MemberWithdraws } from "../generated/Dao/Dao";
import { addr_usdtp } from "./const";
import { checkDeposit, checkWithdraw } from "./utils";

export function handleDeposit(event: MemberDeposits): void {
  let poolAddr = event.params.pool.toHexString();
  if (poolAddr == addr_usdtp) {
    let owner = event.params.member.toHexString();
    let units = event.params.amount.toBigDecimal();
    checkDeposit(event, owner, units);
  }
}

export function handleWithdraw(event: MemberWithdraws): void {
  let poolAddr = event.params.pool.toHexString();
  if (poolAddr == addr_usdtp) {
    let owner = event.params.member.toHexString();
    let units = event.params.balance.toBigDecimal();
    checkWithdraw(event, owner, units);
  }
}
