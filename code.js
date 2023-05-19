const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.static("public"));
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "gagan",
    password: "1234",
    database: "shorturl",
    authPlugins: {
        mysql_clear_password: () => () => {
          return signer.getAuthToken({
            region,
            hostname,
            port,
            username
          });
        }
      },
});  
con.connect(function(error) {
    if (error) {
       console.log("Database connection failed:", error);
    }
 });

app.get("/",function(request,response){
	response.sendFile(__dirname + "/public/index.html");
});

app.post("/api/create-short-url",function(request,response){
	let uniqueID = Math.random().toString(36).replace(/[^a-z0-9]/gi,'').substr(2,5);
	let sql = `INSERT INTO links(longurl,shorturlid) VALUES('${request.body.longurl}','${uniqueID}')`;
	con.query(sql,function(error,result){
        response.status(200).json({
            status:"ok",
            shorturlid:uniqueID
        });		
	})
});

app.get("/api/get-all-short-urls",function(request,response){
	let sql = `SELECT * FROM links`;
	con.query(sql,function(error,result){
        response.status(200).json(result);
	})
});

app.get("/:shorturlid",function(request,response){
	let shorturlid = request.params.shorturlid;
	let sql = `SELECT * FROM links WHERE shorturlid='${shorturlid}' LIMIT 1`;
	con.query(sql,function(error,result){
        con.query(sql,function(error,result){
            if(error){
                // response.status(500).json({
                // 	status:"notok",
                // 	message:"Something went wrong"
                // });
                response.redirect(result[0].longurl);
            }
            response.redirect(result[0].longurl);
        })
	})
});

app.listen(5000, ()=> {
    console.log("Server started on http://localhost:5000");
});














//CODE ENDS HERE !!!

//TEST CODE:
// const express = require("express");
// const mysql = require("mysql2");

// const app = express();

// app.use(express.static("public"));
// app.use(express.json());

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "gagan",
//     password: "1234",
//     database: "shorturl",
//     authPlugins: {
//         mysql_clear_password: () => () => {
//           return signer.getAuthToken({
//             region,
//             hostname,
//             port,
//             username
//           });
//         }
//       },
// });  
// con.connect(function(error) {
//     if (error) {
//        console.log("Database connection failed:", error);
//     }
//  });

// app.get("/",function(request,response){
// 	response.sendFile(__dirname + "/public/index.html");
// });

// app.post("/api/create-short-url",function(request,response){
// 	let uniqueID = Math.random().toString(36).replace(/[^a-z0-9]/gi,'').substr(2,10);
// 	let sql = `INSERT INTO links(longurl,shorturlid) VALUES('${request.body.longurl}','${uniqueID}')`;
// 	con.query(sql,function(error,result){
//         response.status(200).json({
//             status:"ok",
//             shorturlid:uniqueID
//         });		
// 	})
// });

// app.get("/api/get-all-short-urls",function(request,response){
// 	let sql = `SELECT * FROM links`;
// 	con.query(sql,function(error,result){
//         response.status(200).json(result);
// 	})
// });

// app.get("/:shorturlid",function(request,response){
// 	let shorturlid = request.params.shorturlid;
// 	let sql = `SELECT * FROM links WHERE shorturlid='${shorturlid}' LIMIT 1`;
// 	con.query(sql,function(error,result){
//         sql = `UPDATE links SET count=${result[0].count+1} WHERE id='${result[0].id}'`;
//         con.query(sql,function(error,result2){
//             if(error){
//                 // response.status(500).json({
//                 // 	status:"notok",
//                 // 	message:"Something went wrong"
//                 // });
//                 response.redirect(result[0].longurl);
//             } else {
//                 response.redirect(result[0].longurl);
//             }
//         })
// 	})
// });

// app.listen(5000, ()=> {
//     console.log("Server started on http://localhost:5000");
// });
// const express = require("express");
// const mysql = require("mysql2");

// const app = express();

