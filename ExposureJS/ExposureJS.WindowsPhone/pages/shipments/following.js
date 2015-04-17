// Para obtener una introducción a la plantilla Control de página, consulte la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkId=232511

WinJS.Namespace.define("ShipmentData", {
    followersCountText: WinJS.Binding.converter(function (followers) {
        return followers + " Following";
    }),

    followingButtonColor: WinJS.Binding.converter(function (following) {
        return following ? "#15ACCA" : "#FFFFFF";
    })
});

(function () {
    "use strict";

    var followingShipmentListBinding;

    var populateShipmentsListCallback = function (o) {
        if (o.status === 'completed') {
            var shipments = JSON.parse(o.request.response);

            var followedShipmentsList = shipments.items.filter(unfollowedShipments);

            followingShipmentListBinding = new WinJS.Binding.List(followedShipmentsList);
            var followingListView = document.getElementById('followingListView').winControl;

            followingListView.itemDataSource = followingShipmentListBinding.dataSource;
        }
    }

    var ControlConstructor = WinJS.UI.Pages.define("/pages/shipments/following.html", {
        // Se llama a esta función cuando un usuario navega a esta página. Esta
        // rellena los elementos de la página con los datos de la aplicación.
        ready: function (element, options) {
            // TODO: Inicializar la página aquí.

            // TODO: borrar estas tres lineas
            followingShipmentListBinding = ShipmentData.followingShipmentListBinding;
            var followingListView = document.getElementById('followingListView').winControl;
            followingListView.itemTemplate = this.itemTemplate.bind(this);
            followingListView.itemDataSource = followingShipmentListBinding.dataSource;
            
            //esaWin.core.esaAPI({
            //    url: '/rest/v1/shipments/card',
            //    type: 'GET',
            //    callback: populateShipmentsListCallback
            //});
        },

        itemTemplate: function (itemPromise) {
            return itemPromise.then(function (item) {
                var index = itemPromise._value.index;
                var itemTemplate = document.body.querySelector(".listItemTemplate");
                var container = document.createElement("div");
                itemTemplate.winControl.render(item.data, container);

                var followingButton = container.querySelector(".following-button");
                followingButton.addEventListener("click", function (args) {
                    var itemList = followingShipmentListBinding.getAt(index);
                    itemList.isFollowing = !itemList.isFollowing;
                    itemList.followersCount = itemList.isFollowing ? ++itemList.followersCount : --itemList.followersCount;
                    followingShipmentListBinding.splice(index, 1);

                    var followingListView = document.getElementById('followingListView').winControl;
                    followingListView.forceLayout();
                }, false);

                return container;
            });
        },

        navigateToShipmentDetail: WinJS.Utilities.markSupportedForProcessing(function (args) {
            var item = followingShipmentListBinding.getAt(args.detail.itemIndex);
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

    WinJS.Namespace.define("ShipmentOptions", {
        FollowingOption: ControlConstructor
    });
})();
