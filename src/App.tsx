import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import RepositoryList from './components/RepositoryList';
import ErrorMessage from './components/ErrorMessage';
import { githubApi } from './services/githubApi';
import { GitHubUser, GitHubRepository } from './types';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [isSearchingUsers, setIsSearchingUsers] = useState<boolean>(false);
  const [isLoadingRepos, setIsLoadingRepos] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string): Promise<void> => {
    setSearchQuery(query);
    setSelectedUser(null);
    setRepositories([]);
    setError(null);
    setIsSearchingUsers(true);

    try {
      const results = await githubApi.searchUsers(query);
      setUsers(results);
      if (results.length === 0) {
        setError(`No users found matching "${query}"`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'An error occurred while searching for users';
      setError(`Search failed: ${errorMessage}`);
      setUsers([]);
    } finally {
      setIsSearchingUsers(false);
    }
  };

  const handleUserSelect = async (username: string): Promise<void> => {
    if (selectedUser === username) {
      setSelectedUser(null);
      setRepositories([]);
      return;
    }

    setSelectedUser(username);
    setRepositories([]);
    setError(null);
    setIsLoadingRepos(true);

    try {
      const repos = await githubApi.getUserRepositories(username);
      setRepositories(repos);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'An error occurred while fetching repositories';
      setError(`Failed to load repositories: ${errorMessage}`);
    } finally {
      setIsLoadingRepos(false);
    }
  };

  const handleDismissError = (): void => {
    setError(null);
  };

  return (
    <AppContainer>
      <Header>
        <Title>GitHub Repositories Explorer</Title>
      </Header>
      
      <MainContent>
        <SearchBar onSearch={handleSearch} isLoading={isSearchingUsers} />
        
        {error && <ErrorMessage message={error} onDismiss={handleDismissError} />}
        
        <UserList 
          users={users} 
          selectedUser={selectedUser} 
          onUserSelect={handleUserSelect} 
          isLoading={isSearchingUsers}
          searchQuery={searchQuery}
        />
        
        {selectedUser && (
          <RepositoryList 
            repositories={repositories} 
            username={selectedUser} 
            isLoading={isLoadingRepos} 
          />
        )}
      </MainContent>
      
      <Footer>
        <FooterText>
          GitHub Repositories Explorer - Created with React & TypeScript
        </FooterText>
      </Footer>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #24292e;
  color: white;
  padding: 24px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Footer = styled.footer`
  background-color: #24292e;
  color: #6a737d;
  padding: 16px;
  text-align: center;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 14px;
`;

export default App;
