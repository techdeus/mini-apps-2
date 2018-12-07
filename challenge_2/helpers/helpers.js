const genRandomColors = (number) => {
   let random = [
       [255, 99, 132, 0.2], 
       [54, 162, 235, 0.2],
       [255, 206, 86, 0.2],
       [255, 99, 132, 0.2]
   ];
   let colors = [];
   for (var i = 0; i < number; i++) {
    let ranNumber = Math.floor((Math.random() * 3) + 1);
    console.log(ranNumber);
    colors.push(`rgba(${random[ranNumber]})`);
   }
   return colors;
}

const helpers = {
    genRandomColors,
}

export default helpers;