import { join } from 'path';
import { readFileSync } from 'fs';

export type StoresListKeys = 'name' | 'postcode';
export type StoresList = Record<StoresListKeys, string>[];

const list = () => {
  const jsonPath = '../../stores.json';
  const json = readFileSync(join(__dirname, jsonPath), {
    encoding: 'utf8',
  });
  const data: StoresList = JSON.parse(json);
  const dict: Record<string, string> = {};
  data.forEach((d) => (dict[d.postcode] = d.name));
  return { data, dict };
};
class Store {
  storeList: StoresList;
  storeDict: Record<string, string>;
  constructor() {
    this.storeList = list().data;
    this.storeDict = list().dict;
  }
}
export default Store;
