import React from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'
import LocationPin from './LocationPin'


const GoogleMap = ({ location, zoomLevel }) => (
    <div className="map">
      <h2 className="map-h2">Dobro došli!</h2>
  
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAC95KmBynfBYg_TjE61h1r7ELRN2V6mgA' }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  )

  export default GoogleMap