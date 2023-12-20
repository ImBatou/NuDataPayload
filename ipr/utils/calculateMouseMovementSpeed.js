lastEvent = false
xScaleFactor = 1 / window.screen.width
yScaleFactor = 1 / window.screen.height
minSpeed = null
maxSpeed = null
minSpeedCoordinates = null
maxSpeedCoordinates = null

function roundToDecimalPlaces(a, decimalPlaces, shouldDivide = true) {
    const multiplier = Math.pow(10, decimalPlaces);
    let roundedResult = Math.round(a * multiplier);

    if (shouldDivide) {
        roundedResult /= multiplier;
    }

    return roundedResult;
}

function calculateMouseMovementSpeed(event) {
    let currentTime = getTimeStampMs();
    let currentPosition = getMouseCoordinates(event);

    if (lastEvent != false) {
        var xDistance = Math.abs(currentPosition.x - lastEvent.pos.x) * xScaleFactor;
        var yDistance = Math.abs(currentPosition.y - lastEvent.pos.y) * yScaleFactor;
        var timeDifference = (currentTime - lastEvent.time) / 1000;
        var xSpeed = roundToDecimalPlaces(xDistance / timeDifference, 4, true);
        var ySpeed = roundToDecimalPlaces(yDistance / timeDifference, 4, true);
        var totalDistance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
        var totalSpeed = roundToDecimalPlaces(totalDistance / timeDifference, 4, true);
        if (minSpeed === null || totalSpeed < minSpeed && totalSpeed !== 0) {
            minSpeedCoordinates = [xSpeed, ySpeed];
            minSpeed = totalSpeed;
        }
        if (maxSpeed === null || totalSpeed > maxSpeed && totalSpeed !== 0) {
            maxSpeedCoordinates = [xSpeed, ySpeed];
            maxSpeed = totalSpeed;
        }
        distanceSumY += yDistance;
        distanceSumX += xDistance;

        
        if (previousSpeed !== null) {
            var speedDifference = (totalSpeed - previousSpeed) / timeDifference;
            if (minSpeedDifference === null || speedDifference < minSpeedDifference && speedDifference !== 0) {
                minSpeedDifference = speedDifference;
            }
            if (maxSpeedDifference === null || speedDifference > maxSpeedDifference && speedDifference !== 0) {
                maxSpeedDifference = speedDifference;
            }
            speedDifferenceSum += speedDifference;
        }
        previousSpeed = totalSpeed;
    }
    if (eventCount !== 0 && eventCount % eventThresholds[eventIndex] === 0) {
        var timeSinceLastEvent = eventCount === 0 ? 0 : currentTime - lastEventTime;
        averageSpeed = roundToDecimalPlaces(distanceSumY / eventThresholds[eventIndex], 4, false);
        totalDistance = roundToDecimalPlaces(distanceSumX, 4, false);
        var eventCountAdjustment = timeSinceLastEvent === 0 ? -1 : 0;
        averageSpeedDifference = roundToDecimalPlaces(speedDifferenceSum / (eventThresholds[eventIndex] + eventCountAdjustment), 4, false);
        if (minSpeedCoordinates === null && maxSpeedCoordinates === null && averageSpeed === 0 && totalDistance === 0) {
            logEvent(eventType, [timeSinceLastEvent, eventThresholds[eventIndex], "NOP"]);
        } else {
            minSpeedCoordinates[0] = roundToDecimalPlaces(minSpeedCoordinates[0], 4, false).toString(16);
            minSpeedCoordinates[1] = roundToDecimalPlaces(minSpeedCoordinates[1], 4, false).toString(16);
            maxSpeedCoordinates[0] = roundToDecimalPlaces(maxSpeedCoordinates[0], 4, false).toString(16);
            maxSpeedCoordinates[1] = roundToDecimalPlaces(maxSpeedCoordinates[1], 4, false).toString(16);
            minSpeedDifference = minSpeedDifference !== null ? roundToDecimalPlaces(minSpeedDifference, 4, false) : 0;
            maxSpeedDifference = maxSpeedDifference !== null ? roundToDecimalPlaces(maxSpeedDifference, 4, false) : 0;
            logEvent(eventType, [timeSinceLastEvent, eventThresholds[eventIndex], minSpeedCoordinates[0] + " " + minSpeedCoordinates[1], maxSpeedCoordinates[0] + " " + maxSpeedCoordinates[1], averageSpeed, totalDistance, minSpeedDifference, maxSpeedDifference, averageSpeedDifference]);
        }
        maxSpeed = minSpeed = minSpeedCoordinates = maxSpeedCoordinates = null;
        distanceSumX = distanceSumY = 0;
        maxSpeedDifference = minSpeedDifference = null;
        speedDifferenceSum = 0;
        lastEventTime = currentTime;
    }
    lastEvent = {
        pos: currentPosition,
        time: currentTime
    };
    if (eventCount >= maxEventCount[eventIndex]) {
        resetEventCount();
    }
    eventCount++;
}