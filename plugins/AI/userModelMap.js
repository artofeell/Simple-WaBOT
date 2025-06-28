const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'userModelDB.json');

function loadDB() {
  if (!fs.existsSync(dbPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } catch {
    return {};
  }
}

function saveDB(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

function get(user) {
  const db = loadDB();
  return db[user];
}

function set(user, data) {
  const db = loadDB();
  db[user] = data;
  saveDB(db);
}

function del(user) {
  const db = loadDB();
  delete db[user];
  saveDB(db);
}

module.exports = { get, set, del };