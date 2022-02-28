import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useParams } from "react-router-dom";
import { Card, CardDeck, Container } from 'react-bootstrap';

function Restaurant() {
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    let {id} = useParams();
    useEffect(()=>{
        setLoading(true);
        fetch(`https://web422--project.herokuapp.com/api/restaurants/${id}`)
            .then(res => res.json())
            .catch(error => console.error('Error: ', error))
            .then(data => {
                setLoading(false);
                if(data.hasOwnProperty("_id")){
                    setRestaurant(data);
                }else{
                    setRestaurant(null);
                }
            });
    }, [id]);
    function dateConvert(date){
        let d = new Date(date);
        let day = d.getDate();
        let month = d.getMonth()+1;
        let year = d.getFullYear();
        return d = month+'/'+day+'/'+year;
    }
    if(!loading){
        if(restaurant){
            return (
                <>
                <Card>
                    <Card.Body>
                        <Card.Title>{restaurant.name}</Card.Title>
                        <Card.Text>
                            {restaurant.address.building} {restaurant.address.street}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <MapContainer style={{"height": "400px"}} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker>
                </MapContainer>
                <br />
                <Container fluid>
                    <CardDeck>
                    {restaurant.grades.map((grade, index) => (
                        <Card key={index}>
                        <Card.Header>Grade: {grade.grade}</Card.Header>
                        <Card.Body>
                            Received at {dateConvert(grade.date)}
                        </Card.Body>
                        </Card>
                    ))}
                    </CardDeck>
                </Container>
                </>
            );
        } else {
            return(
                <Card>
                <Card.Body>
                    <Card.Title>Unable to find Restaurant with id: {id}</Card.Title>
                    <Card.Text>
                    </Card.Text>
                </Card.Body>
                </Card>
            );
        }
    } else {
        return(
            <Card>
            <Card.Body>
                <Card.Title>Loading Restaurant Data...</Card.Title>
                <Card.Text>
                </Card.Text>
            </Card.Body>
            </Card>
        );
    }
}

export default Restaurant;