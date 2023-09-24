import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { RootState, useAppSelector } from '../redux';
import { signUpUser } from '../redux/features/userSlice';
import { useAppDispatch } from '../redux';

interface CreateAccoutProps {
    setSignupMode: (mode: boolean) => void; // Agora setSignupMode é tipado como uma função que aceita um argumento booleano e não retorna nada.
}

export const CreateAccount: React.FC<CreateAccoutProps> = (props) => {

    const { setSignupMode } = props;
    const dispatch = useAppDispatch()
    const user = (state: RootState) => state.user;

    const [email, setEmail] = useState('@');
    const [password, setPassword] = useState('123456');
    const [repeatPassword, setRepeatPassword] = useState('123456');
    const [userName, setName] = useState('a a');
    const [phone, setPhone] = useState('(31)98212-4311');

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [repeatPasswordError, setRepeatPasswordError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const handleCreateAccount = async () => {
        // // Limpar erros anteriores
        setNameError(false);
        setEmailError(false);
        setPasswordError(false);
        setRepeatPasswordError(false);

        // Validações
        if (phone.length !== 15) {
            setPhoneError(true);
        }
        if (userName.trim().split(' ').length < 2) {
            setNameError(true);
        }
        if (!email.includes('@')) {
            setEmailError(true);
        }
        if (password.length < 6) {
            setPasswordError(true);
        }
        if (password !== repeatPassword || repeatPassword.length < 1) {
            setRepeatPasswordError(true);
        }

        // Se não houver erros, continue com o registro
        if (!nameError && !emailError && !passwordError && !repeatPasswordError) {
            // Aqui você pode chamar a API para criar a conta
            try {
                const response = await dispatch(signUpUser({ email, password, phone, userName }))
                // console.log('response');
            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        }
    };
    const formatPhoneNumber = (text: string) => {
        const numbersOnly = text.replace(/\D/g, '');
        const maskedNumber = numbersOnly.replace(
            /(\d{0,2})(\d{0,5})(\d{0,4})/,
            '($1) $2-$3'
        );
        return maskedNumber
    }
    const handlePhoneChange = (text: string) => {
        const formattedNumber = formatPhoneNumber(text);
        setPhone(formattedNumber);
    }

    return (
        <>
            <Text style={styles.headerText}>Criar Conta</Text>

            <TextInput
                style={[styles.input, nameError && styles.errorInput]}
                placeholder="Nome Completo"
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                style={[styles.input, emailError && styles.errorInput]}
                placeholder="E-mail"
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={[styles.input, passwordError && styles.errorInput]}
                placeholder="Senha"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                style={[styles.input, repeatPasswordError && styles.errorInput]}
                placeholder="Repita a senha"
                secureTextEntry={true}
                onChangeText={(text) => setRepeatPassword(text)}
            />
            <TextInput
                style={[styles.input, phoneError && styles.errorInput]}
                placeholder="Celular"
                maxLength={15}
                value={phone}
                onChangeText={handlePhoneChange}
            />

            <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
                <Text style={styles.buttonText}>Criar Conta</Text>
            </TouchableOpacity>

            <View style={styles.goToLoginScreen}>
                <Text style={styles.text}>
                    Já é cadastrado? <Text onPress={() => {
                        setSignupMode(false)
                    }} style={styles.loginButton}>Entrar</Text>
                </Text>
            </View>
        </>
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
    errorInput: {
        borderColor: 'red', // Cor da borda vermelha para campos com erro
    },
    createAccountButton: {
        width: '90%',
        alignItems: 'center',
        backgroundColor: 'blue', // Você pode personalizar a cor como desejado
        paddingVertical: 10,
        borderRadius: 20,
        margin: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginButton: {
        color: 'blue',
        textDecorationLine: "underline",
        fontSize: 15
    },
    text: {
        fontSize: 15
    },
    goToLoginScreen: {
        margin: 20
    }
});

// const mapToStateProps = (state: ApplicationState) => ({
//     userReducer: state.userReducer
// })
// export const CreateAccount = connect(mapToStateProps, { OnUserSignup })(_CreateAccount)
