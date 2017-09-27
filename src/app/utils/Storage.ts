export class Storage {

  private _key;

  constructor(key: string) {
    this._key = key;
  }

  public set(data, replacer?, space?) {
    localStorage.setItem(this._key, JSON.stringify(data, replacer, space));
  }

  public get() {
    let data = localStorage.getItem(this._key);
    if (data) {
      return JSON.parse(data);
    }
  }

  public delete() {
    localStorage.removeItem(this._key);
  }
}
