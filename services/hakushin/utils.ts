export class Hakushin {
	// Configuration
	static readonly API_BASE_URL = process.env.HAKUSHIN_API_URL;

	// Agents
	static listAgents = () => {
		return `${this.API_BASE_URL}/zzz/data/character.json`;
	};

	static agentDetails = (id: string) => {
		return `${this.API_BASE_URL}/zzz/data/en/character/${id}.json`;
	};

	// Bangboo
	static listBangboo = () => {
		return `${this.API_BASE_URL}/zzz/data/bangboo.json`;
	};

	static bangbooDetails = (id: string) => {
		return `${this.API_BASE_URL}/zzz/data/en/bangboo/${id}.json`;
	};

	// W-Engine
	static listWEngine = () => {
		return `${this.API_BASE_URL}/zzz/data/weapon.json`;
	};

	static wEngineDetails = (id: string) => {
		return `${this.API_BASE_URL}/zzz/data/en/weapon/${id}.json`;
	};

	// Drive Disc
	static listDriveDisc = () => {
		return `${this.API_BASE_URL}/zzz/data/equipment.json`;
	};

	static driveDiscDetails = (id: string) => {
		return `${this.API_BASE_URL}/zzz/data/en/equipment/${id}.json`;
	};

	// Achievements
	static listAchievements = () => {
		return `${this.API_BASE_URL}/zzz/data/en/achievement/achievement.json`;
	};

	// Inventory
	static listInventory = () => {
		return `${this.API_BASE_URL}/zzz/data/en/item.json`;
	};

	static inventoryDetails = (id: string) => {
		return `${this.API_BASE_URL}/zzz/data/en/item/${id}.json`;
	};

	// Enemy Creatures
	static listEnemyCreatures = () => {
		return `${this.API_BASE_URL}/zzz/data/monster.json`;
	};

	static enemyCreaturesDetails = (id: string) => {
		return `${this.API_BASE_URL}/zzz/data/en/monster/${id}.json`;
	};

	// Shiyu Defense
	static listShiyuDefense = () => {
		return `${this.API_BASE_URL}/zzz/data/shiyu.json`;
	};

	static shiyuDefenseDetails = (id: string) => {
		return `${this.API_BASE_URL}/zzz/data/en/shiyu/${id}.json`;
	};

	// Deadly Assault
	static listDeadlyAssault = () => {
		return `${this.API_BASE_URL}/zzz/data/boss.json`;
	};

	static deadlyAssaultDetails = (id: string) => {
		return `${this.API_BASE_URL}/zzz/data/en/boss/${id}.json`;
	};

	// Changelog
	static changelog = () => {
		return `${this.API_BASE_URL}/zzz/new.json`;
	};
}
