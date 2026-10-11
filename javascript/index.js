console.log("JavaScriptの読み込み成功！");

const today = new Date();

let displayYear = today.getFullYear();
let displayMonth = today.getMonth();

console.log(displayYear, displayMonth + 1);

const currentMonthElement = document.querySelector(".current-month");
const calendarDaysElement = document.querySelector(".calendar-days");
const nextEventTitle = document.querySelector(".event-title");
const nextEventCountdown = document.querySelector(".event-countdown");
const nextEventDate = document.querySelector(".event-date");
const upcomingButton = document.querySelector(".upcoming-button");
const nextEventType = document.querySelector(".event-type-label");
const nextEventPlace = document.querySelector(".event-place");
const deadlineList = document.querySelector(".deadline-list");
const deadlineToggle = document.querySelector(".deadline-toggle");
const toggleIcon = document.querySelector(".toggle-icon");

const prevMonthButton = document.querySelector(".prev-month");
const nextMonthButton = document.querySelector(".next-month");

const memorySuggestion =
    document.querySelector(".memory-suggestion");

const memorySuggestionButton =
    document.querySelector(".memory-suggestion-button");

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

function getEventTypeDisplay(type) {

    const labels = {
        live: "🎤 LIVE",
        media: "📺 MEDIA",
        stream: "📱 STREAM",
        release: "💿 RELEASE",
        anniversary: "🎂 ANNIVERSARY",
        other: "🎵 EVENT"
    };

    return labels[type] || "✨ EVENT";
}


function renderCalendar(){
    const events = getSelectedEvents();

    console.log(events);

    // 年月を表示
    currentMonthElement.textContent =
     `${displayYear}年${displayMonth + 1}月`;

    // 各月の日数
     const lastDate = new Date(
        displayYear,
        displayMonth + 1,
        0
    ).getDate();

    console.log("この月の日数：", lastDate);

    // １日の曜日
        const firstDay = new Date(
        displayYear,
        displayMonth,
        1
    ).getDay();

    console.log("1日は何曜日？", firstDay);

    //　カレンダーを空にする
    calendarDaysElement.innerHTML = "";

    // 空のボックスを作成
    for (let i = 0; i < firstDay; i++) {
        const blankDay = document.createElement("div");

        blankDay.classList.add("day");

        calendarDaysElement.appendChild(blankDay);
    }

    console.log("作った空白の数：", firstDay)

    // １からその月の最終日までを表示

    for (let date = 1; date <= lastDate; date++){
        const dayElement = document.createElement("div");
        const dayNumber = document.createElement("span");
        const dayEvents = document.createElement("div");

        dayElement.classList.add("day");
        dayNumber.classList.add("day-number");
        dayEvents.classList.add("day-events");

        dayNumber.textContent = date;

        dayElement.appendChild(dayNumber);
        dayElement.appendChild(dayEvents);

        if(
            displayYear === today.getFullYear() &&
            displayMonth === today.getMonth() &&
            date === today.getDate()
        ){
            dayElement.classList.add("today");
        }
        const monthString = String(displayMonth + 1).padStart(2, "0");
        const dayString = String(date).padStart(2, "0");
        const currentDate = `${displayYear}-${monthString}-${dayString}`;

        dayElement.addEventListener("click", function () {

            console.log("押した日付：", currentDate);

            localStorage.setItem("selectedDate", currentDate);

            window.location.href = "day.html"
        });

       const currentDateEvents = events.filter(function (event) {

    return (
        event.date === currentDate ||
        event.resultDate === currentDate
    );

});

currentDateEvents.sort(function (a, b) {

    if (!a.time && !b.time) {
        return Number(a.id) - Number(b.id);
    }

    if (!a.time) return 1;
    if (!b.time) return -1;

    const timeComparison = a.time.localeCompare(b.time);

    if (timeComparison === 0) {
        return Number(a.id) - Number(b.id);
    }

    return timeComparison;
});

const visibleEvents = currentDateEvents.slice(0, 2);

for (const event of visibleEvents) {

    const eventElement = document.createElement("div");

    eventElement.classList.add("calendar-event");

    if (event.resultDate === currentDate) {

    eventElement.textContent =
        "🎉当落 " + (event.name || "結果発表");

} else {

    eventElement.textContent =
        event.name || getEventTypeLabel(event.type);

}

    dayEvents.appendChild(eventElement);
}

if (currentDateEvents.length > 2) {

    const remainingCount = currentDateEvents.length - 2;

    const moreElement = document.createElement("div");

    moreElement.classList.add("calendar-more");

    moreElement.textContent = `＋${remainingCount}件`;

    dayEvents.appendChild(moreElement);
}

        calendarDaysElement.appendChild(dayElement);
    }

    const totalCells = firstDay + lastDate;
    const remainingCells = 42 - totalCells;

    for (let i = 0; i < remainingCells; i++) {

        const blankDay = document.createElement("div");

        blankDay.classList.add("day");

        calendarDaysElement.appendChild(blankDay);
    }
}

