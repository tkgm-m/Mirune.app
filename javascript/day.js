console.log("JavaScriptの読み込み成功！");

// 要素取得
const selectedDate = localStorage.getItem("selectedDate");

// データ取得
const dayTitle = document.querySelector(".page-title");
const dayEventList = document.querySelector(".day-event-list");
const events =   getSelectedEvents();
const selectedOshiId = localStorage.getItem("selectedOshiId");

const backButton = document.querySelector(".header-back-button");

//　デバッグ
console.log("選択された日付：", selectedDate);
console.log("すべての予定：", events);

// タイトル表示
if (selectedDate) {

    const dateParts = selectedDate.split("-");

    const month = Number(dateParts[1]);
    const day = Number(dateParts[2]);

    dayTitle.textContent = `${month}月${day}日の予定`;

}

// この日の予定だけ取得
const selectedDateEvents = events.filter(function (event) {

    return event.date === selectedDate ||
           event.resultDate === selectedDate;

});

selectedDateEvents.sort(function (a, b) {

    if (!a.time && !b.time) {
        return Number(a.id) - Number(b.id);
    }
    if (!a.time) {
        return 1;
    }
    if (!b.time) {
        return -1;
    }
    const timeComparison =
        a.time.localeCompare(b.time);

    if (timeComparison === 0) {
        return Number(a.id) - Number(b.id);
    }
    return timeComparison;
});

console.log("この日の予定：", selectedDateEvents);
dayEventList.innerHTML = "";
selectedDateEvents.forEach(function (event) {
    
    const eventButton = document.createElement("button");

    eventButton.classList.add("day-event-item");
    eventButton.type = "button";

        const eventTimeText =
        document.createElement("span");

    eventTimeText.classList.add("day-event-time");

    if (event.resultDate === selectedDate) {

    eventTimeText.textContent =
        event.resultTime || "終日";

} else {

    eventTimeText.textContent =
        event.time || "終日";

}


    const eventNameText = document.createElement("span");

    eventNameText.classList.add("day-event-name");

    if (event.resultDate === selectedDate) {

    eventNameText.textContent =
        "🎉当落 " + (event.name || "結果発表");

} else {

    eventNameText.textContent =
        event.name || "予定";

}
    
    eventButton.appendChild(eventTimeText);
    eventButton.appendChild(eventNameText);


    eventButton.addEventListener("click", function () {

    const selectedEventId =
        event.originalEventId || event.id;

    localStorage.setItem(
        "selectedEventId",
        selectedEventId
    );

    window.location.href = "detail.html";

});

    dayEventList.appendChild(eventButton);

});

backButton.addEventListener("click", function () {
    window.location.href = "index.html";
});