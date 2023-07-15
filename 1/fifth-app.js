arr = ['a', 'b', 'c', 'd', 'e']

for (let element of arr) {
    console.log(printLetters(element))
}

async function printLetters(elem){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(elem);
        },1000)
    })
}