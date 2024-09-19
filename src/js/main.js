import { tabget, menuget } from "./service.js";

const tabList = document.querySelector(".tab");
const menuList = document.querySelector(".menu_list");
const btn = document.getElementsByClassName("btn");

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

const renderMenu = async (path) => {
    const data = await menuget(path);
    menuList.innerHTML = data?.map((item) => (
    `<li class="rounded-[16px] bg-[#1F1D2B] text-center pb-[24px] px[24px] pt-[114px] relative">
    <img class="w-[132px] h-[132px] rounded-[50%] absolute top-0 left-[50%] translate-y-[-25%] translate-x-[-50%]" src="${item.img}" alt="imag">
    <div class="w-[144px] mx-auto"><h3 class="font-medium text-[14px] leading-[130%] text-[#fff] mb-[8px]">${item.title}</h3>
    <p class="font-normal text-[14px] leading-[140%] text-[#fff] mb-[4px]">${item.price}</p>
    <p class="font-normal text-[14px] leading-[140%] text-[#ABBBC2]">${item.text}</p></div>
    </li>`
    )).join("");
};


tabList.addEventListener("click", (e) => {
    if(e.target.dataset.path){
        renderMenu(e.target.dataset.path);
        for(let i of btn){
            i.style.color = "";
            i.style.borderBottom = "";
        }
        e.target.style.color = "#EA7C69";
        e.target.style.borderBottom = "2px solid #EA7C69";
    }
});


