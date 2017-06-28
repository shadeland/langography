const React = require('react')
const ReactDOM = require('react-dom')
require('./index.css')

const App = require('./components/App'),
	  WorldCloud = require('./utils/wordcloud.js')



const wordCloud = new WorldCloud({text: 'welcome'})

const words = ['home','fuck','big','master']
let i = 0

// setInterval(()=>{
// 	if(i===words.length){
// 		i=0
// 	}
// 	console.log(words[i])
// 	wordCloud.updateText(words[i])
// 	i++
	

// },15000)
let but = document.getElementById('clickit')
but.onclick = ()=>{
	console.log('clicked')
	wordCloud.updateText('home')
}
let rearrange = document.getElementById('rearrange')
rearrange.onclick = ()=>{
	console.log('clicked')
	wordCloud.reArrange()
}


ReactDOM.render(
	<App />,
	document.getElementById('app')
)