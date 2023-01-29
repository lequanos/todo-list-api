import nodemailer from 'nodemailer';

export default {
  async sendAlertEmail(user, title) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'in-v3.mailjet.com',
        secure: false,
        port: 587,
        ignoreTLS: true,
        auth: {
          user: process.env.MAILJET_API_KEY,
          pass: process.env.MAILJET_SECRET_KEY,
        },
      });

      await transporter.sendMail({
        from: `"${process.env.EMAIL_SENDER}" <${process.env.EMAIL_SENDER}>`,
        to: user,
        subject: `Tâche en retard`,
        text: 'Vous avez une tâche en retard!',
        html: `<b>Tâche intitulé ${title}</b>`,
      });
    } catch (error) {
      console.log(error)
    }
  },
  async sendCompleteEmail(user, title) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'in-v3.mailjet.com',
        secure: false,
        port: 587,
        ignoreTLS: true,
        auth: {
          user: process.env.MAILJET_API_KEY,
          pass: process.env.MAILJET_SECRET_KEY,
        },
      });

      await transporter.sendMail({
        from: `"${process.env.EMAIL_SENDER}" <${process.env.EMAIL_SENDER}>`,
        to: user,
        subject: 'Tâches complétées',
        text: 'Vous avez complété toutes vos tâches !',
        html: `<b>Vous avez complété toutes vos tâches de la liste ${title}</b>`,
      });
    } catch (error) {
      console.log(error)
    }
  }
}