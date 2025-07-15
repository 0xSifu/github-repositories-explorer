import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  test('renders search input and button', () => {
    const mockSearch = jest.fn();
    render(<SearchBar onSearch={mockSearch} isLoading={false} />);
    
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('calls onSearch when button is clicked', () => {
    const mockSearch = jest.fn();
    render(<SearchBar onSearch={mockSearch} isLoading={false} />);
    
    const input = screen.getByPlaceholderText('Enter username');
    fireEvent.change(input, { target: { value: 'testuser' } });
    
    const button = screen.getByText('Search');
    fireEvent.click(button);
    
    expect(mockSearch).toHaveBeenCalledWith('testuser');
  });

  test('calls onSearch when Enter key is pressed', () => {
    const mockSearch = jest.fn();
    render(<SearchBar onSearch={mockSearch} isLoading={false} />);
    
    const input = screen.getByPlaceholderText('Enter username');
    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
    
    expect(mockSearch).toHaveBeenCalledWith('testuser');
  });

  test('disables button when isLoading is true', () => {
    const mockSearch = jest.fn();
    render(<SearchBar onSearch={mockSearch} isLoading={true} />);
    
    const button = screen.getByText('Searching...');
    expect(button).toBeDisabled();
  });

  test('disables button when input is empty', () => {
    const mockSearch = jest.fn();
    render(<SearchBar onSearch={mockSearch} isLoading={false} />);
    
    const button = screen.getByText('Search');
    expect(button).toBeDisabled();
  });
});
