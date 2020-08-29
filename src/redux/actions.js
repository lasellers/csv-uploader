export const addCsvHeader = data => ({
    type: 'ADD_CSV_HEADER',
    payload: {
        csv_header: data
    }
});

export const addCsvData = data => ({
    type: 'ADD_CSV_DATA',
    payload: {
        csv_data: data
    }
});

export const addRemappedCsvHeader = data => ({
    type: 'ADD_REMAPPED_CSV_HEADER',
    payload: {
        remapped_csv_header: data
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