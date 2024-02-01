import { z } from 'zod';
import {
  refine_atLeastOneNonEmpty,
  transform_removeUndefinedProps,
  zodProperty,
} from '../../../utils';

export const getIDIRUserQuerySchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    guid: z.string().optional(),
  })
  .refine(refine_atLeastOneNonEmpty(['firstName', 'lastName', 'email', 'guid']), {
    message: "One of 'firstName', 'lastName', 'email', or 'guid' must be provided and non-empty.",
  })
  .transform(transform_removeUndefinedProps);

export const getGitHubUserQuerySchema = z
  .object({
    name: z.string().optional(),
    login: z.string().optional(),
    email: z.string().optional(),
    guid: z.string().optional(),
  })
  .refine(refine_atLeastOneNonEmpty(['name', 'login', 'email', 'guid']), {
    message: "One of 'name', 'login', 'email', or 'guid' must be provided and non-empty.",
  })
  .transform(transform_removeUndefinedProps);

export const guidPathParamsSchema = z.object({
  guid: zodProperty.nonEmptyString('guid'),
});
