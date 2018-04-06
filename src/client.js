import fetch from 'isomorphic-fetch';
function parseJSON(response) {
    return response.json();
}
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error);
  throw error;
}
export function getTimers(success) {
  return fetch('/api/timers', {
    headers: {
      Accept: 'application/json',
    },
  }).then(parseJSON)
    .then(success);
}
