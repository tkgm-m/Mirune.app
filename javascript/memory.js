console.log("JavaScript読み込み成功！");

const backButton = document.querySelector(".header-back-button");
const addMemoryButton =  document.querySelector(".add-memory-button");
const memoryList =  document.querySelector(".memory-list");

backButton.addEventListener("click", function () {

    window.location.href = "index.html";

});

addMemoryButton.addEventListener("click", function () {

    window.location.href = "memory-add.html";

});

function renderMemoryList() {

    const memories =
        JSON.parse(localStorage.getItem("memories")) || [];

    const oshis =
        JSON.parse(localStorage.getItem("oshis")) || [];

    memoryList.innerHTML = "";

    if (memories.length === 0) {

    const emptyArea =
        document.createElement("div");

    emptyArea.className =
        "memory-empty";

    emptyArea.innerHTML = `
        <div class="memory-empty-icon">
            ♡
        </div>

        <h2 class="memory-empty-title">
            まだ思い出はありません
        </h2>

        <p class="memory-empty-text">
            ライブやイベントで感じたことを<br>
            思い出として残してみましょう
        </p>

        <button
            class="memory-empty-button"
            type="button"
        >
            思い出を登録する
        </button>
    `;

    const emptyButton =
        emptyArea.querySelector(
            ".memory-empty-button"
        );

    emptyButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "memory-add.html";

        }
    );

    memoryList.appendChild(emptyArea);

    return;
}

    memories.sort(function (a, b) {

        return b.date.localeCompare(a.date);

    });

    memories.forEach(function (memory) {

        const card = document.createElement("div");

        card.className =
            "memory-card";

        const oshi =
            oshis.find(function (item) {
                return item.id === memory.oshiId;
            });

        const oshiName =
            oshi ? oshi.name : "推し未設定";

        card.innerHTML = `
            <p class="memory-date">
                ${memory.date}
            </p>

            <p class="memory-oshi">
                ${oshiName}
            </p>

            <h3 class="memory-title">
                ${memory.title || "タイトルなし"}
            </h3>

            <p class="memory-text">
                ${memory.text}
            </p>
        `;

        card.addEventListener("click",function(){

    localStorage.setItem(
        "selectedMemoryId",
        memory.id
    );

    window.location.href =
        "memory-detail.html";

});
        memoryList.appendChild(card);

    });

}
renderMemoryList();