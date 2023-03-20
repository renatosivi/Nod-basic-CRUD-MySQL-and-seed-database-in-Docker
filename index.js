const express = require('express');
const {connection} = require('./database.js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/tipos', (_req, res) => {
  connection.query('SELECT * FROM customerTypes;', (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }

    res.send(result);
  });
});

const customerTypes = {'preferencial': 1, 'bronze': 2, 'prata': 3, 'ouro': 4, 'black': 5};

app.post('/cliente/gravar', (req, res) => {
  const query = 'INSERT INTO customers (name, phone, email, addressType, number, complement, district, city, state, zipCode, customerTypes_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

  const {nome, telefone, email, logradouro, numero, complemento, bairro, cidade, uf, cep, tipoDeCliente} = req.body;

  const variables = [nome, telefone, email, logradouro, numero, complemento, bairro, cidade, uf, cep, customerTypes[tipoDeCliente]];

  connection.query(query, variables, (err) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(201);
  });
});

app.get('/cliente/buscar/email/:email', (req, res) => {
  const query = 'SELECT customers.*, customerTypes.name AS customerType FROM customers JOIN customerTypes ON customers.customerTypes_id = customerTypes.customerTypes_id WHERE customers.email = ?;';

  connection.query(query, [req.params.email], (err, result) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(result.at(-1));
  });
});

app.get('/cliente/buscar/id/:id', (req, res) => {
  const query = 'SELECT customers.*, customerTypes.name AS customerType FROM customers JOIN customerTypes ON customers.customerTypes_id = customerTypes.customerTypes_id WHERE customers.customers_id = ?;';

  connection.query(query, [req.params.id], (err, result) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(result.at(-1));
  });
});


const port = 3000;
app.listen(port, () => console.log('Express server listening on port ' + port));