/*
 * @Descripttion: Web-A3
 * @Author: Zhujiayao & Luchenchen
 */
const express = require('express');
const mysql = require('mysql');
const port = 3000;
const app = express();
const cors = require('cors');//Handle cross-domain requests

// All cross-domain requests are allowed
app.use(cors());

// Create a database connection pool.
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'crowdfunding_db',
  port:'3307',
  connectionLimit : 20,
  waitForConnections: false
});

// Establish a database connection.
pool.getConnection(err => {
  if (err) throw err;
  console.log('Connected to the database.');
});

// To start an Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


app.use(express.json()); // Used to parse the request body in JSON format
// Use middleware to parse the URL-encoded request body
app.use(express.urlencoded({ extended: true }));


//get active_fundraisers
app.get('/fundraisers',function(req,res){
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('Connection error')
		}
		console.log(connection)
		const query = `
		SELECT f.*, c.NAME AS category_name
	   FROM fundraiser f
	   JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
	   WHERE f.ACTIVE = 1
   `;
		connection.query(query,function(err,results){
			if (err) {
				console.log(err)
				res.send('Query failure')
			}
			res.send(results)
			connection.release();
		})
	})
})

//get all_fundraisers
app.get('/all_fundraisers',function(req,res){
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('Connection error')
		}
		console.log(connection)
		const query = `
		SELECT f.*, c.NAME AS category_name
	   FROM fundraiser f
	   JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
	   ORDER BY ACTIVE DESC;
   `;
		connection.query(query,function(err,results){
			if (err) {
				console.log(err)
				res.send('Query failure')
			}
			res.send(results)
			connection.release();
		})
	})
})

app.get('/search',function(req,res){
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('Connection error')
		}
		const organizer = req.query.organizer;
		const city = req.query.city;
		const categoryName = req.query.category
		let query = `
		  SELECT *,name as CATEGORY_NAME 
		  FROM fundraiser f 
		  LEFT JOIN category c 
		  ON f.CATEGORY_ID = c.CATEGORY_ID
		  WHERE f.ACTIVE = 1 and
		`;

		console.log(organizer,city,categoryName)
		
		let conditions = [];
		let params = [];
	  
		if (organizer) {
		  conditions.push('organizer LIKE ?');
		  params.push(`%${organizer}%`);
		}
		if (city) {
		  conditions.push('city LIKE ?');
		  params.push(`%${city}%`);
		}
		if (categoryName) {
		  conditions.push('name = ?');
		  params.push(categoryName);
		}
	  
		query += conditions.join(' AND ');
		query+=' '
	  
		connection.query(query, params, (err, results) => {
		  	if (err) {
				console.log(err)
				res.send('Query failure')
			}
			res.send(results)
			connection.release();
		});
	})
})


app.get('/fundraiser/:id', function (req, res) {
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('Connection error')
		}
		const fundraiserId = req.params.id;
		console.log(fundraiserId);
		const query = `
			 SELECT f.*, c.NAME AS category_name
		FROM fundraiser f
		JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
		WHERE f.ACTIVE = 1 and f.FUNDRAISER_ID = ?
		`;
		connection.query(query, [fundraiserId],function(err,results){
			if (err) {
				console.log(err)
				res.send({msg:'Query failure'})
			}
			res.send(results[0])
			connection.release();
		})
	})
})

app.post('/donation', function (req, res) {
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('Connection error')
		}
		const date = req.body.date
		const amount = req.body.amount
		const giver = req.body.giver
		const fundraiserId = req.body.fundraiserId

		console.log(date, amount, giver, fundraiserId);//Test get parameters

		if (!date || !amount || !giver || !fundraiserId) {
            // If the data is incomplete, a 400 error is returned
            return res.status(400).send('missing required arguments.');
        }
		// Prepare the SQL statement for inserting into the database
		const query = 'INSERT INTO DONATION (DATE, AMOUNT, GIVER, FUNDRAISER_ID) VALUES (?, ?, ?, ?)';

		connection.query(query, [date, amount, giver, fundraiserId],function(err,results){
			if (err) {
				console.log(err)
				res.send(JSON.stringify({ message: 'Query failure'}))
			}
			res.send(JSON.stringify({ message: 'donation insert success' }))
			connection.release();
		})
	})
})

