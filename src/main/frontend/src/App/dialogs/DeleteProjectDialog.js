import React, {Component} from "react";
import PropTypes from "prop-types";
import Accept from "./Utils/Accept";
import Cancel from "./Utils/Cancel";
import RuleWorkTextField from "../../RuleWorkComponents/Inputs/RuleWorkTextField";
import StyledDialog from "../../RuleWorkComponents/Feedback/StyledDialog";
import StyledDialogContent from "../../RuleWorkComponents/Feedback/StyledDialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

class DeleteProjectDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            correct: false,
        };
    }

    onEntering = () => {
        this.setState({
            name: "",
            correct: false,
        });
    };

    onInputChange = (event) => {
        this.setState({
            name: event.target.value,
        }, () => {
            if (this.props.currentName === this.state.name) {
                this.setState({
                    correct: true,
                });
            }
        });
    };

    onCancelClick = () => {
        this.props.onClose(false);
    };

    onDeleteClick = () => {
        this.props.onClose(true);
    };

    onEnterClick = (event) => {
        if (event.which === 13) {
            event.preventDefault();
            if (this.state.correct) this.onDeleteClick();
        }
    };

    render() {
        const {name, correct} = this.state;
        const {children, open, currentName} = this.props;

        return (
            <StyledDialog
                aria-labelledby={"delete-project-dialog"}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                maxWidth={"sm"}
                onEntering={this.onEntering}
                onKeyPress={this.onEnterClick}
                open={open}
            >
                <DialogTitle id={"delete-project-dialog"}>
                    Confirm deletion of {currentName}
                </DialogTitle>
                <StyledDialogContent>
                    <RuleWorkTextField
                        fullWidth={true}
                        onChange={this.onInputChange}
                        outsideLabel={"Type project name"}
                        value={name}
                    />
                </StyledDialogContent>
                <DialogActions>
                    <Cancel onClick={this.onCancelClick} themeVariant={"primary"} />
                    <Accept
                        disabled={!correct}
                        onClick={this.onDeleteClick}
                        themeVariant={"secondary"}
                    >
                        Delete
                    </Accept>
                </DialogActions>
                {children}
            </StyledDialog>
        )
    }
}

DeleteProjectDialog.propTypes = {
    children: PropTypes.any,
    currentName: PropTypes.string,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default DeleteProjectDialog;
