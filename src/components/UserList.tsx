import React from 'react';
import styled from 'styled-components';
import { GitHubUser } from '../types';

interface UserListProps {
  users: GitHubUser[];
  selectedUser: string | null;
  onUserSelect: (username: string) => void;
  isLoading: boolean;
  searchQuery: string;
}

const UserList: React.FC<UserListProps> = ({ 
  users, 
  selectedUser, 
  onUserSelect, 
  isLoading, 
  searchQuery 
}) => {
  if (isLoading) {
    return <LoadingMessage>Searching users...</LoadingMessage>;
  }

  if (users.length === 0 && searchQuery) {
    return <NoResultsMessage>No users found for "{searchQuery}"</NoResultsMessage>;
  }

  if (users.length === 0) {
    return null;
  }

  return (
    <UserListContainer>
      <ListHeader>Showing users for "{searchQuery}"</ListHeader>
      {users.map((user) => (
        <UserItem 
          key={user.id}
          onClick={() => onUserSelect(user.login)}
          $isSelected={selectedUser === user.login}
        >
          <UserAvatar src={user.avatar_url} alt={`${user.login}'s avatar`} />
          <UserName>{user.login}</UserName>
          <ExpandIcon>
            {selectedUser === user.login ? '▼' : '▶'}
          </ExpandIcon>
        </UserItem>
      ))}
    </UserListContainer>
  );
};

const UserListContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ListHeader = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  color: #586069;
  border-bottom: 1px solid #e1e4e8;
`;

const UserItem = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #e1e4e8;
  background-color: ${props => props.$isSelected ? '#f1f8ff' : 'white'};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${props => props.$isSelected ? '#f1f8ff' : '#f6f8fa'};
  }
`;

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
`;

const UserName = styled.span`
  flex: 1;
  font-size: 16px;
  color: #24292e;
`;

const ExpandIcon = styled.span`
  color: #586069;
  font-size: 12px;
`;

const LoadingMessage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 16px;
  text-align: center;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #586069;
`;

const NoResultsMessage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 16px;
  text-align: center;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #586069;
`;

export default UserList;
