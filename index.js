require('dotenv').config();
const app = require('./api/index');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
