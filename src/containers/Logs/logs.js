import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DoneIcon from '@material-ui/icons/Done';
import { axiosGet } from '../../config/axiosClient'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function NestedList() {
    const classes = useStyles();
    const [logs, setLogs] = useState(true);

    const getAllLogs = () => {
        axiosGet(`logs`)
            .then(res => {
                if (res.status === 200) {
                    setLogs(res?.data)
                }
            })
            .catch(err => console.log(err, "there is an error"))
    }

    useEffect(() => {
        getAllLogs()
    }, [])

    return (

        <div className="container">
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" color="primary" id="nested-list-subheader">
                        Admin activity logs
        </ListSubheader>
                }
                className={classes.root}
            >
                {
                    logs?.length ?
                        logs.map(log => <ListItem button>
                            <ListItemIcon>
                                <DoneIcon color="secondary" />
                            </ListItemIcon>
                            <ListItemText primary={log.log} />
                        </ListItem>) : null
                }

            </List>
        </div>
    );
}
