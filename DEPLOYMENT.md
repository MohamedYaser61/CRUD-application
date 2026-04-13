# Deploying ProductHub to Vercel

This guide explains how to deploy the ProductHub CRUD application to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository (already initialized in this project)

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy from the project root**:
   ```bash
   vercel
   ```

3. Follow the prompts to link your Vercel account and configure the project.

### Option 2: Deploy via GitHub Integration

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select "Import Git Repository"
   - Connect your GitHub account and select this repository
   - Click "Deploy"

3. Vercel will automatically detect it's a static site and deploy it.

## Project Configuration

The project includes a `vercel.json` configuration file that:

- Enables clean URLs (removes `.html` extensions)
- Sets up client-side routing to serve `index.html` for all routes
- Configures cache headers for optimal performance
- Sets up redirects for common routes

## Features

- **Local Storage**: Product data is stored in browser's local storage, so no backend database is required
- **Static Deployment**: No build step needed - files are served directly
- **Responsive Design**: Works on all devices
- **Bootstrap UI**: Built with Bootstrap 5 for modern styling

## Demo Data

The application includes demo data that resets when you click "Reset Demo Data" button.

## Environment Notes

- No environment variables required
- All functionality is client-side
- Works in any modern browser

## After Deployment

1. Your site will be live at `https://your-project-name.vercel.app`
2. You can set up a custom domain in Vercel project settings
3. Future pushes to your repository will trigger automatic redeployments

## Troubleshooting

- **Blank page**: Check browser console for errors (F12)
- **Styling not loading**: Verify CSS files are being served correctly
- **Data resetting**: Check browser's local storage is enabled
- **Performance**: Vercel provides edge caching for all static assets

For more Vercel documentation, visit [vercel.com/docs](https://vercel.com/docs)
