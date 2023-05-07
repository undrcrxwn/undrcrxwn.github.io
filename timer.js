const timer = document.getElementById('timer')
const sound = document.getElementById('sound')

const encoded = window.location.search.substring(1)
const decoded = atob(encoded)
const deadline = new Date(decoded)

setInterval(() => {
  const difference = deadline - Date.now()
  const delta = new Date(difference)

  const formatted = `дедлайн через ${formatUtc(delta)} `
  timer.innerText = formatted.repeat(500)

  sound.play()
}, 1)

function formatUtc(date) {
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  const seconds = date.getUTCSeconds().toString().padStart(2, '0')
  const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0')

  return `${hours}:${minutes}:${seconds}.${milliseconds}`
}