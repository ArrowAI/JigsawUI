db.auth('root', 'mongo')

db = db.getSiblingDB('arrowaidb')

db.createUser({
  user: 'arrowaiuser',
  pwd: 'arrowaipass',
  roles: [
    {
      role: 'root',
      db: 'arrowaidb',
    },
  ],
});

// Add data in arrowaidb
db.testcollection.insertMany([
    { field: "value"}
])