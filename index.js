const express = require('express');
const bodyParser = require('body-parser');

const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 4000;


//middlewere
app.use(bodyParser.json());



const createFormOnJotForm = async (formName, formActive) => {
  const apiKey = '0080cdc8e0b4c4c6a5943bd172ae68cd'; 
  const url = `https://api.jotform.com/form?apiKey=${apiKey}`;

  const formData = {
    title: formName, 
    status: formActive ? 'ENABLED' : 'DISABLED' 
  };

  try {
    const response = await axios.post(url, formData);
    console.log(`Form created successfully ${response.data}`);
  } catch (error) {
    console.error('Error creating form in JotForm:', error);
  }
};
app.post('/webhook', (req, res) => {
  const formData = req.body;
  console.log('Received form submission:', formData);
  const { form_name, form_active } = formData;
  createFormOnJotForm(form_name, form_active); 
  res.status(200).send('Form submitted and sent to JotForm');

});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
