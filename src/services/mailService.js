import Mailjet from 'node-mailjet';

export default {
  async sendEmail(user, title) {
    const mailjet = Mailjet.apiConnect(
      process.env.MAILJET_API_KEY,
      process.env.MAILJET_SECRET_KEY,
    );
    console.log(user, title)
    const request = mailjet
      .post('send', { version: 'v3.1'})
      .request({
        Messages: [
          {
            From: {
              Email: 'quan@buri.fr',
              Name: 'Todo',
            },
            To: [
              {
                Email: user,
                Name: user,
              }
            ],
            Subject: 'Tâche en retard',
            TextPart: `Vous avez une tâche en retard`,
            HTMLPart: `<h3>Tâche ${title}</h3><br />Vous feriez mieux de vous dépêcher!`
          }
        ]
      });
    
    request
      .then((result) => {
        console.log(result.body)
      })
      .catch((err) => {
        console.log(err.statusCode)
      })
  },
}