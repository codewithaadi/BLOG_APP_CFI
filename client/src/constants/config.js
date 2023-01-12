//API_NOTIFICATION_MESSAGES

export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: 'Loading...',
        message: 'Data is being Loaded,Please wait'
    },
    success: {
        title: 'Success',
        message: 'Data successfully Loaded'
    }, 
    responseFailure: {
        title: 'Error',
        message: 'An error occured while fetching response from the server. Please try again!'
    },
    requestFailure:{
        title: 'Error',
        message: 'An error occured while parsing request Data'
    },
    networkError:{
        title: 'Error',
        message: 'Unable to connect with the server. Please check '
    }
}

//API SERVICE CALL
//SAMPLE REQUEST
//NEED SERVICE CALL : {url: '/', method: 'POST/GET/DELETE/PUT' , praram: 'true/false', query : 'true/false'}

export const SERVICE_URLS = {
    userSignup: {url: '/signup', method: 'POST'},
    userLogin : {url: '/login', method:'POST'}
}