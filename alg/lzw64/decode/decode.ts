namespace $ {
	export function $arch_alg_lzw64_decode( s: any ) {
		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
		var b64d: any = {}
		for( var i = 0; i < 64; i++ ) {
			b64d[ b64.charAt( i ) ] = i
		}
		var d = new Map()
		var num = 256
		var word = String.fromCharCode( b64d[ s[ 0 ] ] + ( b64d[ s[ 1 ] ] << 6 ) + ( b64d[ s[ 2 ] ] << 12 ) )
		var prev = word
		var o = [ word ]
		for( var i = 3; i < s.length; i += 3 ) {
			var key = b64d[ s[ i ] ] + ( b64d[ s[ i + 1 ] ] << 6 ) + ( b64d[ s[ i + 2 ] ] << 12 )
			word = key < 256 ? String.fromCharCode( key ) : d.has( key ) ? d.get( key ) : word + word.charAt( 0 )
			o.push( word )
			d.set( num++, prev + word.charAt( 0 ) )
			prev = word
			if( num == ( 1 << 18 ) - 1 ) {
				d.clear()
				num = 256
			}
		}
		return decodeURIComponent( escape( o.join( "" ) ) )
	}
}

