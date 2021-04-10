import type { Response, Request } from 'express';
import type Core from '../core';
import { Router } from 'express';
import { join } from 'path';

const router = Router();

export default ({ core }: { core: Core }) => {
  router.get('/*', async (req: Request, res: Response) => {
    const shortId = req.params[0];
    try {
      const url = await core.getUrl(shortId);
      return res.redirect(302, 'http://' + url!.url);
    } catch (_) {
      return res.sendFile(join(__dirname, '../www/index.html'));
    }
  });
  return router;
};

// export class UrlController{

// }

// const router = Router();

// //Catch all route - Shorten Url
// router.get('/*', async (req: Request, res: Response) => {
//   const shortId = req.params[0];
//   try {
//     const url = await CgetUrl(shortId);
//     return res.redirect(302, 'http://' + url!.url);
//   } catch (_) {
//     return res.sendFile(join(__dirname, '../www/index.html'));
//   }
// });

// export default router;
