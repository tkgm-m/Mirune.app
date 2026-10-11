const editButton = document.querySelector(".edit-button");

editButton.addEventListener(
    "click",
    function(){

        window.location.href =
            "memory-edit.html";

    }
);

const deleteButton =  document.querySelector(".delete-button");

deleteButton.addEventListener(
    "click",
    function () {

        if (!selectedMemory) {

            alert("思い出が見つかりません");

            return;

        }

        const result =  confirm("この思い出を削除しますか？");

        if (!result) {

            return;

        }

        const updatedMemories =
            memories.filter(function (memory) {

                return memory.id !== selectedMemoryId;

            });

        localStorage.setItem(
            "memories",
            JSON.stringify(updatedMemories)
        );

        localStorage.removeItem(
            "selectedMemoryId"
        );

        window.location.href =
            "memory.html";

    }
);

const memoryDate =  document.querySelector(".memory-date");
const memoryOshi = document.querySelector(".memory-oshi");
const memoryTitle =  document.querySelector(".memory-title");
const memoryText =  document.querySelector(".memory-text");
const memoryImage =  document.querySelector(".memory-image");
const selectedMemoryId =  localStorage.getItem("selectedMemoryId");
const memories = JSON.parse(localStorage.getItem("memories")) || [];
const oshis =  JSON.parse(localStorage.getItem("oshis")) || [];
const selectedMemory =
    memories.find(function (memory) {

        return memory.id === selectedMemoryId;

    });

const backButton =  document.querySelector(".header-back-button");

    if (selectedMemory) {

    memoryDate.textContent =
        selectedMemory.date;

    const selectedOshi =
        oshis.find(function (oshi) {

            return oshi.id === selectedMemory.oshiId;
            

        });

    memoryOshi.textContent =
        selectedOshi
            ? selectedOshi.name
            : "推し未設定";

    memoryTitle.textContent =
        selectedMemory.title || "タイトルなし";

    memoryText.textContent =
        selectedMemory.text;

    if (selectedMemory.image) {

    memoryImage.src =
        selectedMemory.image;

    memoryImage.hidden =
        false;

}

}
backButton.addEventListener("click",function(){

    window.location.href =
        "memory.html";

});

