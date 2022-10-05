import CustomException from './custom.exception';

/**
 * This is exception to warn that credentials for unauthorized user
 */
class UserNotFoundException extends CustomException {
    constructor(id: string) {
        super(404, `User with id ${id} not found`);
    }
}

export default UserNotFoundException;
