const socket = new WebSocket('ws://twoj_serwer.com:8080'); // Adres Twojego serwera WebSocket

const audioPlayer = document.getElementById('audioPlayer');

audioPlayer.addEventListener('play', function() {
    socket.send(JSON.stringify({ action: 'play' }));
});

audioPlayer.addEventListener('pause', function() {
    socket.send(JSON.stringify({ action: 'pause' }));
});

audioPlayer.addEventListener('seeked', function() {
    socket.send(JSON.stringify({ action: 'seek', time: audioPlayer.currentTime }));
});

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);

    if (data.action === 'play') {
        audioPlayer.play();
    } else if (data.action === 'pause') {
        audioPlayer.pause();
    } else if (data.action === 'seek') {
        audioPlayer.currentTime = data.time;
    }
};
