console.log("推し追加画面のJavaScript読み込み成功！");

const addOshiForm = document.querySelector(".add-oshi-form");
const oshiNameInput = document.querySelector("#oshi-name");
const oshiPreview = document.querySelector("#oshi-preview");
const oshiImageInput = document.querySelector("#oshi-image-input");

let selectedImageData = "";

oshiImageInput.addEventListener("change", function () {

    const file = oshiImageInput.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.addEventListener("load", function () {

        selectedImageData =
            reader.result;

        oshiPreview.src =
            selectedImageData;

    });

    reader.readAsDataURL(file);

});

const backButton = document.querySelector(".header-back-button");

backButton.addEventListener("click", function () {

    if (history.length > 1) {
        history.back();
    } else {
        window.location.href = "index.html";
    }

});

addOshiForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const oshiName = oshiNameInput.value.trim();

    if (!oshiName) {
        return;
    }

    const oshis =
        JSON.parse(
            localStorage.getItem("oshis")
        ) || [];

    const newOshi = {
    id: `oshi-${Date.now()}`,
    name: oshiName,
    image: selectedImageData
};

    oshis.push(newOshi);

    localStorage.setItem(
        "oshis",
        JSON.stringify(oshis)
    );

    localStorage.setItem(
        "selectedOshiId",
        newOshi.id
    );
    window.location.href = "index.html";
});