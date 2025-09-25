# Contributing to ClimateLens 🌍

Thank you for your interest in contributing to ClimateLens! We welcome contributions from everyone.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Setting up the Development Environment

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/climatelens.git
   cd climatelens
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd server
   npm install
   
   # Frontend
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cd server
   npm run setup-env
   # Edit the .env file with your API keys
   ```

4. **Test the setup**
   ```bash
   npm run validate
   npm run test-atlas
   ```

## 🔧 Development Workflow

### Branch Naming Convention
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/documentation-update` - Documentation updates
- `refactor/component-name` - Code refactoring

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
- `feat(auth): add Google OAuth integration`
- `fix(stories): resolve AI story generation timeout`
- `docs(readme): update installation instructions`

## 📝 Code Style Guidelines

### JavaScript/TypeScript
- Use ES6+ features
- Follow ESLint configuration
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

### React Components
- Use functional components with hooks
- Follow component naming convention (PascalCase)
- Keep components under 200 lines
- Use TypeScript interfaces for props
- Implement proper error boundaries

### CSS
- Use CSS modules for component styling
- Follow BEM naming convention
- Use semantic color names
- Ensure responsive design
- Test accessibility (WCAG 2.1)

## 🧪 Testing

### Running Tests
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

### Writing Tests
- Write unit tests for utility functions
- Write integration tests for API endpoints
- Write component tests for React components
- Ensure minimum 80% code coverage

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Bug Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, browser, Node.js version
6. **Screenshots**: If applicable
7. **Error Messages**: Console errors or logs

### Bug Report Template
```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 96]
- Node.js: [e.g., v16.14.0]

## Additional Context
Any other context about the problem
```

## ✨ Feature Requests

When suggesting features, please include:

1. **Feature Description**: Clear description of the feature
2. **Use Case**: Why this feature would be useful
3. **Proposed Solution**: How you think it should work
4. **Alternatives**: Other solutions you've considered
5. **Additional Context**: Screenshots, mockups, etc.

## 🔍 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow code style guidelines
   - Add tests for new functionality
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run validate
   npm test
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Use the PR template
   - Link related issues
   - Add screenshots if UI changes
   - Request review from maintainers

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added tests for new functionality
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Fixes #(issue number)
```

## 🏗 Project Structure

```
climatelens/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript types
├── server/                # Node.js backend
│   ├── models/           # Database schemas
│   ├── routes/           # API endpoints
│   ├── services/         # Business logic
│   ├── middleware/       # Custom middleware
│   └── utils/            # Utility functions
└── docs/                 # Documentation
```

## 🎯 Areas for Contribution

### High Priority
- [ ] Improve accessibility features
- [ ] Add more language support
- [ ] Enhance mobile responsiveness
- [ ] Optimize performance
- [ ] Add comprehensive tests

### Medium Priority
- [ ] Add dark mode support
- [ ] Implement offline functionality
- [ ] Add more climate data sources
- [ ] Improve error handling
- [ ] Add analytics dashboard

### Low Priority
- [ ] Add social sharing features
- [ ] Implement gamification
- [ ] Add community features
- [ ] Create admin dashboard
- [ ] Add export functionality

## 📚 Resources

- [React Documentation](https://reactjs.org/docs)
- [Node.js Documentation](https://nodejs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Documentation](https://expressjs.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow the code of conduct
- Ask questions if you're unsure

## 📞 Getting Help

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For questions and general discussion
- **Email**: For security issues or private matters

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to ClimateLens! Together, we can make climate education more accessible to everyone. 🌱
