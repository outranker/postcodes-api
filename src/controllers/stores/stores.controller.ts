import { Request, Response } from 'express';
import axios from 'axios';
import StoresService from '../../services/stores/stores.service';

import responseForm from '../../utils/responseForm';
import storesService from '../../services/stores/stores.service';
export type NearbyStoresKey = 'name' | 'postcode' | 'latitude' | 'longitude';
export type NearbyStores = Record<NearbyStoresKey, string>;

class StoresController {
  getOneStore(req: Request<{}, { name: string }, {}>, res: Response) {
    const { name } = req.query;
    const s = StoresService.getOneStore(name as string);
    if (!s)
      return res.status(200).json(
        responseForm.send({
          code: 1057,
          data: s,
        })
      );
    return res.status(200).json(
      responseForm.send({
        code: 1000,
        data: s,
      })
    );
  }

  getStoreList(req: Request<{}, {}, {}>, res: Response) {
    return res.status(200).json(
      responseForm.send({
        code: 1000,
        data: StoresService.getStoreList(),
      })
    );
  }
  async getStoreCoordinates(req: Request<{}, { postcode: string }, {}>, res: Response) {
    const { postcode } = req.query;
    if (postcode) {
      const s = storesService.storeList.find((store) => store.postcode === postcode);
      if (!s)
        return res.status(200).json(
          responseForm.send({
            code: 1057,
            data: s,
          })
        );

      const { data } = await axios.get(`https://api.postcodes.io/postcodes/${s.postcode}`);
      return res.status(200).json(
        responseForm.send({
          code: 1000,
          data: { ...s, latitude: data.result?.latitude, longitude: data.result?.longitude },
        })
      );
    } else {
      const stores = StoresService.getStoreList();
      const postcodes = stores.map((store) => store.postcode);
      const { data } = await axios.post('https://api.postcodes.io/postcodes', { postcodes });

      const dict = StoresService.getStoreDict();

      return res.status(200).json(
        responseForm.send({
          code: 1000,
          data: data.result.map((store: any) => {
            if (!store.result) return { postcode: store.query, result: null };
            return {
              name: dict[store.query],
              postcode: store.query,
              latitude: store.result?.latitude,
              longitude: store.result?.longitude,
            };
          }),
        })
      );
    }
  }

  async getNearbyStores(req: Request<{}, { postcode: string; radius: string }, {}>, res: Response) {
    const { postcode, radius } = req.query;
    let err;
    const result = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`).catch((e) => {
      err = e;
    });
    if (err)
      return res.status(200).json(
        responseForm.send({
          code: 1058,
        })
      );

    const result_geo = await axios.get(
      `https://api.postcodes.io/postcodes?lon=${result?.data.result.longitude}&lat=${result?.data.result.latitude}&radius=${radius}`
    );
    const dict = StoresService.getStoreDict();

    const nearbyStores: NearbyStores[] = result_geo.data.result.map((store: any) => {
      return {
        name: dict[store.postcode],
        postcode: store.postcode,
        latitude: store.latitude,
        longitude: store.longitude,
      };
    });

    return res.status(200).json(
      responseForm.send({
        code: 1000,
        data: nearbyStores.sort((a, b) => Number(b.latitude) - Number(a.latitude)),
      })
    );
  }
}

export default new StoresController();
