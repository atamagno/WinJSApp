// Para obtener una introducción a la plantilla Control de página, consulte la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/shipmentDetails/contents.html", {
        // Se llama a esta función cuando un usuario navega a esta página. Esta
        // rellena los elementos de la página con los datos de la aplicación.
        ready: function (element, options) {
            // TODO: Inicializar la página aquí.

            var shipmentContents = shipmentPoster.lineItems;

            var contentListBinding = new WinJS.Binding.List(shipmentContents);
            var contentsListView = document.getElementById('contentsListView').winControl;

            contentsListView.itemDataSource = contentListBinding.dataSource;
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
        ContentsOption: ControlConstructor
    });
})();
