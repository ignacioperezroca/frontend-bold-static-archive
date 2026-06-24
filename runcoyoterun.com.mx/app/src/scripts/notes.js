// -------------------------
// NOTES
// -------------------------

  // GSAP
  var tl = new TimelineMax(),
    forward = true,
    animation01 = null,
    tl = new TimelineMax(tmax_options),
    tmax_options = {
    delay: 0,
    paused: false,
  };

// Video
// 2. This code loads the IFrame Player API code asynchronously.
  // var tag = document.createElement('script');

  // tag.src = "https://www.youtube.com/iframe_api";
  // var firstScriptTag = document.getElementsByTagName('script')[0];
  // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // // 3. This function creates an <iframe> (and YouTube player)
  // //    after the API code downloads.
  // var player;
  // function onYouTubeIframeAPIReady() {
  //   player = new YT.Player('player', {
  //     height: '100%',
  //     width: '100%',
  //     setVolume: 0,
  //     videoId: 'm78eeYze4k4',
  //     playerVars: { 'autoplay': 1, 'controls': 0 },
  //     events: {
  //       'onReady': onPlayerReady,
  //       'onStateChange': onPlayerStateChange
  //     }
  //   });
  // }
  // // 4. The API will call this function when the video player is ready.
  // function onPlayerReady(event) {
  //   event.target.playVideo();
  // }
  // var done = false;
  // function onPlayerStateChange(event) {
  //   if (event.data == YT.PlayerState.PLAYING && !done) {
  //     // done = true;
  //     player.mute();
  //   }
  // }
  // function stopVideo() {
  //   player.stopVideo();
  // }  




  // Audio Player
  // var audio = [
  //   {url: 'assets/track-01.mp3', isPlaying: false},
  //   {url: 'assets/track-02.mp3', isPlaying: false}
  // ];
  var audio = [
    'assets/track-01.mp3',
    'assets/track-02.mp3'
  ];

  $('.fa-power-off').click(function(){
    $(this).toggleClass('active');
    console.log('.fa-power changed');
    // audioPlayer.playAudio();
    audio.play();
    console.log('Audios is playing');
  });

  $(audio).each(function(index){
    // console.log(audio);
  });


// Audio Player
var audioPlayer = (function() {
  var playAudio = function(){
    if(isPlaying == false){
      audio.play();
      console.log('Audios is playing');
    }else{
      audio.stop();
      console.log('Audios has stoped');
    }
  };
  return{
    playAudio: playAudio
  }
})();



