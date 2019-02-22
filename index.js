const express = require('express');
const axios = require('axios')
const app = express();
const cors = require('cors');
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/api', async (req,res) => {
  const token = req.query.token;
  const result = await axios.get('http://playground.tesonet.lt/v1/servers', {
      headers: { 'Authorization': token }
    });
  console.log(result.data)

  res.send(result.data)
})

app.post('/api',async (req, res) => {
  const info = req.body;
  console.log(info);
  const tesonetinfo =  await axios.post('http://playground.tesonet.lt/v1/tokens', info);
  const token = tesonetinfo.data;
  console.log(token)
  res.send(token);
})

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
