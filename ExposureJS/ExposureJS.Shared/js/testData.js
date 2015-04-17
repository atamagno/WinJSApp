var Shipment = WinJS.Binding.define({
    id: "",
    shipmentBid: "",
    followersCount: "",
    isFollowing: false,
    itemCount: "",
    elementumEstimatedDeliveryDate: "",
    state: "",
    originSite: {
        id: "",
        name: "",
        city: "",
        country: ""
    },
    destinationSite: {
        id: "",
        name: "",
        city: "",
        country: ""
    },
    currentCarrier: {
        name: "",
        transitMode: ""
    },
    offScheduleBy: {
        unit: "",
        duration: 0
    },
    currentLeg: {
        index: 0,
        complete: false,
        entered: false,
    },
    legs: []
});

var shipmentsCardFormat =
    [{
        "actualDeliveryDate": "2014-10-25T15:21:00+0000",
        "isFollowing": false,
        "destinationSite": {
            "country": "NL",
            "city": "Amsterdam",
            "name": "Bicycle plant",
            "id": "_ntlYQIMPHJf_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWXURf5C7WX-OmX_BjEwMDAwMGX-fQ",
            "type": "MANUFACTURING"
        },
        "shipmentBid": "BICYCLE0001",
        "offScheduleBy": {
            "unit": "SECONDS",
            "duration": -9131984
        },
        "carrierEstimatedDeliveryDate": "",
        "itemCount": 5406,
        "routeCompletedPercentage": 0.0,
        "routeId": "_ntlYQIMPHJf_kLtZf46Zf8DREFNZVFlc8QC_kLtZf46Zf8RREFNXzIwMTAyMF8xMDAwMDBl_n0",
        "late": true,
        "promisedDeliveryDate": "2014-10-25T15:21:00+0000",
        "billOfLadingNumber": "EXDO612624863",
        "currentCarrier": {
            "transitMode": "SEA",
            "name": "Damco"
        },
        "id": "_ntlYQIMPHJf_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWUqOxoI284f_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWUKZjz8A_5C7WX-OmX_DkJJQ1lDTEUwMDAxXzQ3HP8CODkYBFrMBP8DNDE3zP40Wiz-M8z_BDgwNjPM6_8HMzU1NDA1OQL_AjcyZf59",
        "state": "delivered",
        "followersCount": 1,
        "originSite": {
            "country": "TW",
            "city": "New Taipei City",
            "name": "Bicycle dynamo supplier",
            "id": "_ntlYQIMPHJf_kLtZf46Zf5XAv5EBv5EUwkELQYKZVFl1EX-Qu1l_jpl_wYyMDEwMjBl_n0",
            "type": "SUPPLIER"
        },
        "declaredValue": null,
        "elementumEstimatedDeliveryDate": "2015-02-08T08:00:44+0000"
    }, {
        "actualDeliveryDate": "2014-10-25T15:21:00+0000",
        "isFollowing": false,
        "destinationSite": {
            "country": "NL",
            "city": "Amsterdam",
            "name": "Bicycle plant",
            "id": "_ntlYQIMPHJf_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWXURf5C7WX-OmX_BjEwMDAwMGX-fQ",
            "type": "MANUFACTURING"
        },
        "shipmentBid": "BICYCLE0002",
        "offScheduleBy": {
            "unit": "SECONDS",
            "duration": -9131984
        },
        "carrierEstimatedDeliveryDate": "",
        "itemCount": 5416,
        "routeCompletedPercentage": 0.0,
        "routeId": "_ntlYQIMPHJf_kLtZf46Zf8DREFNZVFlc8QC_kLtZf46Zf8RREFNXzIwMTAyMF8xMDAwMDBl_n0",
        "late": true,
        "promisedDeliveryDate": "2014-10-25T15:21:00+0000",
        "billOfLadingNumber": "EXDO612624863",
        "currentCarrier": {
            "transitMode": "SEA",
            "name": "Damco"
        },
        "id": "_ntlYQIMPHJf_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWUqOxoI284f_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWUKZjz8A_5C7WX-OmX_DkJJQ1lDTEUwMDAyXzQ3HP8CODkYBFrMBP8DNDE3zP40Wiz-M8z_BDgwNjPM6_8HMzU1NDA1OQL_AjcyZf59",
        "state": "delivered",
        "followersCount": 0,
        "originSite": {
            "country": "TW",
            "city": "New Taipei City",
            "name": "Bicycle dynamo supplier",
            "id": "_ntlYQIMPHJf_kLtZf46Zf5XAv5EBv5EUwkELQYKZVFl1EX-Qu1l_jpl_wYyMDEwMjBl_n0",
            "type": "SUPPLIER"
        },
        "declaredValue": null,
        "elementumEstimatedDeliveryDate": "2015-02-08T08:00:44+0000"
    }, {
        "actualDeliveryDate": "2014-10-25T15:21:00+0000",
        "isFollowing": false,
        "destinationSite": {
            "country": "NL",
            "city": "Amsterdam",
            "name": "Bicycle plant",
            "id": "_ntlYQIMPHJf_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWXURf5C7WX-OmX_BjEwMDAwMGX-fQ",
            "type": "MANUFACTURING"
        },
        "shipmentBid": "BICYCLE0003",
        "offScheduleBy": {
            "unit": "SECONDS",
            "duration": -9131984
        },
        "carrierEstimatedDeliveryDate": "",
        "itemCount": 5416,
        "routeCompletedPercentage": 0.0,
        "routeId": "_ntlYQIMPHJf_kLtZf46Zf8DREFNZVFlc8QC_kLtZf46Zf8RREFNXzIwMTAyMF8xMDAwMDBl_n0",
        "late": true,
        "promisedDeliveryDate": "2014-10-25T15:21:00+0000",
        "billOfLadingNumber": "EXDO612624863",
        "currentCarrier": {
            "transitMode": "SEA",
            "name": "Fedex"
        },
        "id": "_ntlYQIMPHJf_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWUqOxoI284f_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWUKZjz8A_5C7WX-OmX_DkJJQ1lDTEUwMDAzXzQ3HP8CODkYBFrMBP8DNDE3zP40Wiz-M8z_BDgwNjPM6_8HMzU1NDA1OQL_AjcyZf59",
        "state": "delivered",
        "followersCount": 0,
        "originSite": {
            "country": "TW",
            "city": "New Taipei City",
            "name": "Bicycle dynamo supplier",
            "id": "_ntlYQIMPHJf_kLtZf46Zf5XAv5EBv5EUwkELQYKZVFl1EX-Qu1l_jpl_wYyMDEwMjBl_n0",
            "type": "SUPPLIER"
        },
        "declaredValue": null,
        "elementumEstimatedDeliveryDate": "2015-02-08T08:00:44+0000"
    }, {
        "actualDeliveryDate": "2014-10-25T15:21:00+0000",
        "isFollowing": false,
        "destinationSite": {
            "country": "NL",
            "city": "Amsterdam",
            "name": "Bicycle plant",
            "id": "_ntlYQIMPHJf_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWXURf5C7WX-OmX_BjEwMDAwMGX-fQ",
            "type": "MANUFACTURING"
        },
        "shipmentBid": "BICYCLE0004",
        "offScheduleBy": {
            "unit": "SECONDS",
            "duration": -9131984
        },
        "carrierEstimatedDeliveryDate": "",
        "itemCount": 5416,
        "routeCompletedPercentage": 0.0,
        "routeId": "_ntlYQIMPHJf_kLtZf46Zf8DREFNZVFlc8QC_kLtZf46Zf8RREFNXzIwMTAyMF8xMDAwMDBl_n0",
        "late": true,
        "promisedDeliveryDate": "2014-10-25T15:21:00+0000",
        "billOfLadingNumber": "EXDO612624863",
        "currentCarrier": {
            "transitMode": "SEA",
            "name": "Damco"
        },
        "id": "_ntlYQIMPHJf_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWUqOxoI284f_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWUKZjz8A_5C7WX-OmX_DkJJQ1lDTEUwMDA0XzQ3HP8CODkYBFrMBP8DNDE3zP40Wiz-M8z_BDgwNjPM6_8HMzU1NDA1OQL_AjcyZf59",
        "state": "delivered",
        "followersCount": 1,
        "originSite": {
            "country": "TW",
            "city": "New Taipei City",
            "name": "Bicycle dynamo supplier",
            "id": "_ntlYQIMPHJf_kLtZf46Zf5XAv5EBv5EUwkELQYKZVFl1EX-Qu1l_jpl_wYyMDEwMjBl_n0",
            "type": "SUPPLIER"
        },
        "declaredValue": null,
        "elementumEstimatedDeliveryDate": "2015-02-08T08:00:44+0000"
    }, {
        "actualDeliveryDate": "2014-10-25T15:21:00+0000",
        "isFollowing": false,
        "destinationSite": {
            "country": "NL",
            "city": "Amsterdam",
            "name": "Bicycle plant",
            "id": "_ntlYQIMPHJf_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWXURf5C7WX-OmX_BjEwMDAwMGX-fQ",
            "type": "MANUFACTURING"
        },
        "shipmentBid": "BICYCLE0005",
        "offScheduleBy": {
            "unit": "SECONDS",
            "duration": -9131984
        },
        "carrierEstimatedDeliveryDate": "",
        "itemCount": 6237,
        "routeCompletedPercentage": 0.0,
        "routeId": "_ntlYQIMPHJf_kLtZf46Zf8DREFNZVFlc8QC_kLtZf46Zf8RREFNXzIwMTAyMF8xMDAwMDBl_n0",
        "late": true,
        "promisedDeliveryDate": "2014-10-25T15:21:00+0000",
        "billOfLadingNumber": "EXDO612624863",
        "currentCarrier": {
            "transitMode": "SEA",
            "name": "Fedex"
        },
        "id": "_ntlYQIMPHJf_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWUqOxoI284f_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWUKZjz8A_5C7WX-OmX_DkJJQ1lDTEUwMDA1XzQ3HP8CODkYBFrMBP8DNDE3zP40Wiz-M8z_BDgwNjPM6_8HMzU1NDA1OQL_AjcyZf59",
        "state": "delivered",
        "followersCount": 0,
        "originSite": {
            "country": "TW",
            "city": "New Taipei City",
            "name": "Bicycle dynamo supplier",
            "id": "_ntlYQIMPHJf_kLtZf46Zf5XAv5EBv5EUwkELQYKZVFl1EX-Qu1l_jpl_wYyMDEwMjBl_n0",
            "type": "SUPPLIER"
        },
        "declaredValue": null,
        "elementumEstimatedDeliveryDate": "2015-02-08T08:00:44+0000"
    }, {
        "actualDeliveryDate": "",
        "isFollowing": true,
        "destinationSite": {
            "country": "NL",
            "city": "Amsterdam",
            "name": "Bicycle plant",
            "id": "_ntlYQIMPHJf_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWXURf5C7WX-OmX_BjEwMDAwMGX-fQ",
            "type": "MANUFACTURING"
        },
        "shipmentBid": "MRKU123456",
        "offScheduleBy": {
            "unit": "SECONDS",
            "duration": -13106372
        },
        "carrierEstimatedDeliveryDate": "",
        "itemCount": 4725,
        "routeCompletedPercentage": 0.0,
        "routeId": "_ntlYQIMPHJf_kLtZf46Zf8DREFNZVFlc8QC_kLtZf46Zf8RREFNXzIwMTAyMF8xMDAwMDBl_n0",
        "late": true,
        "promisedDeliveryDate": "2014-12-15T15:21:00+0000",
        "billOfLadingNumber": "EXDO612688854",
        "currentCarrier": {
            "transitMode": "ROAD",
            "name": "Fedex"
        },
        "id": "_ntlYQIMPHJf_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWUqOxoI284f_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWUKZjz8A_5C7WX-OmX_DE1SS1UxMjM0NTZfMgTvBP45GP4xzP40GP8COTTM_jQY_jgEzP44BP8CMjTM_wM1ODkE_wI4NwL_Ajg3BP8CNTFl_n0",
        "state": "booked",
        "followersCount": 1,
        "originSite": {
            "country": "TW",
            "city": "New Taipei City",
            "name": "Bicycle dynamo supplier",
            "id": "_ntlYQIMPHJf_kLtZf46Zf5XAv5EBv5EUwkELQYKZVFl1EX-Qu1l_jpl_wYyMDEwMjBl_n0",
            "type": "SUPPLIER"
        },
        "declaredValue": null,
        "elementumEstimatedDeliveryDate": "2015-05-16T08:00:32+0000"
    }, {
        "actualDeliveryDate": "",
        "isFollowing": false,
        "destinationSite": {
            "country": "NL",
            "city": "Amsterdam",
            "name": "Bicycle plant",
            "id": "_ntlYQIMPHJf_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWXURf5C7WX-OmX_BjEwMDAwMGX-fQ",
            "type": "MANUFACTURING"
        },
        "shipmentBid": "MSKU88898",
        "offScheduleBy": {
            "unit": "SECONDS",
            "duration": -13106372
        },
        "carrierEstimatedDeliveryDate": "",
        "itemCount": 5346,
        "routeCompletedPercentage": 0.0,
        "routeId": "_ntlYQIMPHJf_kLtZf46Zf8DREFNZVFlc8QC_kLtZf46Zf8RREFNXzIwMTAyMF8xMDAwMDBl_n0",
        "late": true,
        "promisedDeliveryDate": "2014-12-15T15:21:00+0000",
        "billOfLadingNumber": "EXDO612688854",
        "currentCarrier": {
            "transitMode": "ROAD",
            "name": "Damco"
        },
        "id": "_ntlYQIMPHJf_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWUqOxoI284f_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWUKZjz8A_5C7WX-OmX_C01TS1U4ODg5OF8yBO8E_jkY_jHM_jQY_wI5NMz-NBj-OATM_jgE_wIyNMz_AzU4OQT_Ajg3Av8CODcE_wI1MWX-fQ",
        "state": "booked",
        "followersCount": 1,
        "originSite": {
            "country": "TW",
            "city": "New Taipei City",
            "name": "Bicycle dynamo supplier",
            "id": "_ntlYQIMPHJf_kLtZf46Zf5XAv5EBv5EUwkELQYKZVFl1EX-Qu1l_jpl_wYyMDEwMjBl_n0",
            "type": "SUPPLIER"
        },
        "declaredValue": null,
        "elementumEstimatedDeliveryDate": "2015-05-16T08:00:32+0000"
    }];


