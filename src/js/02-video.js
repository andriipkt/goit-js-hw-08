import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

player.on('timeupdate', throttle(saveCurrentTime, 1000));

function saveCurrentTime(data) {
  const currentTime = data.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
}

const storedTime = localStorage.getItem('videoplayer-current-time');

if (storedTime) {
  player.setCurrentTime(storedTime);
}
