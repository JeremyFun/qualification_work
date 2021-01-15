import React, {useState, useEffect} from "react"
import {Form, Button} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import {getUserProfile, updateUserProfile} from "../redux-components/actions/userActions";
import Message from "../Message";
import Loader from "../Loader";
import FormContainer from "../FormContainer";
import {USER_UPDATE_PROFILE_RESET} from "../redux-components/constants/userConstants";

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
                console.log('replace')
                dispatch(getUserProfile('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
        return function close() {
            if (success) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
            }
        }
    }, [userInfo, history, user, success])

    return (
        <>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Профіль обновлено</Message>}
            {loading ? <Loader/> :
                (
                    <FormContainer>
                        <h2>Профіль користувача</h2>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Ім'я</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label>Емейл адреса</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='password'>
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='confirmPassword'>
                                <Form.Label>Підтвердіть пароль</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter confirmPassword'
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Обновити
                            </Button>
                        </Form>
                    </FormContainer>
                )}
        </>
    )
}

export default ProfileScreen