var shipmentPoster =
{
    "lastUpdateGeoLocation": {
        "latitude": 25.111501,
        "longitude": 121.810208
    },
    "lineItems": [{
        "itemQuantity": {
            "unitOfMeasure": "items",
            "count": 951
        },
        "purchaseOrderNumber": "9504002112",
        "description": "Rock Jumper 100",
        "productNumber": "99-1985",
        "lineNumber": "20"
    }, {
        "itemQuantity": {
            "unitOfMeasure": "items",
            "count": 961
        },
        "purchaseOrderNumber": "9504002112",
        "description": "Rock Jumper 200",
        "productNumber": "99-1986",
        "lineNumber": "30"
    }, {
        "itemQuantity": {
            "unitOfMeasure": "items",
            "count": 961
        },
        "purchaseOrderNumber": "9504002112",
        "description": "Rock Jumper 200+",
        "productNumber": "99-1987",
        "lineNumber": "30"
    }, {
        "itemQuantity": {
            "unitOfMeasure": "items",
            "count": 961
        },
        "purchaseOrderNumber": "9504002112",
        "description": "Green Beast",
        "productNumber": "63-00042",
        "lineNumber": "30"
    }, {
        "itemQuantity": {
            "unitOfMeasure": "items",
            "count": 891
        },
        "purchaseOrderNumber": "9504002112",
        "description": "King of the Road",
        "productNumber": "63-00078",
        "lineNumber": "10"
    }],
    "isOnRoute": true,
    "currentLeg": {
        "index": 0,
        "complete": false,
        "entered": false,
        "vesselName": "CMA CGM SAMSON "
    },
    "mainModeOfTransport": "SEA",
    "legs": [{
        "carrierLane": {
            "path": [
                [25.111501, 121.810208],
                [25.110639616, 121.807086168],
                [25.10977823477715, 121.80396434606494],
                [25.108916856331316, 121.80084253419437],
                [25.10805548066237, 121.79772073238782],
                [25.107194107770177, 121.79459894064479],
                [25.10633273765461, 121.79147715896482],
                [25.10547137031554, 121.78835538734745],
                [25.10461000575284, 121.78523362579219],
                [25.10374864396637, 121.78211187429858],
                [25.102887284956005, 121.77899013286614],
                [25.102025928721616, 121.7758684014944],
                [25.101164575263073, 121.77274668018289],
                [25.100303224580244, 121.76962496893114],
                [25.099441876672998, 121.76650326773867],
                [25.098580531541206, 121.76338157660501],
                [25.097719189184737, 121.7602598955297],
                [25.09685784960346, 121.75713822451225],
                [25.095996512797246, 121.75401656355218],
                [25.095135178765965, 121.75089491264906],
                [25.094273847509484, 121.74777327180237],
                [25.093412519027677, 121.74465164101167],
                [25.09255119332041, 121.74153002027649],
                [25.091689870387558, 121.73840840959633],
                [25.090828550228984, 121.73528680897074],
                [25.089967232844565, 121.73216521839925],
                [25.089105918234164, 121.72904363788136],
                [25.088244606397655, 121.72592206741663],
                [25.087383297334906, 121.72280050700458],
                [25.08652199104579, 121.71967895664473],
                [25.085660687530172, 121.71655741633661],
                [25.084799386787925, 121.71343588607975],
                [25.083938088818915, 121.71031436587369],
                [25.083076793623015, 121.70719285571793],
                [25.082215501200096, 121.70407135561203],
                [25.08135421155003, 121.7009498655555],
                [25.08049292467268, 121.69782838554787],
                [25.079631640567918, 121.69470691558867],
                [25.078770359235616, 121.69158545567743],
                [25.077909080675642, 121.68846400581367],
                [25.07704780488787, 121.68534256599693],
                [25.076186531872164, 121.68222113622674],
                [25.075325261628397, 121.67909971650263],
                [25.07446399415644, 121.67597830682412],
                [25.07360272945616, 121.67285690719073],
                [25.07274146752743, 121.66973551760202],
                [25.071880208370118, 121.66661413805748],
                [25.071018951984094, 121.66349276855667],
                [25.07015769836923, 121.6603714090991],
                [25.069296447525392, 121.6572500596843],
                [25.0684318, 121.6541164]
            ],
            "transitMode": "ROAD",
            "name": "Fedex",
            "actualTransitTime": {
                "duration": null,
                "unit": "SECONDS"
            },
            "id": "_ntlHE9yG_5MGgL-Qu1l_jpl_yNEQU1fMjAxMDIwXzEwMDAwMF8yMDEwMjBfVFdLRUxfUk9BRGVRZWpND84fZf8COntlYQIMPHJf_kLtZf46Zf5UBAjWCWVRZdRF_kLtZf46Zf8FVFdLRUxl_n1RZWECDDxyX_5C7WX-OmX_A0RBTWVRZSoIOw9l_wI6e2VhAgw8cl_-Qu1l_jpl_lcC_kQG_kRTCQQtBgplUWXURf5C7WX-OmX_BjIwMTAyMGX_An19",
            "averageTransitTime": {
                "duration": 86400.0,
                "unit": "SECONDS"
            }
        },
        "destinationSite": {
            "geoLocation": {
                "latitude": 25.0684318,
                "longitude": 121.6541164
            },
            "name": "Keelung (Chilung)",
            "id": "TWKEL",
            "type": "PORT"
        },
        "actualShipDate": null,
        "isKnown": true,
        "scheduledShipDate": "2014-11-24T13:21:00+0000",
        "originSite": {
            "geoLocation": {
                "latitude": 25.111501,
                "longitude": 121.810208
            },
            "name": "Bicycle dynamo supplier",
            "id": "201020",
            "type": "SUPPLIER"
        },
        "events": [{
            "dateTime": "2014-11-24T05:00:00.000+0000",
            "code": "AW",
            "elementumCreated": false,
            "text": "Shipment Available for Pick-up",
            "type": "PHYSICAL"
        }]
    }, {
        "carrierLane": {
            "path": [
                [25.0684318, 121.6541164],
                [24.275236516693, 120.53512573242],
                [24.325536033648, 120.41839599609],
                [24.325536033648, 120.41839599609],
                [24.390307471903, 118.59603881836],
                [24.28117784738786, 118.27964721683053],
                [24.243941954494, 118.17169189453],
                [21.4255778843134, 116.45369126271733],
                [18.522098521795574, 114.68380658669638],
                [15.623570145011826, 112.91693990139892],
                [12.729251315419535, 111.15263924538458],
                [9.83842484304478, 109.39046743850287],
                [6.950393211779691, 107.62999929327475],
                [4.064474275113945, 105.87081899112371],
                [1.55752949013316, 104.342651367187],
                [1.3469364234389, 104.29319121554],
                [1.30197674756392, 104.133911132813],
                [1.276865920696759, 104.07917566850885],
                [1.190148081759, 103.89015197754],
                [1.1838195550478, 103.79608154297],
                [1.1869142480352, 103.76209303378],
                [1.1930977217301, 103.73737405023],
                [1.1946766067455, 103.72999191284],
                [1.1941617345111, 103.72175216675],
                [1.1962305824121, 103.64398980758],
                [1.2147732286177, 103.59489501092],
                [1.23877128303731, 103.518676757812],
                [1.29373264593931, 103.395080566406],
                [1.8295504754088, 102.66045005],
                [2.2144924119211, 102.09648203803],
                [2.3778298978306, 101.83076578937],
                [2.5329185664887, 101.62628173828],
                [2.6636191069926, 101.40469576557],
                [2.8131500060141876, 101.22041991121503],
                [2.8677095048716, 101.15318298339],
                [4.750162778230524, 98.44730700930704],
                [5.3130201083244, 97.638244628906],
                [5.7444412938706, 95.585174560547],
                [5.7485404631228, 95.353088378906],
                [5.752521645446533, 95.27839709059387],
                [5.7526396028519, 95.276184082031],
                [5.7826990567971, 95.035858154297],
                [5.7554432032089, 94.982986450195],
                [5.7262539710069875, 91.89330631048631],
                [5.694194513962019, 88.49981287987825],
                [5.662136202791629, 85.1064407400908],
                [5.630078939624159, 81.71317953140918],
                [5.6223760354539, 80.897827148438],
                [5.7471740766514, 80.27572631836],
                [6.207464440810126, 78.37245527439816],
                [7.011588183779984, 75.04745532886601],
                [7.816473009771882, 71.71930835400042],
                [8.62217188500649, 68.38779533788642],
                [9.42873945612039, 65.0526903201973],
                [10.236232239777406, 61.71375960816404],
                [11.044708824275126, 58.37076094294528],
                [11.854230085069377, 55.023442608447475],
                [12.213864617517, 53.536376953125],
                [12.197757653273, 53.23974609375],
                [12.238023225868, 52.973327636719],
                [12.235339045075, 52.921142578125],
                [12.060020037775, 52.344353629439],
                [12.082300690162546, 51.64590428516169],
                [12.0899846430889, 51.405029296875],
                [12.216322490981, 50.830993652344],
                [12.327214989050825, 48.20638057627514],
                [12.473177599117697, 44.751725106637934],
                [12.506553054406, 43.961791992188],
                [12.639975311427, 43.4619140625],
                [13.573911442505, 42.654418945312],
                [14.227702467368383, 42.04973567120308],
                [14.665253560855, 41.645050048829],
                [16.028173795208, 40.946044921875],
                [17.127939984050844, 40.274528693165024],
                [20.05668802382482, 38.486237819647535],
                [22.565053635926, 36.954632071851],
                [23.02847918407307, 36.77627352867102],
                [25.350524252206, 35.88258828148],
                [26.095951476119872, 35.287560587243924],
                [27.684947385831, 34.019165039062],
                [27.888971638177, 33.794111486564],
                [27.981084775873, 33.678588867187],
                [28.488877862442, 33.173217773438],
                [28.580300971797, 33.11279296875],
                [28.784526326070452, 33.010853592225644],
                [29.39813404096, 32.704570427195],
                [29.598342449557, 32.664852567063],
                [29.740212699351, 32.586166809907],
                [29.908275518748, 32.545361080802],
                [29.925979507552, 32.559412873044],
                [29.927754997202, 32.561236245283],
                [29.929939588272, 32.562587611894],
                [29.946952497923, 32.578232151301],
                [29.958553422458, 32.585020065308],
                [29.970319929059, 32.586908252945],
                [29.978814836957, 32.586736679077],
                [30.058558470954, 32.572231292725],
                [30.081277597347, 32.571503352083],
                [30.116402275632, 32.570430729431],
                [30.185016989157, 32.568969726562],
                [30.250811507894, 32.534294128418],
                [30.2727424561506, 32.45361328125],
                [30.3982654002809, 32.3629760742187],
                [30.422842211386, 32.356619746553],
                [30.449935158536, 32.350775172235],
                [30.486065190306, 32.34337196139],
                [30.505181132767, 32.339570433256],
                [30.515718542725, 32.335767745972],
                [30.529418906458, 32.325858664351],
                [30.54888454342, 32.309421953022],
                [30.557815772964, 32.305558137493],
                [30.571039259285, 32.3040976514],
                [30.581675619357, 32.30598449707],
                [30.586462418903, 32.307344942695],
                [30.601403413176, 32.314788869436],
                [30.614866355921, 32.323608471335],
                [30.662961575509, 32.335562175068],
                [30.69084776242, 32.341714872748],
                [30.705233476293, 32.344105588121],
                [30.718438250013, 32.342891693115],
                [30.768395350619, 32.329165162581],
                [30.815106214526, 32.317485809326],
                [31.027610249065, 32.310718609618],
                [31.2348183274307, 32.3052978515625],
                [31.249171028868, 32.30598096476],
                [31.291696857782, 32.338256835937],
                [31.555951157337, 31.992874145507],
                [31.561537413485, 31.856889329313],
                [31.6337313383982, 31.683975207206576],
                [33.14208256372029, 28.071271946256335],
                [34.660566126956056, 24.434300378556795],
                [34.770947636586, 24.169921875],
                [34.777715803605, 24.06005859375],
                [35.064917174363, 23.543701171875],
                [35.59196140311875, 20.475637920860766],
                [36.29716221746923, 16.370478268127552],
                [37.00522663611103, 12.248648820693415],
                [37.212636777713, 11.041259765625],
                [37.473139366222, 9.8794555664062],
                [37.470283298339, 9.7942663382033],
                [37.3070741246804, 8.090714889192055],
                [37.1513656074632, 6.46545410156247],
                [37.031211189637, 5.0015258789062],
                [36.981797063198, 3.9454650878906],
                [36.97369983159058, 3.877487524332617],
                [36.959304077708, 3.7566328517775],
                [36.896153771838, 2.9592386402107],
                [36.5809766665745, 0.917358398437467],
                [36.221381657439, 0.1043701171875],
                [36.11539430712366, -0.14239089689501266],
                [35.991340960635, -0.43121337890625],
                [35.815250169427, -1.1041259765625],
                [35.502687650191, -2.9406722739757],
                [35.73264122919143, -4.158696085713119],
                [35.944781116016, -5.2823638916016],
                [35.939203883606, -5.5055236816406],
                [35.895181682182, -5.73486328125],
                [36.68671744589786, -8.112498305153494],
                [36.974128241663, -8.975830078125],
                [37.004791707399, -9.02252197265629],
                [38.7126421487845, -9.54162597656251],
                [39.53619807692304, -9.507910250361544],
                [42.91157007467319, -9.369725199153452],
                [43.073445577153, -9.3630981445312],
                [43.207436457622, -9.2697143554688],
                [45.85683766178924, -7.054001715713849],
                [48.517802873716, -4.8286180159025],
                [48.604793471084, -4.7116521298722],
                [48.72365263019877, -4.465781628472382],
                [49.572675913195, -2.7095031738281],
                [49.756838137339, -2.3442077636719],
                [49.831170427197, -1.9830929666044],
                [50.5140977566642, -0.059753510467493554],
                [50.883720307739, 0.98122055175781],
                [50.900179385522, 1.0031909279971],
                [50.906241371341, 1.0162394726563],
                [51.090330978585, 1.3410227978516],
                [51.121162076269, 1.4026252433705],
                [51.157561446268, 1.4556925976563],
                [51.966337644325, 3.9379119873047],
                [51.999509844464, 3.9873359541187],
                [51.990851338047, 4.06494140625],
                [51.976897844108, 4.1145515441895],
                [51.946048721256, 4.1800757449593],
                [51.930518546931, 4.2210020960429],
                [51.913210449288, 4.244499206543],
                [51.898640590419, 4.2863845825195],
                [51.894889476256, 4.3080139160156],
                [51.893188847162, 4.3207168579102],
                [51.898411737245, 4.3557357788086],
                [51.897359921722, 4.3819992756607],
                [51.897676663453, 4.4013105956192],
                [51.899633535631, 4.4085631060518],
                [51.90171131839, 4.4223499349118],
                [51.901669166303, 4.4417164396755],
                [51.901669166303, 4.4417164396755],
                [51.904382682993, 4.4424468994141],
                [51.9242159999999, 4.481776]
            ],
            "transitMode": "SEA",
            "name": "Maersk",
            "actualTransitTime": {
                "duration": null,
                "unit": "SECONDS"
            },
            "id": "_ntlHE9yG_5MGgL-Qu1l_jpl_yFEQU1fMjAxMDIwXzEwMDAwMF9UV0tFTF9OTFJUTV9TRUFlUWVqTQ_OH2X_Ajp7ZWECDDxyX_5C7WX-OmX-TgIBDIk9CmVRZdRF_kLtZf46Zf8FTkxSVE1l_n1RZWECDDxyX_5C7WX-OmX_A0RBTWVRZSoIOw9l_wI6e2VhAgw8cl_-Qu1l_jpl_lQECNYJZVFl1EX-Qu1l_jpl_wVUV0tFTGX_An19",
            "averageTransitTime": {
                "duration": 1987200.0,
                "unit": "SECONDS"
            }
        },
        "destinationSite": {
            "geoLocation": {
                "latitude": 51.890047,
                "longitude": 4.443111
            },
            "name": "Rotterdam",
            "id": "NLRTM",
            "type": "PORT"
        },
        "isKnown": true,
        "originSite": {
            "geoLocation": {
                "latitude": 25.0684318,
                "longitude": 121.6541164
            },
            "name": "Keelung (Chilung)",
            "id": "TWKEL",
            "type": "PORT"
        },
        "events": []
    }, {
        "carrierLane": {
            "path": [
                [51.9242159999999, 4.481776],
                [51.933023939999906, 4.4897936],
                [51.94183208584475, 4.497811387374302],
                [51.950640437572176, 4.505829362157255],
                [51.959448995219915, 4.513847524383212],
                [51.96825775882572, 4.521865874086536],
                [51.97706672842735, 4.5298844113015955],
                [51.985875904062574, 4.537903136062769],
                [51.99468528576916, 4.545922048404441],
                [52.00349487358489, 4.553941148361004],
                [52.01230466754756, 4.561960435966858],
                [52.021114667694974, 4.569979911256411],
                [52.02992487406493, 4.577999574264076],
                [52.03873528669525, 4.586019425024278],
                [52.04754590562375, 4.594039463571446],
                [52.05635673088827, 4.602059689940017],
                [52.06516776252664, 4.610080104164436],
                [52.07397900057673, 4.618100706279157],
                [52.08279044507638, 4.62612149631864],
                [52.091602096063454, 4.634142474317352],
                [52.10041395357584, 4.642163640309771],
                [52.10922601765141, 4.650184994330377],
                [52.11803828832805, 4.658206536413662],
                [52.126850765643674, 4.666228266594124],
                [52.135663449636176, 4.674250184906269],
                [52.14447634034347, 4.68227229138461],
                [52.153289437803494, 4.690294586063668],
                [52.16210274205417, 4.698317068977971],
                [52.170916253133434, 4.706339740162056],
                [52.17972997107925, 4.714362599650466],
                [52.18854389592956, 4.7223856474777515],
                [52.197358027722345, 4.730408883678472],
                [52.206172366495565, 4.738432308287195],
                [52.21498691228721, 4.7464559213384945],
                [52.22380166513526, 4.75447972286695],
                [52.23261662507773, 4.762503712907153],
                [52.24143179215262, 4.770527891493699],
                [52.25024716639793, 4.778552258661193],
                [52.25906274785171, 4.786576814444247],
                [52.267878536551976, 4.79460155887748],
                [52.27669453253677, 4.80262649199552],
                [52.28551073584415, 4.810651613833001],
                [52.29432714651217, 4.818676924424566],
                [52.303143764578884, 4.826702423804866],
                [52.31196059008238, 4.834728112008557],
                [52.320777623060735, 4.842753989070306],
                [52.329594863552046, 4.850780055024784],
                [52.3384123115944, 4.858806309906674],
                [52.34722996722592, 4.866832753750662],
                [52.35604783048471, 4.874859386591447],
                [52.364613, 4.882656]
            ],
            "transitMode": "ROAD",
            "name": "TNT",
            "actualTransitTime": {
                "duration": null,
                "unit": "SECONDS"
            },
            "id": "_ntlHE9yG_5MGgL-Qu1l_jpl_yNEQU1fMjAxMDIwXzEwMDAwMF9OTFJUTV8xMDAwMDBfUk9BRGVRZWpND84fZf8COntlYQIMPHJf_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWXURf5C7WX-OmX_BjEwMDAwMGX-fVFlYQIMPHJf_kLtZf46Zf8DREFNZVFlKgg7D2X_Ajp7ZWECDDxyX_5C7WX-OmX-TgIBDIk9CmVRZdRF_kLtZf46Zf8FTkxSVE1l_wJ9fQ",
            "averageTransitTime": {
                "duration": 172800.0,
                "unit": "SECONDS"
            }
        },
        "destinationSite": {
            "geoLocation": {
                "latitude": 52.364613,
                "longitude": 4.882656
            },
            "name": "Bicycle plant",
            "id": "100000",
            "type": "MANUFACTURING"
        },
        "isKnown": true,
        "originSite": {
            "geoLocation": {
                "latitude": 51.890047,
                "longitude": 4.443111
            },
            "name": "Rotterdam",
            "id": "NLRTM",
            "type": "PORT"
        },
        "events": []
    }],
    "id": "MRKU123456_2aaca9d1-4d94-4d8a-8a24-589a87e87a51",
    "contacts": [{
        "firstName": "Gin",
        "lastName": "Batoko",
        "jobTitle": "Plant Operations Manager",
        "email": "gin.batoko@wedodynamos.tw",
        "phone": "+886 3 1 55 90",
        "organizationName": "Bicycle dynamo supplier"
    }, {
        "firstName": "Kees",
        "lastName": "Fietsenmaker",
        "jobTitle": "Plant Manager",
        "email": "kees@fietsenfabriek.nl",
        "phone": "+31 6 53 667 889",
        "organizationName": "Bicycle plant"
    }, {
        "lastName": "Shikin",
        "phone": "07-5980000",
        "organizationName": "Bicycle dynamo supplier"
    }],
    "vesselName": "CMA CGM SAMSON "
};

