package edu.oswego.util.objects;
import com.google.crypto.tink.*;
import com.google.crypto.tink.aead.AeadConfig;

import java.io.File;
import java.io.IOException;
import java.security.GeneralSecurityException;


public class Encryptor {
    private static final String secret = "${encryption.secret}"; //Uses open liberty environment variable
    private KeysetHandle keysetHandle;

    //Create encryptor object from keyset file
    public Encryptor(String filename) throws GeneralSecurityException {

        File f;
        try{
            f = new File(this.getClass().getClassLoader().getResource(filename).getFile());
        } catch (NullPointerException e){
            f = createKey(filename);
        }
        try {
            keysetHandle = CleartextKeysetHandle.read(JsonKeysetReader.withFile(f));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //create new json key file
    private File createKey(String filename) throws GeneralSecurityException {
        AeadConfig.register();
        KeysetHandle kh = KeysetHandle.generateNew(KeyTemplates.get("AES128_GCM"));
        File f = new File(filename);
        try {
            CleartextKeysetHandle.write(kh, JsonKeysetWriter.withFile(f));
        } catch(IOException e) {
            e.printStackTrace();
        }
        return f;
    }

    //encrypt string to byte array
    public byte[] encrypt(String plaintext) throws GeneralSecurityException {
        Aead aead = keysetHandle.getPrimitive(Aead.class);
        return aead.encrypt(plaintext.getBytes(),secret.getBytes());

    }

    //byte array to string
    public String decrypt(byte[] encrypted) throws GeneralSecurityException {
        Aead aead = keysetHandle.getPrimitive(Aead.class);
        return new String(aead.decrypt(encrypted,secret.getBytes()));
    }
}