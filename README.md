# GitHub Repositories Explorer

A React application that allows users to search for GitHub users and explore their repositories.

## Features

- Search for GitHub users by username (limited to 5 results)
- View repositories for selected users
- Responsive design for mobile and desktop
- Error handling for API requests
- Keyboard navigation support

## Demo

You can access the live demo of the application at: [GitHub Repositories Explorer](https://0xsifu.github.io/github-repositories-explorer)

## Technologies Used

- React 
- TypeScript
- Styled Components for styling
- Axios for API requests
- Jest and React Testing Library for testing
- Webpack for bundling
- GitHub Pages for deployment

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/0xSifu/github-repositories-explorer.git
   cd github-repositories-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
github-repositories-explorer/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ErrorMessage.tsx
│   │   ├── RepositoryList.tsx
│   │   ├── SearchBar.tsx
│   │   └── UserList.tsx
│   ├── services/
│   │   └── githubApi.ts
│   ├── types/
│   │   └── index.ts
│   ├── __tests__/
│   │   ├── App.test.tsx
│   │   ├── ErrorMessage.test.tsx
│   │   ├── RepositoryList.test.tsx
│   │   ├── SearchBar.test.tsx
│   │   └── UserList.test.tsx
│   ├── App.tsx
│   ├── index.tsx
│   ├── index.css
│   └── setupTests.ts
├── .gitignore
├── jest.config.js
├── package.json
├── README.md
├── tsconfig.json
└── webpack.config.js
```

## API Usage

This application uses the GitHub API v3:
- User search: `https://api.github.com/search/users?q={username}&per_page=5`
- User repositories: `https://api.github.com/users/{username}/repos?sort=updated&per_page=100`

For more information, refer to the [GitHub API documentation](https://developer.github.com/v3/).

## Testing

Run tests with:
```bash
npm test
```

The application includes:
- Unit tests for individual components
- Integration tests for component interactions
- Mock API tests to verify data handling

## Building for Production

To create a production build:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

The application is configured for deployment to GitHub Pages:
```bash
npm run deploy
```

Before deploying, make sure to update the `homepage` field in `package.json` with your GitHub username.

## Features Implementation

### User Search
- Input validation and error handling
- Keyboard accessibility (Enter key support)
- Loading states during API requests
- Limited to 5 results as per requirements

### Repository Display
- Displays all repositories for the selected user
- Shows repository details including:
  - Name with link to GitHub
  - Description
  - Star count
  - Primary language
  - Last update date
- Responsive grid layout for different screen sizes

### Error Handling
- Displays user-friendly error messages
- Handles API rate limiting
- Provides feedback for network issues

### Responsive Design
- Mobile-first approach
- Adapts to different screen sizes
- Maintains usability on small screens

## License

This project is licensed under the MIT License - see the LICENSE file for details.
