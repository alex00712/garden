class TelephoneMask{
    _mustBe: string
    _current = ""
    constructor(mask: string){
        this._mustBe = mask
    }

    check(phone: string){
        console.log("phone", phone)
        if(!phone){
            return this._mustBe
        }

        if(phone.length===1){
            this._current = phone
        }
        else if(phone.length < this._mustBe.length){
            this._current = this._current.slice(0, this._current.length-1)
        }
        else{
            this._current += phone.slice(this._mustBe.length)
        }

        console.log(this._current)

        let telArr: Array<string> = this._current.split('')

        if(telArr[0]==="8"){
            telArr = telArr.slice(1)
        }

        return this.replace(this._mustBe, telArr)
    }

    replace(current: string, arrOfTel: Array<any>){
        for(let i = 0; i < arrOfTel.length; i++){
            current = current.replace("_", arrOfTel[i])
        }
        return current
    }

}

export default TelephoneMask