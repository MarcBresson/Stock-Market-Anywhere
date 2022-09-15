what_to_do_with_data = document.getElementById("what_to_do_with_data")
start_the_party = document.getElementById("start_the_party")
stock_market = document.getElementById("stock_market")
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

document.getElementById("reset").addEventListener("click", () => {
    go_to_start()
})

document.getElementById("starts_now").addEventListener("click", () => {
    go_to_stock_market()
})
