namespace $.$$ {
	export class $arch_app extends $.$arch_app {

		initial_length(): string {
			return this.initial().length.toString()
		}

		@$mol_mem
		fractals( next?: any ): { id: string, name: string, value: string }[] {
			return next ?? [ { id: '1', name: 'fractal', value: this.initial() } ]
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

		fractal_length( id: any ): string {
			return this.get_fractal( id )?.value?.length.toString()
		}

		fractal_add( next?: any ) {

			this.fractals( [ ...this.fractals(), { id: $mol_guid(), name: this.algorithm(), value: this.algorithm_calc() } ] )
		}

		fractal_remove( next?: any ) {
			this.fractals( this.fractals().filter( fractal => fractal.id !== next ) )
		}

		algorithm_calc() {
			const value = this.fractals()[ this.fractals().length - 1 ]?.value ?? ''
			switch( this.algorithm() ) {
				case 'sub4':
					return value.substring( 0, value.length - 4 )
				case 'sub8':
					return value.substring( 0, value.length - 8 )
				case 'sub16':
					return value.substring( 0, value.length - 16 )
				default:
					return 'error, no algorithm'
			}
		}

	}
}
