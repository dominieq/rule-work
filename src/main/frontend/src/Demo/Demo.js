import React, { Component } from 'react'
import DemoProject from './DemoProject'
import DemoProjects from './DemoPorjects'
import DemoDominanceCones from './DemoDominanceCones'
import DemoUnionsWithSingleLimitingDecision from './DemoUnionsWithSingleLimitingDecision'
import DemoData from './DemoData'
import DemoMetadata from './DemoMetadata'

class Demo extends Component {

    render() {
        return (
            <div>
                <DemoProjects></DemoProjects>
                <DemoProject></DemoProject>
                <DemoData></DemoData>
                <DemoMetadata></DemoMetadata>
                <DemoDominanceCones></DemoDominanceCones>
                <DemoUnionsWithSingleLimitingDecision></DemoUnionsWithSingleLimitingDecision>
            </div>
        )
    }
}

export default Demo