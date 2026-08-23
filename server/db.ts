import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, vehicleFavorites } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function listVehicleFavorites(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Favorites storage is unavailable.");

  const rows = await db
    .select({ vehicleId: vehicleFavorites.vehicleId })
    .from(vehicleFavorites)
    .where(eq(vehicleFavorites.userId, userId))
    .orderBy(desc(vehicleFavorites.createdAt));

  return rows.map((row) => row.vehicleId);
}

export async function toggleVehicleFavorite(userId: number, vehicleId: string) {
  const db = await getDb();
  if (!db) throw new Error("Favorites storage is unavailable.");

  const match = await db
    .select({ id: vehicleFavorites.id })
    .from(vehicleFavorites)
    .where(and(eq(vehicleFavorites.userId, userId), eq(vehicleFavorites.vehicleId, vehicleId)))
    .limit(1);

  if (match[0]) {
    await db.delete(vehicleFavorites).where(eq(vehicleFavorites.id, match[0].id));
    return { vehicleId, saved: false };
  }

  await db.insert(vehicleFavorites).values({ userId, vehicleId });
  return { vehicleId, saved: true };
}
