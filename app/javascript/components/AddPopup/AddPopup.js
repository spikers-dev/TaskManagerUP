import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Card, CardActions, CardContent, CardHeader, IconButton, Modal } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Form from '../EditPopup/components/Form';
import TaskForm from 'forms/TaskForm';

import useStyles from './useStyles';

function AddPopup({ onClose, onCreateCard }) {
  const [task, changeTask] = useState(TaskForm.defaultAttributes());
  const [isSaving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCreate = () => {
    setSaving(true);

    onCreateCard(task).catch((error) => {
      setSaving(false);
      setErrors(error || {});

      if (error instanceof Error) {
        alert(`Creation Failed! Error: ${error.message}`); // eslint-disable-line no-alert
      }
    });
  };

  const styles = useStyles();

  return (
    <Modal className={styles.modal} open onClose={onClose}>
      <Card className={styles.root}>
        <CardHeader
          action={
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
          title="Add New Task"
        />
        <CardContent>
          <Form errors={errors} onChange={changeTask} task={task} />
        </CardContent>
        <CardActions className={styles.actions}>
          <Button disabled={isSaving} onClick={handleCreate} variant="contained" size="small" color="primary">
            Add
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}

AddPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreateCard: PropTypes.func.isRequired,
};

export default AddPopup;
