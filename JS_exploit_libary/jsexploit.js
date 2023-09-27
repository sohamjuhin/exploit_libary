const { execSync } = require('child_process');

function install() {
    console.clear();
    console.log(`${logo}`);
    console.log(`${Fore.RED}Updating packages...`);
    
    try {
        execSync('apt update', { stdio: 'inherit' });

        if (isCommandAvailable('/etc/init.d/postgresql')) {
            console.log('\nPostgresql is already installed.');
        } else {
            console.log('\nInstalling postgresql....');
            execSync('apt install postgresql -y', { stdio: 'inherit' });
        }

        if (isCommandAvailable('msfconsole')) {
            console.log('\nMetasploit is already installed.');
        } else {
            console.log('\nInstalling Metasploit....');
            execSync('curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall && chmod 755 msfinstall && ./msfinstall', { stdio: 'inherit' });
        }

        if (isCommandAvailable('pip3')) {
            console.log('\npip3 is already installed.');
        } else {
            console.log('Installing pip3...');
            execSync('wget https://bootstrap.pypa.io/get-pip.py', { stdio: 'inherit' });
            execSync('python3 get-pip.py', { stdio: 'inherit' });
            execSync('rm -rf get-pip.py', { stdio: 'inherit' });
        }

        console.log('\nInstalling requirements...');
        execSync('pip3 install -r requirements.txt', { stdio: 'inherit' });

        console.log('\nInstallation complete.');
        console.log('\n[~] Use the command: sudo python3 main.py to run the tool.');
    } catch (error) {
        console.error(`${Fore.RED}An error occurred during installation: ${error}`);
    }
}

// Helper function to check if a command is available
function isCommandAvailable(command) {
    try {
        execSync(`command -v ${command} > /dev/null 2>&1`);
        return true;
    } catch (error) {
        return false;
    }
}

// You can call the install function when needed
install();
