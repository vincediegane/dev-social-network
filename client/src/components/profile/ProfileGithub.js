import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGithubRepos } from '../../actions/profile'
import Spinner from '../layout/Spinner'

const ProfileGithub = ({ username, repos, getGithubRepos }) => {

  useEffect(() => {
    getGithubRepos(username)
  }, [getGithubRepos])

  return (
    <div className='profile-github'>
      <h2 className='text-primary'>Github Repos</h2>
      {repos === null ? <Spinner/> : (
        repos.map((repo, index) => (
          <div key={index} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a href={repo.html_url} target='_blank' rel='noopener noreferer'>
                  {repo.name}
                </a>
              </h4>
              {
                repo.description ? (
                  <p>{repo.description}</p>
                ) : <h5>No description</h5>
              }
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  Stars: {repo.stargazers_count}
                </li>
                <li className='badge badge-dark'>
                  Watchers: {repo.watchers_count}
                </li>
                <li className='badge badge-light'>
                  Forks: {repo.forks_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

ProfileGithub.propTypes = {
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  repos: state.profile.repos
})

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub)