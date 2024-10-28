export interface Client {
  get(): string;
}

export class Rest implements Client {
  get(): string {
    throw new Error("Method not implemented.");
  }
}