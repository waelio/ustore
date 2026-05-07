/**
 * @jest-environment node
 */
import { describe, expect, test } from "@jest/globals";
import Keyv from "keyv";
import {
  createMongoServerStorage,
  createServerStorage,
  serverStorage,
} from "../src/server";

jest.mock("@keyv/mongo", () => jest.fn(() => new Map()));

describe("serverStorage", () => {
  test("default server storage supports async get/set/remove", async () => {
    const key = "server:default";

    await serverStorage.remove(key);
    await serverStorage.set(key, { role: "admin", enabled: true });

    expect(await serverStorage.get(key)).toEqual({
      role: "admin",
      enabled: true,
    });
    expect(await serverStorage.has(key)).toBe(true);

    await serverStorage.remove(key);
    expect(await serverStorage.has(key)).toBe(false);
  });

  test("factory accepts a custom Keyv instance", async () => {
    const keyv = new Keyv<string>({
      store: new Map(),
      namespace: "ustore-test",
    });
    const storage = createServerStorage({ keyv });

    await storage.set("server:keyv", "value");

    expect(await storage.getItem("server:keyv")).toBe("value");
    expect(await storage.hasItem("server:keyv")).toBe(true);
  });

  test("clear removes all data in the storage namespace", async () => {
    const storage = createServerStorage({ namespace: "ustore-clear" });

    await storage.set("alpha", "one");
    await storage.set("beta", "two");
    await storage.clear();

    expect(await storage.has("alpha")).toBe(false);
    expect(await storage.has("beta")).toBe(false);
  });

  test("mongo factory returns a server storage adapter", () => {
    const storage = createMongoServerStorage("mongodb://127.0.0.1:27017/ustore");

    expect(storage.type).toBe("serverStorage");
    expect(typeof storage.get).toBe("function");
    expect(typeof storage.set).toBe("function");
  });
});