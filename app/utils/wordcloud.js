'use strict'
const d3 = require('d3'),
	  cloud = require('d3.layout.cloud')

class WorldCloud {
	constructor(opts){
		this.text = opts.text || 'hello'
		this.drawn = false
		this.layout = {}
		this.cloud = {}
		this.updateText(this.text)
	}

	init() {
		const APIADDRESS = `http://localhost:3000/api/lan/fa/tr/${this.text}`
		const fill = d3.scaleOrdinal(d3.schemeCategory20);

	    let layout = cloud().size([800, 800])
	            .words([])
	            .padding(1)
	            .font("Impact")
	            .rotate(function() { return ~~(Math.random() * 2) * 90; })
	            .fontSize(function(d) { return d.size; })
	            .on("end", this.updateDraw.bind(this))
	    
	    d3.json(APIADDRESS, (err,data) => {
	    	
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

	/****
	*
	*
	* Use to update text, should emit 'textUpdate' event
	****/

	updateText(text){
		this.text = text
		this.init()
		
	}
	updateDraw(words){
		console.log(words)
		if(!this.drawn){
			this.draw()
		}
		const fill = d3.scaleOrdinal(d3.schemeCategory20);
		let u = this.cloud.selectAll("text")
	      .data(words)

	    u.enter().append("text")
	      .style("font-size", function(d) { return d.size + "px"; })
	      .style("font-family", "Impact")
	      .style("fill", function(d, i) { return fill(i); })
	      .attr("text-anchor", "middle")
	      .attr("transform", function(d) {
	        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	      })
	      .merge(u)
	      .text(function(d) { 
	      	console.log(d)
	      	return d.text; });

	    this.cloud.exit().remove()
	}

	reArrange(){
		this.layout.start()
	}



	draw() {

		this.cloud = d3.select("body").append("svg")
	      .attr("width", this.layout.size()[0])
	      .attr("height", this.layout.size()[1])
	      .append("g")
	      .attr("transform", "translate(" + this.layout.size()[0] / 2 + "," + this.layout.size()[1] / 2 + ")")
	    this.drawn = true
	    // .selectAll("text")
	    //   .data(words)
	    // .enter().append("text")
	    //   .style("font-size", function(d) { return d.size + "px"; })
	    //   .style("font-family", "Impact")
	    //   .style("fill", function(d, i) { return fill(i); })
	    //   .attr("text-anchor", "middle")
	    //   .attr("transform", function(d) {
	    //     return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	    //   })
	    //   .text(function(d) { return d.text; });

	}
}
module.exports = WorldCloud