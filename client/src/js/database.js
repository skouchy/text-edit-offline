import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Logic to accept some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log('PUT to the database');


    // Creates connection to 'jate' database with version we want to use
    const jateDb = await openDB('jate', 1);

    // Creates new transaction, specifying 'jateDb' as database to use, with specified access privelege
    const transx = jateDb.transaction('jate', 'readwrite');


    // Open up the desired object store.
    const store = transx.objectStore('jate');

    // Use the .delete() method to get all data in the database.
    const request = store.put({ jate: content });

    // Awaiting confirmation of the request.
    const result = await request;
    console.log('🚀 - data saved to the database', result);
    return result;

  } catch (error) {
    console.error('putDb not implemented')
  }
};



// gets all the content from the database
export const getDb = async () => {
  try {

    console.log('GET from the database');

    // Creates connection to 'jate' database with version we want to use
    const jateDb = await openDB('jate', 1);

    // Creates new transaction, specifying 'jateDb' as database to use, with specified access privelege
    const transx = jateDb.transaction('jate', 'readonly');

    // Opens desired Object Store
    const store = transx.objectStore('jate');

    // getAll() requests all data from 'jateDb'
    const request = store.getAll();

    // Confirmation of the request
    const result = await request;

    console.log('result value: ', result);
    return result;

  } catch (error) {
    console.error('getDb not implemented', error);
  }
};

initdb();
