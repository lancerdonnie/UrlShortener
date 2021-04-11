import { ERRORS } from '../Constants';
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

  public addUrl = async (shortId: string, fullUrl: string) => {
    const newUrl = new Url();
    newUrl.short_id = shortId;
    newUrl.full_url = fullUrl;
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
