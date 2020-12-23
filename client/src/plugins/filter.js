import Vue from "vue";
Vue.filter("toCurrency", function(value) {

  value = parseInt(value)

  if(isNaN(value)){
  	value = 0
  }
 
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  });
  return formatter.format(value);
});
