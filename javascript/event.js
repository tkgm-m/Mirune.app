console.log("JavaScriptの読み込み成功！");

// 各要素を取得

const eventForm = document.querySelector("#event-form");
const backButton = document.querySelector(".header-back-button");
const saveButton = document.querySelector(".header-save-button");
const oshiSelect = document.querySelector("#oshi-name");
const eventType = document.querySelector("#event-type");
const eventName = document.querySelector("#event-name");
const eventDate = document.querySelector("#event-date");
const eventTime = document.querySelector("#event-time");
const eventPlace = document.querySelector("#event-place");
const eventMemo = document.querySelector("#event-memo");
const eventNotification = document.querySelector("#event-notification");
const eventRepeat = document.querySelector("#event-repeat");
const resultGroup = document.querySelector(".result-group");
const resultDateInput = document.querySelector("#result-date");
const resultTimeInput = document.querySelector("#result-time");

// 保存されている推しをプルダウンに表示する
function renderOshiOptions() {

    // localStorageから推し一覧を読み込む
    const oshis =
        JSON.parse(localStorage.getItem("oshis")) || [];

    // ホームで現在選択されている推しID
    const selectedOshiId =
        localStorage.getItem("selectedOshiId");

    // 「選択してください」以外の選択肢を一度削除する
    while (oshiSelect.options.length > 1) {
        oshiSelect.remove(1);
    }

    // 保存されている推しを1人ずつ選択肢へ追加する
    oshis.forEach(function (oshi) {

        const option =  document.createElement("option");

        option.value = oshi.id;
        option.textContent = oshi.name;

        // ホームで選択中の推しを最初から選んでおく
        if (oshi.id === selectedOshiId) {
            option.selected = true;
        }

        oshiSelect.appendChild(option);
    });
}

//　画面遷移（戻る）

backButton.addEventListener("click", function () {
    window.location.href = "index.html";
});

renderOshiOptions();
// 初期設定
updateResultDateVisibility();

eventType.addEventListener("change", function () {

    updateResultDateVisibility();

});

function updateResultDateVisibility() {

    if (eventType.value === "deadline") {

        resultGroup.style.display = "flex";

    } else {

        resultGroup.style.display = "none";

    }

}

//　画面遷移（保存）

eventForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const oshiId = oshiSelect.value;
    const type = eventType.value;
    const name = eventName.value;
    const date = eventDate.value;
    const time = eventTime.value;
    const resultDate = resultDateInput.value;
    const resultTime = resultTimeInput.value;
    const place = eventPlace.value;
    const memo = eventMemo.value;
    const notification = eventNotification.value;
    const repeat = eventRepeat.value;

     const event = {
        id: Date.now(),
        oshiId: oshiId,
        type: type,
        name: name,
        date: date,
        time: time,
        place: place,
        memo: memo,
        notification: notification,
        repeat: repeat,
        resultDate: resultDate,
        resultTime: resultTime
    };

    saveEvent(event);
    window.location.href = "index.html";

});
