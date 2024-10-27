type Plays = {
  [key: string]: {
    name: string;
    type: string;
  };
};

type Performance = {
  playID: string;
  audience: number;
};

type Invoice = {
  customer: string;
  performances: Performance[];
};

type Play = { name: string; type: string };


function statement(invoice: Invoice, plays: Plays) {
  let totalAmount = 0;
  let result = `Statement for ${invoice.customer}\n`;

  function usd(aNumber: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber);
  }

  function playFor(aPerformance: Performance): Play {
    return plays[aPerformance.playID];
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
 
  function volumeCreditsFor(perf: Performance) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    if ("comedy" === (playFor(perf)).type) result += Math.floor(perf.audience / 5);
    return result;
  }

  for (let perf of invoice.performances) {
    result += ` ${(playFor(perf)).name}: ${usd(amountFor(perf) / 100)} (${perf.audience} seats)\n`;
    totalAmount += amountFor(perf);
  }
  
  let volumeCredits = totalVolumeCredits();

  result += `Amount owed is ${usd(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;

  function totalVolumeCredits() {
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
      volumeCredits += volumeCreditsFor(perf);
    }
    return volumeCredits;
  }
}

export { statement };
