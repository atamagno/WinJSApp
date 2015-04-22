(function () {
  "use strict";

  WinJS.Utilities.startLog({ type: 'info', tags: "pages-auth-login.js" });
  WinJS.log && WinJS.log('starting up', 'pages-auth-login.js', 'info');

  //esaWin.logger.init('pages-auth-login.js', ['info', 'error']);
  //esaWin.logger.message('starting up', 'pages-auth-login.js', 'info');

  //WinJS.Namespace.define("UserData", {
  //    firstName: "",
  //    lastName: ""
  //});

  var loginCallback = function (o) {
      if (o.status === 'completed') {
          var currentUserInfo = JSON.parse(o.request.response);

          //UserData.firstName = currentUserInfo.contact.firstName;
          //UserData.lastName = currentUserInfo.contact.lastName;

          WinJS.log && WinJS.log('callback-req' + o.request.responseText, 'pages-auth-login.js', 'info');
          WinJS.Navigation.navigate("/pages/shipments/shipments.html", false);
    }
  }

  WinJS.UI.Pages.define('/pages/auth/login.html', {
    processed: function (element) {
      return WinJS.Resources.processAll(element);
    },

    // This function is called whenever a user navigates to this page. It
    // populates the page elements with the app's data.
    ready: function (element, options) {       
        // TODO: Initialize the page here.

        document.getElementById("pageTitle").textContent = "Log in";

        var loginButton = document.getElementById("loginButton");
        loginButton.addEventListener("click", this.loginButtonClickHandler, false);
    },

    unload: function () {
      // TODO: Respond to navigations away from this page.
    },

    updateLayout: function (element) {
        
      // TODO: Respond to changes in layout.
    },

    loginButtonClickHandler: function (eventInfo) {
        // Get the user's name input
        var userName = document.getElementById("userName").value;
        var password = document.getElementById("password").value;

        esaWin.core.esaAPI({
            url: '/rest/v1/users/current',
            type: 'GET',
            user: userName,
            password: password,
            callback: loginCallback
        });
    },
  });
})();