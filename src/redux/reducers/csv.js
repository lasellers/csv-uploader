const initialState = {
    csv_header: [],
    csv_data: [],
    remapped_csv_header: [],
    remapped_csv_data: [],
    remapped_order: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ADD_CSV_HEADER': {
            const {csv_header} = action.payload;
            return {
                ...state,
                csv_header
            };
        }
        case 'ADD_CSV_DATA': {
            const {csv_data} = action.payload;
            return {
                ...state,
                csv_data
            };
        }
        case 'ADD_REMAPPED_CSV_HEADER': {
            const {remapped_csv_data} = action.payload;
            return {
                ...state,
                remapped_csv_data
            };
        }
        case 'ADD_REMAPPED_CSV_DATA': {
            const {remapped_csv_data} = action.payload;
            return {
                ...state,
                remapped_csv_data
            };
        }
        case 'ADD_REMAPPED_COLUMN_ORDER': {
            const {remapped_order} = action.payload;
            return {
                ...state,
                remapped_order
            };
        }
        default:
            return state;
    }
}
