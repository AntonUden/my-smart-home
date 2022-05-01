import IHomeassistantConfiguration from "./IHomeAssistantConfiguration";

export default interface IConfiguration {
	speech_server: string,
	lighthouse_server: string,
	bad_hue_api_url: string,
	serial_port: string,
	homeassitant: IHomeassistantConfiguration
}