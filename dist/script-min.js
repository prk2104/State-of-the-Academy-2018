function generateTooltip(t){return"<h4>"+t.title+"</h4><p>Responses: <strong>"+t.responses+"</strong>"+(t.percentage?"<br>Percentage: <strong>"+(100*t.percentage).toFixed(1)+"%</strong>":"")+"</p>"}function generateTooltipMultiline(t){var e="",s="";t.responses=t.responses.map(function(e,s){return{data:e,color:t.colors[s]}}),t.responses.sort(function(t,e){return e.data-t.data});for(var a=0;a<t.responses.length;a++)e+="<div class = 'bubble' style = 'background:"+t.responses[a].color+"'></div> <span>"+t.responses[a].data+"</span><br>",s+="<div class = 'bubble' style = 'background:"+t.responses[a].color+"'></div> <span>"+(100*t.responses[a].data/t.total).toFixed(1)+"%</span><br>";return"<h4>"+t.title+"</h4><p>Responses:</p>"+e+"<p>Percentage:</p>"+s}$(document).ready(function(){$("#sidebar a").on("click",function(t){if(""!==this.hash){t.preventDefault();var e=this.hash;$("html, body").animate({scrollTop:$(e).offset().top},800,function(){window.location.hash=e})}}),$(document).scroll(function(){$(document).width()>900&&($(document).scrollTop()+60>$("#sections").offset().top?($("#sidebar").css("position","fixed"),$("#sidebar").css("top","40px")):($("#sidebar").css("position","absolute"),$("#sidebar").css("top","80px")))}),$(window).resize(function(){$(document).width()>900?$(document).scrollTop()+60>$("#sections").offset().top?($("#sidebar").css("position","fixed"),$("#sidebar").css("top","40px")):($("#sidebar").css("position","absolute"),$("#sidebar").css("top","80px")):($("#sidebar").css("position","relative"),$("#sidebar").css("top","0px"))})});var resizeId,margin={top:20,right:20,bottom:50,left:50},dataForGraphs=[],totalForGraphs=[],bisectors=[],colorsForGraphs=[],numLinesGraphs=[];function redrawGraphs(){d3.selectAll(".line_chart").each(function(t,e){var s=d3.select(this),a=d3.select("#sections").node().offsetWidth-margin.left-margin.right,n=parseInt(this.dataset.height)-margin.top-margin.bottom;drawGraph(s,dataForGraphs[e],totalForGraphs[e],a,n,this.dataset.accent,d3.select(this.firstChild),bisectors[e],this.dataset.x,this.dataset.y,this.dataset.scatter,numLinesGraphs[e],colorsForGraphs[e],"true"==this.dataset.shade)})}function drawGraph(t,e,s,a,n,r,o,i,l,d,c,p,h,u){for(var f,m,g=d3.scaleLinear().range([0,a]),v=d3.scaleLinear().range([n,0]),y=[],b=0;b<p;b++)m=d3.line().x(function(t){return g(t.x)}).y(function(t){return v(t.y[b])}),y.push(m);t.select("svg").selectAll("*").remove();var x=t.select("svg").attr("width",a+margin.left+margin.right).attr("height",n+margin.top+margin.bottom).on("mousemove",function(){var t=g.invert(d3.mouse(this)[0]),a=i(e,t,1),n=e[a-1],r=e[a];if(n&&r){var l=t-n.x>r.x-t?r:n;f=p>1?generateTooltipMultiline({title:l.x,responses:l.y,colors:h,total:s}):generateTooltip({title:l.x,responses:l.y,percentage:l.y/s}),o.classed("hidden",!1).html(f),o.style("left",g(l.x)+margin.left-Math.round(o.node().offsetWidth/2)+"px").style("top",v(d3.max(l.y))-Math.round(o.node().offsetHeight)-12+margin.top+"px")}}).on("mouseout",function(t){var e=d3.event.toElement;e&&e.parentNode.parentNode!=this.parentNode&&e.parentNode!=this.parentNode&&e!=this.parentNode&&o.classed("hidden",!0)}).append("g").attr("transform","translate("+margin.left+","+margin.top+")"),w=d3.extent(e,function(t){return t.x}),$=w[1]-w[0];g.domain([w[0]-.05*$,w[1]+.05*$]),v.domain([0,d3.max(e,function(t){return d3.max(t.y)})]);for(b=0;b<p;b++)if("false"==c&&x.append("path").data([e]).attr("class","line").style("stroke",h[b]).style("stroke-width","2px").style("fill","none").attr("d",y[b]),u){var G=d3.area().x(function(t){return g(t.x)}).y0(function(t){return 0==b?n:v(t.y[b-1])}).y1(function(t){return v(t.y[b])});x.append("path").data([e]).attr("fill",h[b]).style("opacity","0.5").style("z-index","20").attr("d",G)}for(b=0;b<p;b++)x.selectAll(".dot-"+b).data(e).enter().append("circle").attr("class","dot-"+b).style("fill",h[b]).attr("cx",function(t){return g(t.x)}).attr("cy",function(t){return v(t.y[b])}).attr("r",5);x.append("g").style("font-family","source_sans_pro").attr("transform","translate(0,"+n+")").call(d3.axisBottom(g)),x.append("g").style("font-family","source_sans_pro").call(d3.axisLeft(v)),x.append("text").attr("transform","rotate(-90)").attr("y",0-margin.left).attr("x",0-n/2).attr("dy","1em").style("text-anchor","middle").style("font-family","source_sans_pro").style("font-weight","bold").text(d),x.append("text").attr("transform","translate("+a/2+" ,"+(n+margin.top+20)+")").style("text-anchor","middle").style("font-family","source_sans_pro").style("font-weight","bold").text(l)}d3.select(window).on("resize",function(){resizeId=setTimeout(function(){redrawGraphs()},500)}),d3.selectAll(".line_chart").each(function(){for(var t=d3.color(this.dataset.accent),e=d3.select(this),s=this,a=this.dataset.csv,n=this.dataset.x,r=this.dataset.y,o=d3.select(this.firstChild),i=this.dataset.lines,l=[],d=0,c=[],p=0;p<i;p++)c.push(d3.color(t.darker(p)));$.ajax({url:a,success:function(a){a.split("\n").map(function(t){var e=t.split(",");e[0]&&(d+=parseInt(e[1]),l.push({x:parseInt(e[0]),y:e.slice(1).map(function(t){return parseInt(t)})}))});var p=d3.bisector(function(t){return t.x}).right;dataForGraphs.push(l),totalForGraphs.push(d),bisectors.push(p),numLinesGraphs.push(i),colorsForGraphs.push(c);var h=e.node().offsetWidth-margin.left-margin.right,u=parseInt(s.dataset.height)-margin.top-margin.bottom;if(e.append("svg"),drawGraph(e,l,d,h,u,t,o,p,n,r,s.dataset.scatter,i,c,"true"==s.dataset.shade),i>1){var f=s.dataset.labels.split(",");d3.select(s).append("div").attr("class","line-label").attr("width","100%").selectAll("p").data(c).enter().append("p").html(function(t,e){return"<div class = 'bubble' style = 'background:"+t+"'></div> "+f[e]})}},dataType:"text"})}),d3.selectAll(".map").each(function(){var t=0,e=["Discontinuous","Northeast","Southeast","Southwest","West","Midwest","International"],s=d3.color(this.dataset.accent),a=this.dataset.responses.split(",").map(function(s,a){return t+=parseInt(s),{responses:parseInt(s),name:e[a]}}),n=a.slice().sort(function(t,e){return t.responses-e.responses});a=a.map(function(t,e){return{responses:t.responses,name:t.name,color:d3.color(s.darker(.4*n.indexOf(t)))}}),console.log(a);var r,o=this,i=d3.select(this.firstChild);d3.svg(this.dataset.url).then(function(e){var n=e.documentElement;d3.select(o).node().appendChild(n),d3.select(n).selectAll("*").data(a).style("fill",function(t,e){return d3.rgb(t.color)}).on("mouseover",function(e,a){d3.select(this).style("fill",d3.rgb(s.brighter(.3))),r=generateTooltip({title:e.name,responses:e.responses,percentage:e.responses/t}),i.classed("hidden",!1).html(r)}).on("mousemove",function(t){var e=d3.mouse(o);i.style("left",e[0]-Math.round(i.node().offsetWidth/2)+"px").style("top",e[1]-Math.round(i.node().offsetHeight)-10+"px")}).on("mouseout",function(t){d3.select(this).style("fill",d3.rgb(t.color)),i.classed("hidden",!0)})})});var multipane=d3.selectAll(".multipane").each(function(){var t=this.dataset.labels.split(","),e=this.id;d3.select(this).insert("div",":first-child").attr("class","multipane-labels").html(function(s){for(var a="",n=0;n<t.length;n++)a+="<a "+(0==n?"class = 'selected'":"")+" onclick = 'switchPane("+n+',"'+e+"\", this)'>"+t[n]+"</a>";return a});for(var s=this.children,a=2;a<s.length;a++)d3.select(s[a]).classed("hidden",!0)});function switchPane(t,e,s){d3.select("#"+e).select(".multipane-labels").selectAll("*").each(function(e,s){s==t?d3.select(this).classed("selected",!0):d3.select(this).classed("selected",!1)}),d3.selectAll("#"+e+">div").each(function(e,s){s>0&&(s-1==t?d3.select(this).classed("hidden",!1):(d3.select(this).classed("hidden",!0),redrawGraphs()))})}var percentageSliders=d3.selectAll(".percentage-slider").each(function(){var t=parseInt(this.dataset.yes),e=parseInt(this.dataset.no),s=generateTooltip({title:"Yes",responses:t,percentage:t/(t+e)}),a=generateTooltip({title:"No",responses:e,percentage:e/(t+e)}),n=d3.select(this.firstChild),r=parseInt(d3.select(this.children[1]).node().style.width.replace("%","")),o=parseInt(d3.select(this.children[2]).node().style.width.replace("%",""));d3.select(this.children[1]).on("mouseover",function(t){n.classed("hidden",!1).html(s).style("left","calc("+Math.round(r/2)+"% - "+Math.round(n.node().offsetWidth/2)+"px)").style("top","-"+(Math.round(n.node().offsetHeight)+10)+"px")}).on("mouseout",function(t){n.classed("hidden",!0)}),d3.select(this.children[2]).on("mouseover",function(t){n.classed("hidden",!1).html(a).style("left","calc("+Math.round(r+o/2)+"% - "+Math.round(n.node().offsetWidth/2)+"px)").style("top","-"+(Math.round(n.node().offsetHeight)+10)+"px")}).on("mouseout",function(t){n.classed("hidden",!0)})}),pieCharts=d3.selectAll(".pie").each(function(){var t,e,s=this.dataset.responses.split(","),a=this.dataset.labels.split(","),n=d3.color(this.dataset.accent),r=0,o=s.map(function(t,e){return r+=parseInt(t),0!=e&&(n=d3.color(n.darker())),{label:a[e],value:parseInt(t),color:d3.rgb(n)}}),i=(d3.scaleOrdinal(d3.schemeCategory20c),d3.pie().value(function(t){return t.value})),l=d3.arc().outerRadius(150).innerRadius(75),d=d3.select(this.firstChild),c=this;d3.select(this).append("svg").attr("width","100%").attr("height",300).append("g").attr("transform","translate(150,150)").selectAll("path").data(i(o)).enter().append("path").attr("fill",function(t,e){return t.data.color}).attr("stroke","white").attr("d",l).on("mouseover",function(e,s){t=generateTooltip({title:e.data.label,responses:e.value,percentage:e.value/r}),d.classed("hidden",!1).html(t)}).on("mousemove",function(t){e=d3.mouse(c),d.style("left",e[0]-Math.round(d.node().offsetWidth/2)+"px").style("top",e[1]-Math.round(d.node().offsetHeight)-12+"px")}).on("mouseout",function(t){d.classed("hidden",!0)});d3.select(this).append("div").attr("class","pie-label").attr("width","100%").selectAll("p").data(o).enter().append("p").html(function(t,e){return"<div class = 'bubble' style = 'background:"+t.color+"'></div>"+t.label})});