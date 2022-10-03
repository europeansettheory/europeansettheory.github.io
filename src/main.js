import * as d3 from "d3"
//import * as mathjax from "mathjax"

// function for clearing the visual container
function preparePlotArea(elementName, notificationContent = 'Loading...') {              
    let container = d3.select(elementName)
    container.selectAll('div') 
    .remove()   
}

// function for showing the data
function PLOT(data){          
    let viscontainer = d3.select('#visContainer')  
    let conf = viscontainer.selectAll("#confereces")
                            .data(data) // bind data
                            .enter()   
                            .append("div")
                            .attr("class", "talk" )
                            .attr("id", d=>"talk"+d.Unique_Index)
                            //.style("border-style", "solid")
                            //.style("border-color", "black")
                            //.style("border-width", "1pt")
                            .style("padding", "20px")
                            .append("table").attr("id", d=>d.Unique_Index)
                            //.style("background-color"," #eaedfa");
                            
    conf.append("tr") 
    conf.append("td").text( "  ")  
    conf.append("td").text(d=>d.Seminar).style("font-weight", "bold").style("font-size", "larger")
    conf.append("tr")
    conf.append("td").text( "Speaker: " ).style("font-weight", "bold")    
    conf.append("td").text(d=>d.Speaker)
    conf.append("tr")
    conf.append("td").text("Local Time: " ).style("font-weight", "bold")    
    conf.append("td").text(d=> d.Time_local)
    conf.append("tr")
    conf.append("td").text("GMT/UTC: " ).style("font-weight", "bold")    
    conf.append("td").text(d=>{
       // console.log(String(d.Time_UT).split(" ").splice(0,5).join(" ").split(":").splice(0,2).join(":") )
        return String(d.Time_UT).split(" ").splice(0,5).join(" ").split(":").splice(0,2).join(":")
    })
    conf.append("tr")
    conf.append("td").text("Title:  ").style("font-weight", "bold")    
    conf.append("td").text(d=> d.Title)
    conf.append("tr")
    conf.append("td").text("Abstract:  ").style("font-weight", "bold")    
    conf.append("td").text(d=> d.Abstract)
    conf.append("tr")
    conf.append("td").text("Information:  ").style("font-weight", "bold")    
    conf.append("td").text(d=> d.Information)
    conf.append("tr")    
    conf.append("td").text( "Repository: " ).style("font-weight", "bold")    
    conf.append("td").append("a").text(d=>{if (d.Repository!=""){return "Link"}}).attr("href", d=> d.Repository)
}
let timefilter="all"
//"Unique_Index";"Seminar";"Time";"Speaker";"Title";"Abstract";"Information"
function ShowData(data){
    preparePlotArea(visContainer)
    d3.select("#confe").text("Showing all talks")    
    data.forEach(d=>{
        d.Time_UT=new Date(d.Time_UT)
    })  
    data.sort((d,e)=> e.Time_UT-d.Time_UT)
    PLOT(data)
    filter_parameters(data)
}

function filter_parameters(data){
    let text_to_search=""
    let field_to_search=""
    document.querySelectorAll('#searchb').forEach((item) => {
        item.addEventListener('click', (event) => {
                document.querySelectorAll(".searchparam").forEach(item=>{
                    text_to_search= item.value            
                })
                document.querySelectorAll(".searchtype").forEach(item=>{
                    field_to_search= item.value            
                })
                let data2 =[]
                 data.forEach((d)=>  {                   
                    if (d[field_to_search].toLowerCase()
                    .includes(text_to_search.toLowerCase().trim())){
                        data2.push(d)
                    }
                })
               
                preparePlotArea(visContainer)
                d3.select("#confe").text("Showing search results")                
                let rb=document.querySelectorAll('input[type=radio][name=talk]:checked')
                if (rb.length!=0)
                    {rb[0].checked=false}
                PLOT(data2)
               
        
    })
})



    document.querySelectorAll('.forminput').forEach((item) => {
        item.addEventListener('change', (event) => {
            timefilter = item.lastElementChild.value            
            let rb=document.querySelectorAll('input[type=text][name=searchparam]')
                if (rb.length!=0)
                    {rb[0].value=""}
            if (timefilter=="upcoming"){
                let datafuture = data.sort((d,e)=>   d.Time_UT-e.Time_UT)  
                let fd=datafuture.filter((d) => {
                    let today=getUTC(new Date())
                    return d.Time_UT-new Date(today)>=0})
                console.log(fd)
                preparePlotArea(visContainer)                
                d3.select("#confe").text("Showing upcoming talks")    
                PLOT(fd)            }
            else if (timefilter=="past"){
                let datapast = data.sort((d,e)=> e.Time_UT-d.Time_UT)  

                let fd=datapast.filter((d) => {                    
                    let today=getUTC(new Date())                   
                    return d.Time_UT-new Date(today)<=0})
                preparePlotArea(visContainer)
                d3.select("#confe").text("Showing past talks")                
                PLOT(fd)
                }
            else if (timefilter=="all"){
                data.sort((d,e)=> e.Time_UT-d.Time_UT) 
                preparePlotArea(visContainer)
                d3.select("#confe").text("Showing all Talks")            
                PLOT(data)
            }
        })
    })
    
}
function getUTC(today){
    
    let dd = String(today.getUTCDate()).padStart(2, '0');
    let mm = String(today.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getUTCFullYear();
    let h=String(today.getUTCHours())
    let m=String(today.getUTCMinutes())
    let today2 = mm + '/' + dd + '/' + yyyy+", "+ h + ':' + m //+ ':' + s;
    return  today2
}

function start() {   
    let current_time = new Date(getUTC(new Date()));
    console.log(current_time)
    d3.text("data.csv").then(d => {
        let  a = d3.csvParse(d)           
        ShowData(a)
    })
}
function PLOTVid(data){
  preparePlotArea(".visContainerVid")
    let vidContainer=d3.select(".visContainerVid").append("div")
    console.log(data.columns)
    let vid=vidContainer.selectAll(".vids")
            .data(data) // bind data
            .enter()
            .append("div")
            .attr("class", "video")
            // .style("padding", "20px")
            .append("table")
    data.columns.forEach(e=>{
        if (e=="Repository"){
            let vidd=vid.append("tr")
      vidd.append("td").text(e+":  ").style("font-weight", "bold")
      vidd.append("td").append("a").text(d=>{if (d.Repository!=""){return "Link"}}).attr("href", d=> d.Repository)

        }
        else{
            
            let vidd=vid.append("tr")
            if (e=="Speaker"){
                vidd.append("td").text(e+":  ").style("font-weight", "bold")
                vidd.append("td").text(d=>d[e]).style("font-weight", "bold") } 
                else {
                    vidd.append("td").text(e+":  ").style("font-weight", "bold")
                    vidd.append("td").text(d=>d[e])} 
        }
      
    })       
    
        
}

function startV() {  
    d3.text("records.csv").then(d => {
        let  dv = d3.csvParse(d)    
          
      // d3.select(".visContainerVid").append("div").text("here I am ")  
        PLOTVid(dv)
    })
}


startV()


start()


