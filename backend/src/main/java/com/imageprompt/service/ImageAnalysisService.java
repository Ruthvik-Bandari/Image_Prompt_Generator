package com.imageprompt.service;

import com.imageprompt.model.ImageAnalysisResponse;
import com.imageprompt.model.PromptStructure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class ImageAnalysisService {

    private final OpenAIService openAIService;

    @Autowired
    public ImageAnalysisService(OpenAIService openAIService) {
        this.openAIService = openAIService;
    }

    public ImageAnalysisResponse analyzeImage(MultipartFile file) throws Exception {
        String base64Image = Base64.getEncoder().encodeToString(file.getBytes());
        String imageDescription = openAIService.analyzeImage(base64Image);
        
        ImageAnalysisResponse response = new ImageAnalysisResponse();
        response.setDescription(imageDescription);
        response.setJsonPrompt(generateJsonPrompt(imageDescription));
        response.setToonPrompt(generateToonPrompt(imageDescription));
        response.setDetailedPrompt(generateDetailedPrompt(imageDescription));
        response.setCinematicPrompt(generateCinematicPrompt(imageDescription));
        
        return response;
    }

    private Map<String, Object> generateJsonPrompt(String description) {
        Map<String, Object> jsonPrompt = new HashMap<>();
        jsonPrompt.put("action", "generate");
        jsonPrompt.put("subject", extractSubject(description));
        jsonPrompt.put("style", "photorealistic, high detail, 8k resolution");
        jsonPrompt.put("scene", extractScene(description));
        jsonPrompt.put("additionalElements", extractElements(description));
        jsonPrompt.put("lighting", "natural lighting, golden hour");
        jsonPrompt.put("camera", "wide angle lens, rule of thirds composition");
        return jsonPrompt;
    }

    private String generateToonPrompt(String description) {
        return String.format(
            "Create a cartoon style illustration of %s. " +
            "Style: Pixar animation style, vibrant colors, expressive characters, " +
            "smooth gradients, family-friendly aesthetic. " +
            "Scene: %s with whimsical elements and playful atmosphere. " +
            "Additional: cel-shaded rendering, character-focused composition, " +
            "dynamic poses, exaggerated features for emotional expression",
            extractSubject(description),
            extractScene(description)
        );
    }

    private PromptStructure generateDetailedPrompt(String description) {
        PromptStructure prompt = new PromptStructure();
        prompt.setAction("Create a highly detailed digital artwork");
        prompt.setSubject(extractSubject(description));
        prompt.setStyle("hyperrealistic digital painting, octane render, unreal engine 5");
        prompt.setScene(extractScene(description) + " with atmospheric depth");
        prompt.setElements(extractElements(description) + ", volumetric fog, ray tracing, ambient occlusion");
        return prompt;
    }

    private String generateCinematicPrompt(String description) {
        return String.format(
            "Cinematic shot: %s | " +
            "Cinematography: anamorphic lens, shallow depth of field, " +
            "color grading like Christopher Nolan films | " +
            "Mood: dramatic lighting, high contrast, film grain | " +
            "Technical: 65mm film, IMAX quality, lens flares, " +
            "cinematic aspect ratio 2.39:1 | " +
            "Post-processing: color correction, film emulation",
            description
        );
    }

    private String extractSubject(String description) {
        String[] words = description.split(" ");
        StringBuilder subject = new StringBuilder();
        for (String word : words) {
            if (isNoun(word)) {
                subject.append(word).append(" ");
                if (subject.length() > 30) break;
            }
        }
        return subject.toString().trim();
    }

    private String extractScene(String description) {
        if (description.contains("in")) {
            int index = description.indexOf("in");
            String scene = description.substring(index);
            return scene.length() > 50 ? scene.substring(0, 50) : scene;
        }
        return "detailed environment with natural elements";
    }

    private String extractElements(String description) {
        return "detailed textures, realistic materials, proper scale, atmospheric perspective";
    }

    private boolean isNoun(String word) {
        return word.length() > 3 && !word.matches("(the|and|or|but|with|from|to|at|by|for|in|on)");
    }
}