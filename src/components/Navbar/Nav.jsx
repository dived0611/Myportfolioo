import React from 'react';
import './Nav.css';

export default function Nav() {


    const handleScroll = (section) => {
        if (section === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (section === 'about') {
            window.scrollTo({ top: window.innerHeight  , behavior: 'smooth' });
        } else if (section === 'contact') {
            window.scrollTo({ top: window.innerHeight * 2 + 40, behavior: 'smooth' });
        }
    };

    return (
        <nav className='navbare'>
            <ul className='ul-nav'>
                <li className='home' onClick={() => handleScroll('home')}>Home</li>
                <li className='about' onClick={() => handleScroll('about')}>About</li>
                <li className='contact' onClick={() => handleScroll('contact')}>Contact</li>
            </ul>
        </nav>
    );
}
