import React from "react";
import * as d3 from "d3";
import { Remarkable } from 'remarkable';
import hljs from 'highlight.js';


const md = new Remarkable({
    html:true,
    highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return ''; // use external default escaping
  }
});


class Graph extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidUpdate() {
        let width = window.screen.width;
        let height = window.screen.height;
        d3.select("#graph-view").remove()
        const svg = d3.select("#graph") 
            .append("svg")
            .attr("id", "graph-view")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .call(d3.zoom().on("zoom", function (event, d) {        
                svg.attr("transform", event.transform)
            }))
            .append('g');
        const color = d3.scaleOrdinal()
            .range([
                '#1f77b4',
                '#aec7e8',
                '#ff7f0e',
                '#ffbb78',
                '#2ca02c',
                '#98df8a',
                '#d62728',
                '#ff9896',
                '#9467bd',
                '#c5b0d5',
                '#8c564b',
                '#c49c94',
                '#e377c2',
                '#f7b6d2',
                '#7f7f7f',
                '#c7c7c7',
                '#bcbd22',
                '#dbdb8d',
                '#17becf',
                '#9edae5'
            ]
            );
        const simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(100))
            .force("charge", d3.forceManyBody().strength(-500))
            .force("x", d3.forceX())
            .force("y", d3.forceY());
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }
        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }          
        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }
        const link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(this.props.links)
            .enter().append("line")
            .attr("stroke-width", 1);
        const node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(this.props.cards)
            .enter().append("circle")
            .attr("r", 15)
            .attr("fill", function(d) { return color(d['deck-id']); })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
        const label = svg.selectAll('.mytext')
            .data(this.props.cards)
            .enter()
            .append("text")
            .text(function (d) { return d.name; })
            .style("text-anchor", "middle")
            .style("fill", "#cccccc")
            .style("font-family", "Arial")
            .style("font-size", 12);
        simulation
            .nodes(this.props.cards)
            .on("tick", ticked);
          
        simulation.force("link")
            .links(this.props.links);
          
        function ticked() {
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
          
            node
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
            label.attr("x", function(d){ return d.x; })
                .attr("y", function (d) {return d.y - 10; });
            }
        node.on('click', (d)=>{
            let note = document.getElementById("note");
            note.innerHTML = '<a id="close"></a>' + md.render(d.target.__data__['content']).replace(/\|.*\]\]/g, '').replace(/\[\[/g, '');
                document.getElementById('close').onclick = function(){
                document.getElementById('note').style.display = 'none';
            }
            window.MathJax.typeset()
            note.style.display = 'block';        
        });
    }

    render() {
        return (
            <div>
                <div id="note" />
                <div id='graph' />
            </div>
        );
    }
  
}

export default Graph;
