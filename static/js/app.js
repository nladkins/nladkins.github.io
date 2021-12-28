// Instructions if trying to run this locally:
    // in the terminal, activate your python environment
        //example: "conda activate python3.8.8"
    // change directory ("cd ") to the level where index.html is located
    // run the command "python -m http.server"
    // go to the browser and type "http://localhost:8000/" in the address bar and go
    // now you should be able to test this locally.

function getPlots(idSelected) {
  // read in json
  d3.json("samples.json").then(function(data) {

  // Initialized arrays
    let id = []
    let otu_ids = []
    let sample_values = []
    let otu_labels = []

  // For loop to populate arrays
    for (let i = 0; i < data.samples.length; i++) {
      if (data.samples[i].id == idSelected){
        row = data.samples[i];
        id.push(row.id);
        otu_ids.push(row.otu_ids)
        sample_values.push(row.sample_values)
        otu_labels.push(row.otu_labels);
      }
    }

  // Verify Data was pushed correctly.
    console.log(`ID: ${id}`)
    console.log(`otu_ids: ${otu_ids}`)
    console.log(`sample_values: ${sample_values}`)
    console.log(`otu_labels: ${otu_labels}`)

  // Fill dropdown
    var choose = d3.select('#selDataset')
    
  // create a trace for the bar chart using slice for the top 10.
    var trace1 = {
      y: otu_ids[0].map(data => `OTU ${data}`).slice(0,10).reverse(),
      x: sample_values[0].slice(0,10).reverse(),
      text: otu_labels[0].slice(0,10).reverse(),
      marker: {
      color: "blue"},
      type:"bar",
      orientation: "h",
    };
    
  // create data variable
    var data1 = [trace1];

  // create a title for the plot
    var layout1 = {
      title: "Top 10 operational taxonomic units (OTUs) per Sample",
      xaxis:{title: "OTU ID"},
      yaxis:{title: "Sample Values"},
    }

    // create the bar plot
    Plotly.newPlot("bar", data1, layout1);
    
  
  // create a trace for the bubble chart using slice for the top 10.
    var trace2 = {
      x: otu_ids[0].slice(0,10),
      y: sample_values[0].slice(0,10),
      mode: "markers",
      marker: {
        size: sample_values[0].slice(0,10),
        color: otu_ids[0].slice(0,10)
      },
      text: otu_labels[0]
    }

    var data2 = [trace2]
    
    var layout2 = {
      title: "Top 10 operational taxonomic units (OTUs) occurence per Sample (bubble size proportional to amount)",
      xaxis:{title: "OTU ID"},
      yaxis:{title: "Sample Values"},
    }
  
    Plotly.newPlot("bubble", data2, layout2);
  
  })
}
// Need a function to identify the event that changed
function optionChanged(id) {
getPlots(id);
getDemoInfo(id);
}

// collect the demographic information using the id as the key
function getDemoInfo(id) {

// Read in the json file again to get the metadata for demographics
  d3.json("samples.json").then((data)=> {

  // specifically grab the metadata for the demographic info
    var metadata = data.metadata;

  // print the metadata
    console.log(metadata)

  // filter the metadata using the id as the key
    var result = metadata.filter(md => md.id.toString() === id)[0];

  // Map the new information to the the demographic section in the html doc
    var demographicInfo = d3.select("#sample-metadata");
    
  // clear out the demographic information for the new id selected
    demographicInfo.html("");

  // append the relevant demographic item to display the id selected by the user
    Object.entries(result).forEach((item) => {
      demographicInfo.append("h5").text(item[0] + ": " + item[1] + "\n");    
    });
  });
}

function init() {
// select the drop down portion of the html document
  var dropdown = d3.select("#selDataset");

// read the json data again pulling in the names for the drop down menu items
  d3.json("samples.json").then((data)=> {
    // console.log(data)

  // get the name data for the drop down items
    data.names.forEach(function(name) {
        dropdown.append("option").text(name).property("value");
    
  // using the name info to call out the function for the demographic info
    getPlots(data.names[0]);
    getDemoInfo(data.names[0]);
      
    });

  });

}
// initialize
init();
