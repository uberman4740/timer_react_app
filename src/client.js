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
export function createTimer(data) {
  return fetch('/api/timers', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(checkStatus);
}

export function updateTimer(data) {
  return fetch('/api/timers', {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(checkStatus);
}

export function deleteTimer(data) {
  return fetch('/api/timers', {
    method: 'delete',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(checkStatus);
}

export function startTimer(data) {
  return fetch('/api/timers/start', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(checkStatus);
}

export function stopTimer(data) {
  return fetch('/api/timers/stop', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(checkStatus);
}
