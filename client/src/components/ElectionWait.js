import React from 'react'

function ElectionWait({election}) {
  return (
    <div>
      <h2>{election.titreElection}</h2>
      Date de début : {election.dateDebutElection} <br/>
      Date de fin : {election.dateFinElection}<br/><br/>
      <p style={styles.text}>{election.descriptionElection}</p>
    </div>
  )
}

const styles={
}

export default ElectionWait
