import { zodProperty } from '../../../utils';
import { z } from 'zod';

export const roleQuerySchema = z.object({
  role: zodProperty.nonEmptyString('role'),
});

export const getUsersWithRoleQuerySchema = z.object({
  page: zodProperty.optionalNumberQueryParam('page'),
  maxCount: zodProperty.optionalNumberQueryParam('maxCount'),
});

export const usernamePathParamsSchema = z.object({
  username: zodProperty.nonEmptyString('username'),
});

export const rolePathParamsSchema = z.object({
  role: zodProperty.nonEmptyString('role'),
});

export const guidPathParamsSchema = z.object({
  guid: zodProperty.nonEmptyString('guid'),
});
