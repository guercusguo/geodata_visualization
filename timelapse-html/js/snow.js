mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VlcmN1c2d1byIsImEiOiJja29vYTVmdXIwMnJjMm5vanBrb2dwZmp1In0.GFGEzzSYk1QNXmqJ-9lhjA';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/guercusguo/cl1g9886e002c16rz1w27q18q',
  center: [7.46626,45.39133],
  zoom: 9
});
map.on('load', () => {
  let filterYear = ['!=', ['string', ['get', 'year_s']], '2019'];
  let filterMonth = ['==', ['string', ['get', 'month_s']], 'placeholder'];
  map.addSource('snow',{
    'type':'geojson',
    data: 'json/snow.geojson'
  })
  map.addSource('orco',{
    'type':'geojson',
    data: 'json/orco.geojson'
  })
  map.addSource('orco_base',{
    'type':'geojson',
    data: 'json/orco_base.geojson'
  })
  map.addSource('mapbox-dem', {
    'type': 'raster-dem',
    'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
    'tileSize': 512,
    'maxzoom': 14
  });
  map.addLayer({
    id: 'snow',
    type: 'fill',
    source: 'snow',
    paint: {
      'fill-color': '#f7f7f7',
      'fill-opacity': 0.8
    },
    'filter': ['all', filterMonth, filterYear]
  })
  map.addLayer({
    id: 'orco',
    type: 'fill',
    source: 'orco',
    paint: {
      'fill-color': '#67a9cf',
      'fill-opacity': 0.2
    }
  })
  map.addLayer({
    id: 'orco_fill',
    type: 'fill',
    source: 'orco_base',
    paint: {
      'fill-color': '#ffffff',
      'fill-opacity': 0
    }
  })
  map.addLayer({
    id: 'orco_base',
    type: 'line',
    source: 'orco_base',
    paint: {
      'line-color': '#ef8a62',
      'line-width': 1,
      'line-opacity': 1
    }
  })
  map.addLayer({
    'id': 'sky',
    'type': 'sky',
    'paint': {
      'sky-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        0,
        0,
        5,
        0.3,
        8,
        1
      ],
      'sky-type': 'atmosphere',
      'sky-atmosphere-sun': [262.51, 17],
      'sky-atmosphere-sun-intensity': 5
    }
  });
  map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
  // END of 3D properties
  // update hour filter when the slider is dragged
  document.getElementById('slider').addEventListener('input', (event) => {
    const year = event.target.value;
    // update the map
    filterYear = ['==', ['string', ['get', 'year_s']], year];
    map.setFilter('snow', ['all', filterMonth, filterYear]);
    // update text in the UI
    document.getElementById('active-year').innerText = year;
  });
  document.getElementById('filters').addEventListener('click', (event) => {
    const month = event.target.value;
    // update the map filter
    if (month === 'Oct') {
      filterMonth = [
        'match',
        ['get', 'month_s'],
        ['10'],
        true,
        false
      ];
    }
    else if (month === 'Nov') {
      filterMonth = [
        'match',
        ['get', 'month_s'],
        ['11'],
        true,
        false
      ];
    }
    else if (month === 'Dec') {
      filterMonth = [
        'match',
        ['get', 'month_s'],
        ['12'],
        true,
        false
      ];
    }
    else if (month === 'Jan') {
      filterMonth = [
        'match',
        ['get', 'month_s'],
        ['1'],
        true,
        false
      ];
    }
    else if (month === 'Feb') {
      filterMonth = [
        'match',
        ['get', 'month_s'],
        ['2'],
        true,
        false
      ];
    }
    else if (month === 'Mar') {
      filterMonth = [
        'match',
        ['get', 'month_s'],
        ['3'],
        true,
        false
      ];
    }
    else {
      console.error('error');
    }
    map.setFilter('snow', ['all', filterMonth, filterYear]);
  });
});
map.on('click', 'orco_fill', (e) => {
  new mapboxgl.Popup()
  .setLngLat(e.lngLat)
  .setHTML(e.features[0].properties.nome)
  .addTo(map);
});
map.on('mouseenter', 'orco_fill', () => {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'orco_fill', () => {
  map.getCanvas().style.cursor = '';
});
