export default {

  defaultString(val) {
    return !val ? "" : val;
  },

  defaultNumber(val) {
    return !val ? 0 : parseInt(val);
  },

  getYear(date){
    return new Date(date).getFullYear();
  },

  getMonth(date){
    return new Date(date).getMonth() + 1;
  },

  getDay(date){
    return new Date(date).getDate();
  },

   /*
    @input: date: yyyy-mm-dd
    @output: {
       date: yyyy-mm-dd 00:00:00
    }
  */
  convertDateToTz(date){
    var date = new Date(date); 
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
  },

  /*
    @input: date: yyyy-mm-dd
    @output: {
       date: yyyy/mm/dd
    }
  */
  formatDate(date) {
    if (!date) return null;

    const [year, month, day] = date.split("-");
    return `${year}/${month}/${day}`;
  },
  /*
    @input: date: yyyy/mm/dd
    @output: {
       date: yyyy-mm-dd
    }
  */
  parseDate(date) {
    if (!date) return null;

    const [month, day, year] = date.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  },

  /*
    @input: datetime
    @output: {
       date: yyyy/mm/dd
    }
  */
  convertTzTo(date, showTime = false){

    if(date){
      var d = new Date(date);
      var   month = '' + (d.getMonth() + 1);
      var   day = '' + d.getDate();
      var   year = d.getFullYear();
      var   hour = d.getHours().toString();
      var   min = d.getMinutes().toString();
      var   milis = "00";
      if (month.length < 2) 
        var month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;

      if (hour.length < 2) 
        var hour = '0' + hour;
      if (min.length < 2) 
          min = '0' + min;

      return !showTime ? [year, month, day].join('/') : [year, month, day].join('/') + " " + [hour, min, milis].join(':')
    }  
    return "";
  },

  incrementDate(date, incrementor){
    var parts = date.split("-");
    var dateTime = new Date(
        parseInt(parts[0], 10),      // year
        parseInt(parts[1], 10) - 1,  // month (starts with 0)
        parseInt(parts[2], 10)       // day
    );
    dateTime.setTime(dateTime.getTime() + incrementor * 86400000);
    parts[0] = "" + dateTime.getFullYear(); // year

    parts[1] = "" + (dateTime.getMonth() + 1); // month
    if (parts[1].length < 2) {
        parts[1] = "0" + parts[1];
    }

    parts[2] = "" + dateTime.getDate(); // day
    if (parts[2].length < 2) {
        parts[2] = "0" + parts[2];
    }
    return parts.join("-");
  },

  /*
    @input: Number, Number
    @output: {
      offset: Number
    }
  */
  calcPagination(currentPage, itemsPerPage){
    var offset;
    if (currentPage == 1) {
        offset = 0;
    } else {
        offset = (currentPage - 1) * itemsPerPage;
    }
    return offset
  },


  /*
    @input: Number, Number, Number
    @output: {
      offset: Number
    }
  */
  showIndex(index, page, itemsPerPage) {
    index++
    if(page === 1){
      return index
    }

    return index + ( (page - 1) * itemsPerPage)
  },

  /*
    @input: error: Array
    @output: JSON
  */
  getError(error) {
    const errors = error.response[0]
    return errors
  },

  /*
    @input: ArrayList
    @output: Array
  */
  getLastItem(array){
    return array[array.length - 1]
  },


  /*
    @input: String
    @output: Split String 
  */
  splitString(val, length){
    if(val.length > length){
      return val.substring(0, length).concat("...");
    }
    return val;
  },

  getMainImageMotel(imageString){
    if(!imageString)
      return null;

    return imageString.split(";")[0];
  },

  convertStringToArrayImage(imageString){

    if(!imageString)
      return null;

    return imageString.split(";")
  }
};
