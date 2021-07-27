const GeoJsonGeometriesLookup = require('geojson-geometries-lookup');
const fs = require('fs');
const HTMLParser = require('node-html-parser');


const getSubzoneByCoordinates = (lat, lon) => {
    const data = fs.readFileSync('subzones.geojson', 'utf8')
    const d = JSON.parse(data);
    const glookup = new GeoJsonGeometriesLookup(d);
    const point1 = {type: "Point", coordinates: [lon, lat]};
    const result = glookup.getContainers(point1, {ignorePoints: true});
    if (result.features.length > 0) {
        const desc = result.features[0].properties.Description
        const region = desc.split(/<th>PLN_AREA_N<\/th> <td>/)[1].split(/</)[0];
        return region
    } else {
        return null
    }
}

console.log(getSubzoneByCoordinates(1.4007368903563469, 103.74548483863823))