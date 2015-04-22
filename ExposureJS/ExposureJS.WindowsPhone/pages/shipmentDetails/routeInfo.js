// Para obtener una introducción a la plantilla Control de página, consulte la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkId=232511

var RouteInfo = WinJS.Binding.define({
    mainModeOfTransport: "",
    originSiteName: "",
    destinationSiteName: ""
});

(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/shipmentDetails/routeInfo.html", {
        // Se llama a esta función cuando un usuario navega a esta página. Esta
        // rellena los elementos de la página con los datos de la aplicación.
        ready: function (element, options) {
            // TODO: Inicializar la página aquí.

            var mainModeOfTransport = shipmentPoster.mainModeOfTransport;

            //var shipmentLegs = shipmentPoster.legs;
            var shipmentLegs = ShipmentData.selectedShipment.legs;

            var legsCount = shipmentLegs.length;
            var originSiteName = shipmentLegs[0].originSite.name;
            var destinationSiteName = shipmentLegs[legsCount - 1].destinationSite.name;

            var routeInfo = new RouteInfo(
                {
                    mainModeOfTransport: mainModeOfTransport,
                    originSiteName: originSiteName,
                    destinationSiteName: destinationSiteName
                }
            );

            WinJS.Binding.processAll(element.querySelector(".routeInfoContainer"), routeInfo);
        },

        unload: function () {
            // TODO: Responder a las navegaciones fuera de esta página.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Responder a los cambios en el diseño.
        }
    });

    WinJS.Namespace.define("ShipmentDetailOptions", {
        RouteInfoOption: ControlConstructor
    });
})();
