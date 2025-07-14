import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private _storage: Storage) { 
    this._storage.create();
  }

  public async has(key: string) {
    if(await this._storage?.get(key))
      return true;

    return false;
  }

  public async get(key: string) {
    console.log("leyendo entrada storage: " + key);
    return await this._storage?.get(key);
  }

  public async set(key: string, value: any) {
    console.log("seteando entrada storage: " + key + " - " + value);
    await this._storage?.set(key, value);
  }
}
