import { Command } from 'commander';
import * as rl from 'readline';
import { Mode } from '@/types.js';
import { terminalHandler } from '@/cli/handlers/terminal.js';
import { webHandler } from '@/cli/handlers/web.js';

const command = new Command();

const choiceMode = async (): Promise<'terminal' | 'web'> => {
    const readline = rl.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        const askQuestion = () => {
            readline.question('Choose mode:\n  1. Terminal (t)\n  2. Web (w)\nEnter choice t/w: ', (answer) => {
                const choice = answer.trim().toLowerCase();
                if (choice === Mode.TERMINAL || choice === '1' || choice === 'terminal') {
                    readline.close();
                    resolve('terminal');
                } else if (choice === Mode.WEB || choice === '2' || choice === 'web') {
                    readline.close();
                    resolve('web');
                } else {
                    console.log('Invalid choice. Please enter t for Terminal mode or w for Web mode.');
                    askQuestion();
                }
            });
        };
        askQuestion();
    });
}


const commandAction = async () => {
    const options = command.opts();

    if (options.terminal || (await choiceMode()) === 'terminal') {
        await terminalHandler();
    } else {
        await webHandler();
    }
}

command
    .description('Ghoster - Anonymous P2P Terminal Chat')
    .version('0.1.0')
    .option('-t, --terminal', 'Terminal mode')
    .option('-w, --web', 'Web mode')
    .action(commandAction);

command.parse(process.argv);