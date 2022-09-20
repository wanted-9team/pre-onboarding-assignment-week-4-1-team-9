import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// Input, button rendering
describe("<App/>", () => {
  it("App rendering", () => {
    render(<App />);

    const heading = screen.getByRole("heading");
    const input = screen.getByPlaceholderText("type new todo");
    const button = screen.getByText("add");

    expect(heading).toBeInTheDocument();
  });

  it("type input, button click", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("type new todo");
    const button = screen.getByText("add");

    userEvent.type(input, "learn tdd");
    userEvent.click(button);

    expect(screen.getByText(/learn tdd/i)).toBeInTheDocument();
  });
});
