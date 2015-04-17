// Para obtener una introducción a la plantilla Control de página, consulte la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/settings/settings.html", {
        // Se llama a esta función cuando un usuario navega a esta página. Esta
        // rellena los elementos de la página con los datos de la aplicación.
        ready: function (element, options) {
            // TODO: Inicializar la página aquí.

            document.getElementById("pageTitle").textContent = "Settings";

            document.querySelector(".changeTimeZoneButton").addEventListener("click", viewTimeZoneSelection, false);
            document.querySelector("#closeTimeZoneDialogButton").addEventListener("click", closeTimeZoneSelection, false);
        },

        unload: function () {
            // TODO: Responder a las navegaciones fuera de esta página.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Responder a los cambios en el diseño.
        }
    });

    function viewTimeZoneSelection() {
        document.querySelector("#timeZoneSelectionContainerBackground").style.display = "block";
    }

    function closeTimeZoneSelection() {
        document.querySelector("#timeZoneSelectionContainerBackground").style.display = "none";
    }
})();
