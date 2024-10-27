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
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

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
    let volumeCredits = 0;
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ("comedy" === (playFor(perf)).type) volumeCredits += Math.floor(perf.audience / 5);
    // print line for this order
    return volumeCredits;
  }

  for (let perf of invoice.performances) {
    // add volume credits
    volumeCredits += volumeCreditsFor(perf);
    result += ` ${(playFor(perf)).name}: ${format(amountFor(perf) / 100)} (${perf.audience} seats)\n`;
    totalAmount += amountFor(perf);
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

export { statement };
