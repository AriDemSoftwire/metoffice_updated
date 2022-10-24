import express from "express";
import fetch from "node-fetch";

const app = express();
const port = 3000;

app.use(express.static('frontend'));


app.get('/public/forecast/:location', (req, res) => {

  // location is input that we get from the user
  let location = req.params['location'];

  fetch('http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=dd89d98f-dc78-4ec5-9bc4-ec5ba68ee17b')
    .then(response => response.json())
    .then(data => {
      const userQuery = location;
      let locationID = 'null';

      // Check user input against list of location names
      for (let i = 0; i < data.Locations.Location.length; i++) {
        if (userQuery === data.Locations.Location[i].name) {
          locationID = data.Locations.Location[i].id;
          break;
        }
      }

      if(locationID === 'null')
      {
        //sending error message 
        res.status(400).send({ error: 'Location not valid!' })
        return;
      }

      fetch(`http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/${locationID}?res=3hourly&key=dd89d98f-dc78-4ec5-9bc4-ec5ba68ee17b`)
        .then(response => response.json())
        //sending status code 'correct' and the actual data we got
        .then(data => res.status(200).send(data))
    }
    )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})