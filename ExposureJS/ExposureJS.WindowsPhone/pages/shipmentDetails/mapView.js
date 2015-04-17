// Para obtener una introducción a la plantilla Control de página, consulte la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkId=232511

var map, path;

function buildPath() {
    path = new Array();
    for (var i = 0; i < shipmentPoster.legs.length; i++) {

        var leg = shipmentPoster.legs[i];
        var tempPath = leg.carrierLane.path;

        for (var j = 0; j < tempPath.length; j++) {
            path.push(new Microsoft.Maps.Location(tempPath[j][0], tempPath[j][1]));
        }
    }
}

function initMap() {

    var mapOptions =
    {
        credentials: "Ah9Pa58ouD0Mbc1PCKdvvSu9Xyfece5ZbO_JbJv2boSla5RIzMojdoOqe6c48wJP",
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        showDashboard: false
    };

    map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), mapOptions);

    buildPath();

    var pathStart = path[0];
    var pathEnd = path[path.length - 1];

    var viewBoundaries = Microsoft.Maps.LocationRect.fromLocations(pathStart, pathEnd);
    map.setView({ bounds: viewBoundaries});

    var pin = new Microsoft.Maps.Pushpin(pathStart, {
        typeName: 'scaleStyle',
        icon: '../../images/hub-grey.svg',
        width: 36, height: 36,
        anchor: new Microsoft.Maps.Point(18, 18)
    });
    map.entities.push(pin);

    var pin = new Microsoft.Maps.Pushpin(pathEnd, {
        typeName: 'scaleStyle',
        icon: '../../images/hub-grey.svg',
        width: 36, height: 36,
        anchor: new Microsoft.Maps.Point(18, 18)
    });
    map.entities.push(pin);

    var line;

    var routeshape = new Microsoft.Maps.Polyline(path, { strokeColor: new Microsoft.Maps.Color(255, 39, 162, 190) });
    map.entities.push(routeshape);
}

(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/shipmentDetails/mapView.html", {
        // Se llama a esta función cuando un usuario navega a esta página. Esta
        // rellena los elementos de la página con los datos de la aplicación.
        ready: function (element, options) {
            // TODO: Inicializar la página aquí.

            document.getElementById("pageTitle").textContent = "Map View";

            Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: initMap, culture: "en-us", homeRegion: "US" });
        },

        unload: function () {
            // TODO: Responder a las navegaciones fuera de esta página.
            map.dispose();
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Responder a los cambios en el diseño.
        }
    });

    WinJS.Namespace.define("ShipmentDetailOptions", {
        MapViewOption: ControlConstructor
    });
})();
