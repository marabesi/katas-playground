import { Client } from "./Client";

export class Template {
  constructor(private client: Client) {}

  render() {
    const response = this.client.get()
    return []
  }
}
