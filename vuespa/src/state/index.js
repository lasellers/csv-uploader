var store = {
  debug: true,
  state: {
    error: null,
    csv_headers: [],
    csv_data: [],
    unmapped_data: [],
    remapped_csv_data: [],
    remapped_column_order: [],
    // read only SSOA
    db_headers: ['team_id', 'name', 'phone', 'email', 'sticky_phone_number_id', 'created_at', 'updated_at'],
    db_named_headers: ['Team Id', 'Name', 'Phone', 'Email', 'Sticky Phone Number Id', 'Created', 'Updated']
  },
  addCsvHeaders (newValue) {
    if (this.debug) console.log('addCsvHeaders triggered with', newValue)
    this.state.csv_headers = newValue
  },
  addCsvData (newValue) {
    if (this.debug) console.log('addCsvData triggered with', newValue)
    this.state.csv_data = newValue
  },
  addUnmappedData (newValue) {
    if (this.debug) console.log('addUnmappedData triggered with', newValue)
    this.state.unmapped_data = newValue
  },
  addRemappedCsvData (newValue) {
    if (this.debug) console.log('addRemappedCsvData triggered with', newValue)
    this.state.remapped_csv_data = newValue
  },
  addRemappedColumnOrder (newValue) {
    if (this.debug) console.log('addRemappedColumnOrder triggered with', newValue)
    this.state.remapped_column_order = newValue
  },
  addError (newValue) {
    if (this.debug) console.log('addError triggered with', newValue)
    this.state.error = newValue
  },
  clearError (newValue) {
    if (this.debug) console.log('clearError triggered with', newValue)
    this.state.error = null
  }
}
