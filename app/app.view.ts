namespace $.$$ {
	export class $arch_app extends $.$arch_app {

		initial_length(): string {
			return this.initial().length.toString()
		}

		@$mol_mem
		fractals( next?: any ): { id: string, name: string, value: string, decode: string }[] {
			return next ?? []
		}

		fractal_list(): readonly any[] {
			return this.fractals().map( ( { id } ) => this.Fractal( id ) )
		}

		get_fractal( id: string ): any {
			return this.fractals().find( fractal => fractal.id === id )
		}

		fractal_name( id: any ): string {
			return this.get_fractal( id )?.name ?? 'no name'
		}

		fractal_result( id: any ): string {
			return this.get_fractal( id )?.value ?? ''
		}

		fractal_decode( id: any ): string {
			return this.get_fractal( id )?.decode ?? ''
		}

		fractal_last() {
			return this.fractals()[ this.fractals().length - 1 ]
		}

		fractal_length( id: any ): string {
			return this.get_fractal( id )?.value?.length.toString()
		}

		fractal_add( next?: any ) {

			this.fractals( [ ...this.fractals(),
			{ id: $mol_guid(), name: this.algorithm(), value: this.algorithm_encode(), decode: this.algorithm_decode() } ] )
		}

		fractal_remove( next?: any ) {
			this.fractals( this.fractals().filter( fractal => fractal.id !== next ) )
		}

		algorithm_decode(): string {
			const encode = this.algorithm_encode()
			console.log( 'encode', encode )
			return this.$.$arch_alg_lzw64_decode( encode )
		}

		algorithm_encode() {
			const value = this.fractal_last()?.value ?? this.initial()
			switch( this.algorithm() ) {
				case 'lzw64':
					return this.$.$arch_alg_lzw64_encode( value )
				case 'sub4':
					return value.substring( 0, value.length - 4 )
				case 'sub8':
					return value.substring( 0, value.length - 8 )
				case 'sub16':
					return value.substring( 0, value.length - 16 )
				case 'add3':
					return value + '000'
				default:
					return value
			}
		}

		result_count(): string {
			return this.fractals().length.toLocaleString()
		}

		result_meta(): string {
			return this.fractals().map( f => f.name ).join( ',' )
		}

		result_meta_length() {
			return this.result_meta().length.toLocaleString()
		}

		result_value(): string {
			return this.fractal_last()?.value ?? ''
		}

		result_length(): string {
			return this.result_value().length.toLocaleString()
		}

		result_all_length(): string {
			return ( +this.result_length() + +this.result_meta_length() ).toLocaleString()
		}
	}
}
