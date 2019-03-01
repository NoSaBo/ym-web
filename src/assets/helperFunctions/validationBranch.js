import { dbDateTimeToView } from "./index.js";

const initBranchErrors = {
  brancherror: "",
  addresserror: "",
  contacterror: "",
  latitudeerror: "",
  longitudeerror: "",
  phoneerror: "",
  activeerror: ""
};

const isFloat = n => {
  let ans = false;
  if (!isNaN(n) && n.toString().indexOf(".") !== -1) {
    ans = true;
  }
  return ans;
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
      if (attr === "address" && object[attr].length > 60) {
        isError = true;
        errors[
          `${attr}error`
        ] = `La dirección debe contener como máximo 60 caracteres`;
      }
      if (
        (attr === "longitude" || attr === "latitude") &&
        isFloat(object[attr]) === false
      ) {
        isError = true;
        errors[
          `${attr}error`
        ] = `El valor introducido no cumple con el formato de coordenada`;
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

// Delete validation
export const notDeletable = (allServiceshifts, selected) => {
  let match = {};
  let error = false;
  let alert = "";
  selected.forEach(id => {
    allServiceshifts.map(serviceshift => {
      let brnMatch = serviceshift.branch.id === id ? serviceshift : undefined;
      if (brnMatch !== undefined) {
        error = true;
        let message = `Horario que inicia el ${
          dbDateTimeToView(serviceshift.begindate).dateTime
        } y finaliza el ${dbDateTimeToView(serviceshift.workspan).dateTime}\r\n`;
        if (match[id] === undefined) {
          match[serviceshift.branch.branch] = [message];
        } else {
          match[serviceshift.branch.branch].push(message);
        }
      }
      return null;
    });
  });
  let message = [];
  Object.keys(match).forEach(key => {
    message.push(`Sede ${key} asociada con:\r\n${match[key].map(m => `${m}`)}`);
  });
  if (error) {
    alert = `No puede eliminar las siguientes sedes porque se encuentran asignadas a uno o varios horarios:\r\n${message.map(
      m => `${m}`
    )}`;
  } else {
    alert = `Sede(s) eliminada(s) correctamente`;
  }
  return { alert, error };
};
