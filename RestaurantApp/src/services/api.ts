import type { MenuItem } from '../types';

const BASE_URL = "https://palladic-unprecipitatetely-tenisha.ngrok-free.dev";

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export async function getMenu(): Promise<MenuItem[]> {
  const res = await fetch(`${BASE_URL}/menu`);
  return handle<MenuItem[]>(res);
}

export async function addDish(newDish: Partial<MenuItem>): Promise<MenuItem> {
  const res = await fetch(`${BASE_URL}/menu`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newDish),
  });
  return handle<MenuItem>(res);
}

export async function updateDish(
  id: number,
  updates: Partial<MenuItem>
): Promise<MenuItem> {
  const res = await fetch(`${BASE_URL}/menu/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  return handle<MenuItem>(res);
}

export async function deleteDish(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/menu/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}
