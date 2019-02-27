import { modalDateTimeToLocalTime } from "./index.js";

const initServiceshiftErrors = {
  begindateerror: "",
  workspanerror: "",
  activeerror: "",
  branchIderror: ""
};

const lengthAttribute = object => {
  let isError = false;
  let errors = {};
  for (let attr in object) {
    if (!attr.includes("error") && attr !== "id") {
      if (
        (attr === "begindate" || attr === "workspan") &&
        object[attr].length === 0
      ) {
        isError = true;
        errors[`${attr}error`] = "Elija una fecha y hora";
      }
      if (
        (attr === "branchId" || attr === "active") &&
        object[attr].length === 0
      ) {
        isError = true;
        errors[`${attr}error`] = `Seleccione una opción de la lista`;
      }
    }
  }
  return { isError, errors };
};

const dateCoherence = object => {
  let isError = false;
  let errors = {};
  let { begindate, workspan } = object;
  begindate = modalDateTimeToLocalTime(begindate).format.db;
  workspan = modalDateTimeToLocalTime(workspan).format.db;
  if (begindate >= workspan)
   {
    isError = true;
    errors[`begindateerror`] = "La fecha de inicio debe de ser anterior a la fecha de fin";
  }
  return { isError, errors };
};

export const serviceShiftValidation = ssh => {
  let isError = false;
  let errors = Object.assign({}, { ...initServiceshiftErrors });
  let serviceShift = Object.assign({}, { ...ssh, ...errors });
  const lengthvalidation = lengthAttribute(serviceShift);
  if (lengthvalidation.isError) {
    isError = true;
    errors = lengthvalidation.errors;
    serviceShift = Object.assign({}, { ...serviceShift, ...errors });
  }
  let dateValidation = dateCoherence(ssh);
  if (dateValidation.isError) {
    isError = true;
    errors = dateValidation.errors;
    serviceShift = Object.assign({}, { ...serviceShift, ...errors });
  }
  return { isError, serviceshift: serviceShift };
};
