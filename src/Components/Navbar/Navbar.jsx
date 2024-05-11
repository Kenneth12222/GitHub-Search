import React, { useEffect, useState } from 'react'
import './Navbar.css'
import Github_logo from '../../assets/Github_logo.png'
import Hero from '../Hero/Hero'

function Navbar() {

    const [repositories, setRepositories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchMostStarredRepositories();
    }, []);

    const fetchMostStarredRepositories = () => {
        fetch('https://api.github.com/search/repositories?q=stars:>2&sort=stars&order=desc')
            .then((response) => response.json())
            .then((data) => {
                setRepositories(data.items);
            })
            .catch((error) => console.error('Error:', error));
    };

    const handleSearch = () => {
        fetch(`https://api.github.com/search/repositories?q=${searchTerm}&sort=stars&order=desc`)
            .then((response) => response.json())
            .then((data) => {
                setRepositories(data.items);
            })
            .catch((error) => console.error('Error:', error));
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };


    return (
        <div>
            <div className='navbar'>
                <div className='logo'>
                    <img src={Github_logo} className='logo-img' alt='logo' />
                </div>
                <ul className='menu'>
                    <div className='search-form'>
                        <input type='text' placeholder='Search' value={searchTerm} onChange={handleInputChange} />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </ul>
            </div>
            <Hero repositories={repositories} />
        </div>
    )
}

export default Navbar
