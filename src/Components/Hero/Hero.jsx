import React, { useEffect, useState } from 'react';
import './Hero.css';
import { fetchUserRepositories, fetchUserData } from '.././services/githubService'; // Import service functions

function Hero({ repositories }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUserRepositories()
            .then(data => {
                setUser(data);
                fetchUserData(data.followers_url).then(followers => setUser(prev => ({ ...prev, followers })));
                fetchUserData(data.following_url).then(following => setUser(prev => ({ ...prev, following })));
                fetchUserData(data.repos_url).then(repos => setUser(prev => ({ ...prev, repositories: repos.length })));
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="hero">
            <h1 className="hero-title">Ghub</h1>
            <ul className="repo-list">
            {(repositories || []).map(repo => (
                <div key={repo.id} className='repo-card'>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <img src={repo.owner.avatar_url} alt={repo.owner.login} className="repo-avatar" />
                        <div className="repo-details">
                            <h3 className="repo-name">{repo.full_name}</h3>
                            <p className="repo-owner">Owner: {repo.owner.login}</p>
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
