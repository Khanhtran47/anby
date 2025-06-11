export interface MenuFilters {
	data: {
		filters: Filter[];
	};
	message: string;
	retcode: number;
}

export interface Filter {
	id: string;
	key: string;
	text: string;
	values: Value[];
}

export interface Value {
	enum_string: string;
	icon: string;
	id: string;
	value: string;
}
