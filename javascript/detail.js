console.log("JavaScripの読み込み成功！");

// イベントIDを取得
const selectedEventId = localStorage.getItem("selectedEventId");

// 予定を取得
const events = loadEvents();

const selectedEvent = events.find(function (event) {
    return String(event.id) === selectedEventId;
});

console.log("選択されたイベント：", selectedEvent);

// HTML要素を取得
const eventForm = document.querySelector("#detail-form");
const oshiName = document.querySelector("#oshi-name");
const eventType = document.querySelector("#event-type");
const eventName = document.querySelector("#event-name")
const eventDate = document.querySelector("#event-date");
const eventTime = document.querySelector("#event-time");
const resultGroup = document.querySelector(".result-group");
const resultDate = document.querySelector("#result-date");
const resultTime = document.querySelector("#result-time");
const eventPlace = document.querySelector("#event-place");
const eventMemo = document.querySelector("#event-memo");
const eventNotification = document.querySelector("#event-notification");
const eventRepeat = document.querySelector("#event-repeat");
const headerBackButton = document.querySelector(".header-back-button");
const deleteButton = document.querySelector(".delete-button");

function renderOshiOptions() {

    const oshis =
        JSON.parse(localStorage.getItem("oshis")) || [];

    while (oshiName.options.length > 1) {
        oshiName.remove(1);
    }

    oshis.forEach(function (oshi) {

        const option =  document.createElement("option");

        option.value = oshi.id;
        option.textContent = oshi.name;

        oshiName.appendChild(option);

    });

}

renderOshiOptions();

if (selectedEvent) {

    oshiName.value =
        selectedEvent.oshiId || "";

    eventType.value =
        selectedEvent.type || "";

    eventName.value =
        selectedEvent.name || "";

    eventDate.value =
        selectedEvent.date || "";

    eventTime.value =
        selectedEvent.time || "";

    resultDate.value =
        selectedEvent.resultDate || "";

    resultTime.value =
        selectedEvent.resultTime || "";

    eventPlace.value =
        selectedEvent.place || "";

    eventMemo.value =
        selectedEvent.memo || "";

    eventNotification.value =
        selectedEvent.notification || "none";

    eventRepeat.value =
        selectedEvent.repeat || "none";

}

function updateResultGroup() {

    if (eventType.value === "deadline") {

        resultGroup.style.display = "block";

    } else {

        resultGroup.style.display = "none";

    }

}

updateResultGroup();

eventType.addEventListener("change", updateResultGroup);

// 戻る
headerBackButton.addEventListener("click", function () {

    window.location.href = "day.html";

});

eventForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!selectedEvent) {
        return;
    }

    selectedEvent.oshiId = oshiName.value;
    selectedEvent.type = eventType.value;
    selectedEvent.name = eventName.value;
    selectedEvent.date = eventDate.value;
    selectedEvent.time = eventTime.value;
    selectedEvent.resultDate = resultDate.value;
    selectedEvent.resultTime = resultTime.value;
    selectedEvent.place = eventPlace.value;
    selectedEvent.memo = eventMemo.value;
    selectedEvent.notification = eventNotification.value;
    selectedEvent.repeat = eventRepeat.value;

    localStorage.setItem("events", JSON.stringify(events));

    localStorage.setItem("selectedDate", selectedEvent.date);

    window.location.href = "day.html";

});

deleteButton.addEventListener("click", function () {
    const result =  confirm("この予定を削除しますか？");

    if (!result) {
        return;
    }

    const newEvents = events.filter(function (event) {
        return String(event.id) !== selectedEventId;
    });

    localStorage.setItem(
        "events",
        JSON.stringify(newEvents)
    );

     window.location.href = "day.html";
});