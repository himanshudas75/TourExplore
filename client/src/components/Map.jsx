import { useEffect } from 'react';

function Map({ action, tourspot, tourspots, scriptName }) {
    const mapToken = import.meta.env.VITE_BING_API_KEY;

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'http://www.bing.com/api/maps/mapcontrol?callback=GetMap';
        script.async = true;
        script.defer = true;
        const tokenScript = document.createElement('script');
        document.body.appendChild(script);

        tokenScript.innerHTML = `
                window.mapToken = '${mapToken}';
                ${
                    action === 'map-cluster'
                        ? `window.tourspots = ${JSON.stringify(tourspots)};`
                        : `window.tourspot = ${JSON.stringify(tourspot)};`
                }
        `;
        document.body.appendChild(tokenScript);

        const mapScript = document.createElement('script');
        mapScript.src = `/src/assets/js/${scriptName}`;
        mapScript.async = true;
        mapScript.defer = true;
        document.body.appendChild(mapScript);

        return () => {
            document.body.removeChild(script);
            document.body.removeChild(mapScript);
            document.body.removeChild(tokenScript);
        };
    }, [tourspots]);
    return (
        <>
            <div id={action} className="map"></div>
        </>
    );
}

export default Map;
