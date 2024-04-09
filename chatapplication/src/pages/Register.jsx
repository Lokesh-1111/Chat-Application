import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import '../App.css';
import Logo from '../assets/chat_app.jpeg'
import {ToastContainer,toast} from 'react-toastify'
import "../../node_modules/react-toastify/dist/ReactToastify.css"
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();

    const [values,setValues] = useState({username:'',email:'',password:'',confirmPassword:''})

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            if(handleValidation()){
                // console.log("inside validation");
                const {username,email,password} = values;
                const {data} = await axios.post('http://localhost:8000/api/register',{
                    username,
                    email,
                    password
                });
                // console.log("Data",data);

                if(data.status === false){
                    toast.error(data.msg,{
                        position:'top-right',
                        draggable:true,
                        autoClose:5000,
                        pauseOnHover:true
                    })
                }
                else if(data.status === true){
                    toast.success(data.msg,{
                        position:'top-right',
                        autoClose:5000,
                        draggable:true,
                        pauseOnHover:true
                    })
                    setValues({username:'',email:'',password:'',confirmPassword:''})

                    setTimeout(()=>{
                        navigate('/login');
                    },2000);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleValidation = ()=>{
        const {username,email,password,confirmPassword} = values;
        const regEx = new RegExp("[`~!@#$%^&*()\\]\\[+={}/|:;\"\'<>,.?-_]");
        const pass = regEx.test(password);

        if(password!==confirmPassword){
            toast.error("Enter valid Credentials",{
                position:'top-right',
                autoClose:5000,
                pauseOnHover:true,
                draggable:true
            })
            return false;
        }
        else if(!pass) {
            toast.error("special character must include in password",{
                position:'top-right',
                autoClose:5000,
                pauseOnHover:true,
                draggable:true
            })
            return false;
        }
        else if(password.length<7){
            toast.error("password must contain minimum 8 characters",{
                position:'top-right',
                autoClose:5000,
                pauseOnHover:true,
                draggable:true
            })
            return false;
        }
        else if(username.length<5){
            console.log(username,"inside validation");
            toast.error("username must contain minimum 8 characters",{
                position:'top-right',
                autoClose:5000,
                pauseOnHover:true,
                draggable:true
            })
            return false;
        }
        else if(email.length<7){
            toast.error("email must contain minimum 8 characters",{
                position:'top-right',
                autoClose:5000,
                pauseOnHover:true,
                draggable:true
            })
            return false;
        }
        return true;

    }


    const handleChange = (e)=>{
        setValues({...values,[e.target.name]:e.target.value});
        // console.log(values);
    }

  return (
    <div className='formContainer' onSubmit={handleSubmit}>
        <form>
            <div className='heading'>
                <img src={Logo} alt='Logo' />
                <h1>CHAT APP</h1>
            </div>
            <input 
            type='text'
            placeholder='UserName'
            name='username'
            onChange={handleChange}
            />
            <input 
            type='email'
            placeholder='Email'
            name='email'
            onChange={handleChange}
            />
            <input 
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleChange}
            />
            <input 
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            onChange={handleChange}
            />
            <button type='submit'>Submit</button>
            <span>Already have an account?<Link to="/login">Login</Link></span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Register