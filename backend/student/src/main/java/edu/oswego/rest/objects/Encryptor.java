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
        try {
            keysetHandle = CleartextKeysetHandle.read(JsonKeysetReader.withFile(new File(filename)));
        } catch (IOException e) {
            e.printStackTrace();
        }
        AeadConfig.register();
    }

    //create new json key file
    public static void createKey(String filename) throws GeneralSecurityException {
        KeysetHandle kh = KeysetHandle.generateNew(KeyTemplates.get("AES128_GCM"));
        File f = new File(filename);
        try {
            CleartextKeysetHandle.write(kh, JsonKeysetWriter.withFile(f));
        } catch(IOException e) {
            e.printStackTrace();
        }
    }

    //encrypt string to byte array
    public byte[] encrypt(String plaintext) throws GeneralSecurityException {
        Aead aead = keysetHandle.getPrimitive(Aead.class);
        byte[] ciphertext = aead.encrypt(plaintext.getBytes(),secret.getBytes());
        return ciphertext;

    }

    //byte array to string
    public String decrypt(byte[] encrypted) throws GeneralSecurityException {
        Aead aead = keysetHandle.getPrimitive(Aead.class);
        byte[] decrypted = aead.decrypt(encrypted,secret.getBytes());
        return new String(decrypted);
    }
}
