import React from 'react';

const RepoListItem = ({repo}) => (
  <div>
    <li> <strong>{repo.username}</strong>  <a href={repo.url}>{repo.repoName}</a>   {repo.forks} </li>
  </div>
)

export default RepoListItem;