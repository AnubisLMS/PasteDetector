import {ExtensionContext, commands, window, Range, TextDocument} from 'vscode';

const getRange = (document: TextDocument) => {
    const firtsLine = document.lineAt(0);
    const lastLine = document.lineAt(document.lineCount - 1);
    return new Range(firtsLine.range.start, lastLine.range.end);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const getDiff = (before: string, after: string) => {
  let afterLines = after.split('\n');
  let beforeLines = before.split('\n');
  let diff = []

  let j = 0;
  for (let i = 0; i < afterLines.length; i++) {
    if (afterLines[i] !== beforeLines[j]) {
      diff.push(afterLines[i]);
    }else {
      j++;
    }
  }

  return diff.join('\n');
}

const report = (content: string) => {
  // send content 
}

export function activate(context: ExtensionContext) {
  const subscriptions = [];
  const output = window.createOutputChannel('PasteDetector');

  subscriptions.push(commands.registerCommand('clipboard.paste', () => {

    let document = window.activeTextEditor?.document;

    const before = document?.getText(getRange(document)) || '';

    commands.executeCommand("editor.action.clipboardPasteAction");

    sleep(300).then(() => {
      const after = document?.getText(getRange(document)) || '';
      output.append(getDiff(before, after));
      report(getDiff(before, after));
    });

  }));

  context.subscriptions.push(...subscriptions);

}
