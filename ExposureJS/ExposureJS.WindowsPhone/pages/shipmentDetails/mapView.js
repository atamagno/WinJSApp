// Para obtener una introducción a la plantilla Control de página, consulte la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkId=232511

var map, path, pathStart, pathEnd, pinInfoboxOrigin = null, pinInfoboxDestination = null;

function buildPath() {
    path = new Array();

    //var shipmentLegs = shipmentPoster.legs;
    var shipmentLegs = ShipmentData.selectedShipment.legs;
    for (var i = 0; i < shipmentLegs.length; i++) {

        var leg = shipmentLegs[i];
        var tempPath = leg.carrierLane.path;

        for (var j = 0; j < tempPath.length; j++) {
            path.push(new Microsoft.Maps.Location(tempPath[j][0], tempPath[j][1]));
        }
    }
}

function initMap() {

    var originSite = ShipmentData.shipmentCard.originSite;
    var destinationSite = ShipmentData.shipmentCard.destinationSite;

    var originSiteName = originSite.name;
    var destinationSiteName = destinationSite.name;
    var originLocation = originSite.country + ", " + originSite.city;
    var destinationLocation = destinationSite.country + ", " + destinationSite.city;

    var mapOptions =
    {
        credentials: "Ah9Pa58ouD0Mbc1PCKdvvSu9Xyfece5ZbO_JbJv2boSla5RIzMojdoOqe6c48wJP",
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        showDashboard: false
    };

    map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), mapOptions);

    buildPath();

    pathStart = path[0];
    pathEnd = path[path.length - 1];

    var viewBoundaries = Microsoft.Maps.LocationRect.fromLocations(pathStart, pathEnd);
    map.setView({ bounds: viewBoundaries});

    var pinOrigin = new Microsoft.Maps.Pushpin(pathStart, {
        typeName: 'scaleStyle',
        icon: '../../images/hub-grey.svg',
        width: 36, height: 36,
        anchor: new Microsoft.Maps.Point(18, 18)
    });

    pinInfoboxOrigin = new Microsoft.Maps.Infobox(pinOrigin.getLocation(),
    {
        title: originSiteName,
        description: originLocation,
        visible: false,
        height: 70,
        offset: new Microsoft.Maps.Point(0, 15)
    });

    Microsoft.Maps.Events.addHandler(pinOrigin, 'click', displayInfoboxOrigin);

    map.entities.push(pinOrigin);
    map.entities.push(pinInfoboxOrigin);

    var pinDestination = new Microsoft.Maps.Pushpin(pathEnd, {
        typeName: 'scaleStyle',
        icon: '../../images/hub-grey.svg',
        width: 36, height: 36,
        anchor: new Microsoft.Maps.Point(18, 18)
    });

    pinInfoboxDestination = new Microsoft.Maps.Infobox(pinDestination.getLocation(),
    {
        title: destinationSiteName,
        description: destinationLocation,
        visible: false,
        height: 70,
        offset: new Microsoft.Maps.Point(0, 15)
    });

    Microsoft.Maps.Events.addHandler(pinDestination, 'click', displayInfoboxDestination);

    map.entities.push(pinDestination);
    map.entities.push(pinInfoboxDestination);

    var line;

    var routeshape = new Microsoft.Maps.Polyline(path, { strokeColor: new Microsoft.Maps.Color(255, 39, 162, 190) });
    map.entities.push(routeshape);
}

function displayInfoboxOrigin(e)
{
    pinInfoboxOrigin.setOptions({ visible: true });
    map.setView({ center: pathStart });
}                    

function displayInfoboxDestination(e)
{
    map.setView({ center: pathEnd });
    pinInfoboxDestination.setOptions({ visible: true });
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
