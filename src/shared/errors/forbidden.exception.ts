import CustomException from './custom.exception';

/**
 * This is exception to warn that the action is not allowed for the user
 */
class ForbiddenException extends CustomException {
    constructor() {
        super(403, `Forbidden`);
    }
}

export default ForbiddenException;
