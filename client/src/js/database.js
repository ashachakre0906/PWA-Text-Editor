import { openDB } from 'idb';

const initdb = async () =>
//We are creating a new database named jate which will be using version 1 of the database
  openDB('jate', 1, {
// Add our databse schema if it is has not already been initialized
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
  // console.error('putDb not implemented')
    const JateDB = await openDB("jate", 1);
    const tx = JateDB.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    const request = store.put({jate:content})
    const result = await request
    console.log("Await my request and save data to DB", result)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const JateDB = await openDB("jate", 1);
  const tx = JateDB.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll()
  const result = await request
  console.log("RESULTS: ", result)
};

initdb();
