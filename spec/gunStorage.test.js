import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { _To } from 'waelio-utils';
const { gunStorage } = require('../src/stores/gunStorage');

test('should have get/set functions', () => {
  expect(gunStorage.get).toBeTruthy();
  expect(gunStorage.set).toBeTruthy();
});

test('should set a value', async () => {
  const key = 'text',
    value = 'test';

  gunStorage.set(key, value);

  const rcv = _To(gunStorage.get(key));

  const [reject, resolve] = await rcv;

  console.log('reject', reject);
  console.log('resolve', resolve);

  // expect(resolve.get.toBeTruthy());
});
