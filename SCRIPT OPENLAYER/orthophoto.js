var projection = ol.proj.get('EPSG:3857');
var projectionExtent = projection.getExtent();
var size = ol.extent.getWidth(projectionExtent) / 256;
var resolutions = new Array(20);
var matrixIds = new Array(20);
for (var z = 0; z < 20; ++z) {
    // generate resolutions and matrixIds arrays for this WMTS
    //console.log(resolutions[z]);
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = z;
}
var sourceL = new ol.source.WMTS({
    url: 'http://wxs.ign.fr/1g3c8evz5w5tcus9a7oawl77/wmts',
    layer: 'ORTHOIMAGERY.ORTHOPHOTOS',
    matrixSet: 'PM',
    format: 'image/jpeg',
    projection: projection,
    tileGrid: new ol.tilegrid.WMTS({
        origin: ol.extent.getTopLeft(projectionExtent),
        resolutions: resolutions,
        matrixIds: matrixIds
    }),
    style: 'normal',
    wrapX: true
});
var IgnLayer = new ol.layer.Tile({
    source: sourceL
});
var map = new ol.Map({
    layers: [IgnLayer],
    target: 'map',
    control: ol.control.defaults({
        attributionOptions: {
            collapsible: false
        }
    }),
    view: new ol.View({
        center: [0, 0],
        zoom: 4
    })
});