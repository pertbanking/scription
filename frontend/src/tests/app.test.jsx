import { render, screen } from "@testing-library/react";
import App from "../app";

test.skip("render whole app", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
