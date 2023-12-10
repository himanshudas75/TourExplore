function GetMap() {
    const map = new Microsoft.Maps.Map('#indexPageMap', {
        credentials: mapToken,
        center: new Microsoft.Maps.Location(
            40.031829069489895,
            -94.04153815000001
        ),
        zoom: 4,
        mapTypeId: Microsoft.Maps.MapTypeId.canvasLight,
    });

    const pin_svg =
        '<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="5" r="5" fill="rgba(10, 90, 10, 0.5)" /></svg>';

    const infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false,
    });
    infobox.setMap(map);

    Microsoft.Maps.loadModule('Microsoft.Maps.Clustering', function () {
        const pins = tourspots.map(function (tourspot) {
            const coordinates = new Microsoft.Maps.Location(
                ...tourspot.geometry.coordinates
            );

            const pushpin = new Microsoft.Maps.Pushpin(coordinates, {
                icon: pin_svg,
            });

            pushpin.metadata = {
                title: tourspot.title,
                description: tourspot.infoboxMarkup,
            };

            Microsoft.Maps.Events.addHandler(pushpin, 'click', function (e) {
                infobox.setOptions({
                    location: e.target.getLocation(),
                    description: e.target.metadata.description,
                    visible: true,
                });
            });

            return pushpin;
        });

        const clusterLayer = new Microsoft.Maps.ClusterLayer(pins, {
            clusteredPinCallback: createCustomClusteredPin,
            gridSize: 80,
        });
        map.layers.insert(clusterLayer);

        Microsoft.Maps.Events.addHandler(clusterLayer, 'click', function (e) {
            if (e.target instanceof Microsoft.Maps.ClusterPushpin) {
                const pushPins = e.target.containedPushpins;
                var description = pushPins
                    .slice(0, 3)
                    .map((pin) => {
                        return pin.metadata.description;
                    })
                    .join('<br>');

                if (pushPins.length > 3) {
                    description = description.concat('<br>...');
                }

                infobox.setOptions({
                    location: e.target.getLocation(),
                    description: description,
                    visible: true,
                });
            }
        });
    });
}

function createCustomClusteredPin(cluster) {
    var minRadius = 12;
    var outlineWidth = 7;
    var clusterSize = cluster.containedPushpins.length;

    //Calculate the radius of the cluster based on the number of pushpins in the cluster, using a logarithmic scale.
    var radius = (Math.log(clusterSize) / Math.log(10)) * 5 + minRadius;

    //Default cluster color is red.
    var fillColor = 'rgba(255, 40, 40, 0.5)';

    if (clusterSize < 10) {
        //Make the cluster green if there are less than 10 pushpins in it.
        fillColor = 'rgba(20, 180, 20, 0.5)';
    } else if (clusterSize < 100) {
        //Make the cluster yellow if there are 10 to 99 pushpins in it.
        fillColor = 'rgba(255, 210, 40, 0.5)';
    }

    //Create an SVG string of two circles, one on top of the other, with the specified radius and color.
    var svg = [
        '<svg xmlns="http://www.w3.org/2000/svg" width="',
        radius * 2,
        '" height="',
        radius * 2,
        '">',
        '<circle cx="',
        radius,
        '" cy="',
        radius,
        '" r="',
        radius,
        '" fill="',
        fillColor,
        '"/>',
        '<circle cx="',
        radius,
        '" cy="',
        radius,
        '" r="',
        radius - outlineWidth,
        '" fill="',
        fillColor,
        '"/>',
        '</svg>',
    ];

    //Customize the clustered pushpin using the generated SVG and anchor on its center.
    cluster.setOptions({
        icon: svg.join(''),
        anchor: new Microsoft.Maps.Point(radius, radius),
        textOffset: new Microsoft.Maps.Point(0, radius - 8), //Subtract 8 to compensate for height of text.
    });
}
