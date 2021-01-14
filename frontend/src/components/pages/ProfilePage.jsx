import React, {useState, useEffect} from "react"
import {Form, Button} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import {getUserProfile, updateUserProfile} from "../redux-components/actions/userActions";
import Message from "../Message";
import Loader from "../Loader";
import FormContainer from "../FormContainer";

const ProfileScreen = ({history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const {user, loading, error} = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Password is not match')
        } else {
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
    }


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch(getUserProfile('profile'))
            } else {
                debugger
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [userInfo, history, user, success])

    return (
        <>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading ? <Loader/> :
                (
                    <FormContainer>
                        <h2>User profile</h2>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='confirmPassword'>
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter confirmPassword'
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                UPDATE
                            </Button>
                        </Form>
                    </FormContainer>
                )}
        </>
    )
}

export default ProfileScreen