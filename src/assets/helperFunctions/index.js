import moment from "moment";
import "moment/locale/es";

export const capitalize = word => {
  const response = word.toLowerCase();
  return response.charAt(0).toUpperCase() + response.slice(1);
};

export const modalDateTimeToLocalTime = dateTime => {
  let localDT = new Date(dateTime);
  localDT = moment(localDT);
  let ForDB = localDT.format("YYYY-MM-DDTHH:mm");
  let ForModal = localDT.format("LLLL");
  let justTime = localDT.format("HH:mm");
  return { format: { db: ForDB, view: ForModal, time: justTime } };
};

export const dbDateTimeToView = dateTime => {
  let ans = moment(dateTime);
  const ansDT = ans.locale("es").format("MMMM, dddd D,  h:mm a");
  const ansT = ans.format("HH:mm a");
  return { dateTime: ansDT, time: ansT };
};

const removeDuplicates = (arr, comp) => {
  const unique = arr
    .map(e => e[comp])
    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)
    // eliminate the dead keys & store unique objects
    .filter(e => arr[e])
    .map(e => arr[e]);
  return unique;
};

export const getShiftandBranch = parkings => {
  let serviceShifts = [];
  let branches = [];
  parkings.forEach(parking => {
    serviceShifts.push(parking.serviceshift);
    branches.push(parking.serviceshift.branch);
  });
  serviceShifts = removeDuplicates(serviceShifts, "id");
  branches = removeDuplicates(branches, "id");

  return { serviceShifts: serviceShifts, branches: branches };
};

export const getFilterData = (empxsshs, ssshs) => {
  let serviceShifts = [];
  let branches = [];
  empxsshs.map(e => {
    let { serviceshiftId } = e;
    let serviceshift = ssshs.find(e => e.id === serviceshiftId);
    let { begindate } = serviceshift;
    let branchName = serviceshift.branch.branch;
    let branchId = serviceshift.branch.id;
    serviceShifts.push({ id: serviceshiftId, begindate });
    branches.push({ id: branchId, branch: branchName });
    serviceShifts = removeDuplicates(serviceShifts, "id");
    branches = removeDuplicates(branches, "id");
    return null;
  });
  return { serviceShifts: serviceShifts, branches: branches };
};

export const getSshIdAndEmpId = (id, empxssh) => {
  let employeeId = empxssh.find(x => x.id === id).employeeId;
  let serviceshiftId = empxssh.find(x => x.id === id).serviceshiftId;
  return { employeeId, serviceshiftId };
};

export const getEmployeeName = (id, employees) => {
  return employees.find(n => n.id === id);
};

export const employeesInServiceshifts = serviceshifts => {
  let employees = [];
  let users = [];
  serviceshifts.map(serviceshift =>
    serviceshift.employees.map(employee => employees.push(employee))
  );
  employees = removeDuplicates(employees, "id");
  employees.map(user => users.push(user.user));
  return users;
};
