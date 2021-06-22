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
        zIndex: '1000',
        backgroundColor: "white",
        boxShadow: "0 0 2px 0 #999",
    }
}

export default Radium(Footer)
