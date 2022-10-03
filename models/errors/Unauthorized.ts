import CustomException from './Custom-error';

class UnauthorizedException extends CustomException {
    constructor() {
        super(401, 'Unauthorized');
    }
}

export default UnauthorizedException;
