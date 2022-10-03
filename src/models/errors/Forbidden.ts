import CustomException from './Custom-error';

class ForbiddenException extends CustomException {
    constructor() {
        super(403, `Forbidden`);
    }
}

export default ForbiddenException;
