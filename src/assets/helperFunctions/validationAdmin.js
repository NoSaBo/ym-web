
const initAdminErrors = {
  usernameerror: "",
  passworderror: "",
  emailerror: ""
};

const lengthAttribute = (object, admins, modal) => {
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
      if (
        attr === "username" &&
        modal === "update" &&
        object[attr] !== "" &&
        adminUnique(object[attr], admins) === false
      ) {
        const pastValue = admins.filter(x => x.id === object.id)[0].username;
        const newValue = object["username"];
        if (pastValue !== newValue) {
          isError = true;
          errors[
            `${attr}error`
          ] = `El usuario ya esta siendo utilizado`;
        }
      }
    }
  }
  return { isError, errors };
};

export const adminValidation = (adm, admins, modal) => {
  let isError = false;
  let errors = Object.assign({}, { ...initAdminErrors });
  let admin = Object.assign({}, { ...adm, ...errors });
  const lengthvalidation = lengthAttribute(admin, admins, modal);
  if (lengthvalidation.isError) {
    isError = true;
    errors = lengthvalidation.errors;
    admin = Object.assign({}, { ...admin, ...errors });
  }
  return { isError, admin };
};

// Delete validation
// export const notDeletable = (allServiceshifts, selected) => {
//   let match = {};
//   let error = false;
//   let alert = "";
//   selected.forEach(user => {
//     allServiceshifts.map(serviceshift => {
//       let empMatch = serviceshift.employees.find(emp => emp.user === user);
//       if (empMatch !== undefined) {
//         error = true;
//         let msgSsh = `Horario de sede ${
//           serviceshift.branch.branch
//         } con inicio el ${
//           dbDateTimeToView(serviceshift.begindate).dateTime
//         } y fin el ${dbDateTimeToView(serviceshift.workspan).dateTime}\r\n`;
//         if (match[user] === undefined) {
//           match[user] = [msgSsh];
//         } else {
//           match[user].push(msgSsh);
//         }
//       }
//       return null;
//     });
//   });
//   let message = [];
//   Object.keys(match).forEach(key => {
//     message.push(
//       `Empleado ${key} asociado con:\r\n${match[key].map(m => `${m}`)}`
//     );
//   });
//   if (error) {
//     alert = `No puede eliminar los siguientes empleados porque se encuentran asignados a uno o varios horarios:\r\n${message.map(
//       m => `${m}`
//     )}`;
//   } else {
//     alert = `Empleados(s) eliminado(s) correctamente`;
//   }
//   return { alert, error };
// };



const adminUnique = (newAdmin, admins) => {
  let unique = true;
  const match = admins.filter(admin => admin.user === newAdmin)
  if (match.length !== 0) {
    unique = false
  }
  return unique
}
