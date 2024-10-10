var express = require('express');
var router = express.Router();
var pool    = require('../db/crowdfunding_db');
//
router.get('/indexbox',function(req,res,next){
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('Connection error')
		}
		console.log(connection)
		const query1 = `
		SELECT f.*, c.NAME AS category_name
	   FROM fundraiser f
	   JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
	   WHERE f.ACTIVE = 1
   `;
		connection.query(query1,function(err,rows){
			if (err) {
				console.log(err)
				res.send('Query failure')
			}
			res.send(rows)
			connection.release();
		})
	})
})


router.get('/Search',function(req,res,next){
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('Connection error')
		}
		let query = `
		SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY,f.CONTENT
		FROM FUNDRAISER f
		LEFT JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID
		WHERE 1=1
	`;
		var categoryName = req.query.category
		var organizer = req.query.organizer
		var city = req.query.city
		const params = [];
	    console.log(categoryName,organizer,city)
		if (categoryName) {
			query += ' AND c.NAME = ?';
			params.push(categoryName);
		}
	
		if (organizer) {
			query += ' AND f.ORGANIZER LIKE ?';
			params.push(`%${organizer}%`);
		}
	
		if (city) {
			query += ' AND f.CITY = ?';
			params.push(city);
		}
		connection.query(query,params,function(err,rows){
			if (err) {
				console.log(err)
				res.send('Query failure')
			}
			res.send(rows)
			connection.release();
		})
	})
})


router.get('/queryById', function (req, res, next) {
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('Connection error')
		}
		const fundraiserId = req.query.id;
		console.log(fundraiserId);
		const query = `
			 SELECT f.*, c.NAME AS category_name
		FROM fundraiser f
		JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
		WHERE f.ACTIVE = 1 and f.FUNDRAISER_ID = ?
		`;
		connection.query(query, [fundraiserId],function(err,rows){
			if (err) {
				console.log(err)
				res.send('Query failure')
			}
			res.send(rows[0])
			connection.release();
		})
	})
});

module.exports = router;
