import {describe, expect, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import Home from "@/app/page";

describe('Page', () => {
  it('should render', () => {
    render(<Home />);

    expect(screen.queryByText('Save and see your changes instantly.')).toBeInTheDocument();
  });
})