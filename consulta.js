var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

// ObjectID de algum contato existente
var _idProcurado = new ObjectID('58c72c06bbb374b78a4bc38a');

MongoClient.connect('mongodb://127.0.0.1:27017/cantinaasserdb',
    function (erro, db) {
        if (erro) throw err;
        db.collection('categorias').findOne({ _id: _idProcurado },
            function (erro, categoria) {
                if (erro) throw err;
                console.log(categoria);
            }
        );
    }
);
