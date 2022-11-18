import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '11.5vw',
  },
  text: {
    textAlign: 'center',
    paddingTop: '15px',
    fontWeight: 'bolder',
  },

  preview: {
    width: '50%',
    display: 'block',
    margin: [[10, 'auto']],
  },
}));

export default useStyles;
