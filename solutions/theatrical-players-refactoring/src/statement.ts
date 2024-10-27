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

interface EnrichedPerformance extends Performance {
  play: Play;
};

type StatementData = {
  customer?: string;
  performances?: EnrichedPerformance[];
  totalAmount?: number;
  totalVolumeCredits?: number;
};

function statement(invoice: Invoice, plays: Plays): string {

  function createStatement() {
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
      const result: any = Object.assign({}, aPerformance);

      result.play = playFor(result)
      result.amount = amountFor(result)
      result.volumeCredits = volumeCreditsFor(result)

      return result;
    }

    const statementData: StatementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;
  }

  function renderPlainText(data: any): string {
    let result = `Statement for ${data.customer}\n`;

    function usd(aNumber: number) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(aNumber);
    }

    for (let perf of data.performances) {
      result += ` ${perf.play.name}: ${usd(perf.amount / 100)} (${perf.audience} seats)\n`;
    }

    result += `Amount owed is ${usd(data.totalAmount / 100)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;
  }


  return renderPlainText(createStatement());
}

export { statement };

