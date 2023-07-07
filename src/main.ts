const core = require('@actions/core');
import { VersionService } from "./services/VersionService";

async function run() {
  try {
    let versionService = new VersionService();
    let version = await versionService.buildVersion();
    core.setOutput('version', version.get());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
