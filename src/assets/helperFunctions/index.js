import moment from "moment";
import 'moment/locale/es'

export const capitalize = word => {
  const response = word.toLowerCase();
  return response.charAt(0).toUpperCase() + response.slice(1);
};

export const modalDateTimeToLocalTime = dateTime => {
  let localDT = new Date(dateTime);
  localDT = moment(localDT);
  let ForDB = localDT.format("YYYY-MM-DDTHH:mm:ss");
  let ForModal = localDT.format("LLLL");
  let justTime = localDT.format("HH:mm");
  return { format: { db: ForDB, view: ForModal, time: justTime } };
};

export const dbDateTimeToView = (dateTime) => {
    let ans = moment(dateTime);
    const ansDT = ans.locale('es').format("MMMM, dddd D,  h:mm a")
    const ansT = ans.format("HH:mm a")
    return {dateTime: ansDT, time: ansT};
}