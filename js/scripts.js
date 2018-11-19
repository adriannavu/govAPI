$(document).ready(function() {
  console.log('scripts loaded');

  var myKey = config.my_key;
  var npsData;
  var parks = [];
  var query = '';
  var html = '';

  //when user clicks submit, get value of the query
  $('button').click(function() {
    query = $('#query').val();
    console.log(query);
    var url = 'https://api.nps.gov/api/v1/parks?q=' + query + '&api_key=' + myKey; //? = stop here and move on. q = query
    console.log(url);

    $.ajax({
      type: 'GET',
      data: parks,
      dataType: 'json',
      url: url,
      async: true,
      success: function(npsData) {
        console.log(npsData);
        html = '';
        parks = npsData.data;
        console.log(parks);
        //if nothing matches the user's query...
        if (parks.length == 0) {
          html += 'No parks matched your query.';
        }
        // return search results
        parks.forEach(function(park) {
          html += '<h2>' + park.fullName + '</h2>';
          html += '<div>' + park.description + '</div>';
        });
        $('#results').html(html);
      },
      error: function(errorMsg) {
        console.log("uh oh");
      }
    }); //end of inner ajax
  }); // end click function

  var url2 = 'https://api.fda.gov/drug/event.json?api_key=' + myKey + '&search=oxycontin&limit=100';
  var fdaData;
  var drugs = [];

  $.ajax({
    type: 'GET',
    data: drugs,
    dataType: 'json',
    url: url2,
    async: true,
    success: function(fdaData) {
      console.log(fdaData);
      drugs = fdaData.results;
      //for each drug in drugs array, log the reactions each patient had
      drugs.forEach(function(drug) {
        console.log(drug.patient.reaction[0].reactionmeddrapt);
      });
    },
    error: function(errorMsg) {
      console.log("uh oh");
    }
  }); //end of ajax
}); //document wrapper