import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can use a different icon set like MaterialIcons
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "../utils"
import { CreateAccount } from './CreateAccount';
import { RootState, UserModel, useAppDispatch, useAppSelector } from '../redux';
import { fetchUser, getUserValues } from '../redux/features/userSlice';
import { userProfile } from '../redux';
import axios from 'axios';

export const LoginScreen = () => {

    // const { navigate } = useNavigation() //isntantiate the navigation hook
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('@');
    const [password, setPassword] = useState('123456');

    const [googleOauthUrl, setGoogleOauthUrl] = useState('')
    const [loginType, setLoginType] = useState('');

    const [signUpMode, setSignupMode] = useState(false)


    useEffect(() => {
        const loadOauthUrl = async () => {
            try {
                const response = await axios.get('auth/google/');
                const { url } = response.data;
                setGoogleOauthUrl(url)
            }
            catch (e) {
                console.log(e);
            }
        }
        loadOauthUrl()
    }, [])
    useEffect(() => {

    }, [loginType])

    const handleLogin = async () => {
        try {
            await dispatch(fetchUser({ email, password }))
            console.log(userProfile.user);
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro na requisição. Consulte o console para obter mais detalhes.');
        }
    };
    return (

        <View style={styles.container}>
            {signUpMode === true ? <CreateAccount setSignupMode={setSignupMode} /> : <>
                <Text style={styles.headerText}>Login</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Usuário"
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />

                <View style={styles.forgotPwdContainer}>
                    <TouchableOpacity style={styles.nakedButton} onPress={handleLogin}>
                        <Text style={styles.nakedTextButton}>Esqueci a senha</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <Text>Ou acesse usando:</Text>
                <View style={styles.loginOptions}>

                    <TouchableOpacity style={styles.googleLoginButton} disabled={!googleOauthUrl} onPress={() => setLoginType('google')}>
                        <Icon name="google" size={30} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.fbLoginButton} onPress={() => setLoginType('fb')}>
                        <Icon name="facebook" size={30} color="white" />
                    </TouchableOpacity>

                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#FDB879', '#FA554F', '#285AEB']}
                        style={styles.instagramLoginButton}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}>
                        <TouchableOpacity style={styles.instagramLoginButton} onPress={() => setLoginType('instagram')}>
                            <Icon name="instagram" size={30} color="white" />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

                <TouchableOpacity style={styles.signinButton} onPress={() => setSignupMode(true)}>
                    <Text style={styles.nakedTextButton}>Fazer cadastro</Text>
                </TouchableOpacity>
            </>

            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    loginButton: {
        width: '90%',
        alignItems: 'center',
        backgroundColor: 'blue',
        paddingVertical: 10,
        borderRadius: 20,
        margin: 10,
        marginTop: 20
    },
    googleLoginButton: {
        backgroundColor: '#E04B44',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        margin: 10
    },
    fbLoginButton: {
        backgroundColor: '#3F5990',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        margin: 10
    },
    instagramLoginButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        margin: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginOptions: {
        flexDirection: 'row'
    },
    inputText: {
        fontSize: 15,
        textAlign: 'left',
        margin: 5
    },
    nakedTextButton: {
        fontSize: 15,
        justifyContent: 'flex-end',
        textDecorationLine: "underline",
    },
    nakedButton: {
        fontSize: 15,
        justifyContent: 'flex-end'
    },
    signinButton: {
        marginTop: 30
    },
    inputContainer: {
        width: '90%',
        alignContent: 'center'
    },
    forgotPwdContainer: {
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100%',
        marginRight: '10%'
    }
});
