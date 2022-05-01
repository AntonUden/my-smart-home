import IConfiguration from "./IConfiguration";
import SpeechManager from "./SpeechManager";

import { ReadlineParser, SerialPort } from 'serialport'
import LighthouseManager from "./LighthouseManager";
import HomeAssistant from "./HomeAssistant";
import BadHueAPI from "./BadHueAPI";

export default class SmartHome {
	private speechManager: SpeechManager;
	private lighthouseManager: LighthouseManager;
	private homeAssitant: HomeAssistant;
	private badHueAPI: BadHueAPI;
	private config;

	private serialPort: SerialPort;

	constructor(config: IConfiguration) {
		this.config = config;

		this.serialPort = new SerialPort({ path: config.serial_port, baudRate: 9600 })
		const parser = new ReadlineParser();
		this.serialPort.pipe(parser);
		parser.on('data', (data: string) => this.handleSerialMessage(data))

		this.speechManager = new SpeechManager(config.speech_server);
		this.lighthouseManager = new LighthouseManager(config.lighthouse_server);
		this.homeAssitant = new HomeAssistant(config.homeassitant);
		this.badHueAPI = new BadHueAPI(config.bad_hue_api_url);
	}

	private async handleSerialMessage(data: string) {
		data = data.replace(/\r?\n|\r/g, "");
		console.log("Received serial message: " + data);
		switch (data) {
			case "b1_single":
				console.log("Toggle lights");

				await this.homeAssitant.toggleLights();

				break;

			case "b1_double":
				console.log("Blue lights");
				this.speechManager.speak("Setting lights to blue");
				await this.badHueAPI.blueLights();

				break;

			case "b1_tripple":
				console.log("White lights");
				this.speechManager.speak("Setting lights to white");
				await this.badHueAPI.clearLights();

				break;

			case "b3_single":
				console.log("Powering on lighthouses");
				this.speechManager.speak("Attempting to power on valve index lighthouses");

				if (await this.lighthouseManager.allOn()) {
					this.speechManager.speak("Powered on all valve index lighthouses");
				} else {
					this.speechManager.speak("Failed to power on valve index lighthouses");
				}
				break;

			case "b3_double":
				console.log("Powering off lighthouses");
				this.speechManager.speak("Attempting to power off valve index lighthouses");

				if (await this.lighthouseManager.allOff()) {
					this.speechManager.speak("Powered off all valve index lighthouses");
				} else {
					this.speechManager.speak("Failed to power off valve index lighthouses");
				}
				break;

			case "b3_tripple":
				this.speechManager.speak("Sending attack drones to borås");
				break;

			default:
				break;
		}
	}
}