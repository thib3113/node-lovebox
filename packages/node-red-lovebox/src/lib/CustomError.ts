import path from 'path';

export class CustomError implements Error {
    public stack: string;
    protected _message: string;
    public exception: Error;
    public message: string;
    public payload: Record<string, unknown> | undefined;

    public constructor(message: string | Error = '', payload?: Record<string, unknown>, exception?: Error | string | null) {
        if (message instanceof Error) {
            exception = message;
            message = message.message;
        }

        this.payload = payload;

        const generateStack = (): string => {
            let tmpStack = new Error().stack || '';
            if (this.exception) {
                tmpStack += '\n=== CAUSED BY ===\n';
                tmpStack += `${this.exception.toString()}`;
            }
            const stack = tmpStack
                .split('\n')
                .filter(
                    (line): boolean => !line.match(new RegExp(`${path.basename(__filename).replace(/\.js$/, '.ts')}:[0-9]+:[0-9]+\\)`, 'g'))
                );
            //remove two last line from stack
            return `${this.name} : ${this._message}\n${stack.join('\n')}`;
        };

        this._message = message;
        this.message = this._message;
        this.exception = typeof exception === typeof '' ? new Error(exception as string) : (exception as Error);

        this.stack = generateStack();

        // Set the prototype explicitly.
        // Object.setPrototypeOf(this, Error.prototype);
    }

    public toString = (): string => {
        const obj = Object(this);
        if (obj !== this) {
            throw new TypeError();
        }

        const name = this.name || 'Error';

        const message = String(this._message) || '';

        const strComponents: Array<string> = [];

        strComponents.push(`${name} : ${message} \n`);

        strComponents.push(this.stack);

        return strComponents.join(' ');
    };

    name: string = 'Error';
}
