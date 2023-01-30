function shuffle (arr) {
    let i = 0,
        res = [],
        index
  
    while (i <= arr.length - 1) {
      index = Math.floor(Math.random() * arr.length)
  
      if (!res.includes(arr[index])) {
        res.push(arr[index])
        i++
      }
    }
  
    return res
  }