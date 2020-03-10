import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles({
    tooltip: {
        backgroundColor: "#ABFAA9",
        color: "#2A3439",
    }
});

function DefaultElement(props, ref) {
    const {children, isDisabled, ...other} = props;

    return (
        <div ref={ref} {...other}>
            {children}
        </div>
    )
}

const DefaultForwardRef = React.forwardRef(DefaultElement);

function RuleWorkTooltip(props) {
    const {children, isCustom, isDisabled, themeVariant, ...other} = props;
    const classes = useStyles(props);

    return (
        <Tooltip classes={{tooltip: classes.tooltip}} {...other}>
            {isDisabled ?
                <span>
                    {children}
                </span>
                : isCustom ?
                    <DefaultForwardRef>
                        {children}
                    </DefaultForwardRef>
                    :
                    {children}
            }
        </Tooltip>
    )
}

RuleWorkTooltip.propTypes = {
    children: PropTypes.node,
    isCustom: PropTypes.bool,
    isDisabled: PropTypes.bool,
    themeVariant: PropTypes.oneOf(["default", "primary", "secondary"]),
    title: PropTypes.string.isRequired,
};

RuleWorkTooltip.defaultProps = {
    isCustom: true,
    isDisabled: false,
    themeVariant: "default",
};

export default RuleWorkTooltip;