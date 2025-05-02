 const express = require("express") 
 const bcrypt = require("bcryptjs")
 const mysql = require("mysql2");
const { Password } = require("@mui/icons-material");
const { BsDatabase } = require("react-icons/bs");
 const app = express()
 const port = 8000;
 app.use(express.json)
 app.use(bodyparse.urlEncoded({extended:true}))

 const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    Password:"rukundojay-b123@",
    database:'user'

 })
 connection.connect((err)=>{
    if(err){
        console.log("fail to create connection",err.stack)
    }
    else{
        console.log("connection was establishe successfull on mysql")
    }
 })

//  app.post('/signup',async(req,res)=>{
//     const {Firstname,Lastname,fullname,email,password} = req.body
//     try{
//         hashedpassword = await bcrypt.hash(password,10)
//         const query = "SELECT *FROM user WHERE email = ?"
//         connection.query(query,[email],async(err,result)=>{
//             if(err){
//                 console.log("error in getting user with this email",err.stank)
//                 res.status(400).send("Error in this query")
//             }else if(result.length > 0){
//                 console.log("user arleady exist")

//             }else if(result.length == 0){
//                 const InsertQuery = " INSERT INTO user (Firstname,fullname,fullname,email,password) VALUES (?,?,?,?,?)"
//                 connection.query(InsertQuery,[Firstname,Lastname,fullname,email,hashedpassword],async(err,resul)=>{
//                     if(err){
//                         console.log("error in creating user",err.stank)
//                         res.status(500).send("error in this user creation")
//                     }else{
//                         console.log("user created successfull")
//                         res.status(200).send("successfull message")
//                     }
//                 })
//             }
//         })
//     }catch(err){
//       console.log('Internal server error',err.stank)  
//       res.status(500).send("Internal server error")
//     }
//  })
app.post('/signup',async(req,res)=>{
    const{Firstname,Lastname,Fullname,Email,Password} = req.body
    try{
        const hashedpassword = await bcrypt.hash(password,10)
        const query = "SELECT *FROM users WHERE email = ?"
        connection.query(query,[Email],async(err,result)=>{
            if(err){
                console.log("err in getting email",err.stank)
                res.status(400).send("fail to get the email")
            }else if(result.length > 0){
                console.log("user arleady exist")
            }else if(result.length ==0){
                const InsertQuery = "INSERT INTO user (firstname,lastname,fullname,email,password) VALUES(?,?,?,?,?)"
                connection.query(InsertQuery,[Firstname,Lastname,Fullname,Email,hashedpassword],async(err,result)=>{
                    if(err){
                        console.log("Fail to create user there is an error",err.stank)
                        res.status(400).send("Error in this router")
                    }else{
                        console.log("user created successfull")
                        res.status(200).send("successfull message")
                    }
                })
            }
        })
    }catch(err){
        
    }
    
})
 app.post('/login',async(req,res)=>{
    const {username,id,password} = req.body
    const query = 'SELECT *FROM user WHERE username = ?'
    connection.query(query,[username],async(err,result)=>{
        if(err){
            console.log('fail to get user',err.stack)
            res.status(500).send("Internal server error")
        }else if(result >0){
            console.log("user already exist")
            res.status(4001).send('user already exist')
        }else if(result ==0){
            try{
                const passwordhash = await bcrypt.hash(password,10)
                const query = "INSERT INTO user (username,id,password) VALUES(?,?,?)"
                connection.query(query,[username,id,passwordhash],async(err,result)=>{
                    if(err){
                        console.log("fail co create user ", err.stack)
                        res.status(500)
                    }
                })
            }catch(err){
                console.log("Internal server error ", err.stank)
                res.status(500).send("Internal server error")
            }
        }
    })
 })

 app.listen(port,(req,res)=>{
    console.log(`app is listening on the port ${port}`)
 })