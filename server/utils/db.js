const config = require('../configs/db.json').mongodb;
const MongoClient = require('mongodb').MongoClient;

const connect = async (exec) => {
  try {
    var mongo = await MongoClient.connect(
      config.host.replace('{DataBaseName}', config.database),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    var val = await exec(mongo.db(config.database));
    mongo.close();
    return val;
  } catch (ex) {
    console.log(ex);
    return null;
  }
};
const get_update_obj = (obj) => {
  var update_obj = {
    $set: {},
  };
  update_obj.$set = obj;
  return update_obj;
};
module.exports = {
  createCollection: (table) => {
    return connect(async (db) => {
      return await db.createCollection(table);
    });
  },
  find: (table, obj_query) => {
    return connect(async (db) => {
      return await db.collection(table).find(obj_query).toArray();
    });
  },
  insertOne: (table, obj) => {
    return connect(async (db) => {
      return (await db.collection(table).insertOne(obj)).ops[0]._id;
    });
  },
  insertMany: (table, objs) => {
    return connect(async (db) => {
      return (await db.collection(table).insertMany(objs)).insertedCount;
    });
  },
  updateOne: (table, obj_query, obj_value) => {
    return connect(async (db) => {
      return (
        await db
          .collection(table)
          .updateOne(obj_query, get_update_obj(obj_value))
      ).modifiedCount;
    });
  },
  updateMany: (table, obj_query, obj_value) => {
    return connect(async (db) => {
      return (
        await db
          .collection(table)
          .updateMany(obj_query, get_update_obj(obj_value))
      ).modifiedCount;
    });
  },
  deleteOne: (table, obj) => {
    return connect(async (db) => {
      return await db.collection(table).deleteOne(obj);
    });
  },
  deleteMany: (table, objs) => {
    return connect(async (db) => {
      return (await db.collection(table).deleteMany(objs)).deletedCount;
    });
  },
  aggregate: (table, aggregate_array) => {
    return connect(async (db) => {
      return await db.collection(table).aggregate(aggregate_array).toArray();
    });
  },
  count: (table, obj_query) => {
    return connect(async (db) => {
      return await db.collection(table).find(obj_query).count();
    });
  },
  join: (table_1, table_2, key_1, key_2) => {
    return connect(async (db) => {
      return await db
        .collection(table_1)
        .aggregate([
          {
            $lookup: {
              from: table_2,
              localField: key_1,
              foreignField: key_2,
              as: table_2,
            },
          },
        ])
        .toArray();
    });
  },
};
