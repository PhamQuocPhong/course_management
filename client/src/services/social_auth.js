export default {
  async initFacebook() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: "640448850019915",
        cookie: true,
        xfbml: true,
        version: "v2.8"
      });
    };
  },
  async loadFacebookSDK(d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }
};
