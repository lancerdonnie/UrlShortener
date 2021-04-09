import type { TypedResponse } from '../../types';
import Joi from 'joi';
import { Request, NextFunction } from 'express';
import { ErrorHandler } from '../Error';

const reservationSchema = Joi.object({
  reservation_id: Joi.number().required(),
  customer_id: Joi.number().required(),
  room_type: Joi.valid('deluxe', 'regular', 'palatial').required(),
  amount_paid: Joi.number().required(),
  status: Joi.valid('paid', 'outstanding').required(),
  checking_time: Joi.date().required(),
  checkout_time: Joi.date().required(),
});

export const validateReservation = (
  req: Request,
  _: TypedResponse,
  next: NextFunction
) => {
  try {
    const { error } = reservationSchema.validate(req.body);

    if (error) {
      throw new ErrorHandler(400, error.message);
    }

    if (req.body.checkout_time < req.body.checking_time) {
      throw new ErrorHandler(
        400,
        'Your checkout time should not be before checking time'
      );
    }
    return next();
  } catch (error) {
    next(error);
  }
};

const overstaySchema = Joi.object({
  reservation_id: Joi.number().required(),
  overstayed_checkout_time: Joi.date().required(),
});

export const overstayReservation = (
  req: Request,
  _: TypedResponse,
  next: NextFunction
) => {
  try {
    const { error } = overstaySchema.validate(req.body);

    if (error) {
      throw new ErrorHandler(400, error.message);
    }

    return next();
  } catch (error) {
    next(error);
  }
};
