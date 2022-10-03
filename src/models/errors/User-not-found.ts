import CustomException from './Custom-error';

class UserNotFoundException extends CustomException {
    constructor(id: string) {
        super(404, `User with id ${id} not found`);
    }
}

export default UserNotFoundException;