var shipmentFilters = {
    "regions": [{
        "name": "Asia",
        "id": "Asia"
    }, {
        "name": "Europe",
        "id": "Europe"
    }],
    "destinationSites": [{
        "name": "Bicycle plant",
        "id": "_ntlYQIMPHJf_kLtZf46ZVqDUxxXzAq7PMxqLQZlUWXURf5C7WX-OmX_BjEwMDAwMGX-fQ"
    }],
    "originSites": [{
        "name": "Bicycle dynamo supplier",
        "id": "_ntlYQIMPHJf_kLtZf46Zf5XAv5EBv5EUwkELQYKZVFl1EX-Qu1l_jpl_wYyMDEwMjBl_n0"
    }],
    "carrierOrganizations": [{
        "name": "Damco",
        "id": "_ntlYQIMPHJf_kLtZf46Zf8DREFNZVFlKjsaCNvOH_5C7WX-OmX_A0RBTWX-fQ"
    },
    {
        "name": "Fedex",
        "id": "_ntlYQIMPHJf_kLtZf46Zf8DREFNZVFlKjsaCNvOH_5C7WX-OmX_A0RBTWX-fJ"
    }]
};

var Filter = WinJS.Binding.define({
    id: "",
    name: "",
    checked: false
});

var StatusFilter = WinJS.Binding.define({
    booked: false,
    inTransit: false,
    delivered: false,
    departingLate: false,
    departingOnTime: false,
    arrivingLate: false,
    arrivingOnTime: false
});

var Filters = WinJS.Binding.define({
    applyFilters: false,
    status: "",
    regions: [],
    destinationSites: [],
    originSites: [],
    carrierOrganizations: [],
});

var appFilters = initShipmentFilters();
function initShipmentFilters()
{
    var filters = new Filters();

    filters.applyFilters = false;
    filters.status = new StatusFilter();
    for (var i = 0; i < shipmentFilters.regions.length; i++) {
        var filter = new Filter(
            {
                id: shipmentFilters.regions[i].id,
                name: shipmentFilters.regions[i].name,
                checked: false
            });

        filters.regions.push(filter);
    }

    for (var i = 0; i < shipmentFilters.destinationSites.length; i++) {
        var filter = new Filter(
            {
                id: shipmentFilters.destinationSites[i].id,
                name: shipmentFilters.destinationSites[i].name,
                checked: false
            });

        filters.destinationSites.push(filter);
    }

    for (var i = 0; i < shipmentFilters.originSites.length; i++) {
        var filter = new Filter(
            {
                id: shipmentFilters.originSites[i].id,
                name: shipmentFilters.originSites[i].name,
                checked: false
            });

        filters.originSites.push(filter);
    }

    for (var i = 0; i < shipmentFilters.carrierOrganizations.length; i++) {
        var filter = new Filter(
            {
                id: shipmentFilters.carrierOrganizations[i].id,
                name: shipmentFilters.carrierOrganizations[i].name,
                checked: false
            });

        filters.carrierOrganizations.push(filter);
    }

    return filters;
}

