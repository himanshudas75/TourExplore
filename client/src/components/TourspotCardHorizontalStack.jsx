import TourspotCardHorizontal from './TourspotCardHorizontal';

function TourspotCardHorizontalStack({ tourspots }) {
    return (
        <>
            {tourspots.length
                ? tourspots.map((tourspot) => (
                      <TourspotCardHorizontal
                          key={tourspot._id}
                          tourspot={tourspot}
                      />
                  ))
                : ''}
        </>
    );
}

export default TourspotCardHorizontalStack;
