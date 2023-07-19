import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  console.log("Posting to the DB");
  const notesDB = await openDB("jate", 1);
  const nx = notesDB.transaction("jate", "readwrite");
  const store = nx.objectStore("jate");
  const request = store.add({ note: content });
  const result = await request;
  console.log("Notes data saved to the database", result);
};

export const getDb = async () => {
  console.log("GET all from the database");
  const notesDb = await openDB("jate", 1);
  const nx = notesDb.transaction("jate", "readonly");
  const store = nx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  console.log("result.value", result);
};

initdb();
