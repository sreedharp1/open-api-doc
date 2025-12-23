# Contributing to API Documentation Portal

Thank you for your interest in contributing to the API Documentation Portal! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions. We welcome contributors of all experience levels.

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Git

### Local Development Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/open-api-doc.git
   cd open-api-doc
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser** to `http://localhost:5173`

## How to Contribute

### Reporting Bugs

Before submitting a bug report:
- Check existing issues to avoid duplicates
- Collect relevant information (browser, OS, steps to reproduce)

When submitting a bug report, include:
- Clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS information

### Suggesting Features

Feature requests are welcome! Please include:
- Clear description of the feature
- Use case and motivation
- Any implementation ideas you have

### Submitting Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Write clear commit messages
   - Keep changes focused and atomic

3. **Test your changes**
   ```bash
   npm run build
   npm run preview
   ```

4. **Commit your changes**
   ```bash
   git commit -m "Add feature: brief description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Include screenshots for UI changes

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing patterns in the codebase
- Use meaningful variable and function names
- Keep components small and focused

### Project Structure

```
src/
├── components/    # React components
├── config/        # Configuration files (apis.json)
├── types/         # TypeScript type definitions
├── App.tsx        # Main application component
├── main.tsx       # Entry point
└── index.css      # Global styles
```

### Adding API Specifications

To add a new API specification:

1. Place the spec file in `public/specs/`
2. Add an entry to `src/config/apis.json`:
   ```json
   {
     "id": "unique-id",
     "name": "API Name",
     "version": "1.0.0",
     "category": "Category Name",
     "specPath": "/specs/filename.yaml",
     "type": "openapi",
     "description": "Brief description"
   }
   ```

### RAML Support

- RAML 1.0 files are automatically converted to OpenAPI 3.0 at build time
- Use `npm run convert-raml` to manually trigger conversion
- Converted files are saved with `.converted.yaml` extension

### Styling

- This project uses Tailwind CSS for styling
- Follow utility-first CSS patterns
- Avoid adding custom CSS unless necessary

## Pull Request Guidelines

### Before Submitting

- [ ] Code builds without errors (`npm run build`)
- [ ] Changes work in the preview (`npm run preview`)
- [ ] Commit messages are clear and descriptive
- [ ] Branch is up to date with main

### PR Description Template

```markdown
## Summary
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
How were these changes tested?

## Screenshots (if applicable)
```

## Release Process

Releases are managed by the maintainers. After your PR is merged:
1. Changes are automatically deployed via GitHub Actions
2. The maintainer may tag a new release if appropriate

## Questions?

If you have questions about contributing, feel free to open an issue for discussion.

---

Thank you for contributing!
