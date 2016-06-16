var express = require("express"),
    app = express(),
    multer = require("multer"),
    upload = multer(),
    path = require("path");
    
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname,'pages','index.html'));
});

app.post('/post', upload.single('file'), function (req, res, next) {
  if (req.file)
    res.json({"size": req.file.size});
  else
    res.json({'error':'no file received'});
});

app.use(function(req, res){
  res.status(404);
  res.sendFile(path.join(__dirname,'pages','notfound.html'));
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500)
  res.sendFile(path.join(__dirname,'pages','servererror.html'));
});

app.listen( process.env.PORT || 8080, function(){
  console.log('express started');
});