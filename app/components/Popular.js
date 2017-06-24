const React = require('react')
const PropTypes = require('prop-types')
const api = require('../utils/api')

function SelectLanguage (props){

	const languages = ['All', 'Javascript','Ruby', 'Java', 'CSS', 'Python']

		return(
			<ul className = 'languages'> 
			{languages.map((lang) => {
					return (
						<li 
							style= {lang === props.selectedLanguage? {color: '#d0021b'}: null}
							onClick = {props.onSelect.bind(null, lang)} 
							key={lang} > 
							{lang} 
						</li>
					)
				}
			)}
			</ul>
		)
}

function RepoGrid (props){
	
	return(
		<ul className = 'popular-list'>
			
			{props.repos.map(function(repo, index){
					return(
					<li key={repo.name} className = 'popular-item'>
						<div className='popular-rank'>
							#{index + 1}
							<ul className='space-list-item'>
								<li>
									<img className='avatar'
									src={repo.owner.avatar_url}
									alt ={'Avatar for ' + repo.owner.login} />
								</li>
								<li> <a href={repo.html_url}>{repo.name}</a></li>
								<li>@{repo.owner.login}</li>
								<li>{repo.stargazers_count} stars</li>
							</ul>
						</div>

					</li>
					)
			})}

		</ul>
	)
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired,

}



SelectLanguage.PropTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect:PropTypes.func.isRequired,
}

class Popular extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			selectedLanguage: 'All',
			repos: null
		}

		this.updateLanguage = this.updateLanguage.bind(this)
	}
	componentDidMount(){
	  this.updateLanguage(this.state.selectedLanguage)
	}
	updateLanguage(lang) {
		this.setState(function(){
			return {
				selectedLanguage: lang,
				repos: null
			}
		})

		api.fetchPopularRepos(this.state.selectedLanguage)
		.then((repos) => {
			this.setState(() => {
				return {
					repos: repos
				}
			})
		})
	}
	render(){
		return (
			<div>
				<SelectLanguage 
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage}/>
					{!this.state.repos
						? <p>Loading...</p>
						: <RepoGrid repos = {this.state.repos} />
					}
					
			</div>

			
		)
	}
}

module.exports = Popular