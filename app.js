import mu from 'mu';
import { ok } from 'assert';

const app = mu.app;
const bodyParser = require('body-parser');
const repository = require('./repository');
const cors = require('cors');

app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(cors());


app.get('/getCountsForPublication', async (req, res) => {
  const uuid = req.query.uuid;
  if (!uuid) {
    res.send({ statusCode: 400, body: "uuid missing, search for counts failed" });
    return;
  }
  try {
    const counts = await repository.getCountsForPublication(uuid);
    res.header('Content-Type', 'application/vnd.api+json');
    res.send({ status: ok, statusCode: 200, body: { counts: counts } });

  } catch (error) {
    console.error(error);
    res.send({ status: ok, statusCode: 500, body: { error } });
  }
});

app.get('/documentNames', async (req, res) => {
  const uuid = req.query.uuid;
  if (!uuid) {
    res.send({ statusCode: 400, body: "uuid missing, search for documents failed" });
    return;
  }
  try {
    const names = await repository.getDocumentNamesForAgendaitem(uuid);
    res.header('Content-Type', 'application/vnd.api+json');
    res.send({ status: ok, statusCode: 200, body: { documentNames: names } });

  } catch (error) {
    console.error(error);
    res.send({ status: ok, statusCode: 500, body: { error } });
  }
});

app.get('/fileExtensions', async (req, res) => {
  try {
    const fileExtensions = await repository.getFileExtensions();
    res.header('Content-Type', 'application/vnd.api+json');
    res.send({ status: ok, statusCode: 200, body: { fileExtensions: fileExtensions } });

  } catch (error) {
    console.error(error);
    res.send({ status: ok, statusCode: 500, body: { error } });
  }
});
