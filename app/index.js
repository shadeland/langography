const React = require('react')
const ReactDOM = require('react-dom'),
	  d3 = require('d3'),
	  cloud = require('d3.layout.cloud')
require('./index.css')
const App = require('./components/App')
const APIADDRESS = 'http://localhost:3000/api/lan/fa/tr/hello'

// class WordCloud extends React.Component{

// 	constructor(props){
// 		super(props)
// 		this.state = {
// 			text : props.text
// 		}
// 	}

// 	render(){

// 	}



// }

class WorldCloud {
	constructor(opts){
		this.text = opts.text || 'hello'
		this.layout = {}
		this.init()
	}

	init(wordlist) {
		
		const fill = d3.scaleOrdinal(d3.schemeCategory20);

	    let layout = cloud().size([800, 800])
	            .words([])
	            .padding(1)
	            .font("Impact")
	            .rotate(function() { return ~~(Math.random() * 2) * 90; })
	            .fontSize(function(d) { return d.size; })
	            .on("end", this.draw.bind(this))
	    
	    d3.json(APIADDRESS, (err,data) => {
	    	console.log("hey")
	    	// data = d3.entries(data.rates)
	    	let words = data.map((d) => {
	    		return {text: d.tran,
	    				size: 10 + Math.random() * 90}
	    	})
	    	layout.words(words)
	    	layout.start();	
	    })
	    this.layout = layout  

	}
	draw(words) {
		const fill = d3.scaleOrdinal(d3.schemeCategory20);
		
		d3.select("body").append("svg")
	      .attr("width", this.layout.size()[0])
	      .attr("height", this.layout.size()[1])
	      .append("g")
	      .attr("transform", "translate(" + this.layout.size()[0] / 2 + "," + this.layout.size()[1] / 2 + ")")
	    .selectAll("text")
	      .data(words)
	    .enter().append("text")
	      .style("font-size", function(d) { return d.size + "px"; })
	      .style("font-family", "Impact")
	      .style("fill", function(d, i) { return fill(i); })
	      .attr("text-anchor", "middle")
	      .attr("transform", function(d) {
	        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	      })
	      .text(function(d) { return d.text; });

	}
}

const wordCloud = new WorldCloud({})

// const makeWorldCloud = (wordlist) => {
// 	const fill = d3.scaleOrdinal(d3.schemeCategory20);


//     var color = d3.scaleLinear()
//             .domain([0,1,2,3,4,5,6,10,15,20,100])
//             .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

//     let layout = cloud().size([800, 800])
//             .words([])
//             .padding(1)
//             .font("Impact")
//             .rotate(function() { return ~~(Math.random() * 2) * 90; })
//             .fontSize(function(d) { return d.size; })
//             .on("end", draw)
    
//     d3.json(APIADDRESS, (err,data) => {
//     	console.log("hey")
//     	// data = d3.entries(data.rates)
//     	let words = data.map((d) => {
//     		return {text: d.tran,
//     				size: 10 + Math.random() * 90}
//     	})
//     	layout.words(words)
//     	layout.start();	
//     })  
    

//     function draw(words) {
// 		        console.log(words)
// 		        d3.select("body").append("svg")
// 		      .attr("width", layout.size()[0])
// 		      .attr("height", layout.size()[1])
// 		    .append("g")
// 		      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
// 		    .selectAll("text")
// 		      .data(words)
// 		    .enter().append("text")
// 		      .style("font-size", function(d) { return d.size + "px"; })
// 		      .style("font-family", "Impact")
// 		      .style("fill", function(d, i) { return fill(i); })
// 		      .attr("text-anchor", "middle")
// 		      .attr("transform", function(d) {
// 		        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
// 		      })
// 		      .text(function(d) { return d.text; });
//     }

// }

// makeWorldCloud()



ReactDOM.render(
	<App />,
	document.getElementById('app')
)