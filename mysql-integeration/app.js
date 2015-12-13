Object.prototype.renameProperty = function (oldName, newName) {
     // Do nothing if the names are the same
     if (oldName == newName) {
         return this;
     }
    // Check for the old property name to avoid a ReferenceError in strict mode.
    if (this.hasOwnProperty(oldName)) {
        this[newName] = this[oldName];
        delete this[oldName];
    }
    return this;
};

var mongoose = require('mongoose');
var mysql  = require('mysql');
var MongoClient = require('mongodb').MongoClient;
var lwip = require('lwip');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'zxcvb',
  database : 'salardugme',
});
connection.connect();


connection.query('SELECT * FROM data_zamak  ORDER BY zamak_code LIMIT 100, 100', function(err, rows, fields) {
  if (err) throw err;
  rows.forEach(saveData);
 
  function saveData(row){

  	saveMongo(changeConfig(row));
  }


}); 

function changeConfig(row){
	row.renameProperty('zamak_code', 'code');
	row.renameProperty('zamak_brand', 'برند');
	row.renameProperty('zamak_wieght', 'وزن');
	row.renameProperty('zamak_pin_count', 'تعداد پین');
	row.renameProperty('zamak_hole_count', 'تعداد سوراخ');
	row.renameProperty('zamak_main_template_count', 'شماره قالب اصلی');
	row.renameProperty('zamak_paran_template_count', 'شماره قالب پران');
	row.renameProperty('zamank_vasher_template_count', 'شماره قالب واشر');
	row.renameProperty('zamak_special', 'اختصاصی');
	row.renameProperty('quaninmold', 'تعداد در قالب');
	row.renameProperty('zamak_size', 'سایز');
	row.renameProperty('zamak_model', 'مدل');

	['zamak_id', 'zamak_name', 
	 'zamak_picture_type', 'zamak_price',
	 'user_id', 'moshtari_id', 'montazh_ghaleb',
	 ].forEach(function(k){

  	delete row[k];
	});

	return row;
}

function saveMongo(row){
	MongoClient.connect('mongodb://localhost/amir', function(err, db) {
	  if (err) throw err;

	  db.collection('models').findOne({name: 'زاماک'}, insert); 

	  function insert(err, model){
	  	image = row.zamak_picture;
	  	delete row.zamak_picture;
	  	row._model = model._id;

			db.collection('products').insert(row, function(err, product){
				writeImage(__dirname + '/../storage/images/products/'+ product.ops[0]._id +'.jpg', image);	
			});
	  };

	});

}


function writeImage(path, data, callback){
  var imageBuffer = new Buffer(data);
  lwip.open(imageBuffer, 'jpeg', function(err, image){
    image.resize(230, 200,function(err, image){
      image.writeFile(path, function(err){
        if(err){console.log(err)};
        typeof callback === 'function' && callback();
      });
    });
  });
}




connection.end(); 
 
