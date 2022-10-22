import { propEq } from 'ramda';
import { useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import { changeColumn } from '@asseinfo/react-kanban';

import TasksRepository from 'repositories/TasksRepository';
import TaskPresenter, { STATES } from 'presenters/TaskPresenter';
import TaskForm from 'forms/TaskForm';

const initialState = {
  board: {
    columns: STATES.map((column) => ({
      id: column.key,
      title: column.value,
      cards: [],
      meta: {},
    })),
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadColumnSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;
      const column = state.board.columns.find(propEq('id', columnId));

      state.board = changeColumn(state.board, column, {
        cards: items,
        meta,
      });

      return state;
    },

    loadColumnMoreSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;
      const column = state.board.columns.find(propEq('id', columnId));

      state.board = changeColumn(state.board, column, {
        cards: column.cards.concat(items),
        meta,
      });

      return state;
    },
  },
});

const { loadColumnSuccess, loadColumnMoreSuccess } = tasksSlice.actions;

const COLUMN_DEFAULT_SORT = 'updated_at DESC';

export const useTasksActions = () => {
  const dispatch = useDispatch();

  const loadColumn = (state, page = 1, perPage = 10) => {
    TasksRepository.index({
      q: { stateEq: state, s: COLUMN_DEFAULT_SORT },
      page,
      perPage,
    }).then(({ data }) => {
      dispatch(loadColumnSuccess({ ...data, columnId: state }));
    });
  };

  const loadColumnMore = (state, page = 1, perPage = 10) => {
    TasksRepository.index({
      q: { stateEq: state, s: COLUMN_DEFAULT_SORT },
      page,
      perPage,
    }).then(({ data }) => {
      dispatch(loadColumnMoreSuccess({ ...data, columnId: state }));
    });
  };

  const cardDragEnd = (task, source, destination) => {
    const transition = TaskPresenter.transitions(task).find(({ to }) => destination.toColumnId === to);

    if (!transition) {
      return null;
    }

    return TasksRepository.update(task.id, { stateEvent: transition.event })
      .then(() => {
        loadColumn(destination.toColumnId);
        loadColumn(source.fromColumnId);
      })
      .catch((error) => {
        alert(`Move failed! ${error.message}`); // eslint-disable-line no-alert
      });
  };

  const loadBoard = () => STATES.map(({ key }) => loadColumn(key));

  const createTask = (params) => {
    const attributes = TaskForm.attributesToSubmit(params);

    return TasksRepository.create(attributes).then(({ data: { task } }) => {
      loadColumn(TaskPresenter.state(task));
    });
  };

  const updateTask = (id) => {
    const attributes = TaskForm.attributesToSubmit(id);

    return TasksRepository.update(id, attributes).then(({ data: { task } }) => {
      loadColumn(TaskPresenter.state(task));
    });
  };

  const destroyTask = (task) =>
    TasksRepository.destroy(task.id).then(() => {
      loadColumn(TaskPresenter.state(task));
    });

  const loadTask = (id) => TasksRepository.show(id).then(({ data: { task } }) => task);

  return {
    loadColumn,
    loadBoard,
    loadColumnMore,
    cardDragEnd,
    createTask,
    updateTask,
    destroyTask,
    loadTask,
  };
};

export default tasksSlice.reducer;
