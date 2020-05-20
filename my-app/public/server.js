const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
let path = require('path');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const bcrypt = require('bcrypt');
const crypto = require("crypto");



const db = mysql.createPool({

  host: 'localhost',
  user: 'root',
  password: 'password'

});

app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

async function checkUser(userLogin) {
  let sql = 'SELECT * FROM coins.registration r where r.login=?';
  let result = false;
  try {
    result = await new Promise((res, rej) => {
      db.query(sql, userLogin, (err, result) => {
        if (err) {
          res(false);
          return false;
        } if (result.length < 1) {
          res(false);
          return false;
        } else {
          res(result);
        }
      })
    })
  } catch (err) {
    console.log(err);
  }
  return result;
}

async function checkCredentials(req) {
  const userLogin = req.body.login;
  const userPass = req.body.pass;
  let result = false;
  try {
    result = await new Promise((res, rej) => {
      checkUser(userLogin).then(user => {
        if (!user[0]) {
          res(false);
          return false;
        }
        const salt = user[0].salt;
        const hash = bcrypt.hashSync(userPass, salt);
        if (user[0].hash === hash) {
          res(true);
          return true;
        } else {
          res(false);
          return false;
        }
      }
      );
    })
  } catch (err) {
    return false;
  }
  return result;

}

async function checkToken(req) {
  console.log(req.body.token)
  const userToken = req.body.token;
  if (!userToken || userToken == null) {
    return false;
  } else {
    await ourToken(userToken).then(ourToken => {
      if (!ourToken) {
        return false;
      } else {
        return true;
      }
    });
  }

}

async function ourToken(userToken) {
  let sql = 'SELECT c.token FROM coins.tokens c where c.token = ?';

  try {
    result = await new Promise((res, rej) => {
      db.query(sql, userToken, (err, results) => {
        if (err) {
          res(false);
          return false;
        }
        res(true);
        return true;
      })
    })
  } catch (err) {
    return false;
  }
}

deleteToken = (req) => {
  let sql = 'DELETE FROM coins.tokens c WHERE  c.login = ?';
  let query = db.query(sql, req.body.login, (err, results) => {
    if (err) {
      return false;
    }
    return true;
  });
}

insertToken = (login, token) => {
  let post = {
    login, token
  }
  let sql = 'INSERT INTO coins.tokens SET ?';
  let query = db.query(sql, post, (err, results) => {
    if (err) {
      return false;
    }

    return true;
  });
}

app.post('/token', (req, res) => {
  checkCredentials(req).then(result => {
    if (!result) {
      res.status(401).send();
    } else {
      const newToken = crypto.randomBytes(40).toString('hex');
      const login = req.body.login;
      deleteToken(req);
      insertToken(login, newToken);
      res.json({ login: login, token: newToken })
      res.status(200).send();
    }
  });
});

app.delete('/logout', (req, res) => {
  let sql = 'DELETE FROM coins.tokens c WHERE  c.token = ?';
  let query = db.query(sql, req.body.token, (err, results) => {
    if (err) {
      return false;
    }
    return true;
  });
  res.status(200).send();
})

app.post('/coins/add', (req, res) => {
  if (!checkToken(req)) {
    res.sendStatus(401);
  } else {
    let sql = 'INSERT INTO coins.coinslist SET ?';
    let query = db.query(sql, req.body.data, (err, results) => {
      if (err) {
        res.status(404).send();
        return false;
      }
      let sql = 'SELECT * FROM coins.coinslist;';
      let query = db.query(sql, (err, result) => {
        if (err) {
          res.status(404);
        }
        res.status(200);

        res.json(result);
      });
    });
  }
})


app.put('/coins/:id', (req, res) => {
  if (!checkToken(req)) {
    res.sendStatus(401);
  } else {
    let sql = 'update coins.coinslist c set ?  where id=?';
    let query = db.query(sql, [req.body.data, req.params.id], (err, results) => {
      if (err) {
        res.status(404).send();
        return false;
      }
      let sql = 'SELECT * FROM coins.coinslist;';
      let query = db.query(sql, (err, result) => {
        if (err) {
          res.status(404);
        }
        res.status(200);
        res.json(result);
      });
    });
  }
})


app.get('/coins', (req, res) => {
  if (!checkToken(req)) {
    res.sendStatus(401);
  } else {
    let sql = 'SELECT * FROM coins.coinslist;';
    let query = db.query(sql, (err, result) => {
      if (err) {
        res.status(404);
      }
      res.status(200);

      res.json(result);
    });
  }
})

app.get('/coins/:id', (req, res) => {
  let sql = 'SELECT * FROM coins.coinslist where id=?';
  let query = db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(404).send();
    }
    res.status(200);
    res.json(result);

  });
})



app.put('/coins/active/:id', (req, res) => {
  let sql = 'update coins.coinslist set active = active+1 where id = ?';
  let query = db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(404).send();
    }
    res.status(200);
    res.json(result);

  });
})



app.post('/check', (req, res) => {
  if (!checkToken(req)) {
    res.sendStatus(401);
  } else {

    res.status(200).send();
  }
})






app.delete('/coins/:id', (req, res) => {
  if (!checkToken(req)) {
    res.sendStatus(401);
  } else {
    let sql = 'DELETE  FROM coins.coinslist where id=?';
    let query = db.query(sql, req.params.id, (err, result) => {
      if (err) {
        res.status(404);
      }
      let sql = 'SELECT * FROM coins.coinslist;';
      let query = db.query(sql, (err, result) => {
        if (err) {
          res.status(404);
        }
        res.status(200);

        res.json(result);
      });
    });

  }
});


app.listen('3000', () => {
  console.log('Server started on port 3000');
});