import { BigDecimal, ethereum } from "@graphprotocol/graph-ts";
import { Deposit, Member, Withdrawal } from "../generated/schema";
import { PROMO_END, ZERO_BD, ZERO_BI } from "./const";

export function checkMember(memberAddr: string): void {
  let member = Member.load(memberAddr);
  if (!member) {
    member = new Member(memberAddr);
    member.prevUnits = ZERO_BD;
    member.prevTimestamp = ZERO_BI;
    member.unitSecs = ZERO_BD;
    member.save();
  }
}

export function checkDeposit(
  event: ethereum.Event,
  memberAddr: string,
  units: BigDecimal
): void {
  checkMember(memberAddr);
  let deposit = Deposit.load(event.transaction.hash.toHexString());
  if (deposit === null) {
    deposit = new Deposit(event.transaction.hash.toHexString());
  }
  deposit.member = memberAddr;
  deposit.timestamp = event.block.timestamp;
  deposit.blockNumber = event.block.number;
  deposit.units = units;
  deposit.save();

  let member = Member.load(memberAddr);
  if (member) {
    let timeEnd = PROMO_END.toBigDecimal();
    let prevTime = member.prevTimestamp.toBigDecimal();
    if (member.prevUnits.gt(ZERO_BD) && prevTime.lt(timeEnd)) {
      let adjustedNow = event.block.timestamp.toBigDecimal();
      if (adjustedNow.gt(timeEnd)) {
        adjustedNow = timeEnd;
      }
      let unitSecs = member.prevUnits.times(adjustedNow.minus(prevTime));
      member.unitSecs = member.unitSecs.plus(unitSecs);
    }
    member.prevUnits = member.prevUnits.plus(units);
    member.prevTimestamp = event.block.timestamp;
    member.save();
  }
}

export function checkWithdraw(
  event: ethereum.Event,
  memberAddr: string,
  units: BigDecimal
): void {
  checkMember(memberAddr);
  let withdraw = Withdrawal.load(event.transaction.hash.toHexString());
  if (withdraw === null) {
    withdraw = new Withdrawal(event.transaction.hash.toHexString());
  }
  withdraw.member = memberAddr;
  withdraw.timestamp = event.block.timestamp;
  withdraw.blockNumber = event.block.number;
  withdraw.units = units;
  withdraw.save();

  let member = Member.load(memberAddr);
  if (member) {
    let timeEnd = PROMO_END.toBigDecimal();
    let prevTime = member.prevTimestamp.toBigDecimal();
    if (member.prevUnits.gt(ZERO_BD) && prevTime.lt(timeEnd)) {
      let adjustedNow = event.block.timestamp.toBigDecimal();
      if (adjustedNow.gt(timeEnd)) {
        adjustedNow = timeEnd;
      }
      let unitSecs = member.prevUnits.times(adjustedNow.minus(prevTime));
      member.unitSecs = member.unitSecs.plus(unitSecs);
    }
    member.prevUnits = ZERO_BD;
    member.prevTimestamp = event.block.timestamp;
    member.save();
  }
}
