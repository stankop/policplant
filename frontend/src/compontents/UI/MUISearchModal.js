import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Search from '../Search'


function SimpleDialog(props) {
  const { onClose, selectedValue, open, onSearch } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };



  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Pretraga</DialogTitle>
      <Search onSearch={ onSearch}></Search>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  
  onSearch: PropTypes.func.isRequired
};

export default function MUISearchModal() {
  const [open, setOpen] = React.useState(false);
 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    
  };

  const onSearch = () => {
    
    
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
       Pretraga   <i className="fa fa-bars fa-large"></i>
      </Button>
      <SimpleDialog
        
        open={open}
        onClose={handleClose}
        onSearch={onSearch}
      />
    </div>
  );
}
