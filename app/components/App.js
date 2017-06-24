const React = require('react')
const Popular = require ('./Popular')
const Nav = require ('./Nav')
const Home = require('./Home')
const ReactRouter = require ('react-router-dom')
const Router = ReactRouter.BrowserRouter
const Route = ReactRouter.Route

class App extends React.Component {
	render(){
		return (

			<Router>
				
				<div className= 'container'>
					<Nav />
					<Route  path="/popular" component={Popular}/>
					<Route  path="/" component={Home}/>
				</div>
			</Router>

		)
	}
}

module.exports = App 