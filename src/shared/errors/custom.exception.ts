/**
 * This is basic exception
 * {@label STRING_INDEXER}
 */
class CustomException extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export default CustomException;
