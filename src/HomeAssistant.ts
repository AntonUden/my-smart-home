import IHomeAssistantConfiguration from "./IHomeAssistantConfiguration";

export default class HomeAssistant {
	private hass: any;

	constructor(config: IHomeAssistantConfiguration) {
		const HomeAssistant = require('homeassistant');
		this.hass = new HomeAssistant({
			host: config.host,
			token: config.token,
			port: 443,
			ignoreCert: false
		});
	}

	public async toggleLights(): Promise<boolean> {
		try {
			await this.hass.services.call('toggle', 'light', 'main');
		} catch(err) {
			console.error(err);
			return false;
		}
		return true;
	}
}