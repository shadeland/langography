const React = require('react')
const Popular = require ('./Popular')
const Nav = require ('./Nav')
const Home = require('./Home')
const ReactRouter = require ('react-router-dom')
const Router = ReactRouter.BrowserRouter
const Route = ReactRouter.Route



class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    // console.log(this.state)
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        
      </form>
    );
  }
}

class App extends React.Component {
	render(){
		return (

			<Router>
				
				<div className= 'container'>
					<Nav />
					<NameForm />
					<Route  path="/popular" component={Popular}/>
					<Route  path="/" component={Home}/>
				</div>
			</Router>

		)
	}
}

module.exports = App 