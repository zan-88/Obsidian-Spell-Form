import { IDnd } from "ITemplates/iDnd5e";

export function place(api: IDnd): string {
	let level = "";
	let components = "";
	if (api.level != null) {
		level = api.level.replace("-", " ");
	}

	if (api.components != null) {
		components = api.components;
		components = components.replace(",", "");
		components = components.replace(",", "");
	}
	const material = api.material ? `(${api.material})` : "";

	let duration = api.duration ? api.duration : "";
	duration = api.requires_concentration
		? `Concentration, ${duration}`
		: duration;

	const higher_level = api.higher_level
		? `
    <li>
        <span>At Higher Levels: </span>${api.higher_level}
    </li>
    `
		: "";
	return `
---
cssclass: full-width
---
  <div class="booktemplate content-text">
    <div class="single-view">
      <div class="gold"></div>
      <div class="body">
        <div class="name">
          <h1>${api.name}</h1>
        </div>
        <div class="subtitle redsubtitle">
          <span>${level} ${api.school} </span>
        </div>
        <div class="single-list">
          <ul>
            <li><span>Casting Time: </span>${api.casting_time}</li>
            <li><span>Range: </span>${api.range}</li>
            <li><span>Components: </span>${components} ${material}</li>
            <li>
              <span>Duration: </span>${duration}
            </li>
            <li><span>Classes: </span>${api.dnd_class}</li>
            <li>
              ${api.desc}
            </li>
            ${higher_level}
          </ul>
        </div>
      </div>
      <div class="gold"></div>
    </div>
  </div>`;
}