function renderMemorySuggestion() {

    const events =
        getSelectedEvents();

    const memories =
        JSON.parse(localStorage.getItem("memories")) || [];

    const todayStart =
        new Date();

    todayStart.setHours(0, 0, 0, 0);

    const pastEvents =
        events.filter(function (event) {

            if (!event.date) {

                return false;

            }

            if (event.type === "deadline") {

                return false;

            }

            const eventDate =
                new Date(`${event.date}T00:00:00`);

            return eventDate < todayStart;

        });

    pastEvents.sort(function (a, b) {

        return b.date.localeCompare(a.date);

    });

    const eventWithoutMemory =
        pastEvents.find(function (event) {

            return !memories.some(function (memory) {

                return String(memory.eventId) === String(event.id);

            });

        });

    if (!eventWithoutMemory) {

        memorySuggestion.hidden =
            true;

        return;

    }

    memorySuggestion.hidden =
        false;

    memorySuggestionButton.onclick =
    function () {

        localStorage.setItem(
            "memorySourceEventId",
            String(eventWithoutMemory.id)
        );

        localStorage.setItem(
            "memorySourceEventDate",
            eventWithoutMemory.date
        );

        localStorage.setItem(
            "memorySourceEventOshiId",
            eventWithoutMemory.oshiId || ""
        );

        localStorage.setItem(
            "memorySourceEventTitle",
            eventWithoutMemory.name || ""
        );

        window.location.href =
            "memory-add.html";

    };

}

function renderNextEvent() {

    const events = getSelectedEvents();

    // 今日の日付を「時刻なし」にする
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // 今日以降の予定だけを取り出す
    const upcomingEvents = events.filter(function (event) {

        if (!event.date) {
            return false;
        }

        if (event.type === "deadline") {
            return false;
        }

        const eventDate = new Date(`${event.date}T00:00:00`);

        return eventDate >= todayStart;
    });

    // 日付が近い順、同じ日なら時間が早い順に並べる
    upcomingEvents.sort(function (a, b) {

        const dateComparison = a.date.localeCompare(b.date);

        if (dateComparison !== 0) {
            return dateComparison;
        }

        if (!a.time && !b.time) {
            return Number(a.id) - Number(b.id);
        }

        if (!a.time) return 1;
        if (!b.time) return -1;

        const timeComparison = a.time.localeCompare(b.time);

        if (timeComparison === 0) {
            return Number(a.id) - Number(b.id);
        }

        return timeComparison;
    });

    // 今後の予定が1件もない場合
    if (upcomingEvents.length === 0) {

    nextEventTitle.textContent = "今後の予定はありません";
    nextEventCountdown.textContent = "";
    nextEventDate.textContent = "";
    nextEventPlace.textContent = "";
    nextEventType.textContent = "";
    upcomingButton.textContent = "今後の予定（0件）　▶";

    return;
}

    const nextEvent = upcomingEvents[0];
    nextEventType.textContent = getEventTypeDisplay(nextEvent.type);

    nextEventTitle.textContent = nextEvent.name || getEventTypeLabel(nextEvent.type);


    const eventDate = new Date(`${nextEvent.date}T00:00:00`);
    const differenceTime = eventDate - todayStart;
    const remainingDays = Math.round(differenceTime / (1000 * 60 * 60 * 24));

    if (remainingDays === 0) {
        nextEventCountdown.textContent = "今日！";
    } else if (remainingDays === 1) {
        nextEventCountdown.textContent = "明日！";
    } else {
        nextEventCountdown.textContent = `あと${remainingDays}日`;
    }

    const [year, month, day] = nextEvent.date.split("-");
    const timeText = nextEvent.time? nextEvent.time: "終日";

    nextEventDate.textContent = `${year}年${Number(month)}月${Number(day)}日　${timeText}`;
    nextEventPlace.textContent =
    nextEvent.place? `📍 ${nextEvent.place}`: "";
    upcomingButton.textContent = `今後の予定（${upcomingEvents.length}件）　▶`;
}

