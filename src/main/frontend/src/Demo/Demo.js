import React, { Component } from 'react'
import DemoProject from './DemoProject'
import DemoImport from './DemoImport'
import DemoDominanceCones from './DemoDominanceCones'
import DemoUnionsWithSingleLimitingDecision from './DemoUnionsWithSingleLimitingDecision'

class Demo extends Component {

    render() {
        return (
            <div>
                <DemoProject></DemoProject>
                <DemoImport></DemoImport>
                <DemoDominanceCones></DemoDominanceCones>
                <DemoUnionsWithSingleLimitingDecision></DemoUnionsWithSingleLimitingDecision>
            </div>
        )
    }
}

export default Demo