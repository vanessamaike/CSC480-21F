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

        File f;
        try{
            String fs = System.getProperty("file.separator");
            String filename = "encryptionKey.txt";
            f = new File(
                    ".."+fs+".."+fs+".."+fs+".."+fs+".."+fs+
                            ".."+fs+".."+fs+"encryptionKey.txt");
        } catch (NullPointerException e){
            f = createKey();
        }
        try {
            keysetHandle = CleartextKeysetHandle.read(JsonKeysetReader.withFile(f));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //create new json key file
    private File createKey() throws GeneralSecurityException {
        String filename = "encryptionKey.txt";
        AeadConfig.register();
        KeysetHandle kh = KeysetHandle.generateNew(KeyTemplates.get("AES128_GCM"));
        String fs = System.getProperty("file.separator");
        File f = new File(".." + fs + ".." + fs + ".." + fs + ".." + fs + ".." + fs + ".." + fs + ".." + fs + "encryptionKey.txt");
       //File f = new File(filename);
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