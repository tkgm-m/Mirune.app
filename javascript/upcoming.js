console.log("JavaScriptの読み込み成功！");

const upcomingList = document.querySelector(".upcoming-list");
const backButton = document.querySelector(".header-back-button");

function getEventTypeDisplay(type) {
    const labels = {
        live: "🎤 LIVE",
        media: "📺 MEDIA",
        stream: "🎥 STREAM",
        release: "💿 RELEASE",
        anniversary: "🎂 ANNIVERSARY",
        other: "✨ EVENT"
    };
    return labels[type] || "✨ EVENT";
}

function createUpcomingCard(event, todayStart) {

    const card = document.createElement("div");
    const typeLabel = document.createElement("p");
    const title = document.createElement("p");
    const countdown = document.createElement("p");
    const date = document.createElement("p");
    const place = document.createElement("p");

    card.classList.add("upcoming-card");
    typeLabel.classList.add("upcoming-event-type");
    title.classList.add("upcoming-event-title");
    countdown.classList.add("upcoming-countdown");
    date.classList.add("upcoming-event-date");
    place.classList.add("upcoming-event-place");

    typeLabel.textContent = getEventTypeDisplay(event.type);
    title.textContent = event.name || "予定";

    const eventDate = new Date(`${event.date}T00:00:00`);
    const differenceTime = eventDate - todayStart;

    const remainingDays = Math.round(
        differenceTime / (1000 * 60 * 60 * 24)
    );

    if (remainingDays === 0) {
        countdown.textContent = "今日";
    } else if (remainingDays === 1) {
        countdown.textContent = "明日";
    } else {
        countdown.textContent = `あと${remainingDays}日`;
    }

    const [year, month, day] = event.date.split("-");

    const dateObject = new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
    );

    const weekdays = [
        "日",
        "月",
        "火",
        "水",
        "木",
        "金",
        "土"
    ];

    const weekday = weekdays[dateObject.getDay()];
    const timeText = event.time ? event.time : "終日";

    date.textContent =
        `📅 ${Number(month)}/${Number(day)}(${weekday}) ${timeText}`;

    if (event.place) {
        place.textContent = `📍 ${event.place}`;
    } else {
        place.textContent = "";
    }

    card.appendChild(typeLabel);
    card.appendChild(title);
    card.appendChild(countdown);
    card.appendChild(date);
    card.appendChild(place);

    return card;
}

function renderUpcomingEvents() {
    const events = getSelectedEvents();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    upcomingList.innerHTML = "";

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

    if (upcomingEvents.length === 0) {
        const emptyMessage = document.createElement("p");

        emptyMessage.classList.add("upcoming-empty");
        emptyMessage.textContent = "今後の予定はありません";

        upcomingList.appendChild(emptyMessage);
        return;
    }

    let currentMonthKey = "";

    for (const event of upcomingEvents) {

        const [year, month] = event.date.split("-");

        const monthKey = `${year}-${month}`;

        if (monthKey !== currentMonthKey) {

            const monthTitle = document.createElement("h2");

            monthTitle.classList.add(
                "upcoming-month-title"
            );

            monthTitle.textContent =
                `${year}年${Number(month)}月`;

            upcomingList.appendChild(monthTitle);

            currentMonthKey = monthKey;
        }

        const card = createUpcomingCard(
            event,
            todayStart
        );

        upcomingList.appendChild(card);
    }
}

backButton.addEventListener("click", function () {
    window.location.href = "index.html";
});

renderUpcomingEvents();