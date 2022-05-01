import * as FS from "fs";
import IConfiguration from "./IConfiguration";
import SmartHome from "./SmartHome";

require('console-stamp')(console, '[HH:MM:ss.l]');

if (!FS.existsSync("./config.json")) {
	console.log("Creating default configuration");
	let defaultConfig: IConfiguration = {
		speech_server: "http://192.168.1.4:1234",
		lighthouse_server: "http://192.168.1.4:8030",
		bad_hue_api_url: "http://192.168.1.4:6900",
		serial_port: "COM5",
		homeassitant: {
			host: "https://ha.zeeraa.net",
			token: "asdf"
		}
	}
	FS.writeFileSync("./config.json", JSON.stringify(defaultConfig, null, 4), 'utf8');
}

const config: IConfiguration = JSON.parse(FS.readFileSync("./config.json", 'utf8'));

new SmartHome(config);