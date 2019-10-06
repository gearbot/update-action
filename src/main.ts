import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
    try {
        const commits = github.context.payload.commits;
        let output = "update";
        if (commits.length >= 20)
            output = "upgrade";
        else {
            const files = new Set();
            for (let i = 0; i < commits.length; i++) {
                const modified = commits[i].modified;
                for (let j = 0; j < modified.length; j++) {
                    core.debug(modified[j]);
                    files.add(modified[j]);
                }
            }

            const upgradeFiles = [
                "GearBot/GearBot.py",
                "GearBot/Bot/GearBot.py",
                "GearBot/Util/PromMonitors.py",
                "requirements.txt"
            ];
            if (upgradeFiles.filter(f => files.has(f)).length > 0)
                output = "upgrade"
        }
        core.exportVariable("PLACEHOLDER_VALUE", output);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
