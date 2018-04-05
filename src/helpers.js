
function pad(numberString, size) {
    let padded = numberString;
    while (padded.length < size) padded = `0${padded}`;
    return padded;
}
function millisecondsToHuman(ms) {
    seconds = Math.floor((ms/1000) %60)
    minutes = Math.floor((ms/(1000*60))%60)
    hours= Math.floor((ms/(1000*3600))%24)
    const humanized = [
        pad(hours.toString(), 2),
        pad(minutes.toString(), 2),
        pad(seconds.toString(), 2),
    ].join(':');

    return humanized;


}
export function renderElapsedString  (elapsed, runningSince)  {
    totalElapsedTime = 0
    if (runningSince) {
        totalElapsedTime += Date.now() - elapsed
    }
    return millisecondsToHuman(totalElapsedTime)
}

