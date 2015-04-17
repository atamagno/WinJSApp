(function () {
    "use strict";
  
  // Defining 'esaWin' Global Namespace
  WinJS.Namespace.define('esaWin', {});

  // Defining 'core' package
  WinJS.Namespace.defineWithParent(esaWin, 'core', {
    // Config Parameters
    // TODO: Need to move to Resource area
    // var resource = Windows.ApplicationModel.Resources.Core.ResourceManager.current.mainResourceMap.lookup('/config/system');
    config: {
      environment: 'apps.elementum.com',
      user: 'biker@elementum.com',
      password: 'amsterdam'
    },

    // ASync Call elementum API using XHR
    esaAPI: function (o) {
      WinJS.xhr({
        // Elementum API Call
        url: 'https://' + this.config.environment + o.url,
        type: o.type,
        //data: o.data || '',

        // Default API setting
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
          , 'Authorization': 'Basic ' + this.config.user + ':' + this.config.password
        }

        // Username / Password
        , user: this.config.user
        , password: this.config.password
      }).done(
        // XHR Completed
        function completed(request) {
            o.callback({ status: 'completed', request: request });
        },

        // XHR Error
        function error(request) {
          o.callback({ status: 'error', request: request });
        },

        // XHR Progress
        function progress(request) {
          o.callback({ status: 'progress', request: request });
        }
      );
    }
  });

  // Defining 'log' package
  // TODO: Logger does not work. Need to be fixed to have universal logger
  WinJS.Namespace.defineWithParent(esaWin, 'logger', {
    init: function (page, types) {
      for (var x = 0; x < types.length; x++) {
        WinJS.Utilities.startLog({ tags: page, type: types[x] });
      }
    },

    message: function (message, type, tag) {
      WinJS.log && WinJS.log('esaWin.logger: '+message, tag, type);
    }
  });
})();