app.post('/add_fundraiser', function (req, res) {
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('Connection error')
		}
		// 从请求包中获取参数
		const fundraiserId = req.body.FUNDRAISER_ID; 
		const organizer = req.body.ORGANIZER
		const caption = req.body.CAPTION
		const targetFunding = req.body.TARGET_FUNDING
		const currentFunding = req.body.CURRENT_FUNDING
		const city = req.body.CITY
		const active = req.body.ACTIVE
		const categoryID = req.body.Category

		console.log(targetFunding,currentFunding);//Test get parameters
		if (!organizer || !caption || !targetFunding || !currentFunding 
			|| !city || !active || !categoryID
		) {
            // If the data is incomplete, a 400 error is returned
            return res.status(400).send('missing required arguments.');
        }
		// Prepare the SQL statement for inserting into the database
		const query = `
		INSERT INTO fundraiser (
		ORGANIZER, 
		CAPTION, 
		TARGET_FUNDING, 
		CURRENT_FUNDING, 
		CITY, 
		ACTIVE, 
		CATEGORY_ID
		) VALUES (?, ?, ?, ?, ?, ?, ?)
 		`;

		connection.query(query, [organizer, caption, targetFunding, currentFunding, city, active, categoryID],function(err,results){
			if (err) {
				console.log(err)
				res.send('Query failure')
			}
			res.send(JSON.stringify({ message: 'fundraiser add success' }))
			connection.release();
		})
	})
})



app.put('/fundraiser/:id', function (req, res) {
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('Connection error')
		}
		// Gets parameters from the request package
		const fundraiserId = req.body.FUNDRAISER_ID; 
		const organizer = req.body.ORGANIZER
		const caption = req.body.CAPTION
		const targetFunding = req.body.TARGET_FUNDING
		const currentFunding = req.body.CURRENT_FUNDING
		const city = req.body.CITY
		const active = req.body.ACTIVE
		const categoryID = req.body.CATEGORY_ID

		console.log(fundraiserId+"\n",req.query);//Test get parameters
		if (!organizer || !caption || !targetFunding || !currentFunding 
			|| !city || !active || !categoryID
		) {
            // If the data is incomplete, a 400 error is returned
            return res.status(400).send(
				organizer+'  '+caption+'  '+targetFunding+'  '+currentFunding
				+'  '+city+'  '+active+'  '+categoryID+'  '
				+'missing required arguments.');
        }
		// If the data is incomplete, a 400 error is returned
		const query = `
		UPDATE fundraiser 
		SET ORGANIZER = ?,
			CAPTION = ?,
			TARGET_FUNDING = ?,
			CURRENT_FUNDING = ?,
			CITY = ?,
			ACTIVE = ?,
			CATEGORY_ID = ?
		WHERE FUNDRAISER_ID = ?
		`;
		connection.query(query, [organizer, caption, targetFunding, currentFunding, city, active, categoryID, fundraiserId],function(err,results){
			if (err) {
				console.log(err)
				res.send('Query failure')
			}
			res.send(JSON.stringify({ message: 'fundraiser update success' }))
			connection.release();
		})
	})
})

app.delete('/fundraiser/:id', function (req, res) {
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('Connection error')
		}
		const fundraiserId = req.params.id;
		console.log(fundraiserId);
		const query = 'SELECT COUNT(*) AS donationCount FROM DONATION WHERE FUNDRAISER_ID = ?';
		// const result = connection.query(query, [fundraiserId])
		connection.query(query, [fundraiserId],function(err,results){
			if (err) {
				console.log(err)
				res.send('Query failure')
			}
			if(results.donationCount>0){
				// If there is already a donation, an error message is returned
				return res.status(400).json({ message: '不能删除已获得捐款的筹款人' });
			}
			// If no donation is made, delete it
			const deleteQuery = 'DELETE FROM FUNDRAISER WHERE FUNDRAISER_ID = ?';
			connection.query(deleteQuery, [fundraiserId], function(err,results){
				if (err) {
					console.log(err)
					res.send('Query failure')
				}
				// Successfully deleted
				res.send(JSON.stringify({ message: 'fundraiser delete success' }))
				connection.release();
			})

		});	
		
	})
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('ERR!');
  });
  
