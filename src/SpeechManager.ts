import axios from 'axios';

export default class SpeechManager {
	private speechServer: string;

	constructor(speechServer: string) {
		this.speechServer = speechServer;
	}

	public async speak(text: string): Promise<boolean> {
		try {
			await axios({
				method: 'post',
				url: this.speechServer + '/speak',
				data: text,
				headers: {
					"Content-Type": "text/plain"
				}
			});
		} catch (err) {
			console.error("Failed to send message to google home");
			return false;
		}

		return true;
	}
}