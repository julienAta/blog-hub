import seedData from "../data/seed";

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:8000") + "/api/projects/blog-hub/collections";
const COLLECTIONS = ["articles", "categories", "authors"];

class Collection {
  constructor(name) {
    this.name = name;
    this.url = `${API_BASE}/${name}`;
    this.listeners = new Set();
    this._seeded = false;
    this._seed();
  }

  async _seed() {
    if (this._seeded) return;
    this._seeded = true;
    const data = (seedData && seedData[this.name]) || [];
    if (data.length === 0) return;
    try {
      await fetch(`${this.url}/seed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: data }),
      });
    } catch (e) {
      console.warn(`[db] seed ${this.name} failed:`, e);
    }
  }

  _notify() {
    this.listeners.forEach((fn) => fn());
  }

  async getAll() {
    const res = await fetch(this.url);
    return res.ok ? res.json() : [];
  }

  async getById(id) {
    const res = await fetch(`${this.url}/${id}`);
    return res.ok ? res.json() : null;
  }

  async create(data) {
    const res = await fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    const item = await res.json();
    this._notify();
    return item;
  }

  async update(id, data) {
    const res = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    if (!res.ok) return null;
    const item = await res.json();
    this._notify();
    return item;
  }

  async delete(id) {
    const res = await fetch(`${this.url}/${id}`, { method: "DELETE" });
    if (res.ok) this._notify();
    return res.ok;
  }

  async clear() {
    await fetch(this.url, { method: "DELETE" });
    this._notify();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }
}

const collections = {};
COLLECTIONS.forEach((name) => {
  collections[name] = new Collection(name);
});

const db = {
  collection(name) {
    if (!collections[name]) {
      collections[name] = new Collection(name);
    }
    return collections[name];
  },
};

export default db;
