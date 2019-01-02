/* tslint:disable:no-unused-variable */

import { DefaultPipe } from './default.pipe';

describe('Pipe: Default', () => {
    let pipe: DefaultPipe;

    beforeEach(() => {
        pipe = new DefaultPipe();
    });

    it('providing no value returns fallback', () => {
        expect(pipe.transform('', 'http://place-hold.it/300')).toBe('http://place-hold.it/300');
    });

    it('providing a value returns value', () => {
        expect(pipe.transform('http://place-hold.it/300', 'fallback')).toBe('http://place-hold.it/300');
    });

    it('asking for https returns https', () => {
        expect(pipe.transform('', 'http://place-hold.it/300', true)).toBe('https://place-hold.it/300');
    });
});