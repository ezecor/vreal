var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
});
var map = L.map('map', {
    center: [40.85, -8.41],
    minZoom: 9,
    maxZoom: 9,
    //zoom: 8,
    pan: false,
    zoomControl: false,
    layers: [CartoDB_Positron]
});
var dist = L.geoJSON(distrito, {
    style: conc_style,
    zindex: 2,
    onEachFeature: atributos
}).addTo(map);
var bounds = dist.getBounds();
map.fitBounds(dist.getBounds());
map.setMaxBounds(bounds);
function atributos(feature, layer) {
    layer.bindTooltip(feature.properties.Concelho, {permanent: true, direction: "center", className: "labels"});;
    layer.on({
        click: onclick
    });
}
function onclick(e) {
    var mapa = e.target.feature.properties.Mapa;
    if (mapa === "Sim") {
        window.open(e.target.feature.properties.Link);        
    } else {
        alert("Não existem alminhas georreferenciadas");
    }
}        
function conc_style(feature) {
    var simbol = feature.properties.Mapa;
    if (simbol === "Sim"){
        return {
            color: "gray",
            weight: 0.8,
            fillColor: "green",
            fillOpacity: 0.3
        };

    } else {
        return {
            color: 'gray',
            weight: 0.8,
            fillColor: "green",
            fillOpacity: 0.1
            //fill: false
        };
    }
}
var leg_Alminhas = L.control({position: "bottomright"});
leg_Alminhas.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legenda");
    div.innerHTML =
    'Inventário<br>' +
    '<div style="background-color: #006300; opacity: 0.5"></div> Sim<br>' +
    '<div style="background-color: #006300; opacity: 0.2"></div> Não<br>';
    return div;
    };
leg_Alminhas.addTo(map);
var scale = L.control.scale();
scale.addTo(map);
map.attributionControl.setPrefix(
    '&copy; <a href="https://sites.google.com/view/fmtcultura/projeto">Projecto Alminhas</a>' + ' &copy; Mapa Interactivo: <a href="mailto:ezcorreia@gmail.com">Ezequiel Correia</a> | <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
); 
