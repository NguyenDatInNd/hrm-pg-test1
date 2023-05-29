import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';
import { links } from '../../context/dataLink';
import { ListItemButton } from '@mui/material';

const Sidebar = () => {
    const [isRounderIcon, setIsRounderIcon] = useState('employee');
    const activeLink = 'flex items-center gap-[10px] rounded-xl text-md mb-[10px] bg-active-link transition-all';
    const normalLink = 'flex items-center gap-[10px] rounded-xl transition-all text-md mb-[10px] ';
    return (
        <div className="pl-12 pr-8 text-2xl font-medium h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
            <div className="py-4">
                {links.map((item, index) => (
                    <div className={`pt-3 ${index != 0 && 'border-t border-[#c1c8cd3d]'} `} key={index}>
                        <p
                            className={`text-gray-950 text-3xl font-semibold sidebar-text m-3 mt-4 ${
                                index === 0 ? 'sidebar-title' : ''
                            }`}
                        >
                            {item.title}
                        </p>
                        {item.links.map((link, index) => (
                            <NavLink
                                to={`/${link.nameLink}`}
                                key={index}
                                onClick={() => {
                                    setIsRounderIcon(link.nameLink);
                                }}
                                style={({ isActive }) => ({
                                    backgroundColor: isActive ? 'rgb(241, 243, 245)' : '',
                                })}
                                className={({ isActive }) => (isActive ? activeLink : normalLink)}
                            >
                                <ListItemButton>
                                    <div
                                        className={
                                            link.nameLink === isRounderIcon
                                                ? `rounded-full icon-padding icon_active bg-white`
                                                : 'rounded-full icon-padding icon-rounder'
                                        }
                                    >
                                        <img src={link.icon} className="" alt="" />
                                    </div>
                                    <p className="ml-4 text-16  font-semibold tracking-wide ">{link.name}</p>
                                </ListItemButton>
                            </NavLink>
                        ))}
                    </div>
                ))}
                <div className="pb-16"></div>
            </div>
        </div>
    );
};

export default Sidebar;
