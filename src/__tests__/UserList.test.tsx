import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserList from '../components/UserList';
import { GitHubUser } from '../types';

describe('UserList', () => {
  const mockUsers: GitHubUser[] = [
    {
      id: 1,
      login: 'user1',
      avatar_url: 'https://example.com/avatar1.png',
      html_url: 'https://github.com/user1'
    },
    {
      id: 2,
      login: 'user2',
      avatar_url: 'https://example.com/avatar2.png',
      html_url: 'https://github.com/user2'
    }
  ];

  test('renders loading message when isLoading is true', () => {
    render(
      <UserList 
        users={[]} 
        selectedUser={null} 
        onUserSelect={jest.fn()} 
        isLoading={true} 
        searchQuery="test"
      />
    );
    
    expect(screen.getByText('Searching users...')).toBeInTheDocument();
  });

  test('renders no results message when no users found', () => {
    render(
      <UserList 
        users={[]} 
        selectedUser={null} 
        onUserSelect={jest.fn()} 
        isLoading={false} 
        searchQuery="nonexistent"
      />
    );
    
    expect(screen.getByText('No users found for "nonexistent"')).toBeInTheDocument();
  });

  test('renders users list when users are available', () => {
    render(
      <UserList 
        users={mockUsers} 
        selectedUser={null} 
        onUserSelect={jest.fn()} 
        isLoading={false} 
        searchQuery="user"
      />
    );
    
    expect(screen.getByText('Showing users for "user"')).toBeInTheDocument();
    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
  });

  test('calls onUserSelect when a user is clicked', () => {
    const mockOnUserSelect = jest.fn();
    render(
      <UserList 
        users={mockUsers} 
        selectedUser={null} 
        onUserSelect={mockOnUserSelect} 
        isLoading={false} 
        searchQuery="user"
      />
    );
    
    fireEvent.click(screen.getByText('user1'));
    expect(mockOnUserSelect).toHaveBeenCalledWith('user1');
  });

  test('shows selected user with different styling', () => {
    render(
      <UserList 
        users={mockUsers} 
        selectedUser="user1" 
        onUserSelect={jest.fn()} 
        isLoading={false} 
        searchQuery="user"
      />
    );
    
    expect(screen.getByText('▼')).toBeInTheDocument();
  });
});
