import { createCookie, createWorkersKVSessionStorage,Session, SessionStorage } from "@remix-run/cloudflare";
import { BaseAppLoadContext } from "load-context";


export class KVSession {
    storage;
    session;
  
    constructor(storage: SessionStorage, session: Session) {
      this.storage = storage;
      this.session = session;
    }
  
    static async init(request: Request, context: BaseAppLoadContext) {
      const cookie = createCookie("__session", {
        secrets: ["r3m1xr0ck5"],
        sameSite: true,
      });
  
      const storage = createWorkersKVSessionStorage({
        kv: context.cloudflare.env.SESSION,
        cookie: cookie,
      });
  
      const session = await storage
        .getSession(request.headers.get("Cookie"))
        .catch(() => storage.getSession());
  
      return new this(storage, session);
    }
  
    get has() {
      return this.session.has;
    }
  
    get get() {
      return this.session.get;
    }

  
    get flash() {
      return this.session.flash;
    }
  
    get unset() {
      return this.session.unset;
    }
  
    get set() {
      return this.session.set;
    }
  
    destroy() {
      return this.storage.destroySession(this.session);
    }
  
    commit() {
      return this.storage.commitSession(this.session);
    }
  }