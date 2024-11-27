"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
// import { JavaMetricsExtractor } from './Java/extractJavaMetrics'; 
let isActive = true;
let outputChannel;
let statusBarItem;
function activate(context) {
    // Create an Output Channel for the extension
    outputChannel = vscode.window.createOutputChannel("CodePure Output");
    // Create a Status Bar Item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1000);
    statusBarItem.text = "CodePure: Ready";
    statusBarItem.show();
    const activateCommand = vscode.commands.registerCommand('extension.activateCommand', () => {
        if (!isActive) {
            isActive = true;
            vscode.window.showInformationMessage('CodePure Activated!');
        }
        else {
            vscode.window.showWarningMessage('CodePure is already active!');
        }
    });
    const deactivateCommand = vscode.commands.registerCommand('extension.deactivateCommand', () => {
        if (isActive) {
            isActive = false;
            vscode.window.showInformationMessage('CodePure Deactivated!');
        }
        else {
            vscode.window.showWarningMessage('CodePure is not active!');
        }
    });
    vscode.workspace.onDidSaveTextDocument((document) => {
        if (isActive && isSupportedFileType(document)) {
            const code = document.getText();
            analyzeCode(document, code);
        }
    });
    context.subscriptions.push(activateCommand, deactivateCommand, outputChannel, statusBarItem);
}
function isSupportedFileType(document) {
    const fileType = document.languageId;
    const supportedFileTypes = ['java'];
    if (supportedFileTypes.includes(fileType)) {
        return true;
    }
    else {
        vscode.window.showWarningMessage(`Unsupported file type: ${fileType}`);
        return false;
    }
}
async function analyzeCode(document, code) {
    vscode.window.showInformationMessage('Analyzing Java code...');
    outputChannel.appendLine("Analyzing Java code...");
    outputChannel.appendLine("Code being analyzed:\n" + code);
    try {
        //TODO
        //metric functions 
        outputChannel.show();
    }
    catch (error) {
        outputChannel.appendLine("Error during analysis:");
        outputChannel.appendLine(`${error}`);
    }
}
function deactivate() {
    // Cleanup logic for the extension
    if (outputChannel) {
        outputChannel.dispose();
    }
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}
//# sourceMappingURL=extension.js.map