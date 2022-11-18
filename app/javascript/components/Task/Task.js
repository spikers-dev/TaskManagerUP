import React from 'react';
import PropTypes from 'prop-types';

import { isNil } from 'ramda';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import TaskPresenter from 'presenters/TaskPresenter';

import useStyles from './useStyles';

const CURRENT_DATE = new Date().toISOString().slice(0, 10);

function Task({ task, onClick }) {
  const styles = useStyles();
  const handleClick = () => onClick(task);
  const action = (
    <IconButton onClick={handleClick}>
      <EditIcon />
    </IconButton>
  );

  const isExpired = () => TaskPresenter.expiredAt(task) < CURRENT_DATE;

  return (
    <Card className={styles.root}>
      <CardHeader action={action} title={TaskPresenter.name(task)} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {TaskPresenter.description(task)}
        </Typography>
        <Typography
          className={styles.text}
          color={isExpired() ? 'error' : 'textSecondary'}
          variant="body2"
          component="p"
        >
          <hr style={{ height: 5 }} />
          {TaskPresenter.expiredAt(task)}
        </Typography>
        {isNil(TaskPresenter.imageUrl(task)) ? (
          <div />
        ) : (
          <div className={styles.previewContainer}>
            <a href={TaskPresenter.imageUrl(task)}>
              <img className={styles.preview} src={TaskPresenter.imageUrl(task)} alt="Attachment" />
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

Task.propTypes = {
  task: TaskPresenter.shape().isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Task;
