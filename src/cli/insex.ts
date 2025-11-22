import { Command } from 'commander';

const program = new Command();

program
    .command('create')
    .action(() => {
        console.log('Room creation...');
    });

program.parse();
