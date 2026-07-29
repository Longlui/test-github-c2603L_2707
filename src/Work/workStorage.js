const KEY = "workChanges";
const emptyChanges = { added: [], edited: {}, deleted: [] };

const read = () => JSON.parse(localStorage.getItem(KEY) || JSON.stringify(emptyChanges));
const write = (changes) => localStorage.setItem(KEY, JSON.stringify(changes));

export const mergeWorks = (apiWorks) => {
  const changes = read();
  const savedWorks = apiWorks
    .filter((work) => !changes.deleted.includes(work.id))
    .map((work) => changes.edited[work.id] || work);

  return [...savedWorks, ...changes.added];
};

export const saveWork = (work) => {
  const changes = read();
  const index = changes.added.findIndex((item) => item.id === work.id);

  if (index >= 0) changes.added[index] = work;
  else changes.edited[work.id] = work;

  write(changes);
};

export const addWork = (work) => {
  const changes = read();
  changes.added.unshift({ ...work, id: Date.now() });
  write(changes);
};

export const findSavedWork = (id) => {
  const changes = read();
  return changes.added.find((work) => String(work.id) === String(id)) || changes.edited[id];
};

export const removeWork = (id) => {
  const changes = read();
  changes.added = changes.added.filter((work) => String(work.id) !== String(id));

  if (!changes.deleted.includes(Number(id))) changes.deleted.push(Number(id));
  delete changes.edited[id];
  write(changes);
};
