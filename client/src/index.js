import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.css';
import Pop from './Pop';
import reportWebVitals from './reportWebVitals';

import {Circle, Fill, Style} from 'ol/style';
import {Feature, Map, Overlay, View} from 'ol/index';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Point} from 'ol/geom';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {useGeographic} from 'ol/proj';

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var name = profile.getName();
  var image = profile.getImageUrl();
}

function popup(facility){
  const popup = ReactDOM.createRoot(document.getElementById('popup'));
  popup.render(
    <React.StrictMode>
      <Pop 
        name={facility["name"]} 
        address={facility["address"]}
        inoutDoor={facility["inoutDoor"]}
        sports={facility["sports"]}
      />
    </React.StrictMode>
  );
}

reportWebVitals();

useGeographic();

const campus = [-96.68841, 40.82731];

const campusRec = new Point([-96.70228, 40.82197]);
const harper = new Point([-96.70075, 40.82433]);
const trago = new Point([-96.69036, 40.81946]);
const peter = new Point([-96.67314, 40.82407]);
const vine = new Point([-96.69565, 40.81938]);
const mabel = new Point([-96.69988, 40.82236]);
const knoll = new Point([-96.69437, 40.81824]);
const fleming = new Point([-96.67691, 40.83740]);
const wellness = new Point([-96.67017, 40.83094]);

const circle = new Style({
    image: new Circle({
        radius: 9,
        fill: new Fill({color: 'crimson'}),
        stroke: new ol.style.Stroke({
          color: '#b30734',
          width: 3
      }),
    }),
});

const map = new Map({
  target: 'map',
  view: new View({
    center: campus,
    zoom: 14.5,
  }),
  layers: [
    new TileLayer({ source: new OSM(), }),
    new VectorLayer({source:new VectorSource({features:[new Feature(campusRec)],}),style:circle}),
    new VectorLayer({source:new VectorSource({features:[new Feature(harper)],}),style:circle}),
    new VectorLayer({source:new VectorSource({features:[new Feature(trago)],}),style:circle}),
    new VectorLayer({source:new VectorSource({features:[new Feature(peter)],}),style:circle}),
    new VectorLayer({source:new VectorSource({features:[new Feature(vine)],}),style:circle}),
    new VectorLayer({source:new VectorSource({features:[new Feature(mabel)],}),style:circle}),
    new VectorLayer({source:new VectorSource({features:[new Feature(knoll)],}),style:circle}),
    new VectorLayer({source:new VectorSource({features:[new Feature(fleming)],}),style:circle}),
    new VectorLayer({source:new VectorSource({features:[new Feature(wellness)],}),style:circle}),
  ],
});

map.on('click', function (event){
  if (map.hasFeatureAtPixel(event.pixel)) {
    var xVal = event.coordinate[0].toFixed(3)*-1;
    var yVal = event.coordinate[1].toFixed(3);
    var facility; var address; var inoutDoor; var sports;
    if (xVal==96.702 || xVal==96.703){ 
      facility = {
        name: "UNL Campus Recreation Center",
        address: "841 N 14th St, Lincoln, NE 68508",
        inoutDoor: "Indoor",
        sports: "Basketball, Soccer, Football, Volleyball, Tennis"
      };
    } else if (xVal.toFixed(2)==96.70 && (yVal==40.825 || yVal==40.824)){
      facility = {
        name: "Harper Courts",
        address: "1150 N 14th St, Lincoln, NE 68508",
        inoutDoor: "Outdoor",
        sports: "Basketball, Tennis"
      };
    } else if (yVal==40.822 || yVal==40.823){
      facility = {
        name: "Mabel Lee Fields",
        address: "1433 W St, Lincoln, NE 68508",
        inoutDoor: "Outdoor",
        sports: "Soccer, Football"
      };
    } else if ((yVal==40.819||yVal==40.82) && (xVal==96.696||xVal==96.695)){
      facility = {
        name: "UNL Vine Street Fields",
        address: "Lincoln, NE 68588",
        inoutDoor: "Outdoor",
        sports: "Soccer, Football, Baseball, Tennis"
      };
    } else if ((yVal==40.819||yVal==40.818) && (xVal==96.695||xVal==96.694)){
      facility = {
        name: "Knoll Sand Volleyball Courts",
        address: "University of Nebraska-Lincoln, Lincoln, NE 68588",
        inoutDoor: "Outdoor",
        sports: "Volleyball"
      };
    } else if (xVal==96.691 || xVal==96.69){
      facility = {
        name: "Trago Park Basketball Courts",
        address: "Lincoln, NE 68503",
        inoutDoor: "Outdoor",
        sports: "Basketball"
      };
    } else if (yVal==40.838 || yVal==40.837){
      facility = {
        name: "Fleming Fields",
        address: "Leighton Ave &, N 31st St, Lincoln, NE 68504",
        inoutDoor: "Outdoor",
        sports: "Baseball"
      };
    } else if (xVal==96.674 || xVal==96.673){
      facility = {
        name: "Peter Pan Park Basketball Court",
        address: "Lincoln, NE 68503",
        inoutDoor: "Outdoor",
        sports: "Basketball"
      };
    } else {
      facility = {
        name: "UNL Recreation & Wellness Center",
        address: "1717 N 35th St, Lincoln, NE 68503",
        inoutDoor: "Indoor",
        sports: "Basketball, Volleyball"
      };
    }
    popup(facility);
  }
});

map.on('pointermove', function (event){
  var cursor;
  (map.hasFeatureAtPixel(event.pixel)) ? cursor = 'pointer' : cursor = 'inherit';
  map.getViewport().style.cursor = cursor;
});
