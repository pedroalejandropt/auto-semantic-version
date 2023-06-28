const core = require('@actions/core');
import { VersionService } from "./services/VersionService";

async function run() {
  try {
    let versionService = new VersionService();
    let version = await versionService.buildVersion();
    console.log(version);
    console.log(version.get());
    
    core.setOutput('version', version.get());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
