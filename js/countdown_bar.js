class Bar{
    constructor(pos){
        this.pos = pos
    }

    append_html(){
        let bar = document.createElement('div');
		bar.id = this.pos;
		bar.className = "bar";

        body_el.append(bar)

        this.dom = bar
    }

    update(new_height, new_color){
        if(new_height !== null){
            this.dom.style.height = new_height
        }
        this.dom.style.backgroundColor = new_color
    }

    bar_height(seconds_remaining, amplifier, random_amplitude = 30){
        let x = range(this.pos, 0, number_of_bars - 1, -3 * Math.PI / 2, Math.PI / 2)

        let max_height = (Math.exp(-seconds_remaining/40 + 3) + 1)

        let sin_height = (Math.sin(x) + 1.1) * max_height * amplifier
        let random_height = getRandom(-1, 0) * random_amplitude

        return sin_height + random_height
    }
}

function range(val, in_min, in_max, out_min, out_max){
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function getRandom(min, max) {
    return Math.random() * (max - min +1) + min;
}
