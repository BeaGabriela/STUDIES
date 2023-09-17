const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const bcrypt = require('bcrypt'); // require bcrypt
const saltRounds = 10; //  Data processing speed

const prisma = new PrismaClient();

const enviarEmail= async (req, res) => {
  const usuario = await prisma.Usuario.update({
      where: {
          id: Number(req.params.id)
      },
      data:{
        enviado: true
      }
      
  })

  res.status(200).json('Email enviado para usuario de id ' + usuario.id ).end()
}

const emailConfirmado = async (req, res) => {
  const usuario = await prisma.Usuario.update({
      where: {
          id: Number(req.params.id)
      },
      data:{
        enviado: false,
        confirmed: true
      }
      
  })

  res.status(200).json('Email confirmado por usuario ' + usuario.id + ' '+ usuario).end()
}

module.exports = {
  enviarEmail,
  emailConfirmado
}

// // server.js
// const express = require('express');
// const { PrismaClient } = require('@prisma/client');
// // const nodemailer = require('nodemailer');

// const prisma = new PrismaClient();
// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());

// // Rota para enviar um email de confirmação
// app.post('/enviar-email', async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await prisma.user.create({
//       data: {
//         email,
//       },
//     });

//     // Configurar o transporte do nodemailer
//     // const transporter = nodemailer.createTransport({
//       // Configurações de transporte de email (Gmail, SMTP, etc.)
//     // });

//     // Configurar o email de confirmação
//     const mailOptions = {
//       from: 'seu-email@gmail.com', // Seu email
//       to: email, // Email do destinatário
//       subject: 'Confirme seu email',
//       text: `Clique no link a seguir para confirmar seu email: http://seusite.com/confirmar/${user.id}`,
//     };

//     // Enviar o email
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error(error);
//         res.status(500).send('Erro ao enviar o email de confirmação');
//       } else {
//         console.log('Email de confirmação enviado: ' + info.response);
//         res.status(200).send('Email de confirmação enviado');
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Erro ao criar o usuário');
//   }
// });

// app.listen(port, () => {
//   console.log(`Servidor rodando na porta ${port}`);
// });
