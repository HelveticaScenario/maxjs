import {Id} from './id';

class ObjId extends Id {};
class Obj {
	_id : ObjId = new ObjId();
	public get id() : ObjId {
		return this._id;
	}
	constructor() {
		
	}
}

export  {Obj, ObjId};