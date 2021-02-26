import consts from '../consts/consts'

async function loadImage(img: string){
    try {
        console.log(`${consts.loadImage}/${img}`)
        const response = await fetch(`${consts.loadImage}/${img}`)
        if(response.ok){
            
          }else{
            throw response
          } 
        } catch (error) {
            console.log(error)
            return ''
        } 
}