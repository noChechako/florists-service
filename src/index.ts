import server from './server';
import {logger} from './infrastructure/logger';
import {getConfig} from './config/config';

const config = getConfig();

server.listen(config.app.port, () => {
    logger.info(`Server listening on port ${config.app.port}`);
});
