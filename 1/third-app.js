const hobbies = ['apple', 'oranges' , ' ', 'mango', ' ' , 'lemon'];
console.log(hobbies.map( hobby =>{
    if (hobby === ' ') return 'empty string'
    return hobby
}))