// app.use(express.static("public"));
// app.use(express.json());

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "gagan",
//     password: "1234",
//     database: "shorturl",
//     authPlugins: {
//         mysql_clear_password: () => () => {
//           return signer.getAuthToken({
//             region,
//             hostname,
//             port,
//             username
//           });
//         }
//       },
// });  
// con.connect(function(error) {
//     if (error) {
//        console.log("Database connection failed:", error);
//     }
//  });

// app.get("/",function(request,response){
// 	response.sendFile(__dirname + "/public/index.html");
// });

// app.post("/api/create-short-url",function(request,response){
// 	let uniqueID = Math.random().toString(36).replace(/[^a-z0-9]/gi,'').substr(2,10);
// 	let sql = `INSERT INTO links(longurl,shorturlid) VALUES('${request.body.longurl}','${uniqueID}')`;
// 	con.query(sql,function(error,result){
//         response.status(200).json({
//             status:"ok",
//             shorturlid:uniqueID
//         });		
// 	})
// });

// app.get("/api/get-all-short-urls",function(request,response){
// 	let sql = `SELECT * FROM links`;
// 	con.query(sql,function(error,result){
//         response.status(200).json(result);
// 	})
// });

// app.get("/:shorturlid",function(request,response){
// 	let shorturlid = request.params.shorturlid;
// 	let sql = `SELECT * FROM links WHERE shorturlid='${shorturlid}' LIMIT 1`;
// 	con.query(sql,function(error,result){
//         sql = `UPDATE links SET count=${result[0].count+1} WHERE id='${result[0].id}'`;
//         con.query(sql,function(error,result2){
//             if(error){
//                 // response.status(500).json({
//                 // 	status:"notok",
//                 // 	message:"Something went wrong"
//                 // });
//                 response.redirect(result[0].longurl);
//             } else {
//                 response.redirect(result[0].longurl);
//             }
//         })
// 	})
// });

// app.listen(5000, ()=> {
//     console.log("Server started on http://localhost:5000");
// });
// const express = require("express");
// const mysql = require("mysql2");

// const app = express();

// app.use(express.static("public"));
// app.use(express.json());

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "gagan",
//     password: "1234",
//     database: "shorturl",
//     authPlugins: {
//         mysql_clear_password: () => () => {
//           return signer.getAuthToken({
//             region,
//             hostname,
//             port,
//             username
//           });
//         }
//       },
// });  
// con.connect(function(error) {
//     if (error) {
//        console.log("Database connection failed:", error);
//     }
//  });

// app.get("/",function(request,response){
// 	response.sendFile(__dirname + "/public/index.html");
// });

// app.post("/api/create-short-url",function(request,response){
// 	let uniqueID = Math.random().toString(36).replace(/[^a-z0-9]/gi,'').substr(2,10);
// 	let sql = `INSERT INTO links(longurl,shorturlid) VALUES('${request.body.longurl}','${uniqueID}')`;
// 	con.query(sql,function(error,result){
//         response.status(200).json({
//             status:"ok",
//             shorturlid:uniqueID
//         });		
// 	})
// });

// app.get("/api/get-all-short-urls",function(request,response){
// 	let sql = `SELECT * FROM links`;
// 	con.query(sql,function(error,result){
//         response.status(200).json(result);
// 	})
// });

// app.get("/:shorturlid",function(request,response){
// 	let shorturlid = request.params.shorturlid;
// 	let sql = `SELECT * FROM links WHERE shorturlid='${shorturlid}' LIMIT 1`;
// 	con.query(sql,function(error,result){
//         sql = `UPDATE links SET count=${result[0].count+1} WHERE id='${result[0].id}'`;
//         con.query(sql,function(error,result2){
//             if(error){
//                 // response.status(500).json({
//                 // 	status:"notok",
//                 // 	message:"Something went wrong"
//                 // });
//                 response.redirect(result[0].longurl);
//             } else {
//                 response.redirect(result[0].longurl);
//             }
//         })
// 	})
// });

// app.listen(5000, ()=> {
//     console.log("Server started on http://localhost:5000");
// });
// const express = require("express");
// const mysql = require("mysql2");

// const app = express();

