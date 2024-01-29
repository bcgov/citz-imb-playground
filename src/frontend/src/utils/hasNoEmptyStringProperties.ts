/* eslint-disable @typescript-eslint/no-explicit-any */
export const hasNoEmptyStringProperties = (inputObject: any): boolean => {
  // Check if the input is an object and not null
  if (typeof inputObject !== 'object' || inputObject === null) {
    return false; // or throw an error, depending on your requirements
  }

  // Proceed with the original logic if the input is an object
  return Object.values(inputObject).every((val) => typeof val !== 'string' || val.trim() !== '');
};
