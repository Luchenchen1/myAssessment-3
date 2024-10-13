/*
 * @Descripttion: Web-A3
 * @Author: Zhujiayao & Luchenchen
 */
const express = require('express');
const mysql = require('mysql');
const port = 3000;
const app = express();
const cors = require('cors');//处理跨域请求

// 允许所有跨域请求
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


app.use(express.json()); // 用于解析JSON格式的请求体
// 使用中间件解析URL编码的请求体
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

		console.log(date, amount, giver, fundraiserId);//测试拿到参数

		if (!date || !amount || !giver || !fundraiserId) {
            // 如果数据不完整，返回400错误
            return res.status(400).send('missing required arguments.');
        }
		// 准备插入数据库的SQL语句
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
		const organizer = req.query.organizer
		const caption = req.query.caption
		const targetFunding = req.query.target_funding
		const currentFunding = req.query.current_funding
		const city = req.query.city
		const active = req.query.active
		const categoryID = req.query.category_id

		console.log(targetFunding,currentFunding);//测试拿到参数
		if (!organizer || !caption || !targetFunding || !currentFunding 
			|| !city || !active || !categoryID
		) {
            // 如果数据不完整，返回400错误
            return res.status(400).send('missing required arguments.');
        }
		// 准备插入数据库的SQL语句
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
			res.send({message:"fundraiser insert success"})
			connection.release();
		})
	})
})



app.put('/fundraiser/:id', function (req, res) {
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('Connection error')
		}
		const fundraiserId = req.params.id; // 从请求参数中获取筹款人的 ID
		const organizer = req.query.organizer
		const caption = req.query.caption
		const targetFunding = req.query.target_funding
		const currentFunding = req.query.current_funding
		const city = req.query.city
		const active = req.query.active
		const categoryID = req.query.category_id

		console.log(fundraiserId+"\n",req.query);//测试拿到参数
		if (!organizer || !caption || !targetFunding || !currentFunding 
			|| !city || !active || !categoryID
		) {
            // 如果数据不完整，返回400错误
            return res.status(400).send(
				organizer+'  '+caption+'  '+targetFunding+'  '+currentFunding
				+'  '+city+'  '+active+'  '+categoryID+'  '
				+'missing required arguments.');
        }
		// 准备插入数据库的SQL语句
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
			res.send("fundraiser update success")
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
				// 如果已有捐款，返回错误信息
				return res.status(400).json({ message: '不能删除已获得捐款的筹款人' });
			}
			// 如果没有捐款，执行删除操作
			const deleteQuery = 'DELETE FROM FUNDRAISER WHERE FUNDRAISER_ID = ?';
			connection.query(deleteQuery, [fundraiserId], function(err,results){
				if (err) {
					console.log(err)
					res.send('Query failure')
				}
				// 删除成功
				res.send("fundraiser delete success")
				connection.release();
			})

		});	
		
	})
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('ERR!');
  });
  
