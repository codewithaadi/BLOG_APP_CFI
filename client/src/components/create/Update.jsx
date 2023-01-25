import { useState, useEffect, useContext } from 'react';
import { useLocation,useNavigate,useParams } from 'react-router-dom';

//Material UI
import { Box, FormControl, styled, InputBase, Button, TextareaAutosize } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

//Components
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';

const Container = styled(Box)(({theme})=>({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]:{
      margin:0
    }
}));

const Image = styled('img')({
    marginTop: '0px',
    width: '100%',
    height: '50vh',
    objectFit: 'cover',

})

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display:flex;
    flex-direction:row;
`

const InputTextField = styled(InputBase)`
    flex : 1;
    margin: 0 30px;
    font-size: 25px;
`
const Textarea = styled(TextareaAutosize)`
    width:99.5%;
    margin-top: 50px;
    font-size: 18px;
    border: none;
    &:focus-visible{
        outline:none;
    }
`

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

export default function UpdatePost() {

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState(''); //Using State for Image
    const location = useLocation(); //Initializing React-router-tool to fetch category from the url
    const navigate = useNavigate(); //Initializing React-router-tool to redirect to another page
    const { account } = useContext(DataContext);
    const {id} = useParams();

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(()=>{
        const fetchData = async ()=>{
          let response = await API.getPostById(id);
          if(response.isSuccess){
            setPost(response.data);
          }
        }
        fetchData();
      },[]);

    useEffect(() => {
        const getImage = async () => {

            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                //API CALL.
                const response = await API.uploadFile(data); 
                post.picture = response.data; //Now we can use this url coming from MONGODB servicers to refresh our image as user want.
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [file,post.picture]);  //This function will call itself everytime when there is a change in 'file' state


    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }   

    const updateBlogPost = async ()=>{
        let response = await API.updatePost(post);
        if(response.isSuccess){
            navigate(`/details/${id}`);
        }
    }

    return (
        <Container>
            <Image src={url} alt="banner" />
            <StyledFormControl>
                <label htmlFor='fileInput'>
                    <AddCircleIcon fontSize='large' color='action' />
                </label>
                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                <InputTextField placeholder='Title' value={post.title} onChange={(e) => handleChange(e)} name='title' />
                <Button variant='contained' onClick={()=> updateBlogPost()}>Update</Button>
            </StyledFormControl>
            <Textarea minRows={5} placeholder='Tell Your Story....' value={post.description} onChange={(e) => handleChange(e)} name='description' />

        </Container>
    )
}
