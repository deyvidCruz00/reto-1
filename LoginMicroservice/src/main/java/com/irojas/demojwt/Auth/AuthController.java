package com.irojas.demojwt.Auth;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CookieValue;
import java.util.Map;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping(value = "login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse authResponse = authService.login(request);

        // Crear cookie con ResponseCookie (enfoque moderno)
        ResponseCookie cookie = ResponseCookie.from("authToken", authResponse.getToken())
                .httpOnly(true)
                .secure(true) // Activar en producción
                .path("/")
                .maxAge(24 * 60 * 60) // 1 día
                .sameSite("Lax") // Protección CSRF
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(authResponse);
    }

    @PostMapping(value = "register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse authResponse = authService.register(request);

        // Usar el mismo enfoque que login (ResponseCookie)
        ResponseCookie cookie = ResponseCookie.from("authToken", authResponse.getToken())
                .httpOnly(true)
                .secure(true) // Activar en producción
                .path("/")
                .maxAge(7 * 24 * 60 * 60) // 7 días
                .sameSite("Lax") // Protección CSRF
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(authResponse);
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken(
            @CookieValue(name = "authToken", required = false) String token) {

        if (token == null) {
            return ResponseEntity.status(401).body(Map.of("message", "No token provided"));
        }

        try {
            var user = authService.verifyToken(token);

            return ResponseEntity.ok(Map.of(
                    "id", user.getId(),
                    "username", user.getUsername()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }
    }

}
