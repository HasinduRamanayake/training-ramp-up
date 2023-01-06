import { fireEvent, render, screen } from "@testing-library/react"
import { RegisterPage } from "../Authentication/RegisterPage"

test('renders Register Button',()=>{
    render(<RegisterPage />)
    const  button = screen.getAllByRole("Btn")
    expect(button).toBeInTheDocument()
})

test("renders username TextField", () => {
  render(<RegisterPage />);
  const field = screen.getAllByRole("textField");
  expect(field).toBeInTheDocument();
});
test("renders password TextField", () => {
  render(<RegisterPage />);
  const passwordField = screen.getAllByRole("textField");
  expect(passwordField).toBeInTheDocument();
});

test("user Input Should Change ", ()=>{
    render(<RegisterPage/>)
    const usernameInputEl = screen.getByPlaceholderText(/Name/i)
    const testValue = "TestName"
    fireEvent.change(usernameInputEl, {target:{value:testValue}})
    expect(usernameInputEl.value).toBe(testValue)
})

test("user Password Should Change ", () => {
  render(<RegisterPage />);
  const userPasswordEl = screen.getByPlaceholderText(/Password/i);
  const testValue = "TestPassword";
  fireEvent.change(userPasswordEl, { target: { value: testValue } });
  expect(userPasswordEl.value).toBe(testValue);
});