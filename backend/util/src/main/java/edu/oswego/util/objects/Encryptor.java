package edu.oswego.util.objects;
import com.google.crypto.tink.*;
import com.google.crypto.tink.aead.AeadConfig;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.GeneralSecurityException;


public class Encryptor {
    private static final String secret = "${encryption.secret}"; //Uses open liberty environment variable
    private static final String file = "encryptionKey.txt";
    private KeysetHandle keysetHandle;

    //Create encryptor object from keyset file
    public Encryptor() throws GeneralSecurityException {
        if(!Files.exists(Path.of(file)))
            createKey();

        try {
            keysetHandle = CleartextKeysetHandle.read(JsonKeysetReader.withFile(new File(file)));
        } catch (IOException e) {
            e.printStackTrace();
        }
        AeadConfig.register();
    }

    //create new json key file
    public static void createKey() throws GeneralSecurityException {
        KeysetHandle kh = KeysetHandle.generateNew(KeyTemplates.get("AES128_GCM"));
        File f = new File(file);
        try {
            CleartextKeysetHandle.write(kh, JsonKeysetWriter.withFile(f));
        } catch(IOException e) {
            e.printStackTrace();
        }
    }

    //encrypt string to byte array
    public byte[] encrypt(String plaintext) throws GeneralSecurityException {
        Aead aead = keysetHandle.getPrimitive(Aead.class);
        return aead.encrypt(plaintext.getBytes(),secret.getBytes());

    }

    //byte array to string
    public String decrypt(byte[] encrypted) throws GeneralSecurityException {
        Aead aead = keysetHandle.getPrimitive(Aead.class);
        byte[] decrypted = aead.decrypt(encrypted,secret.getBytes());
        return new String(decrypted);
    }
}
