import axios from 'axios';
import { GitHubRepository, GitHubUser, UserSearchResponse } from '../types';

export const githubApi = {
  searchUsers: async (username: string, limit: number = 5): Promise<GitHubUser[]> => {
    try {
      const response = await axios.get<UserSearchResponse>(
        `https://api.github.com/search/users?q=${encodeURIComponent(username)}&per_page=${limit}`
      );
      return response.data.items;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  },

  getUserRepositories: async (username: string): Promise<GitHubRepository[]> => {
    try {
      const response = await axios.get<GitHubRepository[]>(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw error;
    }
  }
};
