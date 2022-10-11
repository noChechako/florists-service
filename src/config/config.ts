import 'dotenv';

const env = process.env.NODE_ENV || 'dev';

const dev = {
    app: {
        port: parseInt(process.env.EXTERNAL_PORT) || 3000,
        jwtSecret: process.env.JWT_SECRET_KEY || 'secret',
        jwtMaxAge: parseInt(process.env.DEV_JWT_MAX_AGE) || 60 * 60 * 1000,
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.EXTERNAL_PORT) || 27017,
        name: process.env.DEV_DB_NAME || 'db',
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017'
    }
};

const config = new Map([
    ['dev', dev],
    ['test', dev],
]);

export function getConfig() {
    return config.get(env);
}
