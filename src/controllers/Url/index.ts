import type { Response, Request } from 'express';
import type Core from '../../core';
import { Router } from 'express';
import { join } from 'path';
import { ABSOLUTE_PATH } from '../../Constants';

const router = Router();

export default ({ core }: { core: Core }) => {
  router.get('/*', async (req: Request, res: Response) => {
    const shortId = req.params[0];
    try {
      const url = await core.getUrl(shortId);
      return res.redirect(302, 'http://' + url!.full_url);
    } catch (_) {
      return res.sendFile(join(ABSOLUTE_PATH, 'www/index.html'));
    }
  });
  return router;
};
