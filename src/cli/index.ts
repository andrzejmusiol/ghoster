import { Command } from 'commander';
import * as rl from 'readline';
import { Mode } from '@/types.js';

const command = new Command();
const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

const commandAction = async () => {
    readline.question('Choose mode:\n  1. Terminal (t)\n  2. Web (w)\nEnter choice t/w: ', (answer) => {
        const choice = answer.trim().toLowerCase();
        if (choice === Mode.TERMINAL) {
            command.opts().terminal = true;
        } else if (choice === Mode.WEB) {
            command.opts().web = true;
        } else {
            console.log('Invalid choice. Please enter t for Terminal mode or w for Web mode.');
        }
    });
}

command
    .description('Ghoster - Anonymous P2P Terminal Chat')
    .version('0.1.0')
    .option('-t, --terminal', 'Terminal mode')
    .option('-w, --web', 'Web mode')
    .action(commandAction);

command.parse(process.argv);