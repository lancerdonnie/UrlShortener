import type { IResponse, TypedRequest } from '../types';
import type { Response, Request } from 'express';
import type { ReservationType } from '../entity/Reservation';
import { Router } from 'express';
import { validateReservation } from './middlewares/validate';
import asyncHandler from 'express-async-handler';
import { ErrorHandler } from './Error';

const router = Router();

//get all reservations
router.get(
  '/',
  asyncHandler(async (_, res: Response<IResponse>) => {
    //     const reservations = await reservationRepo.getReservations();
    //     res.json({
    //       status: 'success',
    //       data: reservations,
    //     });
  })
);

module.exports = router;
