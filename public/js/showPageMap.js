function GetMap() {
    const map = new Microsoft.Maps.Map('#myMap', {
        credentials: mapToken,
        center: new Microsoft.Maps.Location(...tourspot.geometry.coordinates),
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

    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
        if (infobox.getVisible()) {
            infobox.setOptions({ visible: false });
        } else {
            infobox.setOptions({ visible: true });
        }
    });

    map.entities.push(pin);
    map.entities.push(infobox);
}
