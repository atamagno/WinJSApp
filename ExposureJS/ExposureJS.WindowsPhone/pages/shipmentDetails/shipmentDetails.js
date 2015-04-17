// Para obtener una introducción a la plantilla Control de página, consulte la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/shipmentDetails/shipmentDetails.html", {
        processed: function (element) {
            return WinJS.Resources.processAll(element);
        },

        // Se llama a esta función cuando un usuario navega a esta página. Esta
        // rellena los elementos de la página con los datos de la aplicación.
        ready: function (element, options) {
            // TODO: Inicializar la página aquí.

            document.getElementById("pageTitle").textContent = "Shipment Detail";

            document.getElementById("pivotShipmentDetails").addEventListener("selectionchanged", changeSelectedToolbarOptionStyle);

            document.getElementById("shipmentOption").addEventListener("click", selectPivotItem, false);
            document.getElementById("contentsOption").addEventListener("click", selectPivotItem, false);
            document.getElementById("contactsOption").addEventListener("click", selectPivotItem, false);
            document.getElementById("routeInfoOption").addEventListener("click", selectPivotItem, false);
            document.getElementById("mapViewOption").addEventListener("click", selectPivotItem, false);

            WinJS.Namespace.define("ShipmentData", {
                shipmentID: options.shipmentID
            });
        },

        unload: function () {
            // TODO: Responder a las navegaciones fuera de esta página.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Responder a los cambios en el diseño.
        }
    });

    function changeSelectedToolbarOptionStyle() {
        var pivotControl = document.getElementById("pivotShipmentDetails").winControl;
        var pivotSelected = pivotControl.selectedIndex;

        document.querySelector(".toolbarDetailOptionSelected").className = "toolbarDetailOptionUnselected";

        switch (pivotSelected) {
            case 0:
                document.getElementById("shipmentOption").className = "toolbarDetailOptionSelected";
                break;
            case 1:
                document.getElementById("contentsOption").className = "toolbarDetailOptionSelected";
                break;
            case 2:
                document.getElementById("contactsOption").className = "toolbarDetailOptionSelected";
                break;
            case 3:
                document.getElementById("routeInfoOption").className = "toolbarDetailOptionSelected";
                break;
        }
    }

    function selectPivotItem(eventInfo) {
        var pivotDiv = document.getElementById("pivotShipmentDetails");
        var buttonID = eventInfo.currentTarget.id;

        if (buttonID != "mapViewOption") {

            pivotDiv.style.display = "inline";
            var pivotControl = pivotDiv.winControl;

            switch (buttonID) {
                case "shipmentOption":
                    pivotControl.selectedIndex = 0;
                    break;
                case "contentsOption":
                    pivotControl.selectedIndex = 1;
                    break;
                case "contactsOption":
                    pivotControl.selectedIndex = 2;
                    break;
                case "routeInfoOption":
                    pivotControl.selectedIndex = 3;
                    break;
            }
        }
        else {
            WinJS.Navigation.navigate("/pages/shipmentDetails/mapView.html", false);
        }
    }
})();
