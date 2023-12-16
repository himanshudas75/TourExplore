function GetSingleMap(mapToken, tourspot, div_id) {
    if (!tourspot) return;
    const defaultCoordinates = new Microsoft.Maps.Location(50.8038, 18.78586);
    const coordinates = tourspot.geometry.coordinates;
    var center = [];
    var pushPin = false;
    if (coordinates.length) {
        center = new Microsoft.Maps.Location(...coordinates);
        pushPin = true;
    } else center = defaultCoordinates;

    const map = new Microsoft.Maps.Map(`#${div_id}`, {
        credentials: mapToken,
        center: center,
        zoom: 12,
        mapTypeId: Microsoft.Maps.MapTypeId.canvasLight,
    });

    const location = center;

    const pin = new Microsoft.Maps.Pushpin(location, {});
    const infobox = new Microsoft.Maps.Infobox(location, {
        title: tourspot.title,
        description: tourspot.location,
        visible: false,
    });
    infobox.setMap(map);

    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
        infobox.setOptions({ visible: true });
    });

    if (pushPin) map.entities.push(pin);
}
