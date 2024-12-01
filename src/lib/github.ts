import { Octokit } from 'octokit';
import { OAuthApp } from '@octokit/oauth-app';

const GITHUB_CLIENT_ID = 'your_github_client_id';
const GITHUB_CLIENT_SECRET = 'your_github_client_secret';

const app = new OAuthApp({
  clientId: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
});

interface TemplateSubmission {
  title: string;
  description: string;
  category: string;
  previewImage: File;
  repoOwner: string;
  repoName: string;
}

export async function authenticateWithGitHub() {
  const { url } = await app.getWebFlowAuthorizationUrl({
    scopes: ['public_repo', 'read:user'],
  });
  window.location.href = url;
}

export async function handleGitHubCallback(code: string) {
  const { authentication } = await app.createToken({
    code,
  });
  return authentication;
}

export async function getUserRepositories(token: string) {
  const octokit = new Octokit({ auth: token });
  const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
    visibility: 'public',
    sort: 'updated',
    per_page: 100,
  });
  return repos;
}

export async function submitTemplate(data: TemplateSubmission, token: string) {
  const octokit = new Octokit({ auth: token });

  try {
    // Upload preview image to repository
    const imageContent = await data.previewImage.arrayBuffer();
    const base64Image = Buffer.from(imageContent).toString('base64');
    
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: data.repoOwner,
      repo: data.repoName,
      path: 'preview.png',
      message: 'Add template preview image',
      content: base64Image,
    });

    // Create template metadata file
    const metadata = {
      title: data.title,
      description: data.description,
      category: data.category,
      previewImage: 'preview.png',
      createdAt: new Date().toISOString(),
    };

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: data.repoOwner,
      repo: data.repoName,
      path: 'template.json',
      message: 'Add template metadata',
      content: Buffer.from(JSON.stringify(metadata, null, 2)).toString('base64'),
    });

    return {
      success: true,
      message: 'Template submitted successfully',
    };
  } catch (error) {
    console.error('Failed to submit template:', error);
    throw new Error('Failed to submit template. Please try again.');
  }
}