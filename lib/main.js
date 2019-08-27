"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
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
                    "GearBot/Util/PromMonitors.py"
                ];
                if (upgradeFiles.filter(f => files.has(f)).length > 0)
                    output = "upgrade";
            }
            core.exportVariable("PLACEHOLDER_VALUE", output);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
