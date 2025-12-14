package com.imageprompt.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@SuppressWarnings("unchecked")
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final WebClient webClient;

    public OpenAIService() {
        this.webClient = WebClient.builder()
                .baseUrl("https://api.openai.com/v1")
                .build();
    }

    public String analyzeImage(String base64Image) {
        try {
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "gpt-4o-mini");
            requestBody.put("messages", List.of(
                Map.of(
                    "role", "user",
                    "content", List.of(
                        Map.of("type", "text", "text", 
                            "Analyze this image in detail. Describe: " +
                            "1. Main subjects and their characteristics " +
                            "2. Setting and environment " +
                            "3. Colors, lighting, and mood " +
                            "4. Composition and style " +
                            "5. Any notable details or elements"),
                        Map.of("type", "image_url", 
                            "image_url", Map.of("url", "data:image/jpeg;base64," + base64Image))
                    )
                )
            ));
            requestBody.put("max_tokens", 500);

            String response = webClient.post()
                    .uri("/chat/completions")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .body(Mono.just(requestBody), Map.class)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> responseMap = mapper.readValue(response, Map.class);
            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseMap.get("choices");
            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            return (String) message.get("content");

        } catch (Exception e) {
            return "Error analyzing image: " + e.getMessage();
        }
    }
}