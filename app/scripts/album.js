
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
  var $newSongRow = $('<tr>');
  //Fill the table row, with table data, set with md breakpoint column widths. 
  $newSongRow.append('<td class ="col-md-1 songRow" id="songNumber">' + songNumber + '</td>');
  $newSongRow.append('<td class ="col-md-9 songRow">' + songName + '</td>');
  $newSongRow.append('<td class ="col-md-2 songRow">' + songLength + '</td>');
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
    var $songRow = $('.songRow');
    
    //Click Handler
    $songRow.hover(function(event) {
    var $thisRow = $(this).attr("td", "#songNumber"); 
    $thisRow.replaceWith('<td class ="col-md-1 songRow" id="songNumber">' + "play" + '</td>'); 
  });

  });
}
