import { render, screen } from "@testing-library/react";
import HomePage from "~/app/page";

describe("Tests home page", () => {
  it("renders a heading", () => {
    render(<HomePage />);

    const heading = screen.getByRole("heading", {
      name: /Hello world/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
