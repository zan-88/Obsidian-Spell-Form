import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
	TFile,
	TFolder,
} from "obsidian";
import { IDnd } from "ITemplates/iDnd5e";
import { getSpell } from "functions/GetSpell";
import { place } from "functions/useTemplate";
import { SpellModal } from "modal";
import { type } from "os";
// Remember to rename these classes and interfaces!
export default class SpellForm extends Plugin {
	async onload() {
		this.addCommand({
			id: "convert-to-uppercase",
			name: "Convert to uppercase",
			editorCallback: async (editor: Editor) => {
				const selection = editor.getSelection().toLowerCase();
				let vault = this.app.vault;
				let path: string = `Spell Book/${selection}.md`;
				let isFile: boolean = fileExists(this.app, path);

				if (!isFile) {
					if (!folderExists(this.app, "Spell Book"))
						await vault.createFolder("Spell Book");
					let temp: IDnd | undefined;
					let res = await Promise.resolve(getSpell(selection));
					res = JSON.stringify(res);
					//editor.replaceSelection(`[[${selection}]]`);
					temp = JSON.parse(res)["results"][0];
					if (temp) {
						const file = await createFile(
							this.app,
							path,
							place(temp)
						);
					} else {
						let custom: IDnd | undefined;
						let tester: string = "truth";

						const onSubmit = (result: IDnd) => {
							let temp: string = place(result);
							createFile(this.app, path, temp);
						};

						let temp: string = "";
						new SpellModal(this.app, async (result) => {
							temp = place(result);
							await createFile(this.app, path, temp);
						}).open();

						// if (custom) {
						// 	let file = await createFile(
						// 		this.app,
						// 		path,
						// 		place(custom)
						// 	);
						// }
					}
				}
			},
		});
	}
}

function folderExists(app: App, path: string): boolean {
	const file = app.vault.getAbstractFileByPath(path);
	return file instanceof TFolder;
}

function fileExists(app: App, path: string): boolean {
	const file = app.vault.getAbstractFileByPath(path);
	return file instanceof TFile;
}

async function createFile(
	app: App,
	path: string,
	contents: string
): Promise<TFile> {
	const file = await app.vault.create(path, contents);
	return file;
}
