import { openDB } from 'idb';

const initdb = async () =>
//We are creating a new database named jate which will be using version 1 of the database
  openDB('jate', 1, {
// Add our database schema if it is has not already been initialized
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // create a new object store for the data and give it an key name of 'id' which needs to be incremental 
      // automatically
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');
  // Create a connection to the databse and version we want to use
    const JateDB = await openDB("jate", 1);
  // Create a new transaction and specify the database and data privileges
    const tx = JateDB.transaction("jate", "readwrite");
  // Open up the desired object store
    const store = tx.objectStore("jate");
  //The put() method of the IDBObjectStore interface updates a given record in a database, or inserts a new record if the given item does not already exist.
    const request = store.put({jate:content});
  //Get confirmation of the request
    const result = await request;
    console.log("Await my request and save data to DB", result);

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
// Create a connection to the database and version we want to use
  const JateDB = await openDB("jate", 1);
// Creating a new transaction and specify the database and data privileges
  const tx = JateDB.transaction("jate", "readonly");
// Open up desired object store
  const store = tx.objectStore("jate");
// Use .getAll()method to get the data from the database
  const request = store.getAll();
// Get confirmation of the request
  const result = await request;
  console.log("Get All the contents", result);
};
// Start the database

initdb();
