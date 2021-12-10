package edu.oswego.util.utility;

import org.jasypt.util.text.AES256TextEncryptor;

public class JEncrypt {

    private final AES256TextEncryptor encryptor;

    public JEncrypt(){
        encryptor = new AES256TextEncryptor();
        encryptor.setPassword("password");
    }

    public String encrypt(String plaintext){
        return encryptor.encrypt(plaintext);
    }

    public String decrypt(String ciphertext){
        return encryptor.decrypt(ciphertext);
    }

}
