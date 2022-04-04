"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode_1 = require("vscode");
const getRange = (document) => {
    const firtsLine = document.lineAt(0);
    const lastLine = document.lineAt(document.lineCount - 1);
    return new vscode_1.Range(firtsLine.range.start, lastLine.range.end);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const getDiff = (before, after) => {
    let afterLines = after.split('\n');
    let beforeLines = before.split('\n');
    let diff = [];
    let j = 0;
    for (let i = 0; i < afterLines.length; i++) {
        if (afterLines[i] !== beforeLines[j]) {
            diff.push(afterLines[i]);
        }
        else {
            j++;
        }
    }
    return diff.join('\n');
};
const report = (content) => {
    // send content 
};
function activate(context) {
    const subscriptions = [];
    const output = vscode_1.window.createOutputChannel('PasteDetector');
    subscriptions.push(vscode_1.commands.registerCommand('clipboard.paste', () => {
        var _a;
        let document = (_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document;
        const before = (document === null || document === void 0 ? void 0 : document.getText(getRange(document))) || '';
        vscode_1.commands.executeCommand("editor.action.clipboardPasteAction");
        sleep(300).then(() => {
            const after = (document === null || document === void 0 ? void 0 : document.getText(getRange(document))) || '';
            output.append(getDiff(before, after));
        });
    }));
    context.subscriptions.push(...subscriptions);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map