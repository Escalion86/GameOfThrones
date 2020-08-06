import React from 'react';
import './header.css';

const Header = () => {
    return (
        <div class="header-block">
            <h3 class="header-title">
                <a href="#">
                Game of Thrones DB
                </a>
            </h3>
            <ul class="header-links">
                <li>
                    <a href="#">Characters</a>
                </li>
                <li>
                    <a href="#">Houses</a>
                </li>
                <li>
                    <a href="#">Books</a>   
                </li>
            </ul>
        </div>
    );
};

export default Header;