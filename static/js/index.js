function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const form = document.getElementById("contact-form")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch(`/handle_contact_form/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.success == true) {
            let msg = document.getElementById("msg")
            msg.innerHTML = data.msg
            msg.style.display = "block"
        }
        form.name.value = ""
        form.email.value = ""
        form.message.value = ""
        setInterval(function(){
             msg.innerHTML = "" 
             msg.style.display = "none"
            }, 5000);
    })
})