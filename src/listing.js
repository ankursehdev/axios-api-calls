import React, { Component } from "react";
import axios from "axios";

const endPoints = {
    "characters": "character",
    "locations": "location",
    "episodes": "episode"
}

const BASE_URL = 'https://rickandmortyapi.com/api/';

function SetupCharacters(props) {
    console.log(props);
    const { characters } = props;
    if (characters) {
        return characters.map(c => <div key={c.id}>{c.id} {c.name}</div>)
    } else {
        return null
    }
}

class Listing extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            charactersData: [],
            locationsData: [],
            episodesData: []
        }

        //define params here and pass to function
        this.params = {}
    }

    componentDidMount() {
        Object.keys(endPoints).forEach(key => {
            // do something here
            this.getDataFromEndpoints(
                endPoints[key],
                this.params,
                key
            );
        });
    }

    /**API ENDPOINT FUNCTIONS */
    
    getDataFromEndpoints = (endPoint, params, stateKey) => {

        this.setState({
            [`${stateKey}DataLoading`]: true,
            [`${stateKey}Data`]: [],
            [`${stateKey}DataError`]: null,
        }, () => {
            axios.get(`${BASE_URL}${endPoint}`)
            .then(res => {
                const { data } = res;
                this.setState({
                    [`${stateKey}DataLoading`]: false,
                    [`${stateKey}Data`]: data.results,
                    [`${stateKey}DataError`]: false,
                })
            })
            .catch(error => {
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                }
                this.setState({
                    [`${stateKey}DataLoading`]: false,
                    [`${stateKey}DataError`]: true,
                    [`${stateKey}DataErrorString`]: error.message,
                })
                console.log(error.config);
            }) 
        });
    }

    render() { 
        const {
            charactersData,
            charactersDataLoading,
            charactersDataError,
            charactersDataErrorString,

            locationsData,
            locationsDataLoading,
            locationsDataError,
            locationsDataErrorString,

            episodesData,
            episodesDataLoading,
            episodesDataError,
            episodesDataErrorString

        } = this.state;

        return ( 
            <React.Fragment>
                <section className="container">
                    
                    <section className="one-third">
                        <h3>Characters</h3>
                        {charactersDataLoading ?
                            <div> Loading... </div> :
                            (
                                (charactersDataError) ?
                                <div>Error: {charactersDataErrorString}</div> :
                                <SetupCharacters characters = {charactersData}/>
                            )
                        }
                    </section>

                    <section className="one-third">
                        <h3>Locations</h3>
                        {locationsDataLoading ?
                            <div> Loading... </div> :
                            (
                                (locationsDataError) ?
                                <div>Error: {locationsDataErrorString}</div> :
                                locationsData.map(l => <div key={l.id}>{l.id} {l.name}</div>)
                            )
                        }
                    </section>

                    <section className="one-third">
                        <h3>Episodes</h3>
                        {episodesDataLoading ?
                            <div> Loading... </div> :
                            (
                                (episodesDataError) ?
                                <div>Error: {episodesDataErrorString}</div> :
                                episodesData.map(l => <div key={l.id}>{l.id} {l.name}</div>)
                            )
                        }
                    </section>

                </section>
            </React.Fragment>
         );
    }
}
 
export default Listing;