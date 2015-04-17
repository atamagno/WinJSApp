// Para obtener una introducción a la plantilla Control de página, consulte la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkId=232511

WinJS.Namespace.define("ShipmentData", {
    followersCountText: WinJS.Binding.converter(function (followers) {
        return followers  + " Following";
    }),

    followingButtonColor: WinJS.Binding.converter(function (following) {
        return following ? "#15ACCA" : "#FFFFFF";
    })
});

(function () {
    "use strict";

    var shipmentListBinding;

    var populateShipmentsListCallback = function (o) {
        if (o.status === 'completed') {
            var shipments = JSON.parse(o.request.response);

            shipmentListBinding = new WinJS.Binding.List(shipments.items);
            var everythingListView = document.getElementById('everythingListView').winControl;

            everythingListView.itemDataSource = shipmentListBinding.dataSource;
        }
    }

    var ControlConstructor = WinJS.UI.Pages.define("/pages/shipments/everything.html", {
        // Se llama a esta función cuando un usuario navega a esta página. Esta
        // rellena los elementos de la página con los datos de la aplicación.
        ready: function (element, options) {
            // TODO: Inicializar la página aquí.

            document.querySelector(".filterButton").addEventListener("click", navigateToFilters, false);

            // TODO: borrar estas tres lineas
            shipmentListBinding = new WinJS.Binding.List(everythingArray);
            var everythingListView = document.getElementById('everythingListView').winControl;
            everythingListView.itemTemplate = this.itemTemplate.bind(this);
            everythingListView.itemDataSource = shipmentListBinding.dataSource;

            /*
            esaWin.core.esaAPI({
                url: '/rest/v1/shipments/card',
                type: 'GET',
                callback: populateShipmentsListCallback
            });
            */
        },

        itemTemplate: function (itemPromise) {
            return itemPromise.then(function (item) {
                var index = itemPromise._value.index;
                var itemTemplate = document.body.querySelector(".listItemTemplate");
                var container = document.createElement("div");
                itemTemplate.winControl.render(item.data, container);

                var followingButton = container.querySelector(".following-button");
                followingButton.addEventListener("click", function (args) {
                    var itemList = shipmentListBinding.getAt(index);
                    itemList.isFollowing = !itemList.isFollowing;
                    itemList.followersCount = itemList.isFollowing ? ++itemList.followersCount : --itemList.followersCount;

                    if (itemList.isFollowing) {
                        ShipmentData.followingShipmentListBinding.splice(ShipmentData.followingShipmentListBinding.length, 0, itemList);
                    }
                    else {
                        var followingList = ShipmentData.followingShipmentListBinding;
                        for (var i = 0; i < followingList.length; i++) {
                            
                            if (followingList.getAt(i).id == itemList.id)
                            {
                                ShipmentData.followingShipmentListBinding.splice(i, 1);
                            }
                        }
                    }
                }, false);

                return container;
            });
        },

        navigateToShipmentDetail: WinJS.Utilities.markSupportedForProcessing(function (args) {
            var item = shipmentListBinding.getAt(args.detail.itemIndex);
            WinJS.Navigation.navigate("/pages/shipmentDetails/shipmentDetails.html", { shipmentID: item.id });
        }),

        unload: function () {
            // TODO: Responder a las navegaciones fuera de esta página.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Responder a los cambios en el diseño.
        }
    });

    function navigateToFilters(eventInfo) {
        eventInfo.preventDefault();
        WinJS.Navigation.navigate("/pages/shipments/filters.html", false);
    }

    WinJS.Namespace.define("ShipmentOptions", {
        EverythingOption: ControlConstructor
    });
})();
