console.log("JavaScriptの読み込み成功！");

const today = new Date();

let displayYear = today.getFullYear();
let displayMonth = today.getMonth();

console.log(displayYear, displayMonth + 1);

const currentMonthElement =  document.querySelector(".current-month");
const calendarDaysElement =  document.querySelector(".calendar-days");
const prevMonthButton =  document.querySelector(".prev-month");
const nextMonthButton =  document.querySelector(".next-month");


function getEventTypeLabel(type) {

    const labels = {
        live: "ライブ",
        media: "メディア",
        stream: "配信",
        release: "CD・グッズ発売",
        deadline: "応募締切",
        anniversary: "記念日・誕生日",
        other: "その他"
    };

    return labels[type] || "予定";

}


function renderCalendar() {

    const events = getSelectedEvents();

    console.log(events);

    // 年月を表示
    currentMonthElement.textContent =
        `${displayYear}年${displayMonth + 1}月`;

    // この月の日数
    const lastDate = new Date(
        displayYear,
        displayMonth + 1,
        0
    ).getDate();

    console.log("この月の日数：", lastDate);

    // 1日の曜日
    const firstDay = new Date(
        displayYear,
        displayMonth,
        1
    ).getDay();

    console.log("1日は何曜日？", firstDay);

    // カレンダーを空にする
    calendarDaysElement.innerHTML = "";

    // 月初めの空白を作る
    for (let i = 0; i < firstDay; i++) {

        const blankDay = document.createElement("div");

        blankDay.classList.add("day");

        calendarDaysElement.appendChild(blankDay);

    }

    console.log("作った空白の数：", firstDay);

    // 1日から月末まで作る
    for (let date = 1; date <= lastDate; date++) {

        const dayElement =  document.createElement("div");
        const dayNumber =  document.createElement("span");
        const dayEvents = document.createElement("div");

        dayElement.classList.add("day");
        dayNumber.classList.add("day-number");
        dayEvents.classList.add("day-events");

        dayNumber.textContent = date;

        dayElement.appendChild(dayNumber);
        dayElement.appendChild(dayEvents);

        // 今日の日付にクラスを付ける
        if (
            displayYear === today.getFullYear() &&
            displayMonth === today.getMonth() &&
            date === today.getDate()
        ) {
            dayElement.classList.add("today");
        }

        // YYYY-MM-DD形式の日付を作る
        const monthString = String(displayMonth + 1).padStart(2, "0");
        const dayString = String(date).padStart(2, "0");
        const currentDate =
            `${displayYear}-${monthString}-${dayString}`;

        // 日付を押したとき
        dayElement.addEventListener("click", function () {

            console.log("押した日付：", currentDate);

            localStorage.setItem(
                "selectedDate",
                currentDate
            );

            window.location.href = "day.html";

        });

        // この日の予定だけ取得
        const currentDateEvents = events.filter(function (event) {

        return event.date === currentDate ||
            event.resultDate === currentDate;

    });
    console.log(
    currentDate,
    currentDateEvents
);

        // 時間順に並べる
        currentDateEvents.sort(function (a, b) {

            // 両方とも時間なし
            if (!a.time && !b.time) {
                return Number(a.id) - Number(b.id);
            }

            // aだけ時間なしなら後ろ
            if (!a.time) {
                return 1;
            }

            // bだけ時間なしなら後ろ
            if (!b.time) {
                return -1;
            }

            // 両方に時間がある場合
            const timeComparison =  a.time.localeCompare(b.time);

            // 同じ時間なら登録順
            if (timeComparison === 0) {
                return Number(a.id) - Number(b.id);
            }

            return timeComparison;

        });

        // 最初の2件だけ取得
        const visibleEvents =  currentDateEvents.slice(0, 2);

        // 予定を2件まで表示
        for (const event of visibleEvents) {

    const eventElement =
        document.createElement("div");

    eventElement.classList.add("calendar-event");

    let eventText = "";

    if (event.resultDate === currentDate) {

        eventText = "🎉当落 " + event.name;

    } else {

        eventText =
            event.name ||
            getEventTypeLabel(event.type);

    }

    eventElement.textContent = eventText;

    dayEvents.appendChild(eventElement);

}

        // 3件以上ある場合は残り件数を表示
        if (currentDateEvents.length > 2) {

            const remainingCount =  currentDateEvents.length - 2;
            const moreElement =  document.createElement("div");

            moreElement.classList.add(
                "calendar-more"
            );

            moreElement.textContent =
                `＋${remainingCount}`;

            dayEvents.appendChild(moreElement);

        }

        calendarDaysElement.appendChild(dayElement);

    }

}


renderCalendar();


prevMonthButton.addEventListener("click", function () {

    if (displayMonth === 0) {

        displayYear--;
        displayMonth = 11;

    } else {

        displayMonth--;

    }

    renderCalendar();

});


nextMonthButton.addEventListener("click", function () {

    if (displayMonth === 11) {

        displayYear++;
        displayMonth = 0;

    } else {

        displayMonth++;

    }

    renderCalendar();

});


const oshiButton =  document.querySelector(".oshi-button");
const oshiName =  document.querySelector(".oshi-name");

oshiButton.addEventListener("click", function () {

    console.log("推しが押されました！");

    oshiName.classList.add("selected");

});


const addButton =  document.querySelector(".footer-button.add");

addButton.addEventListener("click", function () {

    window.location.href = "event.html";
});

function getSelectedCalendarEvents() {

    const events = getCalendarEvents();

    const selectedOshiId =
        localStorage.getItem("selectedOshiId");

    if (!selectedOshiId) {
        return [];
    }

    return events.filter(function (event) {

        return (
            String(event.oshiId) ===
            String(selectedOshiId)
        );

    });

}