// app.use(express.static("public"));
// app.use(express.json());

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "gagan",
//     password: "1234",
//     database: "shorturl",
//     authPlugins: {
//         mysql_clear_password: () => () => {
//           return signer.getAuthToken({
//             region,
//             hostname,
//             port,
//             username
//           });
//         }
//       },
// });  
// con.connect(function(error) {
//     if (error) {
//        console.log("Database connection failed:", error);
//     }
//  });

// app.get("/",function(request,response){
// 	response.sendFile(__dirname + "/public/index.html");
// });

// app.post("/api/create-short-url",function(request,response){
// 	let uniqueID = Math.random().toString(36).replace(/[^a-z0-9]/gi,'').substr(2,10);
// 	let sql = `INSERT INTO links(longurl,shorturlid) VALUES('${request.body.longurl}','${uniqueID}')`;
// 	con.query(sql,function(error,result){
//         response.status(200).json({
//             status:"ok",
//             shorturlid:uniqueID
//         });		
// 	})
// });

// app.get("/api/get-all-short-urls",function(request,response){
// 	let sql = `SELECT * FROM links`;
// 	con.query(sql,function(error,result){
//         response.status(200).json(result);
// 	})
// });

// app.get("/:shorturlid",function(request,response){
// 	let shorturlid = request.params.shorturlid;
// 	let sql = `SELECT * FROM links WHERE shorturlid='${shorturlid}' LIMIT 1`;
// 	con.query(sql,function(error,result){
//         sql = `UPDATE links SET count=${result[0].count+1} WHERE id='${result[0].id}'`;
//         con.query(sql,function(error,result2){
//             if(error){
//                 // response.status(500).json({
//                 // 	status:"notok",
//                 // 	message:"Something went wrong"
//                 // });
//                 response.redirect(result[0].longurl);
//             } else {
//                 response.redirect(result[0].longurl);
//             }
//         })
// 	})
// });

// app.listen(5000, ()=> {
//     console.log("Server started on http://localhost:5000");
// });
// const express = require("express");
// const mysql = require("mysql2");

// const app = express();

// app.use(express.static("public"));
// app.use(express.json());

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "gagan",
//     password: "1234",
//     database: "shorturl",
//     authPlugins: {
//         mysql_clear_password: () => () => {
//           return signer.getAuthToken({
//             region,
//             hostname,
//             port,
//             username
//           });
//         }
//       },
// });  
// con.connect(function(error) {
//     if (error) {
//        console.log("Database connection failed:", error);
//     }
//  });

// app.get("/",function(request,response){
// 	response.sendFile(__dirname + "/public/index.html");
// });

// app.post("/api/create-short-url",function(request,response){
// 	let uniqueID = Math.random().toString(36).replace(/[^a-z0-9]/gi,'').substr(2,10);
// 	let sql = `INSERT INTO links(longurl,shorturlid) VALUES('${request.body.longurl}','${uniqueID}')`;
// 	con.query(sql,function(error,result){
//         response.status(200).json({
//             status:"ok",
//             shorturlid:uniqueID
//         });		
// 	})
// });

// app.get("/api/get-all-short-urls",function(request,response){
// 	let sql = `SELECT * FROM links`;
// 	con.query(sql,function(error,result){
//         response.status(200).json(result);
// 	})
// });

// app.get("/:shorturlid",function(request,response){
// 	let shorturlid = request.params.shorturlid;
// 	let sql = `SELECT * FROM links WHERE shorturlid='${shorturlid}' LIMIT 1`;
// 	con.query(sql,function(error,result){
//         sql = `UPDATE links SET count=${result[0].count+1} WHERE id='${result[0].id}'`;
//         con.query(sql,function(error,result2){
//             if(error){
//                 // response.status(500).json({
//                 // 	status:"notok",
//                 // 	message:"Something went wrong"
//                 // });
//                 response.redirect(result[0].longurl);
//             } else {
//                 response.redirect(result[0].longurl);
//             }
//         })
// 	})
// });

// app.listen(5000, ()=> {
//     console.log("Server started on http://localhost:5000");
// });