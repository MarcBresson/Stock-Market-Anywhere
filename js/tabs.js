what_to_do_with_data = document.getElementById("what_to_do_with_data")
start_the_party = document.getElementById("start_the_party")
stock_market = document.getElementById("stock_market")
scheduler = document.getElementById("scheduler")
function tabs_to_display(){
    if(has_data()){
        what_to_do_with_data.style.display = "flex"
    } else {
        start_the_party.style.display = "flex"
    }
}
tabs_to_display()

function go_to_start(){
    start_the_party.style.display = "flex"
    start_the_party.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}

function go_to_stock_market(){
    stock_market.style.display = "block"
    stock_market.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
    starts()
    setTimeout(() => {
        what_to_do_with_data.style.display = "none"
        start_the_party.style.display = "none"
    }, 1000)
}

function go_to_scheduler(){
    scheduler.style.display = "flex"
    scheduler.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}

document.getElementById("reset").addEventListener("click", () => {
    go_to_start()
})

document.getElementById("schedule_start").addEventListener("click", () => {
    go_to_scheduler()
})

document.getElementById("starts_now").addEventListener("click", () => {
    go_to_stock_market()
})

var datetime_start
var datetime_end
var message
document.getElementById("validate_schedule").addEventListener("click", () => {
    let extraction = extract_value_from_schedule()
    datetime_start = extraction[0]
    datetime_end = extraction[1]
    message = extraction[2]

    data_upload("countdown_end", datetime_start)
    data_upload("countdown_message", message)

    open_countdown()
    go_to_stock_market()
})

function extract_value_from_schedule(){
    let date_start = document.querySelector("#schedule_start input[type=date]")
    let time_start = document.querySelector("#schedule_start input[type=time]")
    let date_end = document.querySelector("#schedule_end input[type=date]")
    let time_end = document.querySelector("#schedule_end input[type=time]")

    let datetime_start = date_start.value +"T"+ time_start.value +":00"
    let datetime_end = date_end.value +"T"+ time_end.value +":00"

    if(datetime_start.length == 19){
        datetime_start = Date.parse(datetime_start)
    } else {
        datetime_start = ""
        throw 'start date field must be filled'
    }

    if(datetime_end.length != 19){
        datetime_end = Date.parse(datetime_end)
    } else {
        datetime_end = ""
    }

    let message = document.querySelector("#schedule_message input").value

    return [datetime_start, datetime_end, message]
}

function open_countdown(){
    window.open('countdown.html')
}

function open_dashboard(){
    window.open('dashboard.html')
}
