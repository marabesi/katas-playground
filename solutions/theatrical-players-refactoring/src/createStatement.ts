import { Invoice, Plays, Performance, Play, EnrichedPerformance, StatementData } from "./statement";

export function createStatement(invoice: Invoice, plays: Plays) {
  function playFor(aPerformance: Performance): Play {
    return plays[aPerformance.playID];
  }

  function volumeCreditsFor(perf: Performance) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    if ("comedy" === (playFor(perf)).type) result += Math.floor(perf.audience / 5);
    return result;
  }

  function totalAmount(data: any) {
    let result = 0;
    for (let perf of data.performances) {
      result += amountFor(perf);
    }
    return result;
  }

  function totalVolumeCredits(data: any) {
    let result = 0;
    for (let perf of data.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function amountFor(aPerformance: Performance) {
    let thisAmount = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy":
        thisAmount = 40000;
        if (aPerformance.audience > 30) {
          thisAmount += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (aPerformance.audience > 20) {
          thisAmount += 10000 + 500 * (aPerformance.audience - 20);
        }
        thisAmount += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return thisAmount;
  }

  function enrichPerformance(aPerformance: Performance): EnrichedPerformance {
    const result: EnrichedPerformance = Object.assign({
      play: playFor(aPerformance),
      amount: amountFor(aPerformance),
      volumeCredits: volumeCreditsFor(aPerformance),
    }, aPerformance);

    return result;
  }

  const statementData: StatementData = {
    customer: "",
    performances: [],
    totalAmount: 0
  };
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  return statementData;
}
