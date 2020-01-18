package io.kotaokubo.ppmtool.security;

public class SecurityContants {

    public static final String SIGN_UP_URLS = "/api/users/**";
    public static final String H2_URL = "h2-console/**";
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX = "Bearer";
    public static final String HEADERSTRING = "Authrization";
    public static final long EXPIRATION_TIME = 30_000; //30secontd
}
