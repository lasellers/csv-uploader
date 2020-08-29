const initialState = {
    csv_header: [],
    csv_data: [],
    unmapped_data: [],
    remapped_csv_data: [],
    remapped_order: [],
    // read only SSOA
    columns: ['id', 'team_id', 'name', 'phone', 'email', 'sticky_phone_number_id', 'created_at', 'updated_at'],
    namedColumns: ['#', 'Team Id', 'Name', 'Phone', 'Email', 'Sticky Phone Number Id', 'Created', 'Updated'],
    order: [0, 1, 2, 3, 4, 5, 6, 7]
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
