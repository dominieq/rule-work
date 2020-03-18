import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import EditIcon from '@material-ui/icons/Edit';
import TransformIcon from '@material-ui/icons/Transform';
import RuleWorkTooltip from '../../../RuleWorkComponents/DataDisplay/RuleWorkTooltip';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
}));

export default function IconLabelButtons(props) {
    const classes = useStyles();

    return (
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          
          onClick={() => props.insertRow(0,0)}
        >
          < AddIcon />
          Add new example
        </Button>

        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={() => props.deleteRow()}
        >
          Delete Selected
        </Button>

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={() => props.onAddAttribute()}
        >
          Add attribute
        </Button>

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<EditIcon />}
          onClick={() => props.onEditAttributes()}
        >
          Edit attributes
        </Button>

{/*
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={() => props.sendFilesToServer()}
        >
          Save changes
        </Button>
*/}

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<SaveAltIcon />}
          onClick={() => props.saveToFileDialog()}
        >
          Save to file
        </Button>
              
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<TransformIcon />}
        onClick={() => props.openOnTransform()}
      >
        Transform
      </Button><div className="data-modified" key={props.modified}> 
      {props.modified ? "Data has been modified! Save it" : null}
      </div>
      </div>
    );
}