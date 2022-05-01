import axios from 'axios';

export default class LighthouseManager {
	private lighthouseServer: string;

	constructor(lighthouseServer: string) {
		this.lighthouseServer = lighthouseServer;
	}

	public async allOn(): Promise<boolean> {
		try {
			await axios({
				method: 'post',
				url: this.lighthouseServer + '/all_on',
			});
		} catch (err) {
			console.error("Failed to power on lighthouses");
			return false;
		}

		return true;
	}

	public async allOff(): Promise<boolean> {
		try {
			await axios({
				method: 'post',
				url: this.lighthouseServer + '/all_off',
			});
		} catch (err) {
			console.error("Failed to power off lighthouses");
			return false;
		}

		return true;
	}
}