import Radium from 'radium'

const Footer = () => {
    return (
        <footer style={styles.footerStyle}>
            <p>Copyright &copy; EasyVote 2021</p>
        </footer>
    )
}

const styles = {
    footerStyle : {
        textAlign: "center",
        zIndex: '10',
        backgroundColor: "white",
        boxShadow: "0 0 2px 0 #999",
        height: "50px",
        lineHeight: "50px",
        verticalAlign: "middle",
    }
}

export default Radium(Footer)
