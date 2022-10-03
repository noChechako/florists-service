import mongoose from 'mongoose';
import {logger} from '../utils/logger';

const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27017';

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
