import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { githubApi } from '../services/githubApi';
import { GitHubUser, GitHubRepository } from '../types';

jest.mock('../services/githubApi');
const mockedGithubApi = githubApi as jest.Mocked<typeof githubApi>;

describe('App', () => {
  const mockUsers: GitHubUser[] = [
    {
      id: 1,
      login: 'testuser1',
      avatar_url: 'https://example.com/avatar1.png',
      html_url: 'https://github.com/testuser1'
    },
    {
      id: 2,
      login: 'testuser2',
      avatar_url: 'https://example.com/avatar2.png',
      html_url: 'https://github.com/testuser2'
    }
  ];

  const mockRepositories: GitHubRepository[] = [
    {
      id: 101,
      name: 'repo1',
      description: 'Test repository 1',
      html_url: 'https://github.com/testuser1/repo1',
      stargazers_count: 10,
      language: 'TypeScript',
      updated_at: '2023-01-01T00:00:00Z'
    },
    {
      id: 102,
      name: 'repo2',
      description: 'Test repository 2',
      html_url: 'https://github.com/testuser1/repo2',
      stargazers_count: 20,
      language: 'JavaScript',
      updated_at: '2023-02-01T00:00:00Z'
    }
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders the application title', () => {
    render(<App />);
    expect(screen.getByText('GitHub Repositories Explorer')).toBeInTheDocument();
  });

  test('searches for users when search is triggered', async () => {
    mockedGithubApi.searchUsers.mockResolvedValueOnce(mockUsers);
    
    render(<App />);
    
    const searchInput = screen.getByPlaceholderText('Enter username');
    const searchButton = screen.getByText('Search');
    
    fireEvent.change(searchInput, { target: { value: 'testuser' } });
    fireEvent.click(searchButton);
    
    expect(mockedGithubApi.searchUsers).toHaveBeenCalledWith('testuser');
    
    await waitFor(() => {
      expect(screen.getByText('testuser1')).toBeInTheDocument();
      expect(screen.getByText('testuser2')).toBeInTheDocument();
    });
  });

  test('fetches repositories when a user is selected', async () => {
    mockedGithubApi.searchUsers.mockResolvedValueOnce(mockUsers);
    mockedGithubApi.getUserRepositories.mockResolvedValueOnce(mockRepositories);
    
    render(<App />);
    
    const searchInput = screen.getByPlaceholderText('Enter username');
    const searchButton = screen.getByText('Search');
    fireEvent.change(searchInput, { target: { value: 'testuser' } });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText('testuser1')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('testuser1'));
    
    expect(mockedGithubApi.getUserRepositories).toHaveBeenCalledWith('testuser1');
    
    await waitFor(() => {
      expect(screen.getByText('repo1')).toBeInTheDocument();
      expect(screen.getByText('repo2')).toBeInTheDocument();
      expect(screen.getByText('Test repository 1')).toBeInTheDocument();
      expect(screen.getByText('Test repository 2')).toBeInTheDocument();
    });
  });

  test('displays error message when API call fails', async () => {
    mockedGithubApi.searchUsers.mockRejectedValueOnce(new Error('API rate limit exceeded'));
    
    render(<App />);
    
    const searchInput = screen.getByPlaceholderText('Enter username');
    const searchButton = screen.getByText('Search');
    fireEvent.change(searchInput, { target: { value: 'testuser' } });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Search failed: API rate limit exceeded/)).toBeInTheDocument();
    });
  });

  test('dismisses error message when close button is clicked', async () => {
    mockedGithubApi.searchUsers.mockRejectedValueOnce(new Error('API error'));
    
    render(<App />);
    
    const searchInput = screen.getByPlaceholderText('Enter username');
    const searchButton = screen.getByText('Search');
    fireEvent.change(searchInput, { target: { value: 'testuser' } });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Search failed: API error/)).toBeInTheDocument();
    });
    
    const dismissButton = screen.getByRole('button', { name: 'Dismiss error' });
    fireEvent.click(dismissButton);
    
    expect(screen.queryByText(/Search failed: API error/)).not.toBeInTheDocument();
  });
});
