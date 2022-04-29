import { Text, View, StyleSheet, Dimensions } from "react-native";
import { useState, useEffect, useRef } from 'react';
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';

import { Base, Typography } from "../../styles";
import getCoordinates from "../../models/nominatim";

export default function ShipOrder({ route }) {
    const {order} = route.params;
    const [markers, setMarkers] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const map = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setMarkers(markers => [...markers, <Marker
                identifier="MP"
                key="MP"
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />]);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);

            setMarkers(markers => [...markers, <Marker
                identifier="OP"
                key= "OP"
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
            />]);
        })();
    }, []);

    function fitMarkers() {
        if (map?.current) {
            const markersIDs = markers.map((marker) => marker.props.identifier);
            map.current.fitToSuppliedMarkers(markersIDs, true);
        }
    }

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Skicka order {order.id}</Text>
            <Text style={Typography.header3}>{order.name}</Text>
            <Text style={Typography.normal}>{order.address}</Text>
            <Text style={Typography.normal}>{order.zip} {order.city}</Text>
            <View style={Base.mapContainer}>
                <MapView
                    ref={map}
                    key={markers.length}
                    style={Base.map}
                    onMapReady={fitMarkers}
                    onMapLoaded={fitMarkers}
                    initialRegion={{
                        latitude: 57.6749712,
                        longitude: 14.5208584,
                        latitudeDelta: 3,
                        longitudeDelta: 3,
                    }} >
                    {markers}
                </MapView>
            </View>
        </View>
    );
};
