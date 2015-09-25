import {Id} from './id';

interface Let {

}

/**
 * Outlet
 */
class OutletId extends Id {};
class Outlet implements Let {
	private _id : OutletId = new OutletId();
	public get id() : OutletId {
		return this._id;
	}
	constructor() {

	}
}

/**
 * Inlet
 */
class InletId extends Id {};
class Inlet implements Let {
	_id : InletId = new InletId();
	public get id() : InletId {
		return this._id;
	}
	constructor(parameters) {

	}
}

export {Let, Outlet, OutletId, Inlet, InletId};
