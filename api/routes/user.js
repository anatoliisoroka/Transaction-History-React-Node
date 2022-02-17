var express = require('express');
var router = express.Router();
var users = require('../data/data-Users.json');
var transactionHistory = require('../data/data-TransactionHistory.json');

router.get('/:id', function(req, res, next) {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (user) {
    const transactions = transactionHistory.filter(t => t.userId == id)

    res.json({
      success: true,
      user,
      transactions
    });
  } else {
    res.json({
      success: false
    });
  }
});

module.exports = router;
