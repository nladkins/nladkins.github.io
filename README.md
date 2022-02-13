# Belly Button Biodiversity Data

## Background

In January 2011, North Carolina State University (NCSU) launched a Belly Button Biodiversity study to investigate the microbes inhabiting the human belly button.  Their study (Latimer et al.) revealed that the belly button has a lot of diverse microbials that inhabit this environment.  Of the 60 navels samples, 2,300 species were identifie.  Eight of those were identified as being frequent.  This data is visualized below focusing on the top 10 microbials per sample.

## Purpose of this Repository

The purpose of this repository is to use Java Script and Plotly to develop interactive web plots that visualize the data across each of the samples. The source data is a local .json file that that javascript is readin in.

### Drop Down Menu

The drop down menu displays the different samples that were taken from the study.  Each one is identified by a sample ID.  Once selected, the metadata is displayed for that sample.  The bar chart and bubble chart update to focus just on those samples.

### Bar Plot

The bar plot provides data displaying the top 10 of the different microbial “species” (technically operational taxonomic units, OTUs) across all the belly buttons sampled.  This chart shows the number of samples that were found for that particular belly button.  Further, popups are included when a user hovers over the a bubble.

### Bubble Plot

The bubble plot also focuses on the top 10 microbial species.  However, the bubbles are proportional to the number identified for one microbial vs. another.  Further, popups are included when a user hovers over the a bubble.

### Console

The console.log() function was used throughout the code when it was developed.  Due to the length of the console, those were moved prior to deployment.  This made the loading process a bit easier on the computer.  

## Instructions for local deployment

Due to increase in security, running this directly on a local machine may not be possible.  To run this locally, a user needs to create a server environment on their machine.  THe instructions for doing so include:

  1.  In the terminal, activate your python environment.
      Example:  "conda activate python3.8.8"
  2.  Change the directory ("cd") to the level where the index.html is located.
  3.  Run the command "python -m http.server"
  4.  Go to the browswer and type "http://localhost:8000/" in the address bar.
