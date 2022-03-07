import Store from '../../config/load-stores';

class StoresService extends Store {
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
