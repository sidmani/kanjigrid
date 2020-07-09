import jszip from 'jszip';
import initSQL from 'sql.js';

function createKanjiList(db) {
  const chars = {};
  const noteToChar = {};
  const stmt = db.prepare('SELECT * FROM notes');
  if (!stmt.step()) {
    // TODO: error
  }
  const ranges = [
    '[\u3040-\u30ff]',
    '[\u4e00-\u9faf]',
  ].join('|');

  // TODO: this could be faster
  while (stmt.step()) {
    const note = stmt.getAsObject();
    noteToChar[note.id] = [];
    const fields = note.flds.split('\u001f');
    fields
      .filter((f) => {
        const res = f.replace(new RegExp(ranges, 'g'), '');
        return res.length === 0;
      })
      .forEach((f) => {
        f.replace(new RegExp('[\u3040-\u30ff]', 'g'), '')
          .split('')
          .forEach((c) => {
            chars[c] = {};
            noteToChar[note.id].push(c);
          });
      });
  }

  console.log(chars);
  stmt.free();
  return { chars, noteToChar };
}

function assignEase(db, noteToChar, chars) {
  const stmt = db.prepare('SELECT * FROM cards');

  while (stmt.step()) {
    const card = stmt.getAsObject();
    if (!noteToChar[card.nid]) {
      continue;
    }

    noteToChar[card.nid].forEach((c) => {
      if (chars[c].new) {
        return;
      }

      if (card.type === 0 && !chars[c].ease) {
        // new card
        chars[c].new = true;
      } else {
        chars[c].ease = Math.max(chars[c].ease || 0, card.factor);
      }
    });
  }

  stmt.free();
}

export default function process(file) {
  return Promise.all([
    jszip.loadAsync(file)
      .then((r) => r.file('collection.anki2'))
      .then((f) => f.async('uint8array')),
    initSQL({
      locateFile: (f) => `/${f}`,
    }),
  ])
    .then(([data, SQL]) => {
      const db = new SQL.Database(data);
      const { chars, noteToChar } = createKanjiList(db);
      assignEase(db, noteToChar, chars);
      return chars;
    });
}
