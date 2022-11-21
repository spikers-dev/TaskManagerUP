import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'ramda';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Modal,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import TaskPresenter from 'presenters/TaskPresenter';
import Form from './components/Form';
import ImageUpload from './components/ImageUpload';

import useStyles from './useStyles';

function EditPopup({ cardId, onLoadCard, onCardUpdate, onCardDestroy, onClose, onAttachImage, onRemoveImage }) {
  const [task, setTask] = useState(null);
  const [isSaving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const styles = useStyles();

  useEffect(() => {
    onLoadCard(cardId).then(setTask);
  }, []);

  const handleCardUpdate = () => {
    setSaving(true);

    onCardUpdate(task).catch((error) => {
      setSaving(false);
      setErrors(error || {});

      if (error instanceof Error) {
        alert(`Update Failed! Error: ${error.message}`); // eslint-disable-line no-alert
      }
    });
  };

  const handleCardDestroy = () => {
    setSaving(true);

    onCardDestroy(task).catch((error) => {
      setSaving(false);

      alert(`Destrucion Failed! Error: ${error.message}`); // eslint-disable-line no-alert
    });
  };

  const handleAttachImage = (attachment) => {
    setSaving(true);

    onAttachImage(task, attachment).catch((error) => {
      setSaving(false);

      alert(`Upload image Failed! Error: ${error.message}`); // eslint-disable-line no-alert
    });
  };

  const handleRemoveImage = () => {
    setSaving(true);

    onRemoveImage(task).catch((error) => {
      setSaving(false);

      alert(`Remove image Failed! Error: ${error.message}`); // eslint-disable-line no-alert
    });
  };
  const isLoading = isNil(task);

  return (
    <Modal className={styles.modal} open onClose={onClose}>
      <Card className={styles.root}>
        <CardHeader
          action={
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
          title={isLoading ? 'Your task is loading. Please be patient.' : `Task # ${task.id} [${task.name}]`}
        />
        <CardContent>
          {isLoading ? (
            <div className={styles.loader}>
              <CircularProgress />
            </div>
          ) : (
            <Form errors={errors} onChange={setTask} task={task} />
          )}

          {isNil(TaskPresenter.imageUrl(task)) ? (
            <div className={styles.imageUploadContainer}>
              <ImageUpload onUpload={handleAttachImage} />
            </div>
          ) : (
            <div className={styles.previewContainer}>
              <a href={TaskPresenter.imageUrl(task)}>
                <img className={styles.preview} src={TaskPresenter.imageUrl(task)} alt="Attachment" />
              </a>
              <Button variant="contained" size="small" color="primary" onClick={handleRemoveImage}>
                Remove image
              </Button>
            </div>
          )}
        </CardContent>
        <CardActions className={styles.actions}>
          <Button
            disabled={isLoading || isSaving}
            onClick={handleCardUpdate}
            size="small"
            variant="contained"
            color="primary"
          >
            Update
          </Button>
          <Button
            disabled={isLoading || isSaving}
            onClick={handleCardDestroy}
            size="small"
            variant="contained"
            color="secondary"
          >
            Destroy
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}

EditPopup.propTypes = {
  cardId: PropTypes.number.isRequired,
  onLoadCard: PropTypes.func.isRequired,
  onCardUpdate: PropTypes.func.isRequired,
  onCardDestroy: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onAttachImage: PropTypes.func.isRequired,
  onRemoveImage: PropTypes.func.isRequired,
};

export default EditPopup;
