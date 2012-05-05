/*
 This is the cheapest hack of the universe.
 It only probably works for this exact case, it's not even a shim, it just pretends to be.
*/
void function () {

function FloatArray (length) {
	for (var i=0; i<length; i++) {
		this[i] = 0
	}

	this.length = length
}

if (typeof Float32Array === 'undefined') {
	Float32Array = FloatArray
}

if (typeof Float64Array === 'undefined') {
	Float64Array = FloatArray
}

}()
