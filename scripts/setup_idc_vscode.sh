#!/bin/bash

echo "IDC username:"
read USERNAME
echo "Path to your SSH identity file or press enter to use the default (~/.ssh/id_rsa):"
read IDENTITY_FILE

if [ -z "$IDENTITY_FILE" ]; then
    IDENTITY_FILE="~/.ssh/id_rsa"
fi

{
    echo "Host idc_vscode"
    echo "    HostName idcbetabatch.eglb.intel.com"
    echo "    User $USERNAME"
    echo "    IdentityFile $IDENTITY_FILE"
    echo "    RemoteCommand srun --pty bash -c 'curl -Lk \"https://code.visualstudio.com/sha/download?build=stable&os=cli-alpine-x64\" --output vscode_cli.tar.gz; tar -xzf vscode_cli.tar.gz; ./code tunnel --accept-server-license-terms'"
    echo "    RequestTTY yes"
} >> ~/.ssh/config
echo "SSH configuration for vscode on IDC has been added. To launch a vscode tunnel on IDC use: 'ssh idc_vscode'."

