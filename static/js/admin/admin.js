const adminLogout = document.getElementById("adminLogout")
adminLogout.addEventListener("click", (e) => {
    e.preventDefault()
    let adminLogoutBox = document.querySelector(".adminLogoutBox")
    let box = `
        <div class="logoutConfirm">
            <h3>Are you sure?</h3>
            <div class="logoutAction">
                <a id="yesLogoutAdmin" href="/logout">Yes</a>
                <a class="logoutNo" href="">No</a>
            </div>
        </div>
    `
    adminLogoutBox.innerHTML += box
    adminLogoutBox.style.display = "flex"
    let yesLogout = document.getElementById("yesLogoutAdmin")
    yesLogout.focus()
    
    // Else Cancel Logout
    let cancelLogout = document.querySelector(".logoutNo")
    cancelLogout.addEventListener("click", (e) => {
        e.preventDefault()
        adminLogoutBox.style.display = "none"
        adminLogoutBox.innerHTML = ""
    })
})