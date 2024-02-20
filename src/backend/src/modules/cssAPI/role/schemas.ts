import { zodProperty } from '../../../utils';
import { z } from 'zod';

export const getKCRoleParamsSchema = z.object({
  role: zodProperty.nonEmptyString('role').describe('The role to get details on.'),
});

export const createKCRoleParamsSchema = z.object({
  role: zodProperty.nonEmptyString('role').describe('The role to create.'),
});

export const deleteKCRoleParamsSchema = z.object({
  role: zodProperty
    .nonEmptyString('role')
    .describe('The role to remove from the Keycloak Integration.'),
});

export const updateKCRoleParamsSchema = z.object({
  role: zodProperty.nonEmptyString('role').describe('The role to update.'),
});

export const updateKCRoleQuerySchema = z.object({
  newRoleName: zodProperty.nonEmptyString('newRoleName').describe("The new name for 'role'."),
});

export const getKCRoleCompositesParamsSchema = z.object({
  role: zodProperty.nonEmptyString('role').describe('The role to get composite role details on.'),
});

export const addKCRoleCompositeParamsSchema = z.object({
  role: zodProperty.nonEmptyString('role').describe('The parent role to update.'),
});

export const addKCRoleCompositeQuerySchema = z.object({
  newCompositeRoleName: zodProperty
    .nonEmptyString('newCompositeRoleName')
    .describe("Add 'newCompositeRoleName' as a child role of 'role'."),
});

export const deleteKCRoleCompositeParamsSchema = z.object({
  role: zodProperty.nonEmptyString('role').describe('The parent role to update.'),
});

export const deleteKCRoleCompositeQuerySchema = z.object({
  compositeRoleName: zodProperty
    .nonEmptyString('compositeRoleName')
    .describe("Remove 'compositeRoleName' as a child role of 'role'."),
});
