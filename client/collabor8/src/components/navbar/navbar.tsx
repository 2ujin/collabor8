'use client';

import Image from 'next/image';
import './navbar.css';
import LogoSmallYellow from '../../../public/logo-yellow.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from '@/redux-store/customHooks';
import { fetchUserDetails } from '@/redux-store/slices/userSlice';
import { useEffect } from 'react';

const menuItems = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    label: 'My Projects',
    path: '/projects',
  },
  {
    label: 'Profile',
    path: '/profile',
  },
];

function Navbar() {

  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.userState.isLogged);

  useEffect(() => {
      dispatch(fetchUserDetails());
    });

  const pathname = usePathname();
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link href={'/'}>
          <Image
            src={LogoSmallYellow}
            alt="Collabor8 Logo"
            width={111}
            height={30}
            priority
            />
        </Link>
        <menu className="navbar__menu">
          {isLogged &&
          <ul className="navbar__menu-items">
            {menuItems.map((item, index) => (
              <li
              className={`navbar__menu-item ${
                pathname === item.path && 'navbar__menu-item_active'
              }`}
              key={item.path}
              >
                <Link
                  className={`bodytext1 navbar__menu-link`}
                  href={item.path}
                  >
                  {item.label}
                </Link>

              </li>
            ))}
          </ul>
          }
        </menu>
      </div>
    </nav>
  );
}
export default Navbar;
