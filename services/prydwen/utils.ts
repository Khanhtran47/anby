export class Prydwen {
	// Configuration
	static readonly API_BASE_URL = process.env.PRYDWEN_API_URL;

	// Agents
	static agentDetails = (id: string) => {
		return `${this.API_BASE_URL}/zenless/characters/${id}/page-data.json`;
	};
}
