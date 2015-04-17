// Para obtener una introducción a la plantilla Control de página, consulte la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkId=232511

function unfollowedShipments(item) {
    return item.isFollowing;
}

WinJS.Namespace.define("ShipmentData", {
    showFormattedDate: WinJS.Binding.converter(function (jsonDate) {
        var date = TransportUtilities.parseJsonDate(jsonDate);
        return date.month + " " + date.day + ", " + date.year;
    }),

    calculateDaysLate: WinJS.Binding.converter(function (offScheduleBy) {
        
        var daysLate = 0;
        switch (offScheduleBy.unit)
        {
            case "SECONDS":
                daysLate = -(offScheduleBy.duration / 86400);
                break;
        }

        return daysLate.toFixed(1);
    }),

    formatItemCount: WinJS.Binding.converter(function (itemCount) {
        return itemCount + " items";
    }),

    followingShipmentListBinding: new WinJS.Binding.List(everythingArray.filter(unfollowedShipments))
});

(function () {
    "use strict";

    var loginCallback = function (o) {
        if (o.status === 'completed') {
        }
    }

    WinJS.UI.Pages.define("/pages/shipments/shipments.html", {
        processed: function (element) {
            return WinJS.Resources.processAll(element);
        },

        // Se llama a esta función cuando un usuario navega a esta página. Esta
        // rellena los elementos de la página con los datos de la aplicación.
        ready: function (element, options) {
            // TODO: Inicializar la página aquí.

            document.getElementById("pageTitle").textContent = "Shipments";

            document.getElementById("pivotShipments").addEventListener("selectionchanged", changeSelectedOptionStyle);

            document.getElementById("everythingOption").addEventListener("click", selectEverythingOption, false);
            document.getElementById("followingOption").addEventListener("click", selectFollowingOption, false);

            //esaWin.core.esaAPI({
            //    url: '/rest/v1/users/current',   
            //    type: 'GET',
            //    callback: loginCallback
            //});
        },

        unload: function () {
            // TODO: Responder a las navegaciones fuera de esta página.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Responder a los cambios en el diseño.
        }
    });

    function changeSelectedOptionStyle() {
        var pivotControl = document.getElementById("pivotShipments").winControl;
        var pivotSelected = pivotControl.selectedIndex;

        if (pivotSelected == 0) {
            document.getElementById("everythingOption").className = "toolbarOptionSelected";
            document.getElementById("followingOption").className = "toolbarOptionUnselected";
        }
        else
        {
            document.getElementById("everythingOption").className = "toolbarOptionUnselected";
            document.getElementById("followingOption").className = "toolbarOptionSelected";
        }
    }

    function selectEverythingOption() {
        var pivotControl = document.getElementById("pivotShipments").winControl;
        var pivotSelected = pivotControl.selectedIndex;

        if (pivotSelected != 0) {
            pivotControl.selectedIndex = 0;
        }
    }

    function selectFollowingOption() {
        var pivotControl = document.getElementById("pivotShipments").winControl;
        var pivotSelected = pivotControl.selectedIndex;

        if (pivotSelected != 1) {
            pivotControl.selectedIndex = 1;
        }
    }
})();
