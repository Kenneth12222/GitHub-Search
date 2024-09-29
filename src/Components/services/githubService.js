// githubService.js
export const fetchMostStarredRepositories = (searchTerm = 'stars:>2') => {
    return fetch(`https://api.github.com/search/repositories?q=${searchTerm}&sort=stars&order=desc`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => data.items);
};

export const fetchUserRepositories = () => {
    return fetch('https://api.github.com/user')
        .then(response => response.json());
};

export const fetchUserData = (url) => {
    return fetch(url)
        .then(response => response.json());
};
