import React, {Fragment} from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const labelStyles = makeStyles({
    label: {
        minWidth: "fit-content",
        marginRight: 16
    }
}, {name: "CustomInput"});

const inputStyles = makeStyles(theme => ({
    root: {
        height: 40,
        backgroundColor: theme.palette.background.sub,
        '& fieldset': {
            borderColor: theme.palette.background.sub
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.background.main2
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.background.main2
        },
        '&:hover': {
            backgroundColor: theme.palette.background.subDark
        },
        '&.Mui-focused': {
            backgroundColor: theme.palette.background.subDark
        }
    }
}), {name: "CustomOutlinedInput"});

const menuStyles = makeStyles(theme => ({
    list: {
        backgroundColor: theme.palette.background.sub,
        color: theme.palette.text.main2,
    }
}), {name: "CustomMenu"});

function CustomTextField(props) {
    const { disabledChildren, outsideLabel, OutsideLabelProps, ...TextFieldProps } = props;
    const { children, InputProps, select, SelectProps, ...other } = TextFieldProps;

    const inputClasses = inputStyles();
    const labelClasses = labelStyles();
    const menuClasses = menuStyles();

    const renderMenuItems = () => {
        if (Array.isArray(children) && children.length) {
            if (React.isValidElement(children[0])){
                return children;
            } else {
                return (
                    children.map((option, index) => (
                        <MenuItem
                            key={index}
                            disabled={disabledChildren ? disabledChildren.includes(option) : false}
                            value={option}
                        >
                            {option}
                        </MenuItem>
                    ))
                );
            }
        }
    };

    return (
        <Fragment>
            {outsideLabel &&
                <Typography className={labelClasses.label} {...OutsideLabelProps}>
                    {outsideLabel}
                </Typography>
            }
            <TextField
                InputProps={{
                    ...InputProps,
                    classes: {root: inputClasses.root}
                }}
                select={select}
                SelectProps={{
                    ...SelectProps,
                    MenuProps: { classes: { ...menuClasses } }
                }}
                {...other}
            >
                {select && renderMenuItems()}
            </TextField>
        </Fragment>
    )
}

CustomTextField.propTypes = {
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    classes: PropTypes.object,
    color: PropTypes.oneOf(["primary", "secondary"]),
    children: PropTypes.array,
    defaultValue: PropTypes.any,
    disabled: PropTypes.bool,
    disabledChildren: PropTypes.array,
    error: PropTypes.bool,
    FormHelperTextProps: PropTypes.object,
    fullWidth: PropTypes.bool,
    helperText: PropTypes.node,
    id: PropTypes.string,
    InputLabelProps: PropTypes.object,
    InputProps: PropTypes.object,
    inputProps: PropTypes.object,
    inputRef: PropTypes.object,
    label: PropTypes.node,
    margin: PropTypes.oneOf(["none", "dense", "normal"]),
    multiline: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    outsideLabel: PropTypes.node,
    OutsideLabelProps: PropTypes.object,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    select: PropTypes.bool,
    SelectProps: PropTypes.object,
    size: PropTypes.oneOf(["small", "medium"]),
    type: PropTypes.string,
    value: PropTypes.any,
    variant: PropTypes.oneOf(["standard", "outlined", "filled"]),
};

CustomTextField.defaultProps = {
    margin: "none",
    variant: "outlined",
};

export default CustomTextField;