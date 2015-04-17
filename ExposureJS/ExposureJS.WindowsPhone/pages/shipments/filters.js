// Para obtener una introducción a la plantilla Control de página, consulte la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/shipments/filters.html", {
        // Se llama a esta función cuando un usuario navega a esta página. Esta
        // rellena los elementos de la página con los datos de la aplicación.
        ready: function (element, options) {
            // TODO: Inicializar la página aquí.

            document.querySelector(".appHeader").style.display = "none";

            document.querySelector("#cancelFiltersButton").addEventListener("click", navigateToShipments, false);
            document.querySelector("#applyFiltersButton").addEventListener("click", applyFilters, false);

            document.querySelector("#resetAllFiltersButton").addEventListener("click", resetAllFilters, false);

            document.querySelector("#statusFilterSelection").addEventListener("click", viewFilterSelection, false);
            document.querySelector("#carrierFilterSelection").addEventListener("click", viewFilterSelection, false);
            document.querySelector("#departingSiteFilterSelection").addEventListener("click", viewFilterSelection, false);
            document.querySelector("#arrivingSiteFilterSelection").addEventListener("click", viewFilterSelection, false);
            document.querySelector("#regionFilterSelection").addEventListener("click", viewFilterSelection, false);
            
            document.querySelector("#closeStatusDialogButton").addEventListener("click", closeFilterSelection, false);
            document.querySelector("#closeCarrierDialogButton").addEventListener("click", closeFilterSelection, false);
            document.querySelector("#closeDepartingSiteDialogButton").addEventListener("click", closeFilterSelection, false);
            document.querySelector("#closeArrivingSiteDialogButton").addEventListener("click", closeFilterSelection, false);
            document.querySelector("#closeRegionDialogButton").addEventListener("click", closeFilterSelection, false);
        },

        unload: function () {
            // TODO: Responder a las navegaciones fuera de esta página.
            document.querySelector(".appHeader").style.display = "block";
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Responder a los cambios en el diseño.
        }
    });

    function navigateToShipments(eventInfo) {
        eventInfo.preventDefault();
        WinJS.Navigation.navigate("/pages/shipments/shipments.html", false);
    }

    function applyFilters(eventInfo)
    {
    }

    function resetAllFilters(eventInfo) {
    }

    function viewFilterSelection(eventInfo) {
        eventInfo.preventDefault();

        document.querySelector("#filtersSelectionContainerBackground").style.display = "block";

        var filterSelectionDiv;
        var selectedFilter = eventInfo.currentTarget.id;
        switch (selectedFilter) {
            case "statusFilterSelection":
                filterSelectionDiv = document.querySelector(".statusFiltersDiv");
                filterSelectionDiv.style.display = "block";

                break;
            case "carrierFilterSelection":
                filterSelectionDiv = document.querySelector(".carrierFiltersDiv");
                filterSelectionDiv.style.display = "block";

                buildFilterSelection(filterSelectionDiv, shipmentFilters.carrierOrganizations);
                break;
            case "departingSiteFilterSelection":
                filterSelectionDiv = document.querySelector(".departingSiteFiltersDiv");
                filterSelectionDiv.style.display = "block";

                buildFilterSelection(filterSelectionDiv, shipmentFilters.originSites);
                break;
            case "arrivingSiteFilterSelection":
                filterSelectionDiv = document.querySelector(".arrivingSiteFiltersDiv");
                filterSelectionDiv.style.display = "block";

                buildFilterSelection(filterSelectionDiv, shipmentFilters.destinationSites);
                break;
            case "regionFilterSelection":
                filterSelectionDiv = document.querySelector(".regionFiltersDiv");
                filterSelectionDiv.style.display = "block";

                buildFilterSelection(filterSelectionDiv, shipmentFilters.regions);
                break;
        }
    }

    function closeFilterSelection(eventInfo) {
        eventInfo.preventDefault();

        var selectedFilter = eventInfo.currentTarget.id;
        switch (selectedFilter) {
            case "closeStatusDialogButton":
                document.querySelector(".statusFiltersDiv").style.display = "none";
                break;
            case "closeCarrierDialogButton":
                document.querySelector(".carrierFiltersDiv").style.display = "none";
                break;
            case "closeDepartingSiteDialogButton":
                document.querySelector(".departingSiteFiltersDiv").style.display = "none";
                break;
            case "closeArrivingSiteDialogButton":
                document.querySelector(".arrivingSiteFiltersDiv").style.display = "none";
                break;
            case "closeRegionDialogButton":
                document.querySelector(".regionFiltersDiv").style.display = "none";
                break;
        }

        document.querySelector("#filtersSelectionContainerBackground").style.display = "none";
    }

    function buildFilterSelection(filterSelectionDiv, filters)
    {
        var filtersSelectionContainer = filterSelectionDiv.querySelector(".filtersSelectionContainer");
        filterSelectionDiv.querySelector(".filtersSelectionContainer").innerHTML = "";

        for (var i = 0; i < filters.length; i++) {

            var childNode = document.createElement("div");
            childNode.className = "selectionFilterRow"

            //First Column
            var divFirstColumn = document.createElement("div");
            divFirstColumn.className = "filterFirstColumn"

            var textnode = document.createTextNode(filters[i].name);
            divFirstColumn.appendChild(textnode);

            childNode.appendChild(divFirstColumn);

            //Second Column
            var divSecondColumn = document.createElement("div");
            divSecondColumn.className = "filterSecondColumn"

            var checkbox = document.createElement("input");
            checkbox.type = "checkbox"
            checkbox.className = "cbSelectFilter"
            divSecondColumn.appendChild(checkbox);

            childNode.appendChild(divSecondColumn);

            filtersSelectionContainer.appendChild(childNode);
        }
    }

})();
