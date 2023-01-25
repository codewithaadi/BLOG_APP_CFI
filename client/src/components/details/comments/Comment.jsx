import React, { useContext } from 'react';
import { Box, Typography,styled } from '@mui/material';
import {Delete} from '@mui/icons-material';

import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`

const Container = styled(Box)`
    display:flex;
    margin-bottom: 5px;
`
const Name = styled(Typography)`
    font-weight: 600;
    font-size: 18px;
    margin-right: 20px;

`

const StyledDate = styled(Typography)`
    color: #878787;
    font-size:14px;
`

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`

export default function Comment(props) {

    const {account} = useContext(DataContext);

    const removeComment = async()=>{
        let response = await API.deleteComment(props.comment._id);
        if(response.isSuccess){
            props.setToggle(prevState => !prevState);
        }
    }

    return (
        <Component>
            <Container>
                <Name>{props.comment.name}</Name>
                <StyledDate>{new Date(props.comment.date).toDateString()}</StyledDate>
                {props.comment.name === account.username && <DeleteIcon onClick={()=>removeComment()}/>}
            </Container>
            <Box>
                <Typography>{props.comment.comments}</Typography>
            </Box>
        </Component>
    )
}
