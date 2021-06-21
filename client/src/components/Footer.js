const Footer = () => {
    return (
        <footer style={footerStyle}>
            <p>Copyright &copy; EasyVote 2021</p>
        </footer>
    )
}

const footerStyle = {
    textAlign: "center",
    zIndex: '1000',
    backgroundColor: "white",
    boxShadow: "0 0 2px 0 #999",
}

export default Footer
