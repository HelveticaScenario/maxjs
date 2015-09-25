import {Id} from './id';
import {Patcher, PatcherId} from './patcher';

/**
 * Runtime
 */

class Runtime {
  patchers : Array<Patcher> = [];
  constructor(opts : any) {

  }
  createPatch() : PatcherId {
    var newPatcher : Patcher = new Patcher({});
    this.patchers.push(newPatcher);
    return newPatcher.id;
	}
}

class A {}
class B extends A {}
class C extends A {}
var a : A = new A();
a = new B();
var b : B = new B();
b = new C();


export {Runtime};
