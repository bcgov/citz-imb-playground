import { zodProperty } from '../../../utils';
import { z } from 'zod';

export const updateRoleQuerySchema = z.object({
  newRoleName: zodProperty.nonEmptyString('newRoleName'),
});

export const addRoleCompositeQuerySchema = z.object({
  newCompositeRoleName: zodProperty.nonEmptyString('newCompositeRoleName'),
});

export const deleteRoleCompositeQuerySchema = z.object({
  compositeRoleName: zodProperty.nonEmptyString('compositeRoleName'),
});

export const rolePathParamsSchema = z.object({
  role: zodProperty.nonEmptyString('role'),
});
