const express = require('express')
const mysql = require('mysql2')
const app =express()
const bodyParser = require('body-parser');
app.use(bodyParser.json())

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "8824722331",
    database:"oyedb"
  });


app.get('/addcustomer',(req,res)=>{ 
   const {name ,email}=req.query
   if(!name||!email){
       res.json({msg:'require all inputs'})
   }
   else{

    con.connect(function(err) {
        if (err) throw err;
        con.query(`SELECT * FROM customers WHERE address='${email}'`, function (err, result, fields) {
          if (err) throw err;
          else if(result.length!==0) res.json({msg:'email already exist'});
          else {
              console.log(result)
            const sql=`INSERT INTO customers (name, address) VALUES ('${name}', '${email}')`;
            con.query(sql,err=>{
                if(err)throw err;
                else res.json({msg:'success'})
                })
          }
        });
      });
    
   }
  
})

const customers = [{ 
    email : "anurag11@yopmail.com" , 
    name : "anurag" 
    }, 
    { 
    email : "sameer11@yopmail.com" , 
    name : "sameer" 
    }, 
    { 
    email : "ravi11@yopmail.com" , 
    name : "ravi" 
    }, 
    { 
    email : "akash11@yopmail.com" , 
    name : "akash" 
    }, 
    { 
    email : "anjali11@yopmail.com" , 
    name : "anjai" 
    }, 
    { 
    email : "santosh11@yopmail.com" , 
    name : "santosh" 
    }, 
    ]
con.connect(err=>{
    if(err)throw err
    else {
        customers.forEach(customer=>{
            con.connect(`SELECT * FROM customers WHERE address='${customer.email}'`, function (err, result, fields){
                if(err)throw err;
                else if(result.length===0){
                    const sql=`INSERT INTO customers (name, address) VALUES ('${customer.name}', '${customer.email}')`;
                    con.query(sql,err=>{
                        if(err)throw err;
                        else res.json({msg:'success'})
                        })
                }
                else{
                    const sql=`UPDATE  customers SET name=${customer.name} WHERE email=${customer.email}`;
                    con.query(sql,err=>{
                        if(err)throw err;
                        else res.json({msg:'success'})
                        })
                }
            })
        })
    }
})  




app.listen(3000,()=>{
    console.log('live on port 3000')
})
