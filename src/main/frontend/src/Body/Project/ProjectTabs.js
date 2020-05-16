import React from 'react';
import PropTypes from 'prop-types';
import Classification from "./Tabs/Classification";
import CrossValidation from "./Tabs/CrossValidation";
import Cones from "./Tabs/Cones";
import Data from "./Data/DisplayData";
import Rules from "./Tabs/Rules";
import Unions from "./Tabs/Unions";
import { fetchData } from "./Utils/fetchFunctions";
import StyledTab from "../../Utils/Navigation/StyledTab";
import StyledTabs from "../../Utils/Navigation/StyledTabs";
import ExternalFile from "../../Utils/Feedback/CustomIcons/ExternalFile";
import OutdatedData from "../../Utils/Feedback/AlertBadge/Alerts/OutdatedData";

class ProjectTabs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentProject: null,
            loading: false,
            selected: 0,
            showAlert: Array(5).fill(false),
            showExternalRules: false,
            showExternalData: false
        };
    }

    updateAlerts = (result) => {
        /* Update alerts in Dominance cones */
        if (result.hasOwnProperty("dominanceCones") && result.dominanceCones.hasOwnProperty("isCurrentData")) {
            this.setState(({showAlert}) => {
                showAlert[0] = !result.dominanceCones.isCurrentData;
                return { showAlert: showAlert };
            });
        }

        /* Update alerts in Class unions */
        if (result.hasOwnProperty("unions") && result.unions.hasOwnProperty("isCurrentData")) {
            this.setState(({showAlert}) => {
                showAlert[1] = !result.unions.isCurrentData;
                return { showAlert: showAlert };
            });
        }

        /* Update alerts in Rules */
        if (result.hasOwnProperty("rules")) {
            if (result.rules.hasOwnProperty("isCurrentData")) {
                this.setState(({showAlert}) => {
                    showAlert[2] = !result.rules.isCurrentData;
                    return { showAlert: showAlert };
                });
            }

            if (result.rules.hasOwnProperty("externalRules")) {
                this.setState({
                    showExternalRules: result.rules.externalRules
                });
            }
        }

        /* Update alerts in Classification */
        if (result.hasOwnProperty("classification")) {
            if (result.classification.hasOwnProperty("isCurrentLearningData")) {
                if (result.classification.hasOwnProperty("isCurrentRuleSet")) {
                    this.setState(({showAlert}) => {
                        showAlert[3] = !(result.classification.isCurrentLearningData && result.classification.isCurrentRuleSet);
                        return { showAlert: showAlert };
                    });
                } else {
                    this.setState(({showAlert}) => {
                        showAlert[3] = !result.classification.isCurrentLearningData;
                        return { showAlert: showAlert };
                    });
                }
            }

            if (result.classification.hasOwnProperty("externalData")) {
                this.setState({
                    showExternalData: result.classification.externalData
                });
            }
        }

        /* Update alerts in CrossValidation */
        if (result.hasOwnProperty("crossValidation")) {
            if (result.crossValidation.hasOwnProperty("isCurrentData")) {
                this.setState(({showAlert}) => {
                    showAlert[4] = !result.crossValidation.isCurrentData;
                    return { showAlert: showAlert };
                })
            }
        }
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.project.result.id !== this.props.project.result.id) {
            const { project: { result } } = this.props;
            this.updateAlerts(result);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onTabChange = (event, newValue) => {
        const { currentProject, selected } = this.state;
        const { serverBase } = this.props;

        if (currentProject !== null && selected === 0 && newValue !== 0) {
            this.setState({
                loading: true
            }, () => {
                let data = new FormData();
                data.append("metadata", JSON.stringify(currentProject.result.informationTable.attributes));
                data.append("data", JSON.stringify(currentProject.result.informationTable.objects));

                fetchData(
                    serverBase, currentProject.result.id, data
                ).then(result => {
                    console.log(result);
                }).catch(error => {
                    if (!error.hasOwnProperty("open")) {
                        console.log(error);
                    } else {
                        this.props.showAlert(error);
                    }
                }).finally(() => {
                    if (this._isMounted) {
                        this.setState({
                            currentProject: null,
                            loading: false,
                            selected: newValue
                        });
                    }
                    this.props.onTabChange(currentProject);
                });
            });
        } else {
            this.setState({
                selected: newValue
            });
        }
    };

    onDataChange = (project) => {
        this.setState({
            currentProject: project
        });
    };

    showAlert = (index, show) => {
        this.setState(({showAlert}) => {
            showAlert[index] = show;

            return {
                showAlert: showAlert
            };
        });
    };

    onRulesUploaded = (isExternal) => {
        this.setState({
            showExternalRules: isExternal
        });
    };

    onDataUploaded = (isExternal) => {
        this.setState({
            showExternalData: isExternal
        });
    };

    getTabProps = (index) => {
        return ({
            id: `project-tab-${index}`,
            'aria-controls': `project-tabpanel-${index}`,
        })
    };

    getTabBodyProps = (index) => {
        const { project, serverBase } = this.props;

        return ({
            project: project,
            onTabChange: this.props.onTabChange,
            serverBase: serverBase,
            showAlert: this.showAlert,
            value: index
        });
    };

    render() {
        const { loading ,selected, showAlert, showExternalRules, showExternalData } = this.state;
        const { project, serverBase } = this.props;

        return (
            <React.Fragment>
                <StyledTabs aria-label={"project tabs"} onChange={this.onTabChange} value={selected}>
                    <StyledTab label={"Data"} {...this.getTabProps(0)} />
                    <StyledTab
                        label={
                            <OutdatedData invisible={!showAlert[0]}>
                                Dominance cones
                            </OutdatedData>
                        }
                        {...this.getTabProps(1)}
                    />
                    <StyledTab
                        label={
                            <OutdatedData invisible={!showAlert[1]}>
                                Class unions
                            </OutdatedData>
                        }
                        {...this.getTabProps(2)}
                    />
                    <StyledTab
                        icon={showExternalRules ?
                            <ExternalFile WrapperProps={{style: { marginBottom: 0, marginRight: 8}}} /> : null
                        }
                        label={
                            <OutdatedData invisible={!showAlert[2]}>
                                Rules
                            </OutdatedData>
                        }
                        {...this.getTabProps(3)}
                    />
                    <StyledTab
                        icon={showExternalData ?
                            <ExternalFile WrapperProps={{style: { marginBottom: 0, marginRight: 8}}} /> : null
                        }
                        label={
                            <OutdatedData invisible={!showAlert[3]}>
                                Classification
                            </OutdatedData>
                        }
                        {...this.getTabProps(4)}
                    />
                    <StyledTab
                        label={
                            <OutdatedData invisible={!showAlert[4]}>
                                CrossValidation
                            </OutdatedData>
                        }
                        {...this.getTabProps(5)}
                    />
                </StyledTabs>
                {
                    {
                        0: (
                                <Data
                                    project={project}
                                    updateProject={this.onDataChange}
                                    loading={loading}
                                    serverBase={serverBase}
                                />
                            ),
                        1: <Cones {...this.getTabBodyProps(0)} />,
                        2: <Unions {...this.getTabBodyProps(1)} />,
                        3: <Rules onRulesUploaded={this.onRulesUploaded} {...this.getTabBodyProps(2)} />,
                        4: <Classification onDataUploaded={this.onDataUploaded} {...this.getTabBodyProps(3)} />,
                        5: <CrossValidation {...this.getTabBodyProps(4)} />
                    }[selected]
                }
            </React.Fragment>
        );
    }
}

ProjectTabs.propTypes = {
    onTabChange: PropTypes.func,
    project: PropTypes.object,
    serverBase: PropTypes.string,
    showAlert: PropTypes.func
};

export default ProjectTabs;
