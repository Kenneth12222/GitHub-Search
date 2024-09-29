import React, { useEffect, useState } from 'react';
import './Navbar.css';
import Github_logo from '../../assets/Github_logo.png';
import Hero from '../Hero/Hero';
import { fetchMostStarredRepositories } from '../services/githubService'; // Import the service

function Navbar() {
    const [repositories, setRepositories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch most starred repositories by default when component mounts
        fetchMostStarredRepositories()
            .then(data => setRepositories(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleSearch = () => {
        // Fetch repositories based on the search term
        const query = searchTerm.trim() || 'stars:>2'; // Fallback to most starred repositories if search is empty
        fetchMostStarredRepositories(query)
            .then(data => setRepositories(data))
            .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <div className='navbar'>
                <div className='logo'>
                    <img src={Github_logo} className='logo-img' alt='logo' />
                </div>
                <div className='search-form'>
                    <input
                        type='text'
                        placeholder='Search'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
            <Hero repositories={repositories} />
        </div>
    );
}

export default Navbar;
