import React from "react";
import { withStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";

const SimpleContent = withStyles(theme=> ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    dividers: {
        borderTopColor: theme.palette.text.main1,
        borderBottomColor: theme.palette.text.main1,
    }
}),{name: "simple-content"})(props => (
    <DialogContent dividers={true} {...props} />
));

export default SimpleContent;
