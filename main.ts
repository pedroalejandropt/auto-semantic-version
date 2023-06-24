const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const owner = process.env.GITHUB_REPOSITORY.split('/')[0];
    const repo = process.env.GITHUB_REPOSITORY.split('/')[1];
    const token = process.env.GITHUB_TOKEN; // Personal access token

    // Set authentication headers
    const authHeaders = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json'
    };

    // Fetch previous tags
    const tagsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/tags`, { headers: authHeaders });
    const previousTags = tagsResponse.data.map((tag: any) => tag.name);

    // Fetch last commit
    const commitsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, { headers: authHeaders });
    const lastCommit = commitsResponse.data[0].sha;

    core.setOutput('previousTags', previousTags.join(','));
    core.setOutput('lastCommit', lastCommit);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
