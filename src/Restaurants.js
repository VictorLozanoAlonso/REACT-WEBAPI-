import React, { useEffect, useState } from "react";
import {useLocation} from "react-router-dom";
import { Card, Table, Pagination } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Restaurants() {
    const perPage = 10;
    const [restaurants, setRestaurants] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    let borough = urlParams.get("borough");
    useEffect(()=>{
        let url;
        if(borough !== null){
            url = `https://web422--project.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${borough}`;
        }
        else{
            url = `https://web422--project.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`;         
        }
        fetch(url)
            .then(res => res.json())
            .catch(error => console.error('Error: ', error))
            .then(data => {
                setRestaurants(data);
                setLoading(false);
            });
        },[page, borough]);
    function previousPage(){
        if(page > 1)
            setPage(page - 1);
    }; 
    function nextPage(){
        setPage(page + 1);
    };
    if(!loading){
        if(restaurants && restaurants.length > 0){
            return (
                <>
                <Card>
                    <Card.Body>
                        <Card.Title>Restaurants List</Card.Title>
                        <Card.Text>
                            Full list of restaurants. Optionally sorted by borough.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <br />
                <Table striped bordered hover className="white-background">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Borough</th>
                    <th scope="col">Cuisine</th>
                </tr>
                </thead>
                <tbody>
                {restaurants.map((restaurant, index) =>
                <tr key={index} onClick={()=>{navigate(`/restaurant/${restaurant._id}`)}}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.address.building} {restaurant.address.street}</td>
                    <td>{restaurant.borough}</td>
                    <td>{restaurant.cuisine}</td>
                </tr>
                )}
                </tbody>
                </Table>
                <Pagination className="justify-content-center">
                    <Pagination.Prev onClick={previousPage}/>
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={nextPage}/>
                </Pagination>
                </>
                );
        } else {
            return(
                <Card>
                <Card.Body>
                    <Card.Title>No Restaurants Found</Card.Title>
                    <Card.Text>
                    </Card.Text>
                </Card.Body>
                </Card>
            );
        }
    }else{
        return(
            <Card>
            <Card.Body>
                <Card.Title>Loading Restaurants...</Card.Title>
                <Card.Text>
                </Card.Text>
            </Card.Body>
            </Card>
        );
    }
}

export default Restaurants;