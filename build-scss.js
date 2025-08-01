import {glob} from 'glob';
import {exec} from 'child_process';
import {promisify} from 'util';

const execAsync = promisify(exec);

(async () => {
	console.log('-------------------------');

	const files = await glob('**/*.scss', {
		cwd     : process.cwd(),
		absolute: true,
		ignore  : ['**/node_modules/**'],
	});

	console.log('-------------------------');
	console.log(files);
	console.log('-------------------------');

	for (const file of files) {
		const outFile = file.replace(/\.scss$/, '.css');
		const cmd     = `sass "${file}" "${outFile}"`;

		try {
			console.log(`📦 Compiling: ${file} → ${outFile}`);
			await execAsync(cmd);
			console.log(`✅ Done: ${outFile}`);
		} catch (err) {
			console.error(`❌ Failed: ${file}`);
			console.error(err.stderr || err);
		}
	}
})();
