export const getDateInRequiredFormat = (ISODate) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const requiredDate = new Date(ISODate);
  const date = requiredDate.getDate();
  const month = monthNames[requiredDate.getMonth()];
  const year = requiredDate.getFullYear();
  const time = requiredDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${date} ${month} ${year}, ${time}`;
};

export const getDateInRequiredFormatWithDay = (ISODate) => {
  if (ISODate) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const requiredDateAcGMT = new Date(ISODate);
    const requiredDate = new Date(
      requiredDateAcGMT.getTime() - 5.5 * 60 * 60 * 1000
    );
    const date = requiredDate.getDate();
    const month = monthNames[requiredDate.getMonth()];
    const year = requiredDate.getFullYear();
    /* const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = days[requiredDate.getDay()]; */
    const time = requiredDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} ${month} ${year}, ${time}`;
  } else {
    return "--";
  }
};

export const capitalise = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const alphanumeric = (inputtxt) => {
  let letterNumber = /^[a-z\d\-_\s]+$/i;
  if (inputtxt.match(letterNumber)) {
    return true;
  } else {
    return false;
  }
};

export const onlyAlphabets = (inputtxt) => {
  var letters = /^[a-zA-Z ]*$/;
  if (inputtxt.match(letters)) {
    return true;
  } else {
    return false;
  }
};

export const onlyNumbers = (text) => {
  return Number.isInteger(text);
};

export const getTimeInRequiredFormat = (receivedSeconds) => {
  const seconds = receivedSeconds - 1;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);
  var hDisplay = h > 0 ? h + " hr " : "";
  var mDisplay = m > 0 ? m + " min " : "";
  var sDisplay = s > 0 ? s + " sec " : "";

  return `${hDisplay} ${mDisplay} ${sDisplay}`;
};

export const getDateForHTMLInput = (givenDate) => {
  const year = givenDate.getFullYear();
  let month = givenDate.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let date = givenDate.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  return `${year}-${month}-${date}`;
};

export const getDateObjectFromString = (string) => {
  const dateArray = string.split(/\D/);
  return new Date(dateArray[0], --dateArray[1], dateArray[2]);
};

export const getTomorrow = (givenDate) => {
  return new Date(givenDate.getTime() + 24 * 60 * 60 * 1000);
};

export const statusColorWithOnHold = (value) => {
  switch (value.toLocaleLowerCase()) {
    case "active":
      return {
        color: "rgb(11, 184, 89)",
      };
    case "Onhold":
      return {};
    case "inactive":
      return {
        color: "red",
      };
      default:
          return{}
  }
};

export const statusColor = (value) => {
  switch (value.toLocaleLowerCase()) {
    case "active":
      return {
        color: "rgb(11, 184, 89)",
      };
    case "inactive":
      return {};
    default:
          return{}  
  }
};

export const sortDates = (a, b) => {
  /* Note: this functions sorts according to the requirement, i.e. the latest date first */
  const aDate = new Date(a?.createdAt);
  const bDate = new Date(b?.createdAt);
  if (aDate < bDate) {
    return 1;
  }
  if (aDate > bDate) {
    return -1;
  }
  return 0;
};
