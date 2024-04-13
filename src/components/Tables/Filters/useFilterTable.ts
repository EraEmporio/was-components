import { ref, onBeforeMount } from 'vue'
import { ItemColum } from '../EraDataTable.vue';

/**
 * Custom hook for managing filter functionality in a table based on PrimeVue premises.
 * @param filterDisplay - The display mode for the filters (e.g., "menu" or "row").
 * @param columns - An array of columns for the filter table.
 * @returns An object containing the managed state for the filters.
 */
export function useFilterTable(filterDisplay: string | unknown, columns: Array<ItemColum>) {
    // state encapsulated and managed by the composable
    const filters = ref();

    /**
     * Retrieves the field value for a given column.
     * @param col - The column object.
     * @returns The field value.
     */
    const getField = (col: ItemColum): string => {
        return (col.props.filterField ? col.props.filterField : col.field) as string;
    };

    /**
     * Generates a filter model template for a given column.
     * @param col - The column object.
     * @returns The filter model template.
     */
    const getFilterModelTemplate = (col: ItemColum) => {
        return { value: null, matchMode: col.filter?.matchMode };
    };

    /**
     * Mounts a menu filter for a given column.
     * @param col - The column object.
     * @param filterModel - The filter model.
     */
    const mountMenuFilter = (col: ItemColum, filterModel: { [key: string]: any }, dynamicFilter: { [key: string]: any }) => {
        const field = getField(col);

        dynamicFilter[field] = {
            operator: col.filter?.operator,
            constraints: [{ ...filterModel }],
        };
    }

    /**
     * Mounts a row filter for a given column.
     * @param col - The column object.
     * @param filterModel - The filter model.
     */
    const mountRowFilter = (col: ItemColum, filterModel: { [key: string]: any }, dynamicFilter: { [key: string]: any }) => {
        const field = getField(col);

        dynamicFilter[field] = { ...filterModel };
    }

    /**
     * Mounts the filters based on the filter display mode.
     */
    const mountFilters = async () => {
        let dynamicFilter: { [key: string]: any } = {};
        const mountFilter = filterDisplay === "menu" ? mountMenuFilter : mountRowFilter;

        columns.forEach((col) => {
            if (col.filter) {
                const filterModel = getFilterModelTemplate(col)
                mountFilter(col, filterModel, dynamicFilter);
            }
        });

        filters.value = dynamicFilter;
    };


    onBeforeMount(() => {
        mountFilters();
    })
    // expose managed state as return value
    return { filters };
}