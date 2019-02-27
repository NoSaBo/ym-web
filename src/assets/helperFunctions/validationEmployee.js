const initEmployeeErrors = {
  firstnameerror: "",
  lastnameerror: "",
  usererror: "",
  passworderror: "",
  dnierror: "",
  phoneerror: "",
  activeerror: ""
};

const lengthAttribute = object => {
  let isError = false;
  let errors = {};
  for (let attr in object) {
    if (!attr.includes("error") && attr !== "id") {
      if (!/\S/.test(object[attr])) {
        isError = true;
        errors[`${attr}error`] =
          "Un campo no puede contener únicamente espacios en blanco";
      }
      if (attr === "password" && object[attr].length < 7) {
        isError = true;
        errors[
          `${attr}error`
        ] = `La contraseña debe contener como mínimo 7 caracteres`;
      }
      if (object[attr].length < 5) {
        isError = true;
        errors[
          `${attr}error`
        ] = `El campo debe contener como mínimo 5 caracteres`;
      }
    }
  }
  return { isError, errors };
};

export const employeeValidation = emp => {
  let isError = false;
  let errors = Object.assign({}, { ...initEmployeeErrors });
  let employee = Object.assign({}, { ...emp, ...errors });
  const lengthvalidation = lengthAttribute(employee);
  if (lengthvalidation.isError) {
    isError = true;
    errors = lengthvalidation.errors;
    employee = Object.assign({}, { ...employee, ...errors });
  }
  return { isError, employee };
};
