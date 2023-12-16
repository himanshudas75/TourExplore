import { useEffect } from 'react';

function DisplayMap({ action, tourspot, tourspots, div_id }) {
    const mapToken = import.meta.env.VITE_BING_API_KEY;

    useEffect(() => {
        const tokenScript = document.createElement('script');
        tokenScript.innerHTML = `
            ${
                action === 'cluster'
                    ? `GetClusterMap('${mapToken}', ${JSON.stringify(
                          tourspots
                      )}, '${div_id}');`
                    : `GetSingleMap('${mapToken}', ${JSON.stringify(
                          tourspot
                      )}, '${div_id}')`
            }
        `;

        document.head.appendChild(tokenScript);

        return () => {
            document.head.removeChild(tokenScript);
        };
    }, [tourspots]);
    return (
        <>
            <div
                id={div_id}
                className="map"
                style={{ height: '100%', width: '100%' }}
            ></div>
        </>
    );
}

export default DisplayMap;
