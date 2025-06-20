import { components } from "@/common";
import { Knex } from "knex";
import bcrypt from "bcryptjs";

export class UserRepository {
  knex: Knex;

  constructor() {
    this.knex = components.knex
  }

  async findByEmailPassword(email: string, password: string): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    console.log("DEBUG APAGAR");
    console.log(email, await bcrypt.hash(password, salt));
    const user = await this.knex('user').where({ email }).first();
    if(!user) {
      return undefined;
    }
    if(await bcrypt.compare(password, user.password)) {
      return user;
    } else {
      return undefined;
    }
  }

  async findOrCreateUser(ssoId: string, email: string) {
    let user = await this.knex('user').where({ email }).first();
    if(!user) {
      await this.knex('user').insert({
        sso_id: ssoId,
        email: email,
        enabled: true,
      })
    }

    user = await this.knex('user').where({ email }).first();
    if(!user || !user.enabled) {
      return undefined;
    }

    return user;
  }
}