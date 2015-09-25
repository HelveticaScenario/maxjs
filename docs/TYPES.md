#Brain Dump -- Types
In maxjs, programs are built around the idea of passing messages containing data between self contained execution units
called objects. this is conceptually similar to smalltalk and obj-c's use of message passing and listening to perform actions.

While Objects implementations are free to use whatever data types they need to perform their task, in order to have a programing
system that requires a low mental overhead, restricting communication between objects to a concise set of data types is necessary.

##Bang
A Bang is a data type that only has one value, `bang`. bangs are used to trigger things and are basically a piece of data
that universally means 'Do The Thing'

##Numbers 
javascript only has one number type, `Number`, a double precision 64 bit floating point number, so any number type beyond
that would have to be simulated. not sure if we really need that. It should be noted that puredata [only has floating point
numbers](http://puredata.info/docs/tutorials/PdForMaxUsers#pd-has-no-integers) so there is a precident for not needing them

##Symbols

##Lists/Spreads

##Matricies