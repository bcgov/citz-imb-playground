export const hasNonEmptyStringProperties = (inputObject: any) => {
    return Object.values(inputObject).every(val => typeof val !== 'string' || val.trim() === '')
};
