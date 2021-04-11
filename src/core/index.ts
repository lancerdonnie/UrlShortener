import type { ICradle } from '../types';
import { SHORT_VALUES, ERRORS } from '../core/Constants';

export default class Core {
  constructor(opts: ICradle) {
    this.repo = opts.repo;
  }
  repo;

  public createShortId = async (length: number = 6): Promise<string> => {
    const shortId = [...Array(length)].reduce(
      (acc) =>
        (acc += SHORT_VALUES.charAt(
          Math.floor(Math.random() * SHORT_VALUES.length)
        )),
      ''
    );
    if (await this.repo.checkShortId(shortId))
      return this.createShortId(length);
    return shortId;
  };

  public addUrlToDatabase = async (url: string, hostName: string) => {
    if (!this.isValidUrl(url)) {
      throw new Error(ERRORS.URL.INVALID_URL);
    }
    const shortId = await this.createShortId();
    await this.repo.addUrl(shortId, url);
    return this.getShortId(hostName);
  };

  getShortId = async (hostName: string, shortId?: string) => {
    return hostName + '/' + (shortId ?? (await this.createShortId()));
  };

  isValidUrl = (url: string) => {
    const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(url)) return true;
    return false;
  };

  getUrl = async (shortId: string) => {
    if (!shortId) throw new Error(ERRORS.URL.NOT_FOUND_URL);
    const url = await this.repo.checkShortId(shortId);
    if (!url) throw new Error(ERRORS.URL.NOT_FOUND_URL);
    return url;
  };
}
