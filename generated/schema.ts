// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Gravatar extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("owner", Value.fromBytes(Bytes.empty()));
    this.set("displayName", Value.fromString(""));
    this.set("imageUrl", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Gravatar entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Gravatar entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Gravatar", id.toString(), this);
    }
  }

  static load(id: string): Gravatar | null {
    return changetype<Gravatar | null>(store.get("Gravatar", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get displayName(): string {
    let value = this.get("displayName");
    return value!.toString();
  }

  set displayName(value: string) {
    this.set("displayName", Value.fromString(value));
  }

  get imageUrl(): string {
    let value = this.get("imageUrl");
    return value!.toString();
  }

  set imageUrl(value: string) {
    this.set("imageUrl", Value.fromString(value));
  }
}
