import { describe, expect, test, jest } from '@jest/globals';
import { effect, effectOn, reactiveData } from '../src/core/reactive';

describe('core/reactive', () => {
    test('effect subscribes and is notified on get and set', () => {
        const spy = jest.fn(() => { });

        // Register effect; should be invoked once via initial notify during dependency collection
        effect(spy);
        expect(spy).toHaveBeenCalledTimes(1);

        // Mutate a tracked key and expect notification
        const prev = reactiveData.index;
        reactiveData.index = prev + '-changed';
        expect(spy).toHaveBeenCalledTimes(2);

        expect(reactiveData.index).toBe(prev + '-changed');
    });

    test('setting specific key notifies subscribed effect', () => {
        const spy = jest.fn(() => { });

        // Subscribe to `value` key specifically
        effectOn('value', () => {
            spy();
        });

        expect(spy).toHaveBeenCalledTimes(1);
        const before = String(reactiveData.value);
        reactiveData.value = before + '-x';
        expect(spy).toHaveBeenCalledTimes(2);
        expect(reactiveData.value).toBe(before + '-x');
    });
});
