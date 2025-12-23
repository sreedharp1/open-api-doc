# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in the API Documentation Portal, please report it responsibly.

### How to Report

1. **Do not** open a public GitHub issue for security vulnerabilities
2. Send a detailed report to the maintainer via email or private message
3. Include the following information:
   - Description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: You will receive a response within 48 hours
- **Assessment**: The vulnerability will be evaluated within 7 days
- **Resolution**: Critical issues will be addressed as quickly as possible
- **Disclosure**: Coordinated disclosure after a fix is released

## Security Considerations

### API Specification Files

- API specifications in `public/specs/` are served as static files
- Do not include sensitive information (API keys, credentials, internal endpoints) in specification files
- Review all specifications before adding them to the repository

### AWS Deployment

When deploying to AWS, follow these security best practices:

- Use IAM roles with least-privilege permissions
- Enable S3 bucket versioning for audit trails
- Configure CloudFront with HTTPS-only access
- Do not expose S3 bucket publicly; use CloudFront with Origin Access Control
- Store AWS credentials as GitHub Secrets, never in code

### Dependencies

- Regularly update dependencies to patch known vulnerabilities
- Run `npm audit` periodically to check for security issues
- Review dependency changes before updating

### Build and CI/CD

- GitHub Actions secrets should be rotated periodically
- Review pull requests before merging to protected branches
- Use branch protection rules on main/master branches

## Security Features

This project is a static site with no server-side code, which limits the attack surface. However, consider:

- **Content Security Policy**: Configure CSP headers via CloudFront or your hosting provider
- **CORS**: Ensure API specifications are served with appropriate CORS headers if needed
- **Subresource Integrity**: Consider adding SRI hashes for external resources

## Contact

For security concerns, please reach out to the project maintainer.

---

Thank you for helping keep this project secure.
