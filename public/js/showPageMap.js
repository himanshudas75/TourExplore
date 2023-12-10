function GetMap() {
    const coordinates = tourspot.geometry.coordinates;
    const pin_svg =
        '<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="5" r="5" fill="rgba(10, 90, 10, 0.5)" /></svg>';

    const map = new Microsoft.Maps.Map('#map', {
        credentials: mapToken,
        center: new Microsoft.Maps.Location(...coordinates),
        zoom: 12,
        mapTypeId: Microsoft.Maps.MapTypeId.canvasLight,
    });

    const location = map.getCenter();

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

    map.entities.push(pin);
}
