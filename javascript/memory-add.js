console.log("思い出追加画面のJavaScript読み込み成功！");

const backButton = document.querySelector(".header-back-button");
const memoryAddForm = document.querySelector("#memory-add-form");
const memoryDateInput = document.querySelector("#memory-date");
const memoryOshiSelect =  document.querySelector("#memory-oshi");
const memoryTitleInput =  document.querySelector("#memory-title");
const memoryTextInput =  document.querySelector("#memory-text");
const imageInput = document.querySelector("#memory-image");
const imagePreview =  document.querySelector("#image-preview");
const imagePreviewArea =  document.querySelector("#image-preview-area");

    let selectedImageData = "";


backButton.addEventListener("click", function () {

    window.location.href = "memory.html";

});


function setToday() {

    if (memoryDateInput.value) {

        return;

    }

    const today = new Date();
    const year = today.getFullYear();
    const month =
        String(today.getMonth() + 1)
            .padStart(2, "0");
    const day =
        String(today.getDate())
            .padStart(2, "0");

    memoryDateInput.value =
        `${year}-${month}-${day}`;

}

const sourceEventId = localStorage.getItem(
        "memorySourceEventId"
    );

const sourceEventDate = localStorage.getItem(
        "memorySourceEventDate"
    );

const sourceEventOshiId =  localStorage.getItem(
        "memorySourceEventOshiId"
    );

const sourceEventTitle = localStorage.getItem(
        "memorySourceEventTitle"
    );


function renderOshiOptions() {

    const oshis =
        JSON.parse(localStorage.getItem("oshis")) || [];

    const selectedOshiId =
        localStorage.getItem("selectedOshiId");

    memoryOshiSelect.innerHTML = "";

    if (oshis.length === 0) {

        const option = document.createElement("option");

        option.value = "";
        option.textContent = "推しが登録されていません";

        memoryOshiSelect.appendChild(option);
        memoryOshiSelect.disabled = true;

        return;
    }

    oshis.forEach(function (oshi) {

        const option =  document.createElement("option");

        option.value = oshi.id;
        option.textContent = oshi.name;

        if (oshi.id === selectedOshiId) {
            option.selected = true;
        }

        memoryOshiSelect.appendChild(option);

    });

}

renderOshiOptions();

if (sourceEventDate) {

    memoryDateInput.value =
        sourceEventDate;

} else {

    setToday();

}

if (sourceEventOshiId) {

    memoryOshiSelect.value =
        sourceEventOshiId;

}

if (sourceEventTitle) {

    memoryTitleInput.value =
        sourceEventTitle;

}

localStorage.removeItem(
    "memorySourceEventDate"
);

localStorage.removeItem(
    "memorySourceEventOshiId"
);

localStorage.removeItem(
    "memorySourceEventTitle"
);

memoryAddForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const memoryText =  memoryTextInput.value.trim();

    if (!memoryText) {
        return;
    }

    const memories =
        JSON.parse(localStorage.getItem("memories")) || [];

    const newMemory = {
    id: `memory-${Date.now()}`,
    date: memoryDateInput.value,
    oshiId: memoryOshiSelect.value,
    title: memoryTitleInput.value.trim(),
    text: memoryText,
    favorite: false,
    image: selectedImageData,
    eventId: sourceEventId || ""
};
console.log(newMemory);
    memories.push(newMemory);

    localStorage.setItem(
        "memories",
        JSON.stringify(memories)
    );

    window.location.href = "memory.html";

});

imageInput.addEventListener(
    "change",
    function () {

        const file = imageInput.files[0];

        if (!file) {

            selectedImageData = "";

            imagePreview.src = "";

            imagePreviewArea.hidden = true;

            return;

        }

        const reader =  new FileReader();

        reader.addEventListener(
            "load",
            function () {

                selectedImageData =
                    reader.result;

                imagePreview.src =
                    selectedImageData;

                imagePreviewArea.hidden =
                    false;

            }
        );

        reader.readAsDataURL(file);

    }
);