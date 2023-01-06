import { getByLabelText, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LoginPage } from './Authentication/LoginPage';

test('renders learn react link', () => {
  render(<App />, {wrapper:BrowserRouter});
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders login page', () =>{
  const component = render(<App />);
  const childElement =component.getByRole("textField");
  expect(childElement).toHaveLength(2)
})


