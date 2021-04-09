import { json } from 'express';
import cors from 'cors';
import { handleError } from '../controllers/Error';

export default ({ app }: any) => {
  app.use(json());
  app.use(cors());

  //   app.use('/reservation', container.cradle.ReservationController);
  //   app.use(container.cradle.OverstayController);

  //global error handler must have four params
  app.use((err: any, _req: any, res: any, _next: any) => {
    handleError(err, res);
  });
};
