import React from 'react';
import Radium from 'radium';

const ElectionCard = () => {
    return (
        <div>
            <div style={styles.divElection}>
                <h2>Nike dro ?</h2>
                <p style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris maximus egestas nisi at pretium. Nullam vel urna a tortor egestas egestas. Sed luctus vestibulum risus ut condimentum. Morbi libero ipsum, volutpat et volutpat at, sollicitudin porttitor lectus. Praesent eu massa quis lacus fermentum sollicitudin sed vel massa. Etiam finibus libero volutpat sollicitudin sodales. Integer a dui sed odio gravida auctor. Integer sed lobortis felis.</p>
                <button style={Object.assign({},styles.btn, styles.blue)}>Répondre à l'élection</button>
            </div>
        </div>
    )
}

const styles = {
    text: {
        textAlign: "justify"
    },
    btn: {
        minWidth: "200px",
        padding: "15px",
        border: "none",
        color: "white",
        cursor: "pointer",        
        float: "right",
        marginTop: "15px"
    },
    divElection: {
        border: "1px solid #0B6BA8",
        padding: "30px 30px 80px 30px",
        marginBottom: "30px"
    },
    blue : {
        backgroundColor: "#0B6BA8"
    },
    green : {
        backgroundColor: "#009F79"
    },
    red : {
        backgroundColor: "#A63950"
    }
}


export default ElectionCard
