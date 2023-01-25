import React from 'react';
import { useState,useContext} from 'react';

import { Box,Button,TextareaAutosize,styled} from '@mui/material';
import { DataContext } from '../../../context/DataProvider';
import {API} from '../../../service/api';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`

const Image = styled('img')({
    width:50,
    height:50,
    borderRadius: '50%'
})

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px;
    width: 100%;
     margin: 0 20px;
`

const initalValues = {
    name: '',
    postId: '',
    comments: '',
    date: new Date()
}
export default function Comments(props) {

  const url = 'https://static.thenounproject.com/png/12017-200.png';
  const [comment,setCommnent] = useState(initalValues);
  const {account} = useContext(DataContext);
  
  const handleChange = (e)=>{
    setCommnent({
        ...comment,
        name: account.username,
        postId: props.post._id,
        comments: e.target.value
    })
  }

  const addComment =async (e)=>{
    let response = await API.newComment(comment);
    if(response.isSuccess){
        setCommnent(initalValues);
    }
  }
  return (
    <Box>
        <Container>
            <Image src={url} alt="dp_logo" />
            <StyledTextArea minRows={5} placeholder="What's on your Mind ?..." value={comment.comments} onChange={(e)=> handleChange(e)}/>
            <Button variant='contained' color='primary' size="medium" style={{height:40}} onClick={(e)=> addComment(e)}>Post</Button>
        </Container>
        <Box>

        </Box>
    </Box>
  )
}
