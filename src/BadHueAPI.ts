import axios from "axios";

export default class BadHueAPI {
	private host: string;

	constructor(host: string) {
		this.host = host;	
	}

	public async blueLights(): Promise<boolean> {
		const ID = "kSu-6qFIpaBk-bb";

		try {
			await axios.get(this.host + "/activate_scene?id=" + ID);
		} catch(err) {
			console.error(err);
			return false;
		}
		return true;
	}

	public async clearLights(): Promise<boolean> {
		const ID = "81mbn1NE2Zy0XNH";

		try {
			await axios.get(this.host + "/activate_scene?id=" + ID);
		} catch(err) {
			console.error(err);
			return false;
		}
		return true;
	}
}