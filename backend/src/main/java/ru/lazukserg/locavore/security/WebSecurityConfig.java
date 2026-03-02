package ru.lazukserg.locavore.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import ru.lazukserg.locavore.security.jwt.AuthEntryPointJwt;
import ru.lazukserg.locavore.security.jwt.AuthTokenFilter;
import ru.lazukserg.locavore.security.services.UserDetailsServiceImpl;

@Configuration
@EnableMethodSecurity
public class WebSecurityConfig {
  @Autowired
  UserDetailsServiceImpl userDetailsService;

  @Autowired
  private AuthEntryPointJwt unauthorizedHandler;

  @Bean
  public AuthTokenFilter authenticationJwtTokenFilter() {
    return new AuthTokenFilter();
  }
  
  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
      DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
       
      authProvider.setUserDetailsService(userDetailsService);
      authProvider.setPasswordEncoder(passwordEncoder());
   
      return authProvider;
  }
  
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
  
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf.disable())
        .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth ->
          auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
              .requestMatchers("/uploads/**").permitAll()
              .requestMatchers("/api/auth/**").permitAll()
               //создать продукт может только продавец
              .requestMatchers("/api/product/create").hasRole("SELLER")
                  //удалить продукт может либо продавец либо админ
              .requestMatchers(HttpMethod.DELETE,"/api/product/{id}").hasAnyRole("SELLER","ADMIN")
                  //редактировать продукт может только продавец
              .requestMatchers(HttpMethod.PUT,"/api/product/{id}").hasRole("SELLER")
              .requestMatchers("/api/product/**").permitAll()
              .requestMatchers("/api/category/**").permitAll()
              .requestMatchers("/api/region/**").permitAll()
                  //список заказов может видеть только авторизованный пользователь
              .requestMatchers("/api/order/all/{role}/{id}").authenticated()
                  //информацию о заказе может видеть только авторизованный пользователь
              .requestMatchers("/api/order/{id}").authenticated()
                  //создать заказ может только покупатель
              .requestMatchers("/api/order/create").hasRole("BUYER")
              .requestMatchers("/api/user/**").permitAll()
              .anyRequest().authenticated()
        );
    
    http.authenticationProvider(authenticationProvider());
    http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }
}
