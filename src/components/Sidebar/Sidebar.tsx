import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './Sidebar.scss';

import { links } from '../../context/dataLink';

const Sidebar = () => {
    const [isRounderIcon, setIsRounderIcon] = useState('');
    console.log(isRounderIcon);
    const activeLink = 'flex items-center gap-3 pl-4 py-3 rounded-xl bg-active-link text-md m-2';
    const normalLink =
        'flex items-center gap-4 pl-4 py-3 rounded-xl text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

    return (
        <div className="pl-12 pr-8 text-2xl font-medium h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
            <div className="py-4">
                {links.map((item, index) => (
                    <div className="pt-3" key={index}>
                        <p
                            className={`text-gray-950 text-3xl font-semibold sidebar-text m-3 mt-4 ${
                                index === 0 ? 'sidebar-title' : ''
                            }`}
                        >
                            {item.title}
                        </p>
                        {item.links.map((link, index) => (
                            <NavLink
                                to={`/${link.name}`}
                                key={link.name}
                                onClick={() => {
                                    setIsRounderIcon(link.name);
                                }}
                                style={({ isActive }) => ({
                                    backgroundColor: isActive ? 'rgb(241, 243, 245)' : '',
                                })}
                                className={({ isActive }) => (isActive ? activeLink : normalLink)}
                            >
                                <span
                                    className={
                                        isRounderIcon === link.name
                                            ? `rounded-full icon-padding icon_active`
                                            : 'rounded-full icon-padding icon-rounder'
                                    }
                                >
                                    <img src={link.icon} className="" alt="" />
                                </span>
                                <span className="capitalize">{link.name}</span>
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
