import {glob} from 'glob';
import {exec} from 'node:child_process';
import {promisify} from 'node:util';

const execAsync = promisify(exec);

(async () => {
	const files = await glob('**/*.scss', {
		cwd     : process.cwd(),
		absolute: true,
		ignore  : ['**/node_modules/**'],
	});

	for (const file of files) {
		const outFile = file.replace(/\.scss$/, '.css');
		const cmd     = `sass "${file}" "${outFile}"`;

		try {
			await execAsync(cmd);
			console.log(`✅  Done: ${file} → ${outFile}`);
		} catch (err) {
			console.error(`❌ Failed: ${file} → ${outFile}`);
			console.error(err.stderr || err);
		}
	}
})();
