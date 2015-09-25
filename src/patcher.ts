/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />

import {Id} from './id';
import {ObjId, Obj} from './obj';

class PatcherId extends Id {};
class Patcher {
  _id: PatcherId = new PatcherId();
  objs: Map<ObjId, Obj> = new Map<ObjId, Obj>();
  public get id() : ObjId {
    return this._id;
  }

  constructor(opts: any) {

  }
}

export {Patcher, PatcherId};