var everythingArray = createShipmentObjectArray();
function createShipmentObjectArray() {
    shipmentArray = new Array();

    var shipment;
    for (var i = 0; i < shipmentsCardFormat.length; i++) {
        shipment = new Shipment({
            id: shipmentsCardFormat[i].id,
            shipmentBid: shipmentsCardFormat[i].shipmentBid,
            followersCount: shipmentsCardFormat[i].followersCount,
            isFollowing: shipmentsCardFormat[i].isFollowing,
            itemCount: shipmentsCardFormat[i].itemCount,
            elementumEstimatedDeliveryDate: shipmentsCardFormat[i].elementumEstimatedDeliveryDate,
            state: shipmentsCardFormat[i].state,
            "originSite": {
                "id": shipmentsCardFormat[i].originSite.id,
                "name": shipmentsCardFormat[i].originSite.name,
                "city": shipmentsCardFormat[i].originSite.city,
                "country": shipmentsCardFormat[i].originSite.country
            },
            "destinationSite": {
                "id": shipmentsCardFormat[i].destinationSite.id,
                "name": shipmentsCardFormat[i].destinationSite.name,
                "city": shipmentsCardFormat[i].destinationSite.city,
                "country": shipmentsCardFormat[i].destinationSite.country
            },
            "currentCarrier": {
                "name": shipmentsCardFormat[i].currentCarrier.name,
                "transitMode": shipmentsCardFormat[i].currentCarrier.transitMode
            },
            "offScheduleBy": {
                "unit": shipmentsCardFormat[i].offScheduleBy.unit,
                "duration": shipmentsCardFormat[i].offScheduleBy.duration
            },
        });

        shipmentArray.push(shipment);
    }

    return shipmentArray;
}