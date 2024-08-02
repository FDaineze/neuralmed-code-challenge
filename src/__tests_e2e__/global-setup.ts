import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function globalSetup() {
  await execAsync('npm run dev');
}

export default globalSetup;
