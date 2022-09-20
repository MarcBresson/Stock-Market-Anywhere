class Countdown{
    constructor(datetime, onFinish = ()=>{}){
        this.datetime = datetime

        if(typeof onFinish == "function"){
            this.onFinish = onFinish
        } else {
            throw 'onFinish must be a function'
        }
    }

    check(){
        if(this.seconds_remaining() <= 0){
            this.onFinish()
            return true
        }
        return false
    }

    seconds_remaining(){
        return Math.ceil((this.datetime - Date.now()) / 1000)
    }

    time_remaining(){
        let seconds = this.seconds_remaining()

        if(seconds < 0){
            var rounder = Math.ceil
        } else {
            var rounder = Math.floor
        }

        let units = ["week", "days", "h", "min", "s"]
        let limit_units = [7, 24, 60, 60, 1]
        const reducer = (accumulator, curr) => accumulator * curr;

        let time = []
        for(let i=0; i < units.length ; i++){ // at least the seconds must be returned
            let divisor = limit_units.slice(i).reduce(reducer)
            let value = rounder(seconds / divisor)
            seconds = seconds - value * divisor

            time.push(value)
        }

        return this.clean_time(time, units)
    }

    clean_time(time, units){
        time = time.reverse()
    
        while (time[time.length - 1] == 0 && time.length > 1) {
            time.pop()
        }
    
        return [time.reverse(), units.slice(-time.length)]
    }
    
}

class Minuterie{
    constructor(period, onValid = ()=>{}){
        this.period = period

        this.next_check = 0

        if(typeof onValid == "function"){
            this.onValid = onValid
        } else {
            throw 'onValid must be a function'
        }
    }

    check(){
        if(this.seconds_remaining() <= 0){
            this.reset()
            this.onValid()
            return true
        }
        return false
    }

    reset(){
        this.next_check = Date.now() + this.period * 1000
    }

    seconds_remaining(){
        return Math.ceil((this.next_check - Date.now()) / 1000)
    }
}
