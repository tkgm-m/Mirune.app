function saveEvent(event) {

    const savedEvents =
        JSON.parse(localStorage.getItem("events")) || [];

    savedEvents.push(event);

    localStorage.setItem(
        "events",
        JSON.stringify(savedEvents)
    );

}

function loadEvents() {
    return JSON.parse(localStorage.getItem("events")) || [];
}

// 選択中の推しの予定だけ取得する
function getSelectedEvents() {

    // 全イベントを取得
    const events = loadEvents();

    // 現在選択中の推しID
    const selectedOshiId =
        localStorage.getItem("selectedOshiId");

    // 推しが選ばれていない場合
    if (!selectedOshiId) {
        return [];
    }

    // 選択中の推しだけ返す
    return events.filter(function (event) {

        return String(event.oshiId) === String(selectedOshiId);

    });

}



