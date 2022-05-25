import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { BiTrendingDown, BiTrendingUp } from 'react-icons/bi';
import { FcSettings } from 'react-icons/fc';
import 'react-pro-sidebar/dist/css/styles.css';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import logo from './logo.png';

const Sidebar = (props) => (
    <>
        <div className='area'>
            <nav className='main-menu'>
                <ul>
                    <li className='has-subnav'>
                        <Link className='LinkName titleAndLogo' to='/'>
                            <img
                                className='imgLogo logo'
                                src={logo}
                                alt='logo'
                            />
                            <span className='logo-text'>REDRAMA</span>
                        </Link>
                    </li>

                    <li className='has-subnav '>
                        <Link className='LinkName' to='/pajamos'>
                            <i className='icon-up '>
                                <BiTrendingUp />
                            </i>
                            <span className='nav-text '>Pajamos</span>
                        </Link>
                    </li>

                    <li className='has-subnav'>
                        <Link className='LinkName' to='/islaidos'>
                            <i className='icon-up'>
                                <BiTrendingDown />
                            </i>
                            <span className='nav-text '> Išlaidos</span>
                        </Link>
                    </li>
                    <li className='has-subnav'>
                        <Link className='LinkName' to='/istorija'>
                            <i className='icon-up'>
                                <BiTrendingDown />
                            </i>
                            <span className='nav-text '> Istorija</span>
                        </Link>
                    </li>
                    {props.currentUser.type === 'admin' && (
                        <li className='has-subnav'>
                            <Link className='LinkName' to='/admin'>
                                <i className='icon-up'>
                                    <FcSettings />
                                </i>
                                <span className='nav-text '>Valdymas</span>
                            </Link>
                        </li>
                    )}
                </ul>
                <ul className='logout'>
                    <li className='logoutLine'>
                        <i
                            className='logoutIcon'
                            onClick={() => {
                                props.logout();
                            }}
                        >
                            <FiLogOut />
                        </i>
                        <div className='logoutColumn'>
                            <span className='logoutUserName'>
                                {props.currentUser.name}
                            </span>
                            <span className='logoutUserName'>
                                {props.currentUser.email}
                            </span>
                            <span
                                onClick={() => {
                                    props.logout();
                                }}
                                className='logout-text'
                            >
                                Atsijungti
                            </span>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    </>
);
export default Sidebar;