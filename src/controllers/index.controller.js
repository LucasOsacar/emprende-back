import * as fs from 'fs';
import mongoose from 'mongoose';
import {MONGODB_URL} from '../config.js';
const Schema = mongoose.Schema;

mongoose.connect(MONGODB_URL).then(() => {
  console.log('Conexion Exitosa a la Base de Datos');
}).catch((err) => {
  console.log('Hubo un error al conectarnos a la Base de Datos', { err });
});

const taskSchema = new Schema({
  name: String,
  done: Boolean,
  //createdBy:
});

const task = mongoose.model('Task', taskSchema, 'Tareas');

export const guardar = async (req, res) => {
  const body = req.body;
  console.log(body);
  task.create({
    name: body.text,
    done: false
  }).then((createdTask) => {
    res.status(201).json({ ok: true, message: "Tarea creada con éxito", data: createdTask});
  }).catch((err) => {
    res.status(400).json({ok: false, message: "Error al crear la tarea"});
  });
};

export const actualizar = async (req, res) => {
  const body = req.body;
  //console.log(body);
  task.updateOne({ name: body.text}, {
    done: body.done
  }).then((updatedTask) => {
    res.status(201).json({ ok: true, message: "Tarea modificada con éxito", data: updatedTask});
  }).catch((err) => {
    res.status(400).json({ok: false, message: "Error al modificar la tarea"});
  });
};

export const eliminar = async (req, res) => {
  const id = req.params.id;
  //console.log(body.text);
  task.findByIdAndRemove(id).then((deletedTask) => {
    res.status(200).json({ ok: true, message: "Tarea eliminada con éxito", data: deletedTask});
  }).catch((err) => {
    res.status(400).json({ok: false, message: "Error al eliminar la tarea"});
  });
};

export const ping = async (req, res) => {
  fs.readFile('./view/ping.html', function (err, file) {
    if (err) {
      console.log(err.message);
    } else {
      res.write(file);
      res.end();
    }
  });
  return;
};

export const index = async (req, res) => {
  fs.readFile('./view/index.html', function (err, file) {
    if (err) {
      console.log(err.message);
    } else {
      res.write(file);
      res.end();
    }
  });
  return;
};

export const tasks = async (req, res) => {
  task.find().then((tasks) => {
    res.status(200).json({ok: true, data: tasks});
  }).catch((err) => {
    res.status(400).json({ok: false, message: "Error al obtener la tarea"});
  });
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