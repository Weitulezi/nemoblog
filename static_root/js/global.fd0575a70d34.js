$("body").hide().fadeIn(1000)

// $(".curtainButton").click(function () {
//     const bigBoxContainer = document.querySelector(".bigBoxContainer")
//     let bigBox = `
//         <div class="bigBox">
//             <div class="link">
//                 <a href="/writing">Writing</a>
//             </div>
//             <div class="link">
//                 <a href="/comic">Comic</a>
//             </div>
//             <div class="link">
//                 <a href="/drawing">Drawing</a>
//             </div>
//             <div class="link">
//                 <a href="/about">About</a>
//             </div>
//         </div>
//     `
//     bigBoxContainer.innerHTML = bigBox
//     $(".bigBoxContainer").slideDown(1000)
//     bigBoxContainer.style.display = "flex"
//     bigBoxContainer.innerHTML += `<div class="closeBigBox">&#x2716;</div>`
//     $(".closeBigBox").fadeIn(1000)
//     $(".closeBigBox").click(function() {
//         $(".bigBoxContainer").slideUp(1000)
//         $(".closeBigBox").fadeOut(800)
//     })
// })