import { connect } from 'react-redux'
import React from 'react'

const mapStateToProps = (state) => {
  return { entries: state.entries }
}

const BGEntry = ({
  entries
}) => (
  <ul>
    {entries.map(entry =>
      <li key={entry._id}>{entry.sgv}</li>
    )}
  </ul>
);

export default connect(mapStateToProps)(BGEntry)
