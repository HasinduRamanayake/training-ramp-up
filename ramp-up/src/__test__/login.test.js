import { render, screen } from "@testing-library/react";
import { LoginPage } from "../Authentication/LoginPage";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

test("render the signin page with 2 fields", () => {
  render(<LoginPage />,{wrapper:Provider});
  const fieldSet = screen.findAllByRole("textField");
  expect(fieldSet).toHaveLength(2);
});
