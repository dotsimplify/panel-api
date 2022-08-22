const generalHelperFunctions = {
  sumObjectProperties: (obj) => Object.values(obj).reduce((a, b) => a + b),
  isEmptyObject: (obj) => {
    if (typeof obj === "object" && obj != null) {
      return Object.keys(obj).length >= 1 ? false : true;
    }
    return true;
  },
  stringClip: (str, length) => {
    if (str.length > length) {
      return str.slice(str, length).concat("...");
    } else return str;
  },
  timeAgoWithDate: (date) => {
    let seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 86400;
    if (interval > 1) {
      return new Date(date).toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
      });
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  },

  // returns 25-06-2022
  todayDateAnother: () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    today = dd + "-" + mm + "-" + yyyy;
    return today;
  },

  // If time not provided it will take UTC 00:00 , Date format dd-mm-yyyy , Identifier for creating ISO date for next day
  dateTimeToISO: (date, time, identifier) => {
    const dateParts = date.split("-");
    const timeParts = time.split(":");

    if (identifier) {
      let dd = dateParts[0];
      let newDD = Number(dd) + 1;
      let sameDate = new Date(
        dateParts[2],
        dateParts[1] - 1,
        newDD,
        timeParts[0],
        timeParts[1],
        timeParts[2] ? timeParts[2] : null
      );
      return sameDate.toISOString();
    }
    const nextDay = new Date(
      dateParts[2],
      dateParts[1] - 1,
      dateParts[0],
      timeParts[0],
      timeParts[1],
      timeParts[2] ? timeParts[2] : null
    );

    return nextDay.toISOString();
  },
};

module.exports = generalHelperFunctions;
