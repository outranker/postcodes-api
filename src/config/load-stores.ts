import { join } from 'path';
import { readFileSync } from 'fs';

export type StoresListKeys = 'name' | 'postcode';
export type StoresList = Record<StoresListKeys, string>[];

/**
 *
 *  Reads the file in utf8 encoding
 * @returns {object} Store list and its mapped dictionary
 */
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
/**
 *
 * Store carries all the store data
 * @param {object} storeList - List of stores
 * @param {object} storeDict - List of stores in of key-value form
 */
class Store {
  storeList: StoresList;
  storeDict: Record<string, string>;
  constructor() {
    this.storeList = list().data;
    this.storeDict = list().dict;
  }
}
export default Store;
