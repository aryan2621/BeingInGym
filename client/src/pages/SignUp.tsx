import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../styles';
import { Input } from '@ui-kitten/components';
import GoogleSvg from '../components/GoogleSvg';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure();

const SignUp = () => {
    const handleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('userInfo', userInfo);
        } catch (error) {
            console.log('signIn error', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.headerText}>Sign Up</Text>
                <View style={styles.inputContainer}>
                    <Input
                        style={styles.input}
                        placeholder="First Name"
                        placeholderTextColor={Colors.Text.Secondary}
                        inputMode="text"
                    />
                    <Input
                        style={styles.input}
                        placeholder="Last Name"
                        placeholderTextColor={Colors.Text.Secondary}
                        inputMode="text"
                    />
                    <Input
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={Colors.Text.Secondary}
                        inputMode="email"
                    />
                    <Input
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={Colors.Text.Secondary}
                        inputMode="text"
                        secureTextEntry={true}
                    />
                    <Input
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor={Colors.Text.Secondary}
                        inputMode="text"
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>OR</Text>
                    <View style={styles.divider} />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    <GoogleSvg />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.BackGround.Primary,
        width: '100%',
    },
    innerContainer: {
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        borderRadius: 10,
        backgroundColor: Colors.BackGround.Secondary,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.Text.Primary,
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        marginBottom: 20,
        backgroundColor: Colors.BackGround.Input,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: Colors.Text.Primary,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.Text.Secondary,
    },
    dividerText: {
        width: 50,
        textAlign: 'center',
        color: Colors.Text.Secondary,
    },
    button: {
        backgroundColor: Colors.BackGround.Tertiary,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginBottom: 10,
    },
});

export default SignUp;
