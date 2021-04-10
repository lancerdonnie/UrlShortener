import UrlRepo from '../repository/Url.repo';
import { SHORT_VALUES } from '../core/Constants';

const createShortId = async (length: number = 6): Promise<string> => {
  const shortId = [...Array(length)].reduce(
    (acc) =>
      (acc += SHORT_VALUES.charAt(
        Math.floor(Math.random() * SHORT_VALUES.length)
      )),
    ''
  );
  if (await UrlRepo.checkShortId(shortId)) return createShortId(length);
  return shortId;
};

const getShortId = (hostName: string, shortId?: string) => {
  return hostName + '/' + shortId ?? createShortId();
};

export const addUrlToDatabase = async (url: string, hostName: string) => {
  const shortId = await createShortId();
  await UrlRepo.addUrl(shortId, url);
  return getShortId(hostName, shortId);
};

export const getUrl = async (shortId: string) => {
  if (!shortId) throw new Error('No url found');
  const url = await UrlRepo.checkShortId(shortId);
  if (!url) throw new Error('No url found');
  return url;
  // return await UrlRepo.checkShortId(shortId);
};
