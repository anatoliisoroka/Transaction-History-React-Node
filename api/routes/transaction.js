var express = require('express');
var router = express.Router();
var moment = require('moment');

router.post('/', function(req, res, next) {
	const userId = req.body.userId;
	const amount = req.body.amount;
	const transactionType = req.body.transactionType;

	// Handle transactions here

	res.json({
		success: true,
		transaction: {
			id: Date.now(),
			userId: parseInt(userId),
			amount: parseInt(amount),
			transactionType: parseInt(transactionType),
			transactionDate: moment().format('MMM DD, YYYY')
		}
	})
});

module.exports = router;
