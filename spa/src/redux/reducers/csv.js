const initialState = {
    error: null,
    csv_headers: [],
    csv_data: [],
    unmapped_data: [],
    remapped_csv_data: [],
    remapped_column_order: [],
    // read only SSOA
    db_headers: ['team_id', 'name', 'phone', 'email', 'sticky_phone_number_id', 'created_at', 'updated_at'],
    db_named_headers: ['Team Id', 'Name', 'Phone', 'Email', 'Sticky Phone Number Id', 'Created', 'Updated'],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ADD_CSV_HEADERS': {
            const {csv_headers} = action.payload;
            return {
                ...state,
                csv_headers
            };
        }
        case 'ADD_CSV_DATA': {
            const {csv_data} = action.payload;
            return {
                ...state,
                csv_data
            };
        }
        case 'ADD_UNMAPPED_DATA': {
            const {unmapped_data} = action.payload;
            return {
                ...state,
                unmapped_data
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
            const {remapped_column_order} = action.payload;
            return {
                ...state,
                remapped_column_order
            };
        }
        case 'ADD_ERROR': {
            let {error} = action.payload;
            if (error === {} || error === [] || error.length === 0)
                error = null;
            return {
                ...state,
                error
            };
        }
        case 'CLEAR_ERROR': {
            return {
                ...state,
                error: null
            };
        }
        default:
            return state;
    }
}
