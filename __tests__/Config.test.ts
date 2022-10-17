import { configStorage } from '../index';
const config = configStorage

test('testing config', () => {
  const envvs = ['client', 'dev', 'server'];
  const dummys = ['test1', 'hot_cold', 'test1 test 2'];

  for (let index = 0; index < dummys.length; index++) {
    for (let indexx = 0; indexx < envvs.length; indexx++) {
      let KEY = `${envvs[indexx]}:CONFIG`;
      let VALUE = dummys[index]
      config.set(KEY, VALUE );
      expect(config.get(KEY)).toEqual(
        VALUE
      );
    }
  }
});
