
// Example Album 1
var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: '/images/album-placeholder.png',

  songs: [
      { name: 'Blue', length: '4:26' },
      { name: 'Green', length: '3:14' },
      { name: 'Red', length: '5:01' },
      { name: 'Pink', length: '3:21'},
      { name: 'Magenta', length: '2:15'}
    ]
};

// Example Album 2
var albumMarconi = {
  name: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: '/images/album-placeholder2.png',

  songs: [
      { name: 'Hello, Operator?', length: '1:01' },
      { name: 'Ring, ring, ring', length: '5:01' },
      { name: 'Fits in your pocket', length: '3:21'},
      { name: 'Can you hear me now?', length: '3:14' },
      { name: 'Wrong phone number', length: '2:15'}
    ]
};

var createSongRow = function(songNumber, songName, songLength) {
  //Create a variable that is a new table row. 
  var $newSongRow = $('<tr class="songRow">');
  //Fill the table row, with table data, set with md breakpoint column widths. 
  $newSongRow.append('<td class ="col-md-1"><span class="songNumber">' + songNumber + '</span><span class="glyphicon glyphicon-play hidden playButton"></span></td>');
  $newSongRow.append('<td class ="col-md-9">' + songName + '</td>');
  $newSongRow.append('<td class ="col-md-2">' + songLength + '</td>');
  //Return the table row with the album data appended. 
  return $newSongRow;
};

var changeAlbumView = function(album) {
  //Update the album information
  var $albumTitle = $('.album-title');
  $albumTitle.text(album.name);

  var $albumArtist = $('.album-artist');
  $albumArtist.text(album.artist);

  var $albumMeta = $('.album-meta-info');
  $albumMeta.text(album.year + " on " + album.label);

  var $albumImage = $(".album-img img");
  $albumImage.attr('src', album.albumArtUrl);

  //Update the song listing
  var $songList = $(".album-song-listing");
  $songList.empty();
  var songs = album.songs;
  for (var i = 0; i < songs.length; i++) {
    //Grabs the data from the song array above in each album. 
    var songData = songs[i];
    //Fills the newRow variable with the song data, and uses the song position to determine the track number. 
    var $newRow = createSongRow(i,songData.name, songData.length);
    //Injects the data from the album into the .album-song-listing div
    $songList.append($newRow);
  };

};

// This 'if' condition is used to prevent the jQuery modifications
// from happening on non-Album view pages.
//  - This line checks if the current url has "/album" in its path using a regex.
if (document.URL.match(/\/album/)) { 
    
    // Wait until the HTML is fully processed.
    $(document).ready(function() {
    var albums = [albumPicasso, albumMarconi];
    changeAlbumView(albumPicasso);
    var albumIndex = 0;

    //Define the location for the Album Image click handler
    var $albumImage = $('.album-img img');
    //Click handler
    $albumImage.click(function(event) {
      albumIndex = (albumIndex + 1) % albums.length;
      changeAlbumView(albums[albumIndex]);
    });
    
    //Define the loacation for the row click handler. 
    //Example of event delegation 

        /*Define the event : 

        We tell JS that .album-song-listing should bubble up an event if there is a mouseenter on it's child element class .songRow, and when that happens, that the event trigger is, itself, or this. 
   
        /*Notice stringing of Jquery here. 

        First, when mousing over the .songRow div, it then finds classes within .songRow that have .either the class of .songNumber or .playButton. First,  it finds the class of .songnumber, and add's a class to all those elements with the class of Bootstrasps hidden tag. Then, we tell jQuery to end that task, and start a new one following the ., in this case to find the elements with a class of .playbutton, and _remove_ the class of hidden, thereforemaking it show, and making songNumber dissapear. Stringing jQuery commands.(sic).
        .find(".songNumber").addClass("hidden").end().find(".playButton").removeClass("hidden"); 

        

        */
    $(".album-song-listing").on("mouseenter", ".songRow", function (event) {
    $(this)}).

      on("mouseleave", ".songRow", function (event) {
      var row = $(this);
      var songNumber = row.find(".songNumber");
      var playButton = row.find(".playButton");

      if (playButton.hasClass("glyphicon-play")) {
        playButton.addClass("hidden");
        songNumber.removeClass("hidden");
      }
    }).on("click", ".playButton", function (event) {
      var button = $(this);

      if (button.hasClass("glyphicon-play")) {
        button.removeClass("glyphicon-play").addClass("glyphicon-pause");
      } else {
        button.removeClass("glyphicon-pause").addClass("glyphicon-play");
      }
    })
    //var $songRow = $('.songRow');
    //Click Handler ( Hover over row, change play button)

    // $songRow.hover(function(event) {
    //   $thisRow = $(this).find('.songNumber');
    //   $previous = $thisRow;
    //   $thisRow.replaceWith('<td class ="col-md-1 songNumber">' + "<span class=\x27glyphicon glyphicon-play playButton\x27></span>" + '</td>');
    // }, function (event) { 
    //   // if (event.target == $(('.playButton'))) {console.log("Rolled over the playbutton");
    //   // } else {
    //     console.log(this);
    //   $thisRow = $(this).find('.songNumber');
    //   $thisRow.replaceWith($previous);
    //   // }
    //       });

    //Define click button for the play/pause behavior. 
    // var $playButton = $('.playButton');
    // //Click Handler for Play/Pause 
    // $playButton.click(function(event){
    //   console.log("Play Button clicked");
    //   //$thisplayButton = $(this).find('playButton');
    //   $playButton.replaceWith('<td class ="col-md-1 songNumber pauseButton">' + "<span class=\x27glyphicon glyphicon-pause\x27></span>" + '</td>');
    // });

  //End Doc Ready Function
  });
}
