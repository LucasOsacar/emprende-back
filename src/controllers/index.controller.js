import * as fs from 'fs';

export const ping = async (req, res) => {   
    fs.readFile('./view/ping.html', function(err, file) {
      if (err) {
        console.log(err.message);
      } else {
        res.write(file);
        res.end();
      }
    });
    return;
};

// export const style = async (req, res) => {
//   fs.readFile('./styles/styles.css', function(err, file) {
//     if (err) {
//       console.log(err.message);
//     } else {
//       res.write(file);
//       res.end();
//     }
//   });
//   return;
// };

// export const fondo = async (req, res) => {
//   fs.readFile('./img/fondo.jpg', function(err, file) {
//     if (err) {
//       console.log(err.message);
//     } else {
//       res.write(file);
//       res.end();
//     }
//   });
//   return;
// };

// export const favicon = async (req, res) => {
//   fs.readFile('./img/favicon.png', function(err, file) {
//     if (err) {
//       console.log(err.message);
//     } else {
//       res.write(file);
//       res.end();
//     }
//   });
//   return;
// };