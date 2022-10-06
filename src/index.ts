import app from './app';
import {logger} from './utils/logger';

app.listen(process.env.EXTERNAL_PORT || 3000, () => {
    logger.info(`Server listening on port ${process.env.EXTERNAL_PORT || 3000}`);
});