function renderDeadlineList() {

    const events = loadEvents();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    deadlineList.innerHTML = "";

    const deadlineEvents = events.filter(function (event) {

        if (!event.date) {
            return false;
        }

        if (event.type !== "deadline") {
            return false;
        }

        const deadlineDate = new Date(`${event.date}T00:00:00`);
        const differenceTime = deadlineDate - todayStart;

        const remainingDays = Math.round(
            differenceTime / (1000 * 60 * 60 * 24)
        );

        return remainingDays >= 0 && remainingDays <= 7;
    });

    deadlineEvents.sort(function (a, b) {

        const dateComparison = a.date.localeCompare(b.date);

        if (dateComparison !== 0) {
            return dateComparison;
        }

        if (!a.time && !b.time) {
            return Number(a.id) - Number(b.id);
        }

        if (!a.time) return 1;
        if (!b.time) return -1;

        const timeComparison = a.time.localeCompare(b.time);

        if (timeComparison === 0) {
            return Number(a.id) - Number(b.id);
        }

        return timeComparison;
    });

    if (deadlineEvents.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.textContent = "7日以内の締切はありません";
        emptyMessage.classList.add("deadline-empty");

        deadlineList.appendChild(emptyMessage);

        return;
    }

    for (const event of deadlineEvents) {

        const deadlineCard = document.createElement("div");
        const deadlineDay = document.createElement("p");
        const deadlineOshi = document.createElement("p");
        const deadlineTitle = document.createElement("p");

        deadlineCard.classList.add("deadline-card");
        deadlineDay.classList.add("deadline-day");
        deadlineOshi.classList.add("deadline-oshi");
        deadlineTitle.classList.add("deadline-title");

        const deadlineDate = new Date(`${event.date}T00:00:00`);
        const differenceTime = deadlineDate - todayStart;

        const remainingDays = Math.round(
            differenceTime / (1000 * 60 * 60 * 24)
        );

        if (remainingDays === 0) {
            deadlineDay.textContent = "今日！";
        } else if (remainingDays === 1) {
            deadlineDay.textContent = "明日！";
        } else {
            deadlineDay.textContent = `あと${remainingDays}日`;
        }

        const oshis =
    JSON.parse(localStorage.getItem("oshis")) || [];

const eventOshi =
    oshis.find(function (oshi) {
        return oshi.id === event.oshiId;
    });

deadlineOshi.textContent =
    eventOshi ? eventOshi.name : "推し未設定";

        deadlineTitle.textContent =
            event.name || getEventTypeLabel(event.type);

        deadlineCard.appendChild(deadlineDay);
        deadlineCard.appendChild(deadlineOshi);
        deadlineCard.appendChild(deadlineTitle);

        deadlineCard.addEventListener("click", function () {

            localStorage.setItem("selectedEventId", event.id);

            window.location.href = "detail.html";
        });

        deadlineList.appendChild(deadlineCard);
    }
}

