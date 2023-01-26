import * as fs from "fs";

function modifyHtml(hashedFile) {
	fs.readFile("./build/index.html", "utf8", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		const modifiedData = data.replace(/index\.css/g, hashedFile);
		fs.writeFile("./build/index.html", modifiedData, "utf8", (err) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log("Successfully updated path in index.html");
		});
	});
}

export {modifyHtml};
