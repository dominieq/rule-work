import React, { Component } from 'react'

class GetUnionsWithSingleLimitingDecision extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id_projektu: '66f23be2-0595-40b9-aca1-fcc5f9b5ffc2',
            consistencyThreshold: 0
        }
    }

    handleIdChange = (event) => {
        this.setState({
            id_projektu: event.target.value
        })
    }

    handleConsistencyThresholdChange = (event) => {
        this.setState({
            consistencyThreshold: event.target.value
        })
    }

    getUnionsWithSingleLimitingDecision = (event) => {
        event.preventDefault();

        var link = `http://localhost:8080/unionsWithSingleLimitingDecision?id=${this.state.id_projektu}`;
        if(this.state.consistencyThreshold !== "") {
            link += `&consistencyThreshold=${this.state.consistencyThreshold}`;
        }

        console.log(link)

        fetch(link, {
            method: 'GET'
        }).then(response => {
            console.log(response)
            return response.json()
        }).then(result => {
            console.log("Wynik dzialania response.json():")
            console.log(result)

            console.log("Obiekty:")
            result.forEach(element => {
                console.log(element)
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                id->
                <input type='text' value={this.state.id_projektu} onChange={this.handleIdChange} />
                consistencyThreshold->
                <input type='text' value={this.state.consistencyThreshold} onChange={this.handleConsistencyThresholdChange} />
                <button onClick={this.getUnionsWithSingleLimitingDecision}>getUnionsWithSingleLimitingDecision</button>
            </div>
        )
    }
}

export default GetUnionsWithSingleLimitingDecision