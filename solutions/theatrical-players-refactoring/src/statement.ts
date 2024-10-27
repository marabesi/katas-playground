import { createStatement } from "./createStatement";

export type Plays = {
  [key: string]: {
    name: string;
    type: string;
  };
};

export type Performance = {
  playID: string;
  audience: number;
};

export type Invoice = {
  customer: string;
  performances: Performance[];
};

export type Play = { name: string; type: string };

export interface EnrichedPerformance extends Performance {
  play: Play;
  amount: number;
};

export type StatementData = {
  customer: string;
  performances: EnrichedPerformance[];
  totalAmount: number;
  totalVolumeCredits?: number;
};

function usd(aNumber: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber);
}

function renderPlainText(data: StatementData): string {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${usd(perf.amount / 100)} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount / 100)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

function statement(invoice: Invoice, plays: Plays): string {
  return renderPlainText(createStatement(invoice, plays));
}

export { statement };

