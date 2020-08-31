export const addCsvHeaders = data => ({
    type: 'ADD_CSV_HEADERS',
    payload: {
        csv_headers: data
    }
});

export const addCsvData = data => ({
    type: 'ADD_CSV_DATA',
    payload: {
        csv_data: data
    }
});

export const addUnmappedData = data => ({
    type: 'ADD_UNMAPPED_DATA',
    payload: {
        unmapped_data: data
    }
});

export const addRemappedCsvData = data => ({
    type: 'ADD_REMAPPED_CSV_DATA',
    payload: {
        remapped_csv_data: data
    }
});

export const addRemappedColumnOrder = data => ({
    type: 'ADD_REMAPPED_COLUMN_ORDER',
    payload: {
        remapped_order: data
    }
});

export const addError = data => ({
    type: 'ADD_ERROR',
    payload: {
        error: data
    }
});