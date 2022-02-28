import React from "react";
import { Card } from 'react-bootstrap';

function About() {
    return (
        <Card>
            <Card.Body>
                <Card.Title>About</Card.Title>
                <Card.Text>
                    Victor Lozano, React Web Developer.<br />
                    Also, I am a backend developer using ExpressJS. Take a look my <a href="https://web322--project.herokuapp.com/" target="_blank" rel="noreferrer" >recent project.</a>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default About;