import { expect, describe, it, vi } from 'vitest'

import { Template } from './Template'
import { Rest } from './Client'

vi.mock('./Client');
const restInstance = new Rest();
const mockedRest = vi.mocked(restInstance);

describe('Template', () => {
  it('interacts with client', () => {
    mockedRest.get.mockReturnValue("");

    const template = new Template(mockedRest);
    template.render();

    expect(mockedRest.get).toHaveBeenCalledOnce();
  });
 
  it('handles empty response', () => {
    mockedRest.get.mockReturnValue("");

    const template = new Template(restInstance);

    expect(template.render()).toEqual([]);
  });

  it('transforms string into object', () => {
    mockedRest.get.mockReturnValue("[]");

    const template = new Template(restInstance);

    expect(template.render()).toEqual([]);
  });
});
