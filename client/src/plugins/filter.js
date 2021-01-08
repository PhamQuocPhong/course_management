import Vue from "vue";
Vue.filter("toCurrency", function(value) {

  value = parseInt(value)

  if(isNaN(value)){
  	value = 0
  }
 
  var formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0
  });
  return formatter.format(value);

});

