import React from 'react';
import { render, screen } from '@testing-library/react';
import RepositoryList from '../components/RepositoryList';
import { GitHubRepository } from '../types';

describe('RepositoryList', () => {
  const mockRepositories: GitHubRepository[] = [
    {
      id: 1,
      name: 'repo1',
      description: 'Repository 1 description',
      html_url: 'https://github.com/user1/repo1',
      stargazers_count: 12,
      language: 'TypeScript',
      updated_at: '2023-01-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'repo2',
      description: null,
      html_url: 'https://github.com/user1/repo2',
      stargazers_count: 48,
      language: 'JavaScript',
      updated_at: '2023-02-20T15:45:00Z'
    },
    {
      id: 3,
      name: 'repo3',
      description: 'Repository 3 description',
      html_url: 'https://github.com/user1/repo3',
      stargazers_count: 23,
      language: null,
      updated_at: '2023-03-10T08:15:00Z'
    }
  ];

  test('renders loading message when isLoading is true', () => {
    render(
      <RepositoryList 
        repositories={[]} 
        username="testuser" 
        isLoading={true} 
      />
    );
    
    expect(screen.getByText('Loading repositories...')).toBeInTheDocument();
  });

  test('renders no repositories message when repositories array is empty', () => {
    render(
      <RepositoryList 
        repositories={[]} 
        username="testuser" 
        isLoading={false} 
      />
    );
    
    expect(screen.getByText('No repositories found for testuser')).toBeInTheDocument();
  });

  test('renders repositories when available', () => {
    render(
      <RepositoryList 
        repositories={mockRepositories} 
        username="testuser" 
        isLoading={false} 
      />
    );
    
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('repo1')).toBeInTheDocument();
    expect(screen.getByText('repo2')).toBeInTheDocument();
    expect(screen.getByText('repo3')).toBeInTheDocument();
    expect(screen.getByText('Repository 1 description')).toBeInTheDocument();
    expect(screen.getByText('No description available')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  test('formats dates correctly', () => {
    render(
      <RepositoryList 
        repositories={mockRepositories} 
        username="testuser" 
        isLoading={false} 
      />
    );
    
    expect(screen.getByText(/Updated on Jan 15, 2023/)).toBeInTheDocument();
    expect(screen.getByText(/Updated on Feb 20, 2023/)).toBeInTheDocument();
    expect(screen.getByText(/Updated on Mar 10, 2023/)).toBeInTheDocument();
  });

  test('displays star counts', () => {
    render(
      <RepositoryList 
        repositories={mockRepositories} 
        username="testuser" 
        isLoading={false} 
      />
    );
    
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('48')).toBeInTheDocument();
    expect(screen.getByText('23')).toBeInTheDocument();
  });
});
