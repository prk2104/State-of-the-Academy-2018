function generateTooltip(e){return"<h4>"+e.title+"</h4><p>Responses: <strong>"+e.responses+"</strong><br>Percentage: <strong>"+(100*e.percentage).toFixed(1)+"%</strong></p>"}var percentageSliders=d3.selectAll(".percentage-slider").each(function(){var e=parseInt(this.dataset.yes),t=parseInt(this.dataset.no),s=generateTooltip({title:"Yes",responses:e,percentage:e/(e+t)}),n=generateTooltip({title:"No",responses:t,percentage:t/(e+t)}),o=d3.select(this.firstChild),d=parseInt(d3.select(this.children[1]).node().style.width.replace("%","")),r=parseInt(d3.select(this.children[2]).node().style.width.replace("%",""));d3.select(this.children[1]).on("mouseover",function(e){o.classed("hidden",!1).html(s).style("left","calc("+Math.round(d/2)+"% - "+Math.round(o.node().offsetWidth/2)+"px)").style("top","-"+(Math.round(o.node().offsetHeight)+10)+"px")}).on("mouseout",function(e){o.classed("hidden",!0)}),d3.select(this.children[2]).on("mouseover",function(e){o.classed("hidden",!1).html(n).style("left","calc("+Math.round(d+r/2)+"% - "+Math.round(o.node().offsetWidth/2)+"px)").style("top","-"+(Math.round(o.node().offsetHeight)+10)+"px")}).on("mouseout",function(e){o.classed("hidden",!0)})});