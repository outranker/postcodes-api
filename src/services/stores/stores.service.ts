import Store from '../../config/load-stores';

class StoresService extends Store {
  /**
   *
   * @param name The name of the store
   * @returns The store object or false if not found
   */
  getOneStore(name: string) {
    this.storeList.find((store) => store.name === name);
    return this.storeList.find((store) => store.name === name) || false;
  }

  getStoreList() {
    return this.storeList;
  }
  getStoreDict() {
    return this.storeDict;
  }
}
export default new StoresService();
