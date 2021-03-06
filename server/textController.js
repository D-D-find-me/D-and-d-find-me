const {
  TWILIO_ACCOUNT_SECRET_ID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
} = process.env;

module.exports = {
  sendSMS: (req, res) => {
    const db = req.app.get("db");
    const { name, message, user_id } = req.body;
    const accountSid = TWILIO_ACCOUNT_SECRET_ID;
    const authToken = TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);

    db.auth.get_phone(+user_id).then(([data]) => {
      const {phone_number} = data  
      client.messages
        .create({
          body: name + "commented:" + message,
          from: TWILIO_PHONE_NUMBER,
          to: phone_number,
        })
        .then((message) => {
          console.log(message);
          res.status(200).send(message);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        }); 
    });
  },
};
