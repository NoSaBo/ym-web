const initBranchErrors = {
  brancherror: "",
  addresserror: "",
  contacterror: "",
  latitudeerror: "",
  longitudeerror: "",
  phoneerror: "",
  activeerror: ""
};

const lengthAttribute = object => {
  let isError = false;
  let errors = {};
  for (let attr in object) {
    if (!attr.includes("error")) {
      if (!/\S/.test(object[attr])) {
        isError = true;
        errors[`${attr}error`] =
          "Un campo no puede contener únicamente espacios en blanco";
      }
      if (attr === "address" && object[attr].length > 60) {
        isError = true;
        errors[
          `${attr}error`
        ] = `La dirección debe contener como máximo 60 caracteres`;
      }
      if (object[attr].length < 5) {
        isError = true;
        errors[
          `${attr}error`
        ] = `El campo debe contener como mínimo 5 caracteres`;
      }
      if (object[attr].length > 25) {
        isError = true;
        errors[
          `${attr}error`
        ] = `El campo debe contener como máximo 25 caracteres`;
      }
    }
  }
  return { isError, errors };
};

export const branchValidation = brn => {
  let isError = false;
  let errors = Object.assign({}, { ...initBranchErrors });
  let branch = Object.assign({}, { ...brn, ...errors });
  const lengthvalidation = lengthAttribute(branch);
  if (lengthvalidation.isError) {
    isError = true;
    errors = lengthvalidation.errors;
    branch = Object.assign({}, { ...branch, ...errors });
  }
  return { isError, branch };
};
