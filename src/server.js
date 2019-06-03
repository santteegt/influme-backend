const express = require('express');
const fs  = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
// const compression = require('compression');
const config = require('./config');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const multer = require('multer');


const api = express();

api.use(cors());
// api.use(compression());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use(express.static(path.join(__dirname, 'client/build')));

// api.use(express.static(path.join(__dirname, 'public')));

// api.use(
// 	jwt({ secret: config.jwt.secret }).unless({
// 		path: [
// 			'/',
// 			'/auth/signup',
// 			'/auth/login',
// 			'/auth/forgot-password',
// 			'/auth/reset-password'
// 		]
// 	})
// );

// api.use((err, req, res, next) => {
// 	if (err.name === 'UnauthorizedError') {
// 		res.status(401).send('Missing authentication credentials.');
// 	}
// });

// api.use(
// 	expressWinston.logger({
// 		transports: [
// 			new winston.transports.Papertrail({
// 				host: config.logger.host,
// 				port: config.logger.port,
// 				level: 'error'
// 			})
// 		],
// 		meta: true
// 	})
// );

// api.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

api.set('port', process.env.PORT || config.server.port)

// api.get('/admin', (req, res) => {
//    res.sendFile(path.join(__dirname, './public/admin.html'));
// });

// api.get('/deals', (req, res) => {
//    res.sendFile(path.join(__dirname, './public/deals.html'));
// });

// api.get('/home', (req, res) => {
//    res.sendFile(path.join(__dirname, './public/home.html'));
// });

//************************************

var namefile = [];

// Mongo URI
const mongoURI = config.database.uri;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
        const filename = file.originalname;
        namefile.push(filename);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
    });
  }
});
const upload = multer({ storage });


api.post('/upload', upload.array('file'), (req, res) => {
  // res.json({ file: req.file });
  res.json({ file: namefile });
  namefile = [];
});

api.get('/image/:filename', function(req, res){

    /** First check if file exists */
    gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
        if(!files || files.length === 0){
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        /** create read stream */
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "uploads"
        });

        const bufs = [];
        readstream.on('data', function (chunk) {
            bufs.push(chunk);
        });

        readstream.on('end', function () {
            const fbuf = Buffer.concat(bufs);
            const base64 = fbuf.toString('base64');
            // console.log(base64);
            res.send({"imagesource": base64});

        });

    });

});


//************************************

api.listen(api.get('port'), err => {
	if (err) {
		logger.error(err);
		process.exit(1);
	}

	require('./utils/db');

	fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
		if(file.match(/\.js$/)) require('./routes/' + file)(api);
	});


	logger.info(
		`API is now running on port ${api.get('port')} in ${config.env} mode`
	);
});

module.exports = api;