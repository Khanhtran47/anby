import type { Module, ModuleComponent } from '@/services/hoyolab/models/entry-page';
import type { FilterValue } from './models/agent';

interface FilterValueInput {
	id?: string;
	icon?: string;
	value?: string;
	enum_string?: string;
}

function mergeFilterValues(
	filterValues: FilterValueInput[] | undefined,
	hakushinValues: FilterValue[],
): FilterValue[] {
	if (filterValues && filterValues.length > 0) {
		return filterValues?.map((fv) => {
			const hv = hakushinValues.find((h) => h.id?.toString() === fv.id?.toString());
			return {
				id: fv.id,
				icon: fv.icon || hv?.icon,
				value: fv.value || hv?.value,
				enumString: fv.enum_string || hv?.enumString,
			};
		});
	}
	return hakushinValues;
}

const createEnumString = (value?: string) =>
	value ? value?.replace(/\s+/g, '-').toLowerCase() : '';

function findModuleComponent(
	modules: Module[] | undefined,
	componentId: string,
): Module | undefined {
	return modules?.find((module) =>
		module.components.some(
			(comp: ModuleComponent) => comp.component_id === componentId && comp.data && comp.data !== '',
		),
	);
}

function getComponentData(module: Module | undefined, componentId: string): string | undefined {
	return module?.components.find((comp) => comp.component_id === componentId)?.data;
}

export { mergeFilterValues, createEnumString, findModuleComponent, getComponentData };