deadlineToggle.addEventListener("click", function () {

    const isHidden = deadlineList.style.display === "none";

    if (isHidden) {
        deadlineList.style.display = "flex";
        toggleIcon.textContent = "▲";
        toggleIcon.setAttribute("aria-label", "締切を折りたたむ");
    } else {
        deadlineList.style.display = "none";
        toggleIcon.textContent = "▼";
        toggleIcon.setAttribute("aria-label", "締切を開く");
    }
    
});

upcomingButton.addEventListener("click", function () {
    window.location.href = "upcoming.html";
});

renderOshiList();
renderCalendar();
renderNextEvent();
renderDeadlineList();
renderMemorySuggestion();

const memoryButton =
    document.querySelector(".memory");

memoryButton.addEventListener("click", function () {

    window.location.href = "memory.html";

});

const settingButton =
    document.querySelector(".setting");

settingButton.addEventListener("click", function () {

    window.location.href = "setting.html";

});

prevMonthButton.addEventListener("click", function() {

if (displayMonth === 0) {
    displayYear--;
    displayMonth = 11;

} else {
    displayMonth--;
}

renderCalendar();
});

nextMonthButton.addEventListener("click", function() {

if (displayMonth === 11) {
    displayYear++;
    displayMonth = 0;

} else {
    displayMonth++;
}

renderCalendar();
});

function renderOshiList() {

    const oshiList =
        document.querySelector(".oshi-list");

    const addCard =
        document.querySelector(".add-card");

    // すでに表示されている推しカードを一度削除する
    document
        .querySelectorAll(".oshi-card:not(.add-card)")
        .forEach(function (card) {
            card.remove();
        });

    // 保存されている推し一覧を読み込む
    const oshis =
        JSON.parse(localStorage.getItem("oshis")) || [];

    let selectedOshiId =
        localStorage.getItem("selectedOshiId");

    // 推しが1人もいない場合
    if (oshis.length === 0) {

        localStorage.removeItem("selectedOshiId");

        return;
    }

    // 保存されている選択中の推しが、
    // 現在の推し一覧に存在するか確認する
    const selectedOshiExists =
        oshis.some(function (oshi) {
            return String(oshi.id) === String(selectedOshiId);
        });

    // 選択中の推しがいない場合は、
    // 一番最初の推しを自動選択する
    if (!selectedOshiExists) {

        selectedOshiId = oshis[0].id;

        localStorage.setItem(
            "selectedOshiId",
            selectedOshiId
        );
    }

    // 保存されている推しを1人ずつ表示する
    oshis.forEach(function (oshi) {

        const card =
            document.createElement("div");

        card.className = "oshi-card";
        card.dataset.oshiId = oshi.id;

        card.innerHTML = `
            <button class="oshi-button" type="button">
                <img
                    class="oshi-image"
                    src="${oshi.image || "assets/icons/default.png"}"
                    alt="${oshi.name}"
                >
            </button>

            <p class="oshi-name"></p>
        `;

        const nameElement =
            card.querySelector(".oshi-name");

        nameElement.textContent = oshi.name;

        // 保存されている推しなら青くする
        if (String(oshi.id) === String(selectedOshiId)) {
            nameElement.classList.add("selected");
        }

        const button =
            card.querySelector(".oshi-button");

        button.addEventListener("click", function () {

            // 一度すべての青色を消す
            document
                .querySelectorAll(".oshi-name")
                .forEach(function (name) {
                    name.classList.remove("selected");
                });

            // 押した推しだけ青くする
            nameElement.classList.add("selected");

            // 選んだ推しIDを保存する
            localStorage.setItem(
                "selectedOshiId",
                oshi.id
            );

            // ホーム画面を再表示する
            renderOshiList();
            renderCalendar();
            renderNextEvent();
            renderDeadlineList();
            renderMemorySuggestion();
        });

        // ＋追加カードより前に挿入する
        oshiList.insertBefore(card, addCard);
    });
}

const addButton = document.querySelector(".footer-button.add");

addButton.addEventListener("click", function () {
    window.location.href = "event.html";

});
const addOshiButton = document.querySelector(".add-button");

addOshiButton.addEventListener("click", function () {
    window.location.href = "add-oshi.html";
});