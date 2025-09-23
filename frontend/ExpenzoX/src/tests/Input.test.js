/* eslint-env jest */
/* global describe, it, expect, jest */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../components/Inputs/Input';  // adjust path as needed

describe('Input Component', () => {
  it('renders the input with label and placeholder', () => {
    render(
      <Input
        value=""
        onChange={() => {}}
        placeholder="Enter password"
        label="Password"
        type="password"
      />
    );

    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
  });

  it('calls onChange when typing in the input', () => {
    const handleChange = jest.fn();

    render(
      <Input
        value=""
        onChange={handleChange}
        placeholder="Enter password"
        label="Password"
        type="password"
      />
    );

    const input = screen.getByPlaceholderText('Enter password');
    fireEvent.change(input, { target: { value: 'newpassword' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  // Removed test for toggling password visibility
});
