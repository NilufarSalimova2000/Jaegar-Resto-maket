import { tabget, menuget, singleData } from "./service.js";

const tabList = document.querySelector(".tab");
const menuList = document.querySelector(".menu_list");
const btn = document.getElementsByClassName("btn");
const SaveBlock = document.querySelector(".cart_block");

// Tablarni render qilish
const renderTab = async () => {
    const data = await tabget();
    tabList.innerHTML = data?.map((item) => (
        `<button data-path="${item.path}" class="font-semibold btn text-[14px] leading-[140%] text-[#fff]">${item.name}</button>`
    )).join("");

    if (data && data.length > 0) {
        renderMenu(data[0].path); // Boshlang'ich menyuni render qilish
        btn[0].style.color = "#EA7C69"; // Birinchi tabni faol rangda qilish
        btn[0].style.borderBottom = "2px solid #EA7C69"; // Birinchi tabga border qo'yish
    }
};
renderTab();

// Saqlangan ma'lumotlarni o'chirish funksiyasi
const deleteItem = (id) => {
    let savedData = JSON.parse(localStorage.getItem("num")) || [];
    savedData = savedData.filter(item => item.id != id); // LocalStorage'dan elementni o'chirish
    localStorage.setItem("num", JSON.stringify(savedData)); // Yangi ma'lumotlarni saqlash
    saveFood(); // Ekranni yangilash
};

// Saqlangan ma'lumotlarni render qilish
const saveFood = () => {
    const savedData = JSON.parse(localStorage.getItem("num")) || [];
    SaveBlock.innerHTML = savedData?.map(item => 
    `<div class="mb-[24px] flex items-center justify-between">
        <img class="w-[40px] h-[40px] rounded-[50%]" src="${item.img}" alt="">
        <div><h3 class="font-medium text-[14px] leading-[130%] text-[#fff] mb-[4px]">${item.title}</h3>
        <p class="font-normal text-[14px] leading-[140%] text-[#ABBBC2]">${item.price} $</p></div>
        <button data-id="${item.id}" class="bg-transparent border border-[1px] border-[#FF7CA3] flex items-center justify-center w-[48px] h-[48px] py-[5px] rounded-[8px] btn_delete"><img src="./img/Trash.svg" alt="icon"></button>
    </div>`
    ).join("");
};

// Saqlash funksiyasi
const save = (data) => {
    const oldData = JSON.parse(localStorage.getItem("num")) || [];
    localStorage.setItem("num", JSON.stringify([data, ...oldData]));
    saveFood();
};

// Menu render qilish funksiyasi
const renderMenu = async (path) => {
    const data = await menuget(path);
    menuList.innerHTML = data?.map((item) => (
    `<li class="rounded-[16px] bg-[#1F1D2B] text-center pb-[24px] px[24px] pt-[114px] relative">
        <img class="w-[132px] h-[132px] rounded-[50%] absolute top-0 left-[50%] translate-y-[-25%] translate-x-[-50%]" src="${item.img}" alt="">
        <div class="w-[144px] mx-auto">
            <h3 class="font-medium text-[14px] leading-[130%] text-[#fff] mb-[8px]">${item.title}</h3>
            <p class="font-normal text-[14px] leading-[140%] text-[#fff] mb-[4px]">${item.price} $</p>
            <p class="font-normal text-[14px] leading-[140%] text-[#ABBBC2] mb-[8px]">${item.text}</p>
            <button data-add="${item.id}" data-path="${path}" class="bg-[#EA7C69] font-normal text-[14px] leading-[140%] text-[#fff] w-[70px] py-[5px] rounded-[4px] btn_add">Add</button>
        </div>
    </li>`
    )).join("");

    saveFood();
};

// Element qo'shish funksiyasi
menuList.addEventListener("click", async (e) => {
    const dataId = e.target.dataset.add;
    const Path = e.target.dataset.path;
    if (dataId) {
        const data = await singleData(Path, dataId);
        save(data);
    }
});

// Tab o'zgartirish funksiyasi
tabList.addEventListener("click", (e) => {
    if (e.target.dataset.path) {
        renderMenu(e.target.dataset.path);
        for (let i of btn) {
            i.style.color = "";
            i.style.borderBottom = "";
        }
        e.target.style.color = "#EA7C69";
        e.target.style.borderBottom = "2px solid #EA7C69";
    }
});

// Delete tugmasi bosilganda o'chirish
SaveBlock.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (id) {
        deleteItem(id); // Mahsulotni o'chirish funksiyasini chaqirish
    }
});

