let countdown_end = data_get_information("countdown_end")
var date_countdown_end = new Date(parseInt(countdown_end))
var message = data_get_information("countdown_message", 'str')
document.getElementById("message").innerHTML = message

var body_el = document.getElementsByTagName("body")[0]

var number_of_bars = evenify(window.innerWidth / (30 * 2))
let max_bar_height = new Bar(0).bar_height(0, 1, 0)
var amplifier = Math.ceil(window.innerHeight / max_bar_height)

function evenify(n){
    return Math.floor(n / 2) * 2
}

var bars = []
for(let i = 0; i < number_of_bars; i ++){
    let bar = new Bar(i)
    bar.append_html()
    bars.push(bar)
}

var i = 0
var hue = 0
var countdown = new Countdown(date_countdown_end, terminate_countdown)

var interval = setInterval(() => {
    time_rem = countdown.time_remaining()
    display_countdown(time_rem[0], time_rem[1])
    countdown.check()

    seconds_remaining = countdown.seconds_remaining()

    if(seconds_remaining > 3){
        bar_height = bars[i].bar_height(seconds_remaining, amplifier)
        bars[i].update(bar_height, "hsl("+hue+", 90%, 50%)")

        hue = (hue + 1/2) % 360
    } else {
        bar_height = bars[i].bar_height(seconds_remaining, amplifier, 0)
        bars[i].update(bar_height, "hsl("+hue+", 90%, 50%)")
        hue = (hue + (360 * 1.4) / number_of_bars) % 360
    }

    i = (i + 1) % number_of_bars
}, 1000/number_of_bars)


var countdown_el = document.getElementById("countdown_value")
var countdown_unit_el = document.getElementById("countdown_unit")
function display_countdown(times, units){
    times = times.slice(0, 2)
    units = units.slice(0, 2)

    var complementary_unit = ""
    if(times.length > 1){
        complementary_unit = " " + times[1] + " " + units[1]
    }

    countdown_el.innerText = times[0]
    countdown_unit_el.innerText = units[0] + complementary_unit
}


function terminate_countdown(){
    clearInterval(interval)

    for(var index in bars){
        bars[index].dom.classList.add("grow") // the outro transition
    }

    setTimeout(() => {
        window.location.assign('dashboard.html')
    }, 1000)
}
