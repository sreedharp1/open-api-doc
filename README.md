# API Documentation Portal

A modern, React-based static site for hosting multiple RAML and OpenAPI 3.x API specifications with beautiful Redoc rendering.

**Author:** Sreedhar Pamidiparthi
**License:** MIT

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Adding API Specifications](#adding-api-specifications)
- [RAML to OpenAPI Conversion](#raml-to-openapi-conversion)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Code Samples](#code-samples)
- [Troubleshooting](#troubleshooting)

---

## Overview

The API Documentation Portal is a lightweight, static web application designed to serve as a centralized hub for API documentation. It supports both **OpenAPI 3.x** and **RAML 1.0** specifications, automatically converting RAML files to OpenAPI format at build time for seamless rendering with Redoc.

This solution is ideal for organizations that need to:
- Host multiple API specifications in one place
- Support legacy RAML specifications alongside modern OpenAPI specs
- Deploy documentation as a static site to CDN/cloud storage
- Provide a professional, interactive API documentation experience

---

## Features

- **Multi-format Support**: Render both OpenAPI 3.x and RAML 1.0 specifications
- **Automatic RAML Conversion**: RAML files are converted to OpenAPI 3.0 at build time
- **Beautiful UI**: Powered by Redoc for professional API documentation rendering
- **Categorized Navigation**: Sidebar groups APIs by category for easy discovery
- **Collapsible Sidebar**: Toggle sidebar for more reading space
- **Responsive Design**: Works on desktop and mobile devices
- **Static Deployment**: No server required - deploy to S3, CloudFront, Netlify, or any static host
- **Fast Development**: Vite-powered development server with hot module replacement
- **Type Safety**: Full TypeScript support throughout the codebase

---

## Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| [React](https://react.dev/) | UI Framework | 18.x |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript | 5.x |
| [Vite](https://vitejs.dev/) | Build tool & dev server | 6.x |
| [Redoc](https://redocly.com/redoc/) | API documentation rendering | 2.x |
| [React Router](https://reactrouter.com/) | Client-side routing | 6.x |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework | 3.x |
| [MobX](https://mobx.js.org/) | State management (Redoc dependency) | 6.x |
| [styled-components](https://styled-components.com/) | CSS-in-JS (Redoc dependency) | 6.x |
| [webapi-parser](https://github.com/raml-org/webapi-parser) | RAML to OpenAPI conversion | 0.5.x |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────────────────────────────┐   │
│  │   Sidebar    │    │           Main Content               │   │
│  │              │    │                                      │   │
│  │ ┌──────────┐ │    │  ┌────────────────────────────────┐  │   │
│  │ │ Category │ │    │  │                                │  │   │
│  │ ├──────────┤ │    │  │         Redoc Viewer           │  │   │
│  │ │  API 1   │ │───▶│  │                                │  │   │
│  │ │  API 2   │ │    │  │   - API Info & Description     │  │   │
│  │ │  API 3   │ │    │  │   - Endpoints                  │  │   │
│  │ └──────────┘ │    │  │   - Request/Response Schemas   │  │   │
│  │              │    │  │   - Try It Out                 │  │   │
│  └──────────────┘    │  └────────────────────────────────┘  │   │
│                      └──────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Static Files (dist/)                          │
│                                                                  │
│   index.html  │  assets/  │  specs/*.yaml  │  specs/*.raml      │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Build Time**: RAML files are converted to OpenAPI 3.0 format
2. **Runtime**: React app loads API configuration from `apis.json`
3. **Navigation**: User selects an API from the categorized sidebar
4. **Rendering**: Redoc fetches the spec file and renders interactive documentation

---

## Prerequisites

- **Node.js** 20.x or higher
- **npm** 10.x or higher
- **AWS CLI** (for S3 deployment)

---

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd apidoc
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

Production files are generated in the `dist/` directory.

### 5. Preview Production Build

```bash
npm run preview
```

---

## Adding API Specifications

### Step 1: Add Your Specification File

Place your OpenAPI (`.yaml`, `.json`) or RAML (`.raml`) file in the `public/specs/` directory:

```
public/
└── specs/
    ├── my-new-api.yaml      # OpenAPI 3.x
    └── legacy-api.raml      # RAML 1.0
```

### Step 2: Register in Configuration

Edit `src/config/apis.json` to add your API:

```json
{
  "apis": [
    {
      "id": "my-new-api",
      "name": "My New API",
      "version": "2.0.0",
      "category": "Production APIs",
      "specPath": "/specs/my-new-api.yaml",
      "type": "openapi",
      "description": "My awesome API for doing things"
    },
    {
      "id": "legacy-api",
      "name": "Legacy API",
      "version": "1.0.0",
      "category": "Legacy",
      "specPath": "/specs/legacy-api.raml",
      "type": "raml",
      "description": "Legacy RAML-based API"
    }
  ]
}
```

### Configuration Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier used in URL routing |
| `name` | string | Yes | Display name shown in sidebar |
| `version` | string | Yes | API version displayed in sidebar |
| `category` | string | Yes | Grouping category for sidebar navigation |
| `specPath` | string | Yes | Path to spec file relative to `public/` |
| `type` | string | Yes | Either `openapi` or `raml` |
| `description` | string | No | Optional description for the API |

---

## RAML to OpenAPI Conversion

The portal includes automatic RAML to OpenAPI 3.0 conversion powered by [webapi-parser](https://github.com/raml-org/webapi-parser).

### How It Works

1. During build (`npm run build`) or development (`npm run dev`), the conversion script runs
2. The script reads `apis.json` and identifies all RAML specifications
3. Each RAML file is parsed and converted to OpenAPI 3.0 format
4. Converted files are saved with `.converted.yaml` extension
5. The Redoc viewer automatically uses the converted file for RAML specs

### Manual Conversion

To manually trigger RAML conversion:

```bash
npm run convert-raml
```

### Conversion Script Details

The conversion script (`scripts/convert-raml.js`) uses the following process:

```javascript
// Parse RAML 1.0 specification
const model = await WebApiParser.raml10.parse(ramlContent);

// Resolve all references and includes
const resolved = await WebApiParser.raml10.resolve(model);

// Generate OpenAPI 3.0 output
const oas30 = await WebApiParser.oas30.generateString(resolved);
```

---

## Deployment

### GitHub Actions CI/CD

This project includes a GitHub Actions workflow for automated deployment to AWS S3.

#### Required Secrets

Configure these in your GitHub repository settings (Settings > Secrets and variables > Actions):

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | AWS IAM access key |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key |

#### Required Variables

| Variable | Description |
|----------|-------------|
| `AWS_REGION` | AWS region (e.g., `us-east-1`) |
| `S3_BUCKET` | S3 bucket name for deployment |

#### Workflow Triggers

- **Push to `main` or `master`**: Builds and deploys to S3
- **Pull Requests**: Builds only (no deployment)

### AWS Infrastructure Setup

#### 1. Create S3 Bucket

```bash
aws s3 mb s3://your-api-docs-bucket --region us-east-1
```

Configure for static website hosting (if not using CloudFront):

```bash
aws s3 website s3://your-api-docs-bucket --index-document index.html --error-document index.html
```

#### 2. Create CloudFront Distribution (Recommended)

For production deployments, use CloudFront for:
- HTTPS support
- Global CDN distribution
- Custom domain support

Key CloudFront settings:
- **Origin**: S3 bucket (use REST endpoint, not website endpoint)
- **Origin Access Control**: Create new OAC for S3
- **Default Root Object**: `index.html`
- **Custom Error Responses**:
  - `403` → `/index.html` (Response code: 200)
  - `404` → `/index.html` (Response code: 200)

#### 3. S3 Bucket Policy for CloudFront

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "Service": "cloudfront.amazonaws.com"
    },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*",
    "Condition": {
      "StringEquals": {
        "AWS:SourceArn": "arn:aws:cloudfront::ACCOUNT-ID:distribution/DISTRIBUTION-ID"
      }
    }
  }]
}
```

#### 4. IAM Policy for Deployment

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR-BUCKET-NAME",
        "arn:aws:s3:::YOUR-BUCKET-NAME/*"
      ]
    }
  ]
}
```

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache (if applicable)
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

## Project Structure

```
apidoc/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD workflow
├── public/
│   └── specs/                  # API specification files
│       ├── petstore.yaml       # OpenAPI 3.x example
│       ├── users.raml          # RAML 1.0 example
│       └── users.converted.yaml # Auto-generated from RAML
├── src/
│   ├── components/
│   │   ├── ApiDoc.tsx          # Redoc wrapper component
│   │   ├── Layout.tsx          # Main layout with sidebar
│   │   └── Sidebar.tsx         # Navigation sidebar
│   ├── config/
│   │   └── apis.json           # API registry configuration
│   ├── types/
│   │   └── api.ts              # TypeScript interfaces
│   ├── App.tsx                 # Main application component
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles & Tailwind
├── scripts/
│   └── convert-raml.js         # RAML to OpenAPI converter
├── index.html                  # HTML template
├── package.json                # Dependencies & scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
└── LICENSE                     # MIT License
```

---

## Code Samples

### API Configuration Type Definition

```typescript
// src/types/api.ts
export interface ApiSpec {
  id: string;
  name: string;
  version: string;
  category: string;
  specPath: string;
  type: 'openapi' | 'raml';
  description?: string;
}

export interface ApisConfig {
  apis: ApiSpec[];
}
```

### Redoc Integration

```tsx
// src/components/ApiDoc.tsx
import { RedocStandalone } from 'redoc';
import { ApiSpec } from '../types/api';

interface ApiDocProps {
  api: ApiSpec;
}

export function ApiDoc({ api }: ApiDocProps) {
  // For RAML files, use the converted OpenAPI version
  const specUrl = api.type === 'raml'
    ? api.specPath.replace(/\.raml$/, '.converted.yaml')
    : api.specPath;

  return (
    <div className="h-full overflow-auto">
      <RedocStandalone
        specUrl={specUrl}
        options={{
          scrollYOffset: 0,
          hideDownloadButton: false,
          pathInMiddlePanel: true,
          theme: {
            colors: {
              primary: { main: '#3b82f6' },
            },
            sidebar: {
              backgroundColor: '#1f2937',
              textColor: '#f3f4f6',
            },
          },
        }}
      />
    </div>
  );
}
```

### RAML Conversion Script

```javascript
// scripts/convert-raml.js
import { readFileSync, writeFileSync } from 'fs';
import wap from 'webapi-parser';

async function convertRamlFiles() {
  const { WebApiParser } = wap;

  // Read RAML content
  const ramlContent = readFileSync(ramlPath, 'utf-8');

  // Parse RAML 1.0
  const model = await WebApiParser.raml10.parse(ramlContent);

  // Resolve references
  const resolved = await WebApiParser.raml10.resolve(model);

  // Generate OpenAPI 3.0
  const oas30 = await WebApiParser.oas30.generateString(resolved);

  // Write output
  writeFileSync(outputPath, oas30);
}
```

### Sample RAML Specification

```yaml
#%RAML 1.0
title: Users API
version: 1.0.0
baseUri: https://api.example.com/v1
mediaType: application/json

types:
  User:
    type: object
    properties:
      id:
        type: integer
        description: Unique identifier
      email:
        type: string
        pattern: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
      name:
        type: string
        minLength: 1
        maxLength: 100

/users:
  get:
    displayName: List Users
    queryParameters:
      page:
        type: integer
        default: 1
      limit:
        type: integer
        default: 20
    responses:
      200:
        body:
          application/json:
            type: User[]
```

---

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production bundle (includes RAML conversion) |
| `npm run preview` | Preview production build locally |
| `npm run convert-raml` | Manually convert RAML files to OpenAPI |
| `npm run deploy` | Build and deploy to S3 (requires AWS CLI) |

---

## Troubleshooting

### RAML Conversion Fails

**Problem**: RAML files fail to convert to OpenAPI.

**Solutions**:
1. Ensure RAML file is valid RAML 1.0 syntax
2. Check for unsupported RAML features
3. Verify all `!include` references exist
4. Run `npm run convert-raml` manually to see detailed errors

### Redoc Shows Blank Page

**Problem**: API documentation page shows blank content.

**Solutions**:
1. Check browser console for CORS errors
2. Verify spec file exists in `public/specs/`
3. Ensure spec file is valid OpenAPI 3.x
4. Check network tab for 404 errors on spec file

### Build Fails with Memory Error

**Problem**: Build process runs out of memory.

**Solution**: Increase Node.js memory limit:
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### S3 Deployment 403 Errors

**Problem**: CloudFront returns 403 for SPA routes.

**Solution**: Configure CloudFront custom error responses to return `index.html` for 403 and 404 errors with 200 status code.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Sreedhar Pamidiparthi
