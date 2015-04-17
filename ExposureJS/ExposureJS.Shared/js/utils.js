WinJS.Namespace.define("TransportUtilities", {

    parseJsonDate: function (jsonDate) {

        var year = jsonDate.substr(0, 4);
        var month = jsonDate.substr(5, 2);
        var day = jsonDate.substr(8, 2);

        switch (month)
        {
            case "01":
                month = "JAN";
                break;
            case "02":
                month = "FEB";
            case "03":
                month = "MAR";
                break;
            case "04":
                month = "APR";
                break;
            case "05":
                month = "MAY";
                break;
            case "06":
                month = "JUN";
                break;
            case "07":
                month = "JUL";
                break;
            case "08":
                month = "AUG";
                break;
            case "09":
                month = "SEP";
                break;
            case "10":
                month = "OCT";
                break;
            case "11":
                month = "NOV";
                break;
            case "12":
                month = "DEC";
                break;
        }

        var date =
            {
                day: day,
                month: month,
                year: year
            };

        return date;
    },
});