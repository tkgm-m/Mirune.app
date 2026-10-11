const backButton = document.querySelector(".header-back-button");
const editForm = document.querySelector("#oshi-edit-form");
const oshiNameInput = document.querySelector("#oshi-name");
const oshiPreview = document.querySelector("#oshi-preview");
const oshiImageInput = document.querySelector("#oshi-image-input");
const deleteButton =  document.querySelector(".delete-oshi-button");
const deleteModal =  document.querySelector("#delete-modal");
const keepMemoriesButton =  document.querySelector("#keep-memories-button");
const deleteAllButton =  document.querySelector("#delete-all-button");
const cancelDeleteButton = document.querySelector("#cancel-delete-button");
const selectedOshiId = localStorage.getItem("selectedManagementOshiId");
const oshis =  JSON.parse(localStorage.getItem("oshis")) || [];

const selectedOshi =
    oshis.find(function (oshi) {
        return oshi.id === selectedOshiId;
    });


if (selectedOshi) {
    oshiNameInput.value = selectedOshi.name;

    oshiPreview.src =
        selectedOshi.image ||
        "assets/icons/default.png";
}

let selectedImageData =
    selectedOshi?.image || "";

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

editForm.addEventListener("submit", function (e) {

    e.preventDefault();

    if (!selectedOshi) {
        return;
    }

    selectedOshi.name =
        oshiNameInput.value.trim();
    
    selectedOshi.image =
        selectedImageData;

    localStorage.setItem(
        "oshis",
        JSON.stringify(oshis)
    );

    window.location.href =
        "oshi-management.html";

});

backButton.addEventListener("click", function () {

    window.location.href = "oshi-management.html";

});

deleteButton.addEventListener("click", function () {

    deleteModal.style.display = "flex";

});

cancelDeleteButton.addEventListener("click", function () {

    deleteModal.style.display = "none";

});

keepMemoriesButton.addEventListener("click", function () {

    if (!selectedOshi) {
        return;
    }

    const newOshis =
        oshis.filter(function (oshi) {
            return oshi.id !== selectedOshiId;
        });

    localStorage.setItem(
        "oshis",
        JSON.stringify(newOshis)
    );

    const events =
        JSON.parse(localStorage.getItem("events")) || [];

    events.forEach(function (event) {

        if (event.oshiId === selectedOshiId) {
            event.oshiId = "";
        }

    });

    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );

    localStorage.removeItem("selectedManagementOshiId");

    if (
        localStorage.getItem("selectedOshiId") ===
        selectedOshiId
    ) {
        localStorage.removeItem("selectedOshiId");
    }

    window.location.href = "oshi-management.html";

});

deleteAllButton.addEventListener("click", function () {

    if (!selectedOshi) {
        return;
    }

    const newOshis =
        oshis.filter(function (oshi) {
            return oshi.id !== selectedOshiId;
        });

    localStorage.setItem(
        "oshis",
        JSON.stringify(newOshis)
    );

    const events =
        JSON.parse(localStorage.getItem("events")) || [];

    const newEvents =
        events.filter(function (event) {
            return event.oshiId !== selectedOshiId;
        });

    localStorage.setItem(
        "events",
        JSON.stringify(newEvents)
    );

    const memories =
    JSON.parse(localStorage.getItem("memories")) || [];

    const newMemories =
        memories.filter(function (memory) {

            return memory.oshiId !== selectedOshiId;

        });

localStorage.setItem(
    "memories",
    JSON.stringify(newMemories)
);

    localStorage.removeItem("selectedManagementOshiId");

    if (
        localStorage.getItem("selectedOshiId") ===
        selectedOshiId
    ) {
        localStorage.removeItem("selectedOshiId");
    }

    window.location.href = "oshi-management.html";

});