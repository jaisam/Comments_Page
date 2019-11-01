//Install express server
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();


app.use(morgan('dev'));

// Serve only the static files form the dist directory
// app.use(express.static(path.join(__dirname, 'dist/pokedex')));
app.use(express.static(path.join(__dirname, 'dist/')));

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'dist/pokedex/index.html'));
// });

// Start the app by listening on the default Heroku port
let port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`Server listening on ${port}`);
});
