import * as fs from "fs";
import * as path from "path";

import {modifyHtml} from "./modifyHtml";

function replaceCssFile() {
	const directory = "./build/scripts/";
	const nonHashedFile = "index.css";
	const originalPath = path.join(directory, nonHashedFile);
	let hashedFile;

	fs.readdir(directory, (err, files) => {
		if (err) {
			console.error(err);
			return;
		}

		files.forEach((file) => {
			if (file.match(/index.*\.css/)) {
				if (file.match(/[a-z0-9]{8}/)) {
					hashedFile = file;

					fs.unlink(path.join(directory, hashedFile), (err) => {
						if (err) {
							console.error(err);
							return;
						}
						// console.log(`Successfully deleted ${hashedFile}.`);
						console.log(`Successfully deleted original CSS file`);
					});
				}
			}
		});
		if (hashedFile) {
			const newPath = path.join(directory, hashedFile);
			fs.rename(originalPath, newPath, (err) => {
				if (err) {
					console.error(err);
					return;
				}

				console.log(
					`Successfully renamed uncritical CSS file to ${hashedFile}.`
				);
				// then Update Html file
				modifyHtml(hashedFile);
			});
		} else {
			console.log("hashed file not found");
		}
	});
}

export {replaceCssFile};
