package com.tokens;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;

@Component
public class CommonJwtUtil {
    private static final String SECRET_KEY="Lifeisacanvasofendlesspossibilitiespaintedwiththecolorsofdreamsanddetermination";
    private static final long EXPIRATION_TIME=1000*60*60*10;

    public String generateToken(String email){
        return Jwts.builder()
        .setSubject(email)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
        .signWith(SignatureAlgorithm.HS256,SECRET_KEY)
        .compact();
    }

    public String extractEmail(String token){
        return getClaims(token).getSubject();
    }
    public boolean validateToken(String token,String email){
        return email.equals(extractEmail(token))&&!isTokenExpired(token);
    }
    private boolean isTokenExpired(String token){
        return getClaims(token).getExpiration().before(new Date());

    }
    private Claims getClaims(String token){
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }
}
    