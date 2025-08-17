import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('smartlife.db');

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        deadline TEXT,
        completed INTEGER
      );
    `);
  }
};

export const getTasks = async (filter: 'all' | 'done' | 'todo' = 'all'): Promise<any[]> => {
  if (!db) await initDatabase();
  let query = 'SELECT * FROM tasks';
  if (filter === 'done') query += ' WHERE completed = 1';
  if (filter === 'todo') query += ' WHERE completed = 0';
  query += ' ORDER BY id DESC';
  return await db!.getAllAsync(query);
};

export const getTaskById = async (id: number): Promise<any | null> => {
  if (!db) await initDatabase();
  const rows = await db!.getAllAsync('SELECT * FROM tasks WHERE id = ?', [id]);
  return rows.length ? rows[0] : null;
};

export const insertTask = async (title: string, deadline?: string): Promise<void> => {
  if (!db) await initDatabase();
  await db?.runAsync(
    'INSERT INTO tasks (title, deadline, completed) VALUES (?,?,?)',
    [title, deadline ?? null, 0]
  );
};

export const updateTask = async (id: number, title: string, deadline?: string, completed?: boolean): Promise<void> => {
  if (!db) await initDatabase();
  await db?.runAsync(
    'UPDATE tasks SET title = ?, deadline = ?, completed = ? WHERE id = ?',
    [title, deadline ?? null, completed ? 1 : 0, id]
  );
};

export const deleteTask = async (id: number): Promise<void> => {
  if (!db) await initDatabase();
  await db!.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
};

export const toggleComplete = async (id: number, value: boolean): Promise<void> => {
  if (!db) await initDatabase();
  await db!.runAsync('UPDATE tasks SET completed = ? WHERE id = ?', [value ? 1 : 0, id]);
};
