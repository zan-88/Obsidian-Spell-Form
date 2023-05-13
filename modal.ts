import { place } from "functions/useTemplate";
import { IDnd } from "ITemplates/iDnd5e";
import { App, Modal, Setting } from "obsidian";

export class SpellModal extends Modal {
	result: IDnd = {};
	onSubmit: (result: IDnd) => void;
	constructor(app: App, onSubmit: (result: IDnd) => void) {
		super(app);
		this.onSubmit = onSubmit;
	}

	onOpen() {
		const { contentEl } = this;

		contentEl.createEl("h1", { text: "Create Spell" });

		new Setting(contentEl).setName("Name").addText((text) =>
			text.onChange((value) => {
				this.result.name = value;
			})
		);

		new Setting(contentEl).setName("desc").addText((text) =>
			text.onChange((value) => {
				this.result.desc = value;
			})
		);

		new Setting(contentEl).setName("higher level").addText((text) =>
			text.onChange((value) => {
				this.result.higher_level = value;
			})
		);

		new Setting(contentEl).setName("range").addText((text) =>
			text.onChange((value) => {
				this.result.range = value;
			})
		);

		new Setting(contentEl).setName("components").addText((text) =>
			text.onChange((value) => {
				this.result.components = value;
			})
		);

		new Setting(contentEl).setName("material").addText((text) =>
			text.onChange((value) => {
				this.result.material = value;
			})
		);

		new Setting(contentEl)
			.setName("can be cast as ritual (y or n)")
			.addText((text) =>
				text.onChange((value) => {
					this.result.can_be_cast_as_ritual =
						value == "y" ? true : false;
				})
			);

		new Setting(contentEl).setName("duration").addText((text) =>
			text.onChange((value) => {
				this.result.duration = value;
			})
		);

		new Setting(contentEl)
			.setName("requires concentration (y or n)")
			.addText((text) =>
				text.onChange((value) => {
					this.result.requires_concentration =
						value == "y" ? true : false;
				})
			);

		new Setting(contentEl).setName("casting time").addText((text) =>
			text.onChange((value) => {
				this.result.casting_time = value;
			})
		);

		new Setting(contentEl).setName("level").addText((text) =>
			text.onChange((value) => {
				this.result.level = value;
			})
		);

		new Setting(contentEl).setName("school").addText((text) =>
			text.onChange((value) => {
				this.result.school = value;
			})
		);

		new Setting(contentEl).setName("dnd class").addText((text) =>
			text.onChange((value) => {
				this.result.dnd_class = value;
			})
		);

		new Setting(contentEl).addButton((btn) =>
			btn
				.setButtonText("Submit")
				.setCta()
				.onClick(() => {
					this.close();
					this.onSubmit(this.result);
				})
		);
	}

	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}
}
