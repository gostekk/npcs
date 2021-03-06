import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Material-ui
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';

// Context
import { AppContext } from '../context/AppContext';

const useStyles = makeStyles(theme => ({
  card: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: 280,
    },
    [theme.breakpoints.up('md')]: {
      width: 365,
    },
  },
  media: {
    height: 0,
    // paddingTop: '56.25%', // 16:9
    paddingTop: '70%',
  },
  actions: {
    display: 'flex',
  },
  rightActions: {
    marginLeft: 'auto',
  },
  delete: {
    color: theme.palette.primary,
  },
}));

function NpcCard(props) {
  const classes = useStyles();
  const { auth } = useContext(AppContext);
  const {
    history,
    handleDelete,
    npc,
  } = props;

  const image = !npc.imgFile ? '/image.jpg' : `/images/${npc.imgFile}`;

  return (
    <Card className={classes.card} raised>
      <CardHeader
        title={npc.name}
        subheader={npc.race}
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={npc.name}
      />
      <CardActions className={classes.actions} disableActionSpacing>
        <IconButton aria-label="Pokaż więcej">
          <InfoIcon color="primary" />
        </IconButton>
        { auth
          ? (
            <React.Fragment>
              <IconButton aria-label="Udostępnij">
                <ShareIcon color="primary" />
              </IconButton>
              <div className={classes.rightActions}>
                <IconButton
                  onClick={() => history.push(`/edit/${npc._id}`)}
                  aria-label="Edytuj"
                >
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(npc._id)}
                  aria-label="Usuń"
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </div>
            </React.Fragment>
          )
          : (
            <div className={classes.rightActions}>
              <IconButton aria-label="Udostępnij">
                <ShareIcon color="primary" />
              </IconButton>
            </div>
          )
        }
      </CardActions>
    </Card>
  );
}

NpcCard.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  npc: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default withRouter(NpcCard);
