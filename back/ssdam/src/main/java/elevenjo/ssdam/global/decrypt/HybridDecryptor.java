package elevenjo.ssdam.global.decrypt;

import jakarta.annotation.PostConstruct;
import org.apache.commons.codec.binary.Hex;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;


@Component
public class HybridDecryptor {

    private PrivateKey privateKey;

    //rsa 복호화를 위한 privateKey 생성
    @PostConstruct
    public void init() throws Exception {
        // 1. pem 키 불러오기
        ClassPathResource classPathResource = new ClassPathResource("keys/private_key.pem");
        String keyPem = new String(Files.readAllBytes(classPathResource.getFile().toPath()), StandardCharsets.UTF_8);
    
        //헤더 푸터 및 줄바꿈 제거
        keyPem = keyPem.replace("-----BEGIN PRIVATE KEY-----","")
                .replace("-----END PRIVATE KEY-----","")
                .replaceAll("\\s","");

        byte[] keyBytes = Base64.getDecoder().decode(keyPem);
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(keyBytes);
        
        //privateKey 객체 생성
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        this.privateKey = keyFactory.generatePrivate(keySpec);
    }


    // 2. RSA로 AES 키 Initialization Vector 복호화
    public AESKeyInfo decryptKeyInfo( String encryptedKeyBase64) throws Exception {

        byte[] encryptedKeyBytes = Base64.getDecoder().decode(encryptedKeyBase64);

        // RSA 복호화 - OAEP with SHA-256 알고리즘 사용
        Cipher rsaCipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
        rsaCipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] decryptedKeyAndIV = rsaCipher.doFinal(encryptedKeyBytes);

        // 프론트에서 "aesKeyHex:ivHex" 형식으로 보냄
        String aesKeyAndIv= new String(decryptedKeyAndIV, StandardCharsets.UTF_8);
        String[] parts = aesKeyAndIv.split(":");
        if (parts.length != 2) {
            throw new IllegalArgumentException("Invalid AES key/IV format.");
        }
        String aesKeyHex = parts[0];
        String ivHex = parts[1];
        byte[] aesKeyBytes = Hex.decodeHex(aesKeyHex);
        byte[] ivBytes = Hex.decodeHex(ivHex);

        return new AESKeyInfo(aesKeyBytes, ivBytes);
    };

    
    // AES로 카드 정보 복호화
    public String decryptWithAES(String encryptedBase64, AESKeyInfo aesKeyInfo) throws Exception {
        Cipher aesCipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        aesCipher.init(Cipher.DECRYPT_MODE, aesKeyInfo.getKeySpec(), aesKeyInfo.getIvSpec());

        byte[] encryptedBytes = Base64.getDecoder().decode(encryptedBase64);
        byte[] decryptedBytes = aesCipher.doFinal(encryptedBytes);

        return new String(decryptedBytes, StandardCharsets.UTF_8);

    };

    public static class AESKeyInfo {
        private final SecretKeySpec keySpec;
        private final IvParameterSpec ivSpec;

        public AESKeyInfo(byte[] keyBytes, byte[] ivBytes){
            this.keySpec = new SecretKeySpec(keyBytes, "AES");
            this.ivSpec = new IvParameterSpec(ivBytes);
        };

        public SecretKeySpec getKeySpec() {
            return keySpec;
        }
        public IvParameterSpec getIvSpec() {
            return ivSpec;
        }
    };
}
