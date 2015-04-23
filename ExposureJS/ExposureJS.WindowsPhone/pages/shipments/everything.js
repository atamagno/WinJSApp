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

    var shipmentListBinding, shareContent, shareTitle, shareImage;

    var populateShipmentsListCallback = function (o) {
        if (o.status === 'completed') {
            var shipments = JSON.parse(o.request.response);

            var everythingArray = createShipmentObjectArray(shipments.items.filter(filterShipments));
            if (everythingArray.length == 0) {
                document.querySelector("#noResultsDiv").style.display = "block";
            }

            shipmentListBinding = new WinJS.Binding.List(everythingArray);
            var everythingListView = document.getElementById('everythingListView').winControl;
            everythingListView.itemDataSource = shipmentListBinding.dataSource;

            ShipmentData.followingShipmentListBinding = new WinJS.Binding.List(everythingArray.filter(unfollowedShipments));
        }
        else {
            if (o.status === 'error') {
                document.querySelector("#cannotReachServerDiv").style.display = "block";
            }
        }

        document.querySelector(".loadingBackground").style.display = "none";
    }

    var getShipmentPosterCallback = function (o) {
        if (o.status === 'completed') {
            var shipment = JSON.parse(o.request.response);

            WinJS.Namespace.define("ShipmentData", {
                selectedShipment: shipment
            });

            WinJS.Navigation.navigate("/pages/shipmentDetails/shipmentDetails.html");
        }
    }

    var ControlConstructor = WinJS.UI.Pages.define("/pages/shipments/everything.html", {
        // Se llama a esta función cuando un usuario navega a esta página. Esta
        // rellena los elementos de la página con los datos de la aplicación.
        ready: function (element, options) {
            // TODO: Inicializar la página aquí.

            esaWin.core.esaAPI({
                url: '/rest/v1/shipments/card',
                type: 'GET',
                callback: populateShipmentsListCallback
            });

            document.querySelector(".loadingBackground").style.display = "block";
            document.querySelector(".filterButton").addEventListener("click", navigateToFilters, false);

            // TODO: borrar estas lineas
            //shipmentListBinding = new WinJS.Binding.List(everythingArray.filter(filterShipments));
            var everythingListView = document.getElementById('everythingListView').winControl;
            everythingListView.itemTemplate = this.itemTemplate.bind(this);
            //everythingListView.itemDataSource = shipmentListBinding.dataSource;

            var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
            dataTransferManager.addEventListener("datarequested", shareHtmlHandler);
        },

        itemTemplate: function (itemPromise) {
            return itemPromise.then(function (item) {
                var index = itemPromise._value.index;
                var itemTemplate = document.body.querySelector(".listItemTemplate");
                var container = document.createElement("div");
                itemTemplate.winControl.render(item.data, container);

                var shareButton = container.querySelector(".share-details-button");
                shareButton.addEventListener("click", function (args) {
                    //sendEmail(container.innerHTML);

                    var shipment = item.data;

                    shareTitle = UserData.firstName + " shared a Shipment " + shipment.shipmentBid + " status with you";
                    shareContent = "Shipment " + shipment.shipmentBid + "\n";
                    shareContent += "This shipment is calculated to arrive " + calculateDaysLate(shipment.offScheduleBy) + " days late on " + showFormattedDate(shipment.elementumEstimatedDeliveryDate) + "\n\n"
                    shareContent += "Source: " + shipment.originSite.name + " in " + shipment.originSite.city + ", " + shipment.originSite.country + "\n"
                    shareContent += "Source: " + shipment.destinationSite.name + " in " + shipment.destinationSite.city + ", " + shipment.destinationSite.country + "\n"
                    shareContent += "Original Promise: " + showFormattedDate(shipment.promisedDeliveryDate) + "\n"
                    shareContent += "Current Shipper: " + shipment.currentCarrier.name + "\n"

                    Windows.ApplicationModel.DataTransfer.DataTransferManager.showShareUI();
                }, false);

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
            WinJS.Namespace.define("ShipmentData", {
                shipmentID: item.id,
                shipmentCard: item
            });

            esaWin.core.esaAPI({
                url: '/rest/v1/shipments/' + item.id + '/poster',
                type: 'GET',
                callback: getShipmentPosterCallback
            });

            document.querySelector(".loadingBackground").style.display = "block";

            //WinJS.Navigation.navigate("/pages/shipmentDetails/shipmentDetails.html", { shipmentID: item.id });
        }),

        unload: function () {
            // TODO: Responder a las navegaciones fuera de esta página.
            var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
            dataTransferManager.removeEventListener("datarequested", shareHtmlHandler);
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

    function shareHtmlHandler(e) {
        var request = e.request;
        request.data.properties.title = shareTitle;
        request.data.setText(shareContent);
    }

    function sendEmail(htmlContent)
    {
        var emailToSend = {
            ToAddress: "agusto.tamagno@gmail.com",
            Subject: "Test Elementum Email",
            HtmlContent: htmlContent // agregar estilos in-line
        };

        WinJS.xhr({
            type: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            url: "http://localhost:17765/EmailSender.svc/SendEmail",
            data: JSON.stringify({ emailInfo: emailToSend }),
        }).done(
            function completed(request) {
                var returnValue = JSON.parse(request.responseText);;
            },
            function error(request) {
                var returnValue = JSON.parse(request.responseText);
            }
      );
    }

    WinJS.Namespace.define("ShipmentOptions", {
        EverythingOption: ControlConstructor
    });
})();
