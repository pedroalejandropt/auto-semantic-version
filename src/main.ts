const core = require('@actions/core');
import { getCommits, getTags } from "./helpers/GitCommand";

async function run() {
  try {
    getCommits();
    getTags();

    core.setOutput('previousTags', '');
    core.setOutput('lastCommit', '');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
