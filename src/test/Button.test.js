import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../components/Button.js';

describe('Button Component', () => {
  // Name prop check
  it('renders the button with the provided name', () => {
    // Render button
    const { getByText } = render(<Button name="Click Me" />);
    // Button check
    expect(getByText('Click Me')).toBeInTheDocument();
  });

  // Callback prop check
  it('calls the callback function when clicked', () => {
    const mockCallback = jest.fn();
    // Render button with name and callback
    const { getByText } = render(<Button name="Click Me" callback={mockCallback} />);
    // Get button with name
    const button = getByText('Click Me');
    // Trigger button click
    fireEvent.click(button);
    // Callback check
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  // variant and size prop check
  it('applies the specified size and variant classes', () => {
    // Render button with name, size and variant
    const { container } = render(<Button name="Click Me" size="small" variant="negative" />);
    // get button with name
    const button = container.querySelector('button');
    // Class name check
    expect(button).toHaveClass('button small negative');
  });

  // Tooltip prop check
  it('displays the tooltip text', () => {
    // Render button with name and tooltip
    const { getByTitle } = render(<Button name="Click Me" tooltip="Click this button" />);
    // Get button with title
    const button = getByTitle('Click this button');
    // Button check
    expect(button).toBeInTheDocument();
  });
});
