// Para obtener una introducción a la plantilla Control de página, consulte la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkId=232511

WinJS.Namespace.define("ShipmentContacts", {
    displayIfNotNull: WinJS.Binding.converter(function (propertyValue) {
        return propertyValue ? "inline" : "none";
    }),
});

(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/shipmentDetails/contacts.html", {
        // Se llama a esta función cuando un usuario navega a esta página. Esta
        // rellena los elementos de la página con los datos de la aplicación.
        ready: function (element, options) {
            // TODO: Inicializar la página aquí.

            var shipmentContacts = shipmentPoster.contacts;

            var contactsListBinding = new WinJS.Binding.List(shipmentContacts);
            var contactsListView = document.getElementById('contactsListView').winControl;

            contactsListView.itemDataSource = contactsListBinding.dataSource;
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
        ContactsOption: ControlConstructor
    });
})();
