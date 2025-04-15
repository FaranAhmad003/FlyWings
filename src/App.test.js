import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
// Commit update: Changes for commit
// Commit update: Changes for commit
// Commit update: Changes for commit
// Commit update at T09:22:55 - 20052
