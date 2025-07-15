import React from 'react';
import styled from 'styled-components';
import { GitHubRepository } from '../types';

interface RepositoryListProps {
  repositories: GitHubRepository[];
  username: string;
  isLoading: boolean;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories, username, isLoading }) => {
  if (isLoading) {
    return <LoadingMessage>Loading repositories...</LoadingMessage>;
  }

  if (repositories.length === 0) {
    return <NoReposMessage>No repositories found for {username}</NoReposMessage>;
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <RepositoryListContainer>
      <ListHeader>{username}</ListHeader>
      <RepositoriesGrid>
        {repositories.map((repo) => (
          <RepositoryCard key={repo.id}>
            <RepoTitle>
              <RepoName href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </RepoName>
              <StarCount>
                <StarIcon>★</StarIcon>
                {repo.stargazers_count}
              </StarCount>
            </RepoTitle>
            <RepoDescription>{repo.description || 'No description available'}</RepoDescription>
            <RepoFooter>
              {repo.language && <Language>{repo.language}</Language>}
              <UpdatedDate>Updated on {formatDate(repo.updated_at)}</UpdatedDate>
            </RepoFooter>
          </RepositoryCard>
        ))}
      </RepositoriesGrid>
    </RepositoryListContainer>
  );
};

const RepositoryListContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto 20px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ListHeader = styled.div`
  padding: 16px;
  font-size: 18px;
  font-weight: 500;
  color: #24292e;
  border-bottom: 1px solid #e1e4e8;
`;

const RepositoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  padding: 16px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const RepositoryCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const RepoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const RepoName = styled.a`
  font-size: 16px;
  font-weight: 500;
  color: #0366d6;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const StarCount = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #586069;
`;

const StarIcon = styled.span`
  margin-right: 4px;
  color: #e3b341;
`;

const RepoDescription = styled.p`
  font-size: 14px;
  color: #586069;
  margin-bottom: 16px;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RepoFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 12px;
`;

const Language = styled.span`
  padding: 2px 6px;
  background-color: #f1f8ff;
  color: #0366d6;
  border-radius: 12px;
`;

const UpdatedDate = styled.span`
  color: #586069;
`;

const LoadingMessage = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto 20px;
  padding: 32px 16px;
  text-align: center;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #586069;
`;

const NoReposMessage = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto 20px;
  padding: 32px 16px;
  text-align: center;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #586069;
`;

export default RepositoryList;
