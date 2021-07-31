const menu = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const swiper = new Swiper("#wrap", {
  loop: true,
  slidesPerView: "auto", //슬라이더 사이즈 커스텀 사이즈로
  centeredSlides: true, //슬라이더 가운데 배치
  spaceBetween: 50, //슬라이더 간격조절
  mousewheel: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
    renderBullet: function(index, className){
      return `<span class="${className}">${menu[index]}</span>`
    }
  },
  // effect: "coverflow", //effect 적용
  // coverflowEffect: {
  //   rotate: 50,
  //   stretch: -100,
  //   depth: 400,
  //   slideShadows: false
  // }
});

//Dom Caching
const bgs = document.querySelectorAll(".bg li");
const prev = document.querySelector(".swiper-button-prev");
const next = document.querySelector(".swiper-button-next");
const navi = document.querySelectorAll(".swiper-pagination span");

next.addEventListener("click", activation);
prev.addEventListener("click", activation);
window.addEventListener("mousewheel", activation);

swiper.on("slideChangeTransitionEnd", activation); //swiper 애니메이션 후 작동

for(let el of navi){
  el.addEventListener("click", e =>{ //navi의 el(li)클릭시
    //특정클래스 확인하기 classList.contains()
    //활성화된 li
    const isOn = e.currentTarget.classList.contains("swiper-pagination-bullet-active");
    if(isOn) return;
    swiper.on("slideChangeTransitionEnd", activation); //비활성화 li 클릭시 함수 시작
  })
}

function activation(){
  let item = document.querySelector(".swiper-slide-active");
  let i = item.getAttribute("data-swiper-slide-index");

  // console.log(i);

  for(let el of bgs){
    el.classList.remove("on");
  }
  bgs[i].classList.add("on");
}