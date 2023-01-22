import { uStore, idbStorage } from '../index';

jest.mock('localforage')

const payload = 'Test Payload1';
const label = 'test';

test('uStore set & get',  () => {
  

  uStore.idb.set(label, payload)
  idbStorage.get(label)
    .then((value) => {
      expect(value).toBe(payload);
    })
    .catch((err) => {
      console.log(err);
    })
});
