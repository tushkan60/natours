/*eslint-disable*/
export const displayMap = (locations) => {
  ymaps.ready(init);
  function init() {
    const myMap = new ymaps.Map('map', {
      center: [locations[0].coordinates[1], locations[0].coordinates[0]],
      zoom: 6,
    });

    for (let location of locations) {
      let GeoObject = new ymaps.GeoObject(
        {
          geometry: {
            type: 'Point',
            coordinates: [location.coordinates[1], location.coordinates[0]],
          },
          properties: {
            iconContent: `Day ${location.day}: ${location.description}`,
          },
        },
        {
          preset: 'islands#blackStretchyIcon',
        },
      );
      myMap.geoObjects.add(GeoObject);
    }
  }
};
