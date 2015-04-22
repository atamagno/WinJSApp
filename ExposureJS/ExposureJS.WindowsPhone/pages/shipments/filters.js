// Para obtener una introducción a la plantilla Control de página, consulte la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkId=232511

var appliedFilters, resetFilters;

(function () {
    "use strict";

    var populateFiltersListCallback = function (o) {
        if (o.status === 'completed') {
            appliedFilters = initShipmentFilters(JSON.parse(o.request.response));

            ShipmentData.appliedFilters = appliedFilters;
            initSelectedFilters();

            document.querySelector(".loadingBackground").style.display = "none";
        }
    }

    WinJS.UI.Pages.define("/pages/shipments/filters.html", {
        // Se llama a esta función cuando un usuario navega a esta página. Esta
        // rellena los elementos de la página con los datos de la aplicación.
        ready: function (element, options) {
            // TODO: Inicializar la página aquí.

            element.querySelector(".loadingBackground").style.display = "block";

            if (!ShipmentData.appliedFilters) {
                esaWin.core.esaAPI({
                    url: '/rest/v1/shipments/filters',
                    type: 'GET',
                    callback: populateFiltersListCallback
                });
            }
            else {
                appliedFilters = ShipmentData.appliedFilters;
                initSelectedFilters();
                element.querySelector(".loadingBackground").style.display = "none";
            }

            resetFilters = false;
            //appliedFilters = ShipmentData.appliedFilters;
            //initSelectedFilters();

            document.querySelector(".appHeader").style.display = "none";

            document.querySelector("#cancelFiltersButton").addEventListener("click", cancelFilters, false);
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

            document.querySelector("#applyStatusDialogButton").addEventListener("click", applyFilterSelection, false);
            document.querySelector("#applyCarrierDialogButton").addEventListener("click", applyFilterSelection, false);
            document.querySelector("#applyDepartingSiteDialogButton").addEventListener("click", applyFilterSelection, false);
            document.querySelector("#applyArrivingSiteDialogButton").addEventListener("click", applyFilterSelection, false);
            document.querySelector("#applyRegionDialogButton").addEventListener("click", applyFilterSelection, false);
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

    function cancelFilters(eventInfo)
    {
        eventInfo.preventDefault();
        appliedFilters.applyFilters = false;
        WinJS.Navigation.navigate("/pages/shipments/shipments.html", false);
    }

    function applyFilters(eventInfo)
    {
        eventInfo.preventDefault();

        if (resetFilters)
            appliedFilters.applyFilters = false;
        else
            appliedFilters.applyFilters = true;

        WinJS.Navigation.navigate("/pages/shipments/shipments.html", false);
    }

    function resetAllFilters(eventInfo) {

        resetFilters = true;

        appliedFilters.status.booked = false;
        appliedFilters.status.inTransit = false;
        appliedFilters.status.delivered = false;
        appliedFilters.status.departingLate = false;
        appliedFilters.status.departingOnTime = false;
        appliedFilters.status.arrivingLate = false;
        appliedFilters.status.arrivingOnTime = false;

        for (var i = 0; i < appliedFilters.destinationSites.length; i++) {
            appliedFilters.destinationSites[i].checked = false;
        }

        for (var i = 0; i < appliedFilters.originSites.length; i++) {
            appliedFilters.originSites[i].checked = false;
        }

        for (var i = 0; i < appliedFilters.carrierOrganizations.length; i++) {
            appliedFilters.carrierOrganizations[i].checked = false;
        }

        for (var i = 0; i < appliedFilters.regions.length; i++) {
            appliedFilters.regions[i].checked = false;
        }

        initSelectedFilters();
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

                document.getElementById("cbBooked").checked = appliedFilters.status.booked;
                document.getElementById("cbInTransit").checked = appliedFilters.status.inTransit;
                document.getElementById("cbDelivered").checked = appliedFilters.status.delivered;
                document.getElementById("cbDepartingLate").checked = appliedFilters.status.departingLate;
                document.getElementById("cbDepartingOnTime").checked = appliedFilters.status.departingOnTime;
                document.getElementById("cbArrivingLate").checked = appliedFilters.status.arrivingLate;
                document.getElementById("cbArrivingOnTime").checked = appliedFilters.status.arrivingOnTime;

                break;
            case "carrierFilterSelection":
                filterSelectionDiv = document.querySelector(".carrierFiltersDiv");
                filterSelectionDiv.style.display = "block";

                buildFilterSelection(filterSelectionDiv, appliedFilters.carrierOrganizations);
                break;
            case "departingSiteFilterSelection":
                filterSelectionDiv = document.querySelector(".departingSiteFiltersDiv");
                filterSelectionDiv.style.display = "block";

                buildFilterSelection(filterSelectionDiv, appliedFilters.originSites);
                break;
            case "arrivingSiteFilterSelection":
                filterSelectionDiv = document.querySelector(".arrivingSiteFiltersDiv");
                filterSelectionDiv.style.display = "block";

                buildFilterSelection(filterSelectionDiv, appliedFilters.destinationSites);
                break;
            case "regionFilterSelection":
                filterSelectionDiv = document.querySelector(".regionFiltersDiv");
                filterSelectionDiv.style.display = "block";

                buildFilterSelection(filterSelectionDiv, appliedFilters.regions);
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

    function applyFilterSelection(eventInfo)
    {
        eventInfo.preventDefault();

        var selectedFilter = eventInfo.currentTarget.id;
        switch (selectedFilter) {
            case "applyStatusDialogButton":
                document.querySelector(".statusFiltersDiv").style.display = "none";
                var selectedFiltersDiv = document.querySelector("#statusFilterSelection .filterSecondColumn");
                selectedFiltersDiv.innerHTML = "";

                appliedFilters.status.booked = document.getElementById("cbBooked").checked;
                buildSelectedStatusFiltersDivAfterApply(appliedFilters.status.booked, "Booked", selectedFiltersDiv);

                appliedFilters.status.inTransit = document.getElementById("cbInTransit").checked;
                buildSelectedStatusFiltersDivAfterApply(appliedFilters.status.inTransit, "In transit", selectedFiltersDiv);

                appliedFilters.status.delivered = document.getElementById("cbDelivered").checked;
                buildSelectedStatusFiltersDivAfterApply(appliedFilters.status.delivered, "Delivered", selectedFiltersDiv);

                appliedFilters.status.departingLate = document.getElementById("cbDepartingLate").checked;
                buildSelectedStatusFiltersDivAfterApply(appliedFilters.status.departingLate, "Departing: Late", selectedFiltersDiv);

                appliedFilters.status.departingOnTime = document.getElementById("cbDepartingOnTime").checked;
                buildSelectedStatusFiltersDivAfterApply(appliedFilters.status.departingOnTime, "Departing: On-Time", selectedFiltersDiv);

                appliedFilters.status.arrivingLate = document.getElementById("cbArrivingLate").checked;
                buildSelectedStatusFiltersDivAfterApply(appliedFilters.status.arrivingLate, "Arriving: Late", selectedFiltersDiv);

                appliedFilters.status.arrivingOnTime = document.getElementById("cbArrivingOnTime").checked;
                buildSelectedStatusFiltersDivAfterApply(appliedFilters.status.arrivingOnTime, "Arriving: On-Time", selectedFiltersDiv);

                break;
            case "applyCarrierDialogButton":
                buildSelectedFiltersDivAfterApply(".carrierFiltersDiv", "#carrierFilterSelection", appliedFilters.carrierOrganizations);
                break;
            case "applyDepartingSiteDialogButton":
                buildSelectedFiltersDivAfterApply(".departingSiteFiltersDiv", "#departingSiteFilterSelection", appliedFilters.originSites);
                break;
            case "applyArrivingSiteDialogButton":
                buildSelectedFiltersDivAfterApply(".arrivingSiteFiltersDiv", "#arrivingSiteFilterSelection", appliedFilters.destinationSites);
                break;
            case "applyRegionDialogButton":
                buildSelectedFiltersDivAfterApply(".regionFiltersDiv", "#regionFilterSelection", appliedFilters.regions);
                break;
        }

        resetFilters = false;
        document.querySelector("#filtersSelectionContainerBackground").style.display = "none";
    }

    function initSelectedFilters()
    {
        var selectedFiltersDiv = document.querySelector("#statusFilterSelection .filterSecondColumn");
        selectedFiltersDiv.innerHTML = "";

        buildSelectedStatusFiltersDivAfterApply(appliedFilters.status.booked, "Booked", selectedFiltersDiv);
        buildSelectedStatusFiltersDivAfterApply(appliedFilters.status.inTransit, "In transit", selectedFiltersDiv);
        buildSelectedStatusFiltersDivAfterApply(appliedFilters.status.delivered, "Delivered", selectedFiltersDiv);
        buildSelectedStatusFiltersDivAfterApply(appliedFilters.status.departingLate, "Departing: Late", selectedFiltersDiv);
        buildSelectedStatusFiltersDivAfterApply(appliedFilters.status.departingOnTime, "Departing: On-Time", selectedFiltersDiv);
        buildSelectedStatusFiltersDivAfterApply(appliedFilters.status.arrivingLate, "Arriving: Late", selectedFiltersDiv);
        buildSelectedStatusFiltersDivAfterApply(appliedFilters.status.arrivingOnTime, "Arriving: On-Time", selectedFiltersDiv);

        insertSelectedFiltersInDiv("#carrierFilterSelection", appliedFilters.carrierOrganizations);
        insertSelectedFiltersInDiv("#departingSiteFilterSelection", appliedFilters.originSites);
        insertSelectedFiltersInDiv("#arrivingSiteFilterSelection", appliedFilters.destinationSites);
        insertSelectedFiltersInDiv("#regionFilterSelection", appliedFilters.regions);
    }

    function isSelected(element, index, array) {
        return element.checked;
    }

    function buildSelectedStatusFiltersDivAfterApply(filterChecked, filterText, selectedFiltersDiv)
    {
        if (filterChecked)
        {
            var selectedFilter = document.createElement("div");
            selectedFilter.innerHTML = filterText;
            selectedFiltersDiv.appendChild(selectedFilter);
        }
    }

    function insertSelectedFiltersInDiv(selectedFiltersDivSelector, filters)
    {
        var selectedFiltersDiv = document.querySelector(selectedFiltersDivSelector + " .filterSecondColumn");
        selectedFiltersDiv.innerHTML = "";

        var allSelected = filters.every(isSelected);
        if (allSelected) {
            var selectedFilter = document.createElement("div");
            selectedFilter.innerHTML = "All";
            selectedFiltersDiv.appendChild(selectedFilter);
        }
        else {
            for (var i = 0; i < filters.length; i++) {
                if (filters[i].checked) {
                    var selectedFilter = document.createElement("div");
                    selectedFilter.innerHTML = filters[i].name;
                    selectedFiltersDiv.appendChild(selectedFilter);
                }
            }
        }
    }

    function buildSelectedFiltersDivAfterApply(filtersContainerSelector, selectedFiltersDivSelector, filters)
    {
        document.querySelector(filtersContainerSelector).style.display = "none";
        
        var selectedFiltersDiv = document.querySelector(selectedFiltersDivSelector + " .filterSecondColumn");
        selectedFiltersDiv.innerHTML = "";

        for (var i = 0; i < filters.length; i++) {
            filters[i].checked = document.getElementById(filters[i].id).checked;
            if (filters[i].checked) {
                var selectedFilter = document.createElement("div");
                selectedFilter.innerHTML = filters[i].name;
                selectedFiltersDiv.appendChild(selectedFilter);
            }
        }

        var allSelected = filters.every(isSelected);
        if (allSelected) {
            selectedFiltersDiv.innerHTML = "";
            var selectedFilter = document.createElement("div");
            selectedFilter.innerHTML = "All";
            selectedFiltersDiv.appendChild(selectedFilter);
        }
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
            checkbox.id = filters[i].id;
            checkbox.type = "checkbox"
            checkbox.checked = filters[i].checked;
            checkbox.className = "cbSelectFilter"
            divSecondColumn.appendChild(checkbox);

            childNode.appendChild(divSecondColumn);

            filtersSelectionContainer.appendChild(childNode);
        }
    }

})();
