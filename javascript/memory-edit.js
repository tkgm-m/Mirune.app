const backButton =  document.querySelector(".header-back-button");
const dateInput = document.querySelector("#memory-date");
const oshiSelect =  document.querySelector("#memory-oshi");
const titleInput =  document.querySelector("#memory-title");
const textInput =  document.querySelector("#memory-text");
const saveButton =  document.querySelector("#save-button");
const selectedMemoryId =  localStorage.getItem("selectedMemoryId");
const imageInput = document.querySelector("#memory-image");
const imagePreview =  document.querySelector("#image-preview");
const imagePreviewArea =  document.querySelector("#image-preview-area");
const deleteImageButton =  document.querySelector("#delete-image-button");
const memories =  JSON.parse(localStorage.getItem("memories")) || [];
const oshis =  JSON.parse(localStorage.getItem("oshis")) || [];

const selectedMemory =
    memories.find(function (memory) {

        return memory.id === selectedMemoryId;

    });

let selectedImageData =
    selectedMemory
        ? selectedMemory.image || ""
        : "";

oshis.forEach(function (oshi) {

    const option = document.createElement("option");

    option.value =
        oshi.id;

    option.textContent =
        oshi.name;

    oshiSelect.appendChild(option);

});

if (selectedMemory) {

    dateInput.value =
        selectedMemory.date;

    oshiSelect.value =
        selectedMemory.oshiId;

    titleInput.value =
        selectedMemory.title;

    textInput.value =
        selectedMemory.text;

    if (selectedMemory.image) {

    imagePreview.src =
        selectedMemory.image;

    imagePreviewArea.hidden =
        false;

}

}

imageInput.addEventListener(
    "change",
    function () {

        const file =  imageInput.files[0];

        if (!file) {

            return;

        }

        const reader = new FileReader();

        reader.onload =
            function () {

                selectedImageData =
                    reader.result;

                imagePreview.src =
                    selectedImageData;

                imagePreviewArea.hidden =
                    false;

            };

        reader.readAsDataURL(file);

    }
);

deleteImageButton.addEventListener(
    "click",
    function () {

        const result = confirm("写真を削除しますか？");

        if (!result) {

            return;

        }

        selectedImageData = "";

        imageInput.value = "";

        imagePreview.src = "";

        imagePreviewArea.hidden = true;

    }
);

backButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "memory-detail.html";

    }
);

saveButton.addEventListener(
    "click",
    function () {

        if (!selectedMemory) {

            alert("思い出が見つかりません");

            return;

        }

        const date = dateInput.value;
        const oshiId =   oshiSelect.value;
        const title = titleInput.value.trim();
        const text = textInput.value.trim();

        if (!date) {

            alert("日付を入力してください");

            return;

        }

        if (!oshiId) {

            alert("推しを選択してください");

            return;

        }

        if (!text) {

            alert("本文を入力してください");

            return;

        }

        selectedMemory.date =
            date;

        selectedMemory.oshiId =
            oshiId;

        selectedMemory.title =
            title;

        selectedMemory.text =
            text;
        
        selectedMemory.image =
    selectedImageData;

        localStorage.setItem(
            "memories",
            JSON.stringify(memories)
        );

        window.location.href =
            "memory-detail.html";

    }
);