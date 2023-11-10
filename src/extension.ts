import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.idcLaunch', async () => {
        const userId = await vscode.window.showInputBox({
            placeHolder: "Enter your user ID for IDC"
        });

        if (userId) {
            const terminal = vscode.window.createTerminal(`SSH Tunnel`);
            terminal.show();
            terminal.sendText("tmux new-session || tmux attach-session");
            setTimeout(() => {
                const sshCommand = `ssh -t ${userId}@idcbetabatch.eglb.intel.com "srun --pty bash -c 'curl -Lk https://code.visualstudio.com/sha/download?build=stable&os=cli-alpine-x64 --output vscode_cli.tar.gz; tar -xzf vscode_cli.tar.gz; ./code tunnel --accept-server-license-terms'"`;
                terminal.sendText(sshCommand);
            }, 3000);

        } else {
            vscode.window.showErrorMessage("You must enter a user ID to connect to Intel Developer Cloud.");
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { }
