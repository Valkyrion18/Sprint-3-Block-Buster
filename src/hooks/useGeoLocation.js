import { useState } from 'react';

export const useGeoLocation = () => {

    const [address, setAddress] = useState({
        latitude: 5.072868,
        longitude: -75.523125,
    })

    const { latitude, longitude } = address

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }   
    }

    const getCoordinates = (position) => {
        setAddress({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }

    const handleLocationError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
            default:
                break;
        }
    }

    return [latitude, longitude, getLocation]
}
