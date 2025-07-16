# GitHub Actions Workflows for ArgosAI Brasil

This repository includes several GitHub Actions workflows to build, test, and deploy the Vue.js application.

## 🚀 Available Workflows

### 1. **Deploy to GitHub Pages** (`deploy.yml`)
**Purpose**: Simple deployment to GitHub Pages
**Triggers**: Push to `main`/`master` branch, manual dispatch
**Features**:
- Builds the Vue.js app
- Deploys to GitHub Pages
- Automatic HTTPS with custom domain support

**Setup**:
1. Go to your repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to main branch or run manually

**Access**: Your app will be available at `https://yourusername.github.io/argosaibrasil/`

### 2. **Full CI/CD Pipeline** (`ci-cd.yml`)
**Purpose**: Complete testing and deployment pipeline
**Triggers**: Push to any branch, pull requests, manual dispatch
**Features**:
- Runs on multiple branches
- ESLint and TypeScript checking
- Build verification
- Artifact uploads for debugging
- Conditional deployment to GitHub Pages

**What it does**:
- ✅ **Test Job**: Linting, type checking, build verification
- 🚀 **Deploy Job**: Deploys to GitHub Pages (only from main/master)

### 3. **Development Server** (`serve.yml`)
**Purpose**: Serve the app temporarily for testing
**Triggers**: Manual dispatch only
**Features**:
- Builds and serves the app on GitHub's runner
- Configurable port (default: 3000)
- Useful for quick testing without local setup

**Usage**:
1. Go to Actions tab → Development Server
2. Click "Run workflow"
3. Optionally specify a port
4. The app runs for up to 60 minutes

### 4. **Docker Build & Deploy** (`docker.yml`)
**Purpose**: Build and push Docker containers
**Triggers**: Push to `main`/`master`, tags, manual dispatch
**Features**:
- Builds the Vue.js app
- Creates optimized nginx-based Docker image
- Pushes to GitHub Container Registry
- Includes production-ready nginx configuration

**Usage**:
```bash
# Pull and run the container
docker pull ghcr.io/yourusername/argosaibrasil:latest
docker run -p 8080:80 ghcr.io/yourusername/argosaibrasil:latest

# Access at http://localhost:8080/argosaibrasil/
```

## 🔧 Configuration

### Environment Variables
No special environment variables are required for basic functionality.

### Secrets (if using optional features)
For advanced deployments, you might need:
- `NETLIFY_SITE_ID` - For Netlify deployment
- `NETLIFY_AUTH_TOKEN` - For Netlify deployment

### Repository Settings
1. **GitHub Pages**: Enable in Settings → Pages
2. **Actions**: Ensure Actions are enabled in Settings → Actions
3. **Packages**: Enable Container Registry if using Docker workflow

## 📦 Build Output

All workflows generate a `dist/` directory containing:
- `index.html` - Main application entry point
- `assets/` - CSS, JS, and image files
- Static assets with cache-busting hashes

Build size is typically around **100-150KB** (gzipped).

## 🛠️ Workflow Features

### Quality Checks
- **ESLint**: Code quality and style checking
- **TypeScript**: Type safety verification
- **Build verification**: Ensures successful compilation

### Performance Optimizations
- **Caching**: npm dependencies cached between runs
- **Parallel jobs**: Testing and deployment run efficiently
- **Conditional deployment**: Only deploys from main branch

### Security
- **Permissions**: Minimal required permissions for each job
- **Token security**: Uses GITHUB_TOKEN with limited scope
- **Container scanning**: Docker images include security headers

## 📊 Monitoring

### Workflow Status
- Check the Actions tab for build status
- Failed builds will show detailed error logs
- Artifacts are preserved for debugging

### Deployment Status
- GitHub Pages deployments show in the deployments section
- Each deployment has a unique URL for testing

## 🚨 Troubleshooting

### Common Issues

**Build Fails with TypeScript Errors**:
```bash
# Run locally to debug
npm run type-check
```

**Deployment Permission Errors**:
- Ensure GitHub Pages is enabled
- Check repository Settings → Actions → General → Workflow permissions

**Docker Build Issues**:
- Verify the build succeeds locally first
- Check Docker workflow logs for specific errors

### Getting Help
1. Check workflow logs in the Actions tab
2. Verify local build works: `npm run build`
3. Test locally: `npm run preview`

## 🔄 Updating Workflows

To modify workflows:
1. Edit files in `.github/workflows/`
2. Test changes on a feature branch first
3. Workflows automatically run on push

## 📈 Next Steps

Consider adding:
- **Performance testing** with Lighthouse CI
- **E2E testing** with Playwright or Cypress
- **Multi-environment deployments** (staging, production)
- **Slack/Discord notifications** for deployment status

## 🎯 Quick Start

1. **Enable GitHub Pages**: Settings → Pages → Source: GitHub Actions
2. **Push to main**: Your app will auto-deploy
3. **Check deployment**: Visit `https://yourusername.github.io/argosaibrasil/`

That's it! Your Vue.js app is now automatically deployed. 🎉
