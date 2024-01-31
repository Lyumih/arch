namespace $ {
	export function $arch_alg_lzw64_encode( s: any ) {
		if( !s ) return s
		var dict = new Map() // Use a Map!
		var data = ( s + "" ).split( "" )
		var out = []
		var currChar
		var phrase = data[ 0 ]
		var code = 256
		for( var i = 1; i < data.length; i++ ) {
			currChar = data[ i ]
			if( dict.has( phrase + currChar ) ) {
				phrase += currChar
			} else {
				out.push( phrase.length > 1 ? dict.get( phrase ) : phrase.codePointAt( 0 ) )
				dict.set( phrase + currChar, code )
				code++
				if( code === 0xd800 ) { code = 0xe000 }
				phrase = currChar
			}
		}
		out.push( phrase.length > 1 ? dict.get( phrase ) : phrase.codePointAt( 0 ) )
		for( var i = 0; i < out.length; i++ ) {
			out[ i ] = String.fromCodePoint( out[ i ] )
		}
		console.log( "LZW MAP SIZE", dict.size, out.slice( -50 ), out.length, out.join( "" ).length )
		return out.join( "" )
	}

}

