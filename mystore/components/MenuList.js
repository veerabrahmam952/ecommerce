import React from 'react';
import { TextInput, Label, Checkbox, Button, Card, Navbar, Dropdown, Avatar, Badge } from 'flowbite-react';
import {
    HiAdjustments,
    HiArrowNarrowRight,
    HiArrowSmRight,
    HiChartPie,
    HiCheck,
    HiClipboardList,
    HiCloudDownload,
    HiDatabase,
    HiExclamation,
    HiEye,
    HiHome,
    HiInbox,
    HiMail,
    HiOutlineAdjustments,
    HiShoppingBag,
    HiTable,
    HiUser,
    HiUserCircle,
    HiViewBoards,
    HiX,
} from "react-icons/hi";

class MenuList extends React.Component {
    constructor(props) {
        debugger;
        console.log(props);
        super(props);
    }
    componentDidMount() {

    }
    render() {
        debugger;
        const { menuItems } = this.props;
        console.log(menuItems);
        return (
            <div className='container mx-auto flex flex-wrap p-5 flex-col'>
                <Navbar
                    fluid={true}
                    rounded={true}
                >
                    {menuItems?.data?.map((_menu) => (<>
                        <Dropdown
                            arrowIcon={false}
                            inline={true}
                            label={<div className='flex flex-wrap gap-2'>
                                <Badge size="lg">
                                    {_menu.attributes.menuItemName}
                                </Badge>
                            </div>}
                        >{
                                _menu?.attributes?.sub_menus?.data?.map((_submenu) => (<><div className="bg-blue-100">
                                    <Dropdown.Item>
                                        {_submenu.attributes.SubMenuItemName}
                                    </Dropdown.Item>
                                </div>
                                    <Dropdown.Divider />
                                    {_submenu?.attributes?.categories?.data?.map((_cat) => (<>
                                        <Dropdown.Item>
                                            {_cat.attributes.CategoryName}
                                        </Dropdown.Item>
                                    </>))}
                                </>))
                            }
                        </Dropdown>
                    </>))}

                </Navbar>
            </div>
        )
    }
}
export default MenuList