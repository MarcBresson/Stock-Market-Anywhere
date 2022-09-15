class Indexes{
    party_index = []
    // party_index = [
    //     [time_start, time_end, is_krach],
    //     [time_start, time_end, is_krach],
    // ]

    new(set_krach = null){
        if(this.party_index.length > 0){
            if(this.ongoing() == true){
                this.end()
            }
            if(set_krach === null){
                set_krach = this.last()[2]
            }
        }
        
        this.party_index.push([Date.now(), null, set_krach])
    }

    end(){
        let last_index = this.party_index.length - 1

        this.party_index[last_index][1] = Date.now()
    }

    ongoing(){
        let last_index = this.party_index.length - 1

        return this.party_index[last_index][1] === null
    }

    is_krach(){
        let last_index = this.party_index.length - 1

        return this.party_index[last_index][2]
    }

    toggle_krach(){
        if(this.is_krach()){
            this.new(false)
        } else {
            this.new(true)
        }
    }

    last(){
        let last_index = this.party_index.length - 1
        return this.party_index[last_index]
    }

    last_non_krach_party_index(){
        let i = this.last_non_krach_index()

        return this.party_index[i]
    }

    last_non_krach_index(){
        let i = this.party_index.length - 1

        if(this.ongoing()){i --}

        while(this.party_index[i][2]){i --}

        return i
    }


}
