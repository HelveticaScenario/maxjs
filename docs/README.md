#Brain Dump

##<a name="architecture"/></a> Architecture Overview
maxjs can be broken down into three distinct parts

###<a name="runtime"></a>1. Runtime
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

###<a name="gui"></a>2. GUI
The GUI is React.js app that wraps a Runtime instance

###<a name="registry"></a>3. Registry
The registry is a server that provides discovery and distribution of objects. While the Runtime may provide a small set
of core objects, any third-party objects will need to be hosted on a registry.
####Some things you can do with it
* query for objects by name, author, keywords, etc. (the Runtime can also use this to provide autocomplete) 
* download bundled object definitions (for use by the Runtime to fetch object definitions that patcher requires)
* upload new object definitions (eg: from the Runtime)


##<a name="discuss"></a>Things requiring further thought and discussion
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
