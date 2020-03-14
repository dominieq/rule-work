import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import RuleWorkBox from "../../../RuleWorkComponents/Containers/RuleWorkBox";
import RuleWorkDrawer from "../../../RuleWorkComponents/Containers/RuleWorkDrawer";
import RuleWorkList from "../../../RuleWorkComponents/DataDisplay/RuleWorkList";
import RuleWorkSelect from "../../../RuleWorkComponents/Inputs/RuleWorkSelect";
import RuleWorkSmallBox from "../../../RuleWorkComponents/Containers/RuleWorkSmallBox";
import RuleWorkSnackbar from "../../../RuleWorkComponents/Feedback/RuleWorkSnackbar";
import RuleWorkTextField from "../../../RuleWorkComponents/Inputs/RuleWorkTextField";
import RuleWorkTooltip from "../../../RuleWorkComponents/Inputs/RuleWorkTooltip";
import StyledButton from "../../../RuleWorkComponents/Inputs/StyledButton";
import StyledCircularProgress from "../../../RuleWorkComponents/Feedback/StyledCircularProgress";
import StyledDivider from "../../../RuleWorkComponents/DataDisplay/StyledDivider";
import StyledPaper from "../../../RuleWorkComponents/Surfaces/StyledPaper";
import StyledToggleButton from "../../../RuleWorkComponents/Inputs/StyledToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Calculator from "mdi-material-ui/Calculator";
import SvgIcon from "@material-ui/core/SvgIcon";
import {mdiCloseThick, mdiCog} from "@mdi/js";

class CrossValidation extends Component {
    constructor(props) {
        super(props);

        this._data = {};
        this._items = [];

        this.state = {
            changes: false,
            loading: false,
            displayedItems: [],
            foldDisplay: 0,
            foldIndex: 0,
            foldNumber: 1,
            folds: [],
            openSettings: false,
            snackbarProps: undefined,
        };

        this.upperBar = React.createRef();
    }

    componentDidMount() {
        this._isMounted = true;
        console.log("Fetching cross-validation from server...");
        this.setState({
            foldDisplay: this.props.project.foldDisplay,
            foldIndex: this.props.project.foldIndex,
            foldNumber: this.props.project.foldNumber,
        })
    }

    componentWillUnmount() {
        if (this.state.changes) {
            let project = {...this.props.project};
            if (Object.keys(this._data).length) {
                //TODO DO SOMETHING
            }
            project.foldDisplay = this.state.foldDisplay;
            project.foldIndex = this.state.foldIndex;
            project.foldNumber = this.state.foldNumber;
            this.props.onTabChange(project, this.props.value, false);
        }
    }

    onSettingsClick = () => {
        this.setState(prevState => ({
            openSettings: !prevState.openSettings,
        }));
    };

    onSettingsClose = () => {
        this.setState({
            openSettings: false,
        });
    };

    onFoldNumberChange = (event) => {
        const input = event.target.value;

        if (!isNaN(input)) {
            this.setState({
                changes: Number(input) !== 1,
                foldNumber: Number(input),
            });
        }
    };

    onCalculateClick = () => {
        console.log("Calculating cross-validation on server...");
        const array = Array(this.state.foldNumber).fill(1);
        for (let i = 0; i < array.length; i++) {
            array[i] = i + 1;
        }
        this.setState({
            folds: array,
        });
    };

    onFoldIndexChange = (event) => {
        this.setState({
            changes: Boolean(event.target.value),
            foldIndex: event.target.value,
        })
    };

    onFoldDisplayChange = (event, newDisplay) => {
        if (typeof newDisplay !== 'number') return;

        this.setState({
            changes: Boolean(newDisplay),
            foldDisplay: newDisplay,
        });
    };

    onSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            snackbarProps: undefined,
        });
    };

    renderResultsActions = () => {
        const {foldDisplay, folds, foldIndex} = this.state;

        if (Array.isArray(folds) && folds.length) {
            return (
                <Fragment>
                    <RuleWorkSelect
                        label={"Choose fold"}
                        onChange={this.onFoldIndexChange}
                        value={foldIndex}
                    >
                        {folds}
                    </RuleWorkSelect>
                    <StyledDivider />
                    <ToggleButtonGroup
                        aria-label={"display-toggle-button-group"}
                        exclusive={true}
                        onChange={this.onFoldDisplayChange}
                        value={foldDisplay}
                    >
                        <StyledToggleButton value={0}>
                            Details of training set
                        </StyledToggleButton>
                        <StyledToggleButton value={1}>
                            Error matrix
                        </StyledToggleButton>
                        <StyledToggleButton value={2}>
                            Mean error matrix
                        </StyledToggleButton>
                    </ToggleButtonGroup>
                </Fragment>
            )
        } else {
            return null;
        }
    };

    render() {
        const {loading, displayedItems, foldNumber, openSettings, snackbarProps} = this.state;

        return (
            <RuleWorkBox id={"rule-work-cross-validation"} styleVariant={"tab"}>
                <StyledPaper
                    id={"cross-validation-bar"}
                    paperRef={this.upperBar}
                    styleVariant={"bar"}
                    square={true}
                    variant={"outlined"}
                >
                    <RuleWorkTooltip title={"Click to customize number of folds"}>
                        <StyledButton
                            aria-label={"cross-validation-settings-button"}
                            isIcon={true}
                            onClick={this.onSettingsClick}
                        >
                            <SvgIcon><path d={mdiCog} /></SvgIcon>
                        </StyledButton>
                    </RuleWorkTooltip>
                    <StyledDivider />
                    <RuleWorkTooltip title={`Current number of folds: ${foldNumber}`}>
                        <StyledButton
                            aria-label={"cross-validation-calculate"}
                            disable={!this.props.project & loading}
                            disableElevation={true}
                            onClick={this.onCalculateClick}
                            startIcon={<Calculator />}
                            themeVariant={"primary"}
                            variant={"contained"}
                        >
                            Calculate
                        </StyledButton>
                    </RuleWorkTooltip>
                    <span style={{flexGrow: 1}} />
                    {this.renderResultsActions()}
                </StyledPaper>
                <RuleWorkDrawer
                    height={this.upperBar.current ? this.upperBar.current.offsetHeight : undefined}
                    id={"cross-validation-settings-drawer"}
                    open={openSettings}
                >
                    <StyledDivider orientation={"horizontal"} styleVariant={"panel"} />
                    <RuleWorkSmallBox id={"fold-number-selector"} >
                        <RuleWorkTextField
                            value={foldNumber}
                            onChange={this.onFoldNumberChange}
                            style={{maxWidth: 128}}
                        >
                            Choose number of folds
                        </RuleWorkTextField>
                    </RuleWorkSmallBox>
                    <RuleWorkSmallBox id={"cross-validation-footer"} styleVariant={"footer"}>
                        <StyledButton
                            isIcon={true}
                            onClick={this.onSettingsClose}
                            themeVariant={"secondary"}
                        >
                            <SvgIcon><path d={mdiCloseThick} /></SvgIcon>
                        </StyledButton>
                    </RuleWorkSmallBox>
                </RuleWorkDrawer>
                <RuleWorkBox id={"cross-validation-body"} styleVariant={"tab-body"}>
                    {loading ?
                        <StyledCircularProgress />
                        :
                        <RuleWorkList>
                            {displayedItems}
                        </RuleWorkList>
                    }
                </RuleWorkBox>
                <RuleWorkSnackbar {...snackbarProps} onClose={this.onSnackbarClose} />
            </RuleWorkBox>
        )
    }
}

CrossValidation.propTypes = {
    dataUpToDate: PropTypes.bool,
    onTabChange: PropTypes.func,
    project: PropTypes.object,
    upToDate: PropTypes.bool,
    value: PropTypes.number,
};

export default CrossValidation;