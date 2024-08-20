const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS middleware

const app = express();
app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors());

app.options('*', cors()); // Handle preflight requests

const transporter = nodemailer.createTransport({
    host: 'propvator.com',
    port: 465,
    secure: true,
    auth: {
        user: 'info@propvator.com',
        pass: 'WGUQXc4bxmwMCDB',
    },
});

app.get('/tst', async (req, res) => {res.json({m:"kkk"})})
app.post('/send-email', async (req, res) => {
    const { email } = req.body;

    const mailOptions = {
        from: 'info@propvator.com',
        to: 'info@propvator.com',
        subject: 'New Subscriber',
        text: `New subscriber email: ${email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, error: error.message });
        } else {
            return res.status(200).json({ success: true, message: 'Email sent: ' + info.response });
        }
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
