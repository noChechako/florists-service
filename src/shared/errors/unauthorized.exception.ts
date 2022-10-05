import CustomException from './custom.exception';

/**
 * This is exception to warn that credentials for unauthorized user
 * @link UnauthorizedException
 */
class UnauthorizedException extends CustomException {
    constructor() {
        super(401, 'Unauthorized');
    }
}

export default UnauthorizedException;
