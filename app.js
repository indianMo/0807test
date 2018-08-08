const fs = require("fs");
const http = require("http");
const path = require("path");
const mime = require("mime");
let rootPath1 = path.join(__dirname);
let rootPath = path.join(__dirname, "/www");
// console.log(rootPath1);
// console.log(rootPath);

let server = http.createServer((req, res)=>{
    var targetPath = path.join(rootPath,req.url);
    // 是否有文件
    //     --有就读取文件
    //         --是否是目录
    //             --是就遍历目录
    //     --没有就返回没有找到文件或者默认指定

   if (fs.existsSync(targetPath)) {
       fs.stat(targetPath,(err,stats)=>{
            if (stats.isFile()) {
                
                if(mime.getType(targetPath) == "text/plain") {
                    res.setHeader("content-type", mime.getType(targetPath)+";charset=utf-8");
                    
                } else {
                    res.setHeader("content-type", mime.getType(targetPath));
                }

                fs.readFile(targetPath,(err,data)=>{
                    res.end(data);
                })
            }

            if (stats.isDirectory()) {
                fs.readdir(targetPath, (err, files) => {
                    var tem = ""; 
                   for (var i = 0; i < files.length; i++) {
                        tem += `
                            <li><a href="${req.url}${req.url == "/" ? "" : "/"}${files[i]}">${files[i]} </a></li>
                        `;
                   }

                   res.end(`   <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
              <html>
              
              <head>
                  <title>Index of/ </title>
              </head>
              
              <body>
                  <h1>Index of ${req.url}</h1>
                  <ul>
                      ${tem}
                  </ul>
              </body>
              
              </html>
          
                           `);


                    
                });
                
            }
                      
       });

       
   } else {
       res.end("404 not Found");
   }
   
    
    
});

server.listen("3003", ()=> {
    console.log('监听成功');
    
})