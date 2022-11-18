import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },

  preview: {
    width: '60%',
    display: 'block',
    margin: [[10, 'auto']],
  },
}));

export default useStyles;
