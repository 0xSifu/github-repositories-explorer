import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorMessage from '../components/ErrorMessage';

describe('ErrorMessage', () => {
  test('renders error message', () => {
    const mockDismiss = jest.fn();
    const errorMessage = 'Test error message';
    
    render(<ErrorMessage message={errorMessage} onDismiss={mockDismiss} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('calls onDismiss when close button is clicked', () => {
    const mockDismiss = jest.fn();
    
    render(<ErrorMessage message="Test error" onDismiss={mockDismiss} />);
    
    const closeButton = screen.getByRole('button', { name: 'Dismiss error' });
    fireEvent.click(closeButton);
    
    expect(mockDismiss).toHaveBeenCalledTimes(1);
  });
});
