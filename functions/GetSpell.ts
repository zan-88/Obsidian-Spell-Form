import axios from "axios";

export async function getSpell(spell: string): Promise<string> {
	try {
		let res = await axios.get("https://api.open5e.com/spells", {
			params: {
				name__iexact: spell,
			},
		});
		return res.data;
	} catch (error) {
		console.error(error);
		return error;
	}
}
