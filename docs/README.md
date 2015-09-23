#Brain Dump

##Architecture Overview
maxjs can be broken down into three distinct parts

###1. Runtime
The Runtime is a library that represents the maxjs execution environment. It manages all patchers and is the sole
method of (programatic) interaction with them. The Runtime should be as thin as possible and not provide any functionality
that wouldn't better be provided as an object. The Runtime should be embeddable in other applications and should be able
to run without a GUI. Ideally, the Runtime should not be browser dependant, and shouldnt need to be unless we decide to 
implement timing inside of the Runtime instead of as some seperate resource that objects will depend on.
Requires further discussion.
####Some things you can do with it
* create/edit/destroy patchers
* create/update/destroy objects in patchers
* add/remove connections between outlets
* query info about patchers, objects, and graphs
* interface with published methods of objects (eg: `setValue` on numbox object; `trigger` on bang object; `addListener` 
for subscribing events such as 'onChange')

###2. GUI
The GUI is React.js app that wraps a Runtime instance

###3. Registry
The registry is a server that provides discovery and distribution of objects. While the Runtime may provide a small set
of core objects, any third-party objects will need to be hosted on a registry.
####Some things you can do with it
* query for objects by name, author, keywords, etc. (the Runtime can also use this to provide autocomplete) 
* download bundled object definitions (for use by the Runtime to fetch object definitions that patcher requires)
* upload new object definitions (eg: from the Runtime)


##Terminology

###Patcher
A patcher is a maxjs program. It contains instances of objects and the connections between the object *lets. A
patcher can be used as an object in another patcher by using the `patcher` and `bpatcher` objects.

###Object
An object is a maxjs unit of execution. All execution in maxjs happens through objects. An object is similar to the OOP concept of Objects, except that it only does one thing, like a function. Objects are instanced from Object
Definitions, which define how they work and what they do. Objects may be instantiated with an optional list of arguments. Objects communicate with other objects by emiting and recieving messages of various types. Objects emit messages through outlets and recieve messages through inlets. Objects may have 1 or more inlets and 0 or more outlets. With the exception of the first inlet, Objects create their *lets at time of instantiation, and as such may create different numbers and types of *lets given different instantiation arguments.

###*Lets
*Lets are the pathways through which messages are passed from object to object. There are two types of *let; Inlets and Outlets. Through Connections, Inlets and Outlets are routed together.

###Connections/Lines/Edges/Patch Cords
Connections aka Lines aka Edges aka Patch Cords are the message routing mechanism used by maxjs. Each Connection
specifies an outlet and an inlet that should be routed together. There may be a maximum of one Connection between any given inlet and outlet, however both inlets and outlets may have more than one connection at a time.

###Messages
Messages are the data passed between objects through *lets.

##Things requiring further thought and discussion
* How should timing be implemented?
	* Use `setTimeout` and `setInterval` methods
		* Pros
			* core to language, supported in all runtimes (browsers and servers)
			* single code base
			* wont require platform specific code
			* simpler
		* Cons
			* not very accurate
	* Use Web Audio API (see [http://www.html5rocks.com/en/tutorials/audio/scheduling/](http://www.html5rocks.com/en/tutorials/audio/scheduling/))
		* Pros
			* very accurate
		* Cons
			* not as simple (however [libraries exist](https://github.com/sebpiq/WAAClock) to wrap this in a simple api)
			* requires newish browsers that support the web-audio api
	* Use process.hrtime based approach (see [https://nodejs.org/api/process.html#process_process_hrtime](https://nodejs.org/api/process.html#process_process_hrtime))
		* Pros
			* very accurate
		* Cons
			* not as simple (however [libraries exist](https://github.com/Krb686/nanotimer) to wrap this in a simple api)
			* requires nodejs
		
* Where should timing be implemented?
	* As a part of the Runtime
	* As a seperate library that can be consumed by objects that require it
