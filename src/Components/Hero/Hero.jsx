import React, { useState, useEffect } from 'react';
import './Hero.css'; // Import the CSS file for Hero component

function Hero({ repositories }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUserRepositories();
    }, []);

    const fetchUserRepositories = () => {
        fetch('https://api.github.com/user')
            .then(response => response.json())
            .then(data => {
                setUser(data);
                fetchUserData(data.followers_url, 'followers');
                fetchUserData(data.following_url, 'following');
                fetchUserData(data.repos_url, 'repositories');
            })
            .catch(error => console.error('Error:', error));
    };

    const fetchUserData = (url, type) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Update user state based on the type of data fetched
                setUser(prevState => ({
                    ...prevState,
                    [type]: type === 'repositories' ? data.length : data
                }));
            })
            .catch(error => console.error('Error:', error));
    };


    return (
        <div className="hero">
            <h1 className="hero-title">Ghub</h1>
            <ul className="repo-list">
                {repositories.map(repo => (
                    <div key={repo.id} className='repo-card'>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            <img src={repo.owner.avatar_url} alt={repo.owner.login} className="repo-avatar" />
                            <div className="repo-details">
                                <h3 className="repo-name">{repo.full_name}</h3>
                                <p className="repo-owner">Owner: {repo.owner.login}</p>
                                <p className="repo-followers">Followers: {repo.owner.followers}</p>
                                <p className="repo-following">Following: {repo.owner.following}</p>
                                <p className="repo-repos">Repositories: {repo.owner.public_repos}</p>
                                <p className="repo-stars">Stars: {repo.stargazers_count}</p>
                            </div>
                        </a>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Hero;
