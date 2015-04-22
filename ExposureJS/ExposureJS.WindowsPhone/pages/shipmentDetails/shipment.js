// Para obtener una introducción a la plantilla Control de página, consulte la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkId=232511

WinJS.Namespace.define("ShipmentDetails", {
    showIfFirstLeg: WinJS.Binding.converter(function (leg) {
        return leg.originSite.name == shipmentPoster.legs[0].originSite.name ? "inline" : "none";
    }),

    showSiteTypeImg: WinJS.Binding.converter(function (siteType) {
        
        var imgSrc = "";
        switch (siteType)
        {
            case "PORT":
                imgSrc = "../../images/hub-ltgrey.svg";
                break;
            case "MANUFACTURING":
                imgSrc = "../../images/factory-ltgrey.svg";
                break;
            case "SUPPLIER":
                imgSrc = "../../images/supplier-ltgrey.svg";
                break;
        }

        return imgSrc;
    }),

    displayIfNotLastLeg: WinJS.Binding.converter(function (leg) {
        return leg.destinationSite.name != shipmentPoster.legs[shipmentPoster.legs.length - 1].destinationSite.name ? "inline" : "none";
    }),

    changeHeightIfActualLeg: WinJS.Binding.converter(function (leg) {
        return leg.originSite.name == shipmentPoster.legs[0].originSite.name ? "140px" : "70px";
    }),

    displayIfEventsExist: WinJS.Binding.converter(function (events) {
        return events.length > 0 ? "flex" : "none";
    }),

    showScheduleShipDate: WinJS.Binding.converter(function (scheduleShipDate) {
        var date = TransportUtilities.parseJsonDate(scheduleShipDate);
        return scheduleShipDate ? "Scheduled ship date " + date.month + " " + date.day + ", " + date.year : "";
    }),
});

var eventsListView;

(function () {
    "use strict";

    function searchShipmentById(shipmentById) {
        var index;
        for (index = 0; index < everythingArray.length; index++) {
            if (everythingArray[index].id == shipmentById)
            {
                return everythingArray[index];
            }
        }
    }

    var ControlConstructor = WinJS.UI.Pages.define("/pages/shipmentDetails/shipment.html", {
        // Se llama a esta función cuando un usuario navega a esta página. Esta
        // rellena los elementos de la página con los datos de la aplicación.
        ready: function (element, options) {
            // TODO: Inicializar la página aquí.

            var shipmentID = ShipmentData.shipmentID;
            var shipment = searchShipmentById(shipmentID);

            WinJS.Binding.processAll(element.querySelector(".shipmentDetailContainer"), shipment);

            var shipmentLegs = ShipmentData.selectedShipment.legs;
            //var shipmentLegs = shipmentPoster.legs;
            var legsListBinding = new WinJS.Binding.List(shipmentLegs);

            eventsListView = document.getElementById('eventsListView').winControl;
            eventsListView.itemDataSource = legsListBinding.dataSource;
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
        ShipmentOption: ControlConstructor
    });
})();
