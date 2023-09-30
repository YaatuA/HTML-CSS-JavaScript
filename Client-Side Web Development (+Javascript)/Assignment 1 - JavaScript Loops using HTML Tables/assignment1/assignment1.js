window.onload = defaultTable()
document.getElementById("submit").addEventListener("click", generateTable);

function defaultTable() {
    // Default values on load
    var rows = 10;
    var colms = 10;

    // Selects table element from HTML by ID
    var table = document.getElementById("multiplicationTable");

    // Adds the data rows
    for (var i = 1; i <= rows; i++) {
        row = table.insertRow(i-1);
        for (var j = 1; j <= colms; j++) {
            var cell = row.insertCell(j-1);
            var cellText = i + " × " + j + " = " + (i*j);
            cell.innerHTML = cellText;
        }
    }
}

function generateTable(event) {
    var rows = document.getElementById("rows").value;
    var col = document.getElementById("colms").value;

    // Determines how many rows already exist in the table that need to be deleted
    var numRows = document.getElementById("multiplicationTable").getElementsByTagName('tr');
    var rowCount = numRows.length;

    event.preventDefault(); // Prevents default table from being created on load

    // Deletes all rows from existing table 
    for (var i = rowCount; i >= 1; i--) {
        document.getElementById("multiplicationTable").deleteRow(0);
    }

    // Selects table element from HTML by ID
    var table = document.getElementById("multiplicationTable");

    // Adds the data rows
    for (var i = 1; i <= rows; i++) {
        row = table.insertRow(i-1);
        for (var j = 1; j <= col; j++) {
            var cell = row.insertCell(j-1);
            var cellText = i + " × " + j + " = " + (i*j);
            cell.innerHTML = cellText;
        }
    }
}