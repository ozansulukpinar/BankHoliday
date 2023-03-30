var urls = ["https://www.gov.uk/bank-holidays.json", "tr-data.json"];

var index = 0;
let date = new Date();
let year = date.getFullYear();

loadDropdown();

$(".option input:radio").click(function () {
  if ($(this)[0].id === "tr") {
    index = 1;
  } else {
    index = 0;
  }

  drawTable(index, year);
});

$("select").on("change", function (e) {
  year = this.value;
  drawTable(index, year);
});

function loadDropdown() {
  var years = [year, year + 1, year + 2];

  years.forEach((element) => {
    $("#years").append(
      $("<option>", {
        value: element,
        text: element,
      })
    );
  });
}

function drawTable(type, year) {
  $("#BankHolidayTable").empty();
  var headerTr = "<tr><th>Title</th><th>Date</th></tr>";
  $("#BankHolidayTable").append(headerTr);

  $.getJSON(urls[type], function (data) {
    try {
      if (type === 0) {
        if (data != null && data["england-and-wales"].events.length > 0) {
          data["england-and-wales"].events.forEach((element) => {
            if (element.date.split("-")[0] == year) {
              if (element.date >= date.toISOString().slice(0, 10)) {
                var newTr =
                  "<tr><td>" +
                  element.title +
                  "</td><td>" +
                  element.date.split("-")[2] +
                  "/" +
                  element.date.split("-")[1] +
                  "/" +
                  element.date.split("-")[0] +
                  "</td></tr>";
                $("#BankHolidayTable").append(newTr);
              }
            }
          });
        } else {
          drawBlankRow();
        }
      } else {
        if (data != null && data["all"].events.length > 0) {
          data["all"].events.forEach((element) => {
            if (element.date.split("-")[0] == year) {
              if (element.date >= date.toISOString().slice(0, 10)) {
                var newTr =
                  "<tr><td>" +
                  element.title +
                  "</td><td>" +
                  element.date.split("-")[2] +
                  "/" +
                  element.date.split("-")[1] +
                  "/" +
                  element.date.split("-")[0] +
                  "</td></tr>";
                $("#BankHolidayTable").append(newTr);
              }
            }
          });
        } else {
          drawBlankRow();
        }
      }
    } catch {
      drawBlankRow();
    }
  });
}

function drawBlankRow() {
  var newTr = "There is no data";
  $("#BankHolidayTable").append(newTr);
}

function changeMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");

  if ($("button").text().includes("Dark")) {
    $("button").text("Light Mode");
  } else {
    $("button").text("Dark Mode");
  }
}
