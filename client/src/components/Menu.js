import { findByLabelText } from "@testing-library/react"
import MenuItem from './MenuItem'
import MenuController from './MenuController'
const Menu = () => {
    return (
        <div className='menu-container'>
            <div className="menu-controller">
                <MenuController />
            </div>
            <div className="menu-items">
                <MenuItem text="Onglet 1"></MenuItem>
                <MenuItem text="Onglet 2"></MenuItem>
                <MenuItem text="Onglet 3"></MenuItem>
                <MenuItem text="Onglet 4"></MenuItem>
            </div>
        </div>
    )
}

export default Menu