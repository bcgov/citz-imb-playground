export const hasNoEmptyStringProperties = (inputObject: any) => {
    return Object.values(inputObject).every(val => typeof val !== 'string' || val.trim() === '')
};
