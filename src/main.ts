import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    // const myInput = core.getInput('myInput');
    // core.debug(`Hello ${myInput}`);
    core.debug(JSON.stringify(github.context.payload))
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
