import { Url } from '../entity/Url';

export default class UrlRepo {
  public checkShortId = async (shortId: string) => {
    return await Url.findOne(shortId).catch(() => {
      throw new Error('Server Error');
    });
  };

  public addUrl = async (shortId: string, url: string) => {
    const newUrl = new Url();
    newUrl.url_id = shortId;
    newUrl.url = url;
    try {
      await Url.create(newUrl);
      await Url.save(newUrl);
    } catch (_) {
      throw new Error('Server Error');
    }
  };

  public getUrlByShortId = async (shortId: string) => {
    return await this.checkShortId(shortId);
  };
}
