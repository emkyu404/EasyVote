import AddElection from "./AddElection";
import Radium from 'radium';

const Elections = ({ onAddElection }) => {
    return (
        <div>
            <AddElection onAddElection={onAddElection} />
            <h1 style={styles.mainTitle}>Listes des élections</h1>
                <button style={Object.assign({},styles.btnFiltre, styles.blue)}>En cours</button>
                <button style={Object.assign({},styles.btnFiltre, styles.green, {width: "34%"})}>A venir</button>
                <button style={Object.assign({},styles.btnFiltre, styles.red)}>Terminées</button>
            <div style={styles.divElections}>
                <div style={styles.divElection}>
                    <h2>Nike dro ?</h2>
                    <p style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris maximus egestas nisi at pretium. Nullam vel urna a tortor egestas egestas. Sed luctus vestibulum risus ut condimentum. Morbi libero ipsum, volutpat et volutpat at, sollicitudin porttitor lectus. Praesent eu massa quis lacus fermentum sollicitudin sed vel massa. Etiam finibus libero volutpat sollicitudin sodales. Integer a dui sed odio gravida auctor. Integer sed lobortis felis.</p>
                    <button style={Object.assign({},styles.btn, styles.blue)}>Répondre à l'élection</button>
                </div>
                <div style={styles.divElection}>
                    <h2>Nike dro ?</h2>
                    <p style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris maximus egestas nisi at pretium. Nullam vel urna a tortor egestas egestas. Sed luctus vestibulum risus ut condimentum. Morbi libero ipsum, volutpat et volutpat at, sollicitudin porttitor lectus. Praesent eu massa quis lacus fermentum sollicitudin sed vel massa. Etiam finibus libero volutpat sollicitudin sodales. Integer a dui sed odio gravida auctor. Integer sed lobortis felis.</p>
                    <button style={Object.assign({},styles.btn, styles.green)}>Voir les résultats</button>
                </div>
                <div style={styles.divElection}>
                    <h2>Nike dro ?</h2>
                    <p style={styles.text}>Integer a dui sed odio gravida auctor. Integer sed lobortis felis.</p>
                    <button style={Object.assign({},styles.btn, styles.red)}>A venir</button>
                </div>
            </div>
        </div>
    )
}

const styles = {
    mainTitle: {
        color: "#0B6BA8",
        height: "fit-content",
        width: "100%",
        paddingBottom: "15px",
        textAlign: "center"
    },
    divElections: {
        backgroundColor: "white",
        padding: "40px",
        paddingBottom: "10px",
        boxShadow: "0 0 10px #999"
    },
    divElection: {
        border: "1px solid",
        borderColor: "#0B6BA8",
        padding: "30px",
        paddingBottom: "80px",
        marginBottom: "30px"
    },
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
    blue : {
        backgroundColor: "#0B6BA8"
    },
    green : {
        backgroundColor: "#009F79"
    },
    red : {
        backgroundColor: "#A63950"
    },
    btnFiltre: {
        width: "33%",
        padding: "15px",
        border: "none",
        color: "white",
        cursor: "pointer"
    },
}

export default Radium(Elections)
