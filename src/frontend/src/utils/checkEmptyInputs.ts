export const checkEmptyInputs = (inputObject: any) => {
    for (const key in inputObject) {
      if (Object.prototype.hasOwnProperty.call(inputObject, key)) {
        if (inputObject[key] !== "") {
          return false;
        }
      }
    }
    return true;
};
