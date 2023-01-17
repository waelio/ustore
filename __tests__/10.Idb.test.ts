import { uStore, idbStorage } from '../src/_stores/index';;

jest.mock('localforage')

const payload = 'Test Payload1';
const label = 'test';

test('uStore set & get', async() => {
  expect(idbStorage).toBeTruthy()
  await uStore.idb.set(label, payload)
  await idbStorage.get(label)
    .then((value) => {
      expect(value).toBe(payload);
    })
    .catch((err) => {
      console.log(err);
    })
});
