export const employeeValidation = (emp) => {
    const { firstname, lastname, password, phone, user, dni, active } = emp;
    let isError = false;
    const errors = {};
    let employee = "";
    if (firstname.length < 5) {
        isError = true;
        errors.firstnameerror =
          "El nombre de usuario debe contener mas de 5 caracteres";
    }
    if (isError) {
        console.log("errors", errors);
        employee = Object.assign({}, {...emp, ...errors});
    }
    return { isError, employee };
  };