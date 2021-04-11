import { ERRORS } from '../core/Constants';
import type { ICradle } from '../types';
import { Url } from '../entity/Url';

export default class UrlRepo {
  db;

  constructor({ db }: ICradle) {
    this.db = db;
  }

  public checkShortId = async (shortId: string) => {
    return await this.db.url.findOne(shortId).catch(() => {
      throw new Error(ERRORS.SERVER_ERROR);
    });
  };

  public addUrl = async (shortId: string, url: string) => {
    const newUrl = new Url();
    newUrl.url_id = shortId;
    newUrl.url = url;
    try {
      await this.db.url.create(newUrl);
      await this.db.url.save(newUrl);
    } catch (_) {
      throw new Error('Server Error');
    }
  };

  public getUrlByShortId = async (shortId: string) => {
    return await this.checkShortId(shortId);
  };
}
