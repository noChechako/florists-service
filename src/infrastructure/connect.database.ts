import mongoose from 'mongoose';
import {logger} from './logger';
import {getConfig} from '../config/config';

const config = getConfig();

const mongoURL = config.db.uri;

const mongoOptions = {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const db = mongoose.connection;

db.on('connecting', () => logger.info('Connecting to MongoDB...'));

db.on('error', (error) => logger.error(error));

db.on('connected', () => logger.info('MongoDB connected!'));

db.once('open', async () => logger.info('MongoDB opened!'));

db.on('reconnected', () => logger.info('MongoDB reconnected!'));

db.on('disconnected', () => {
    retryConnectionAfterTimeout();
});

const MAX_ATTEMPTS = 10;
const FACTOR = 1.5;
const DEFAULT_RETRY_TIMEOUT = 5000;
const DEFAULT_ATTEMPTS = 0;

let retryTimeout = DEFAULT_RETRY_TIMEOUT;
let attempts = DEFAULT_ATTEMPTS;

const retryConnectionAfterTimeout = () => {
    if (attempts < MAX_ATTEMPTS) {
        setTimeout(connectDatabase, retryTimeout);
        retryTimeout *= FACTOR;
        attempts++;
    }
};

/**
 * Function of connecting to database with retry
 */
export function connectDatabase() {
    mongoose
        .connect(mongoURL, mongoOptions)
        .then(() => {
            retryTimeout = DEFAULT_RETRY_TIMEOUT;
            attempts = DEFAULT_ATTEMPTS;
        })
        .catch(() => {
            retryConnectionAfterTimeout();
        });
}
