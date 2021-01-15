import { RunFunction } from '../../interfaces/Event';

export const run: RunFunction = async (client) => {
	client.logger.success(`[${client.user.tag}] has logged in`);
};

export const name: string = 'ready';
