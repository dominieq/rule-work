import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { mergeClasses } from "../../../utilFunctions";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

const StyledListItem = withStyles({
    root: {
        alignItems: "flex-start",
        flexDirection: "column",
        width: "100%",
        '& > *:not(:last-child)': {
            marginBottom: "0.5rem"
        }
    }
}, {name: "ResultListItem"})(props => <ListItem {...props} />);

const useStyles = makeStyles(theme => ({
    row: {
        alignItems: "center",
        display: "flex"
    },
    multiRow: {
        display: "flex",
        flexDirection: "column",
        '& > *:not(:last-child)': {
            marginBottom: "0.25rem"
        }
    },
    header: {
        marginRight: "auto",
        paddingRight: "0.5rem"
    },
    subheader: {
        lineHeight: theme.typography.body1.lineHeight
    },
    primary: {
        color: theme.palette.text.main1
    },
    secondary: {
        color: theme.palette.text.special1,
    }
}), {name: "ResultListItem"});

function ResultListItem(props) {
    const { classes: propsClasses, object, ...other } = props;
    let classes = useStyles();

    if (propsClasses) classes = mergeClasses(classes, propsClasses);

    return (
        <StyledListItem {...other}>
            {(object.header || object.subheader) &&
                <div className={classes.row} style={{width: "100%"}}>
                    {object.header &&
                        <Typography className={clsx(classes.header, classes.secondary)}>
                            {object.header}
                        </Typography>
                    }
                    {object.subheader &&
                        <Typography className={clsx(classes.primary, classes.subheader)} variant={"overline"}>
                            {object.subheader}
                        </Typography>
                    }
                </div>
            }
            {object.multiContent &&
                <div className={classes.multiRow}>
                    {object.multiContent.map((item, index) => (
                        <div className={classes.row} key={index}>
                            {item.title &&
                                <Typography style={{marginRight: 8}}>
                                    {item.title}
                                </Typography>
                            }
                            {item.subtitle &&
                                <Typography className={classes.secondary}>
                                    {item.subtitle}
                                </Typography>
                            }
                        </div>
                    ))}
                </div>
            }
            {(object.caption || object.subcaption) &&
                <div className={classes.row} style={{width: "100%"}}>
                    {object.caption &&
                        <Typography
                            className={classes.primary}
                            component={"p"}
                            style={{marginRight: "auto", paddingRight: 16}}
                            variant={"body2"}
                        >
                            {object.caption}
                        </Typography>
                    }
                    {object.subcaption &&
                        <Typography className={classes.primary} component={"p"} variant={"body2"}>
                            {object.subcaption}
                        </Typography>
                    }
                </div>
            }
        </StyledListItem>
    )
}

ResultListItem.propTypes = {
    alignItems: PropTypes.oneOf(["flex-start", "center"]),
    autoFocus: PropTypes.bool,
    button: PropTypes.bool,
    children: PropTypes.node,
    classes: PropTypes.object,
    component: PropTypes.elementType,
    ContainerComponent: PropTypes.elementType,
    ContainerProps: PropTypes.object,
    dense: PropTypes.bool,
    disabled: PropTypes.bool,
    disableGutters: PropTypes.bool,
    divider: PropTypes.bool,
    object: PropTypes.shape({
        id: PropTypes.number,
        header: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        subheader: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        multiContent: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            subtitle: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        })),
        caption: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        subcaption: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    }),
    selected: PropTypes.bool,
};

ResultListItem.defaultProps = {
    button: true,
    disableRipple: true,
    divider: true
};

export default ResultListItem;
