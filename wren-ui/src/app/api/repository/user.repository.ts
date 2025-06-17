import { components } from "@/common";
import { Knex } from "knex";

export class UserRepository {
  knex: Knex;

  constructor() {
    this.knex = components.knex
  }

  async findByEmailPassword(email: string, password: string): Promise<any> {
    return this.knex('user').where({ email }).where({ password }).first();
  }
}