// For an introduction to the Hub/Pivot template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=392285
(function () {
    "use strict";

    var activation = Windows.ApplicationModel.Activation;
    var app = WinJS.Application;
    var nav = WinJS.Navigation;
    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;

    var animating = WinJS.Promise.wrap();
    var leftPanel;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            hookUpBackButtonGlobalEventHandlers();
            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;

            // Optimize the load of the application and while the splash screen is shown, execute high priority scheduled work.
            ui.disableAnimations();
            var p = ui.processAll().then(function () {
                return nav.navigate(nav.location || Application.navigator.home, nav.state);
            }).then(function () {
                return sched.requestDrain(sched.Priority.aboveNormal + 1);
            }).then(function () {
                ui.enableAnimations();
            });

            args.setPromise(p);

            logoButton.addEventListener("click", togglePanelUI, false);
            leftPanel = document.querySelector("#leftPanel");

            shipmentsOption.addEventListener("click", navigateToShipments, false);
            settingsOption.addEventListener("click", navigateToSettings, false);
            walkthroughOption.addEventListener("click", navigateToWalkthrough, false);
            aboutOption.addEventListener("click", navigateToAbout, false);
            logoutOption.addEventListener("click", logout, false);
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    function hookUpBackButtonGlobalEventHandlers() {
        // Subscribes to global events on the window object
        window.addEventListener('keyup', backButtonGlobalKeyUpHandler, false)
    }

    // CONSTANTS
    var KEY_LEFT = "Left";
    var KEY_BROWSER_BACK = "BrowserBack";
    var MOUSE_BACK_BUTTON = 3;

    function backButtonGlobalKeyUpHandler(event) {
        // Navigates back when (alt + left) or BrowserBack keys are released.
        if ((event.key === KEY_LEFT && event.altKey && !event.shiftKey && !event.ctrlKey) || (event.key === KEY_BROWSER_BACK)) {
            nav.back();
        }
    }

    function togglePanelUI() {
        if (logoButton.alt === "hidden") {
            logoButton.alt = "visible";

            // If element is already animating, wait until current animation is complete before starting the show animation.
            animating = animating
                .then(function () {
                    // Set desired final opacity on the UI element.
                    leftPanel.style.opacity = "1";
                    leftPanel.style.zIndex = "1";

                    // Run show panel animation.
                    // Element animates from the specified offset to its actual position.
                    // For a panel that is located at the edge of the screen, the offset should be the same size as the panel element.
                    // When possible, use the default offset by leaving the offset argument empty to get the best performance.
                    return WinJS.UI.Animation.showPanel(leftPanel, { top: "0", left: "-300px", rtlflip: false });
                });
        } else {
            logoButton.alt = "hidden";

            // If element is still animating in, wait until current animation is complete before starting the hide animation.
            animating = animating
                .then(function () { return WinJS.UI.Animation.hidePanel(leftPanel, { top: "0", left: "-300px", rtlflip: false }); })
                .then(
                    // On animation completion, set final opacity to 0 to hide UI element.
                    function () {
                        leftPanel.style.opacity = "0";
                        leftPanel.style.zIndex = "-1";
                    });
        }
    }

    function navigateToShipments(eventInfo) {
        eventInfo.preventDefault();
        togglePanelUI();
        nav.navigate("/pages/shipments/shipments.html", false);
    }

    function navigateToSettings(eventInfo) {
        eventInfo.preventDefault();
        togglePanelUI();
        nav.navigate("/pages/settings/settings.html", false);
    }

    function navigateToWalkthrough(eventInfo) {
        eventInfo.preventDefault();
        togglePanelUI();
        nav.navigate("/pages/walkthrough/walkthrough.html", false);
    }

    function navigateToAbout(eventInfo) {
        eventInfo.preventDefault();
        togglePanelUI();
        nav.navigate("/pages/about/about.html", false);
    }

    var logoutCallback = function (o) {
        if (o.status === 'completed') {
            WinJS.Navigation.navigate("/pages/auth/login.html", false);
        }
    }

    function logout(eventInfo) {
        eventInfo.preventDefault();
        togglePanelUI();

        esaWin.core.esaAPI({
            url: '/sso/logout',
            type: 'POST',
            callback: logoutCallback
        });
    }

    app.start();
})();
