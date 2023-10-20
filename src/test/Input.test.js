import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from '../components/Input.js';

describe('Input Component', () => {
  // Props check
  it('renders with the provided props', () => {
    // Rendering component with props
    const { container } = render(
      <Input
        id="myInput"
        type="text"
        defaultValue="Default Value"
        size="large"
        ariaLabel="Test Input"
      />
    );
    // Getting component with input query selector
    const inputElement = container.querySelector('input');
    // Component check
    expect(inputElement).toBeInTheDocument();
    // id prop check
    expect(inputElement).toHaveAttribute('id', 'myInput');
    // type prop check
    expect(inputElement).toHaveAttribute('type', 'text');
    // defaultValue prop check
    expect(inputElement).toHaveValue('Default Value');
    // ariaLabel prop check
    expect(inputElement).toHaveAttribute('aria-label', 'Test Input');
    // size prop check
    expect(inputElement).toHaveClass('input large');
  });

  // onChangeCallback prop check
  it('calls the onChangeCallback when input value changes', () => {
    // Mocking a function
    const mockChangeCallback = jest.fn();
    // Rendering the component with id, type and callback
    const { container } = render(
      <Input id="myInput" type="text" onChangeCallback={mockChangeCallback} />
    );
    // Component check
    const inputElement = container.querySelector('input');
    // Firing change event
    fireEvent.change(inputElement, { target: { value: 'New Value' } });
    // callback check
    expect(mockChangeCallback).toHaveBeenCalledTimes(1);
  });

  // onEnterCallback prop check
  it('calls the onEnterCallback when Enter key is pressed', () => {
    // Mocking a function
    const mockEnterCallback = jest.fn();
    // Rendering the component with id, type and callback
    const { container } = render(
      <Input id="myInput" type="text" onEnterCallback={mockEnterCallback} />
    );
    // Component check
    const inputElement = container.querySelector('input');
    // Firing change event
    fireEvent.keyDown(inputElement, { key: 'Enter', keyCode: 13 });
    // callback check
    expect(mockEnterCallback).toHaveBeenCalledTimes(1);
  });
});
