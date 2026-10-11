const backButton =  document.querySelector(".header-back-button");
const oshiList = document.querySelector("#oshi-list");
const addButton =  document.querySelector("#add-oshi-button");


function renderOshiManagementList() {

    const oshis =
        JSON.parse(localStorage.getItem("oshis")) || [];

    oshiList.innerHTML = "";

    oshis.forEach(function (oshi) {

        const oshiItem =  document.createElement("div");
        oshiItem.classList.add("oshi-item");
        const oshiInfo =  document.createElement("div");
        oshiInfo.classList.add("oshi-info");
        const oshiImage =  document.createElement("img");
        oshiImage.classList.add("oshi-image");
        oshiImage.src =
            oshi.image || "assets/icons/default.png";

        oshiImage.alt = oshi.name;


        const oshiName =  document.createElement("p");
        oshiName.classList.add("oshi-name");
        oshiName.textContent = oshi.name;


        const arrow =  document.createElement("span");
        arrow.classList.add("arrow");
        arrow.textContent = "〉";


        oshiInfo.appendChild(oshiImage);
        oshiInfo.appendChild(oshiName);

        oshiItem.appendChild(oshiInfo);
        oshiItem.appendChild(arrow);

        oshiItem.addEventListener("click", function () {

        localStorage.setItem(
            "selectedManagementOshiId",
            oshi.id
        );

        window.location.href = "oshi-edit.html";

    });
        oshiList.appendChild(oshiItem);

    });

}
renderOshiManagementList();

addButton.addEventListener("click", function () {

    window.location.href = "add-oshi.html";

});

backButton.addEventListener("click", function () {

    window.location.href = "setting.html";

});