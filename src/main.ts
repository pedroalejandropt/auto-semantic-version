const core = require('@actions/core');
import { GitCommandService } from "./services/GitCommandService";

async function run() {
  try {
    let gitService = new GitCommandService();
    let commit = await gitService.getLastCommit();

    core.setOutput('previousTags', '');
    core.setOutput('lastCommit', `${commit.Hash} - ${commit.Msg}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
