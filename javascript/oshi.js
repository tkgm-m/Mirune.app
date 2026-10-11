console.log("JavaaScriptの読み込み成功！");

const backButton =  document.querySelector(".back-button");
const oshiNameInput =  document.querySelector("#oshi-name");
const saveOshiButton = document.querySelector(".save-oshi-button");
const oshiError = document.querySelector(".oshi-error");

function loadOshis() {

    const savedOshis =  localStorage.getItem("oshis");

    if (!savedOshis) {
        return [];
    }

    return JSON.parse(savedOshis);
}

function saveOshis(oshis) {

    localStorage.setItem(
        "oshis",
        JSON.stringify(oshis)
    );
}

saveOshiButton.addEventListener("click", function () {

    const name = oshiNameInput.value.trim();

    if (!name) {
        oshiError.textContent =
            "推しの名前を入力してください";

        return;
    }

    const oshis = loadOshis();

    const newOshi = {
        id: Date.now(),
        name: name,
        image: "assets/icons/default.png"
    };

    oshis.push(newOshi);

    saveOshis(oshis);

    localStorage.setItem(
        "selectedOshiId",
        String(newOshi.id)
    );

    window.location.href = "index.html";
});

backButton.addEventListener("click", function () {
    window.location.href = "index.html